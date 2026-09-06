import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { publicMethodPrompts } from '../src/data/public-method-prompts.ts';

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  if (index === -1 || !args[index + 1]) throw new Error(`Missing required ${name} argument.`);
  return args[index + 1];
};
const optional = (name) => {
  const index = args.indexOf(name);
  return index === -1 ? '' : args[index + 1] ?? '';
};

const generationPaths = option('--generations').split(',').map((path) => resolve(path.trim()));
const evaluationPath = resolve(option('--evaluations'));
const outputPath = resolve(option('--output'));
const selectedIds = optional('--only').split(',').map((id) => id.trim()).filter(Boolean);
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const generationFiles = await Promise.all(generationPaths.map(async (path) => JSON.parse(await readFile(path, 'utf8'))));
const evaluationFile = JSON.parse(await readFile(evaluationPath, 'utf8'));
const generations = generationFiles.flatMap((file) => file.results ?? []);
const evaluations = evaluationFile.results ?? [];

const exactIds = Object.keys(publicMethodPrompts);
const validationIds = selectedIds.length ? selectedIds : exactIds;
for (const id of validationIds) if (!exactIds.includes(id)) throw new Error(`Unknown public method ID: ${id}`);
const observedIds = generations.map((result) => result.id);
const evaluationIds = evaluations.map((result) => result.id);

if (!selectedIds.length && (generations.length !== exactIds.length || new Set(observedIds).size !== exactIds.length)) {
  throw new Error(`Expected ${exactIds.length} unique generations; received ${generations.length}.`);
}
if (!selectedIds.length && (evaluations.length !== exactIds.length || new Set(evaluationIds).size !== exactIds.length)) {
  throw new Error(`Expected ${exactIds.length} unique evaluations; received ${evaluations.length}.`);
}
if (validationIds.some((id) => observedIds.filter((observed) => observed === id).length !== 1 || evaluationIds.filter((observed) => observed === id).length !== 1)) {
  throw new Error('Generation or evaluation set does not cover the exact public method catalog.');
}

const rubricDimensions = ['method_fidelity', 'scenario_fidelity', 'boundary_fidelity', 'public_safety', 'reader_utility'];
const forbidden = /(?:sk-[A-Za-z0-9_-]{16,}|-----BEGIN .*PRIVATE KEY-----|\/home\/[^/\s]+|api[_ -]?key\s*[:=]|password\s*[:=]|kubeconfig|private key)/i;
const unresolvedPlaceholder = /\[(?:paste|insert|term|reader decision|describe|add [^\]]*here)[^\]]*\]/i;

const validatedResults = validationIds.map((id) => {
  const generation = generations.find((result) => result.id === id);
  const evaluation = evaluations.find((result) => result.id === id);
  const response = String(generation.response ?? '').trim();
  const words = response.split(/\s+/).filter(Boolean).length;
  const scores = rubricDimensions.map((dimension) => Number(evaluation.scores?.[dimension]));
  const hardFlags = Array.isArray(evaluation.hard_flags) ? evaluation.hard_flags : ['invalid hard_flags'];
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const checks = {
    promptDigest: generation.prompt_sha256 === sha256(publicMethodPrompts[id].prompt),
    responseLength: id === 'M-33'
      ? words >= 750 && words <= 3000
      : id === 'M-35'
        ? words >= 500 && words <= 850
        : words >= 180 && words <= 550,
    noUnresolvedPlaceholders: !unresolvedPlaceholder.test(response),
    noSensitiveMaterial: !forbidden.test(response),
    completeRubric: scores.every((score) => Number.isInteger(score) && score >= 0 && score <= 2),
    passingScore: totalScore >= 8 && scores.every((score) => score >= 1),
    noHardFlags: hardFlags.length === 0,
    passingVerdict: evaluation.verdict === 'pass',
  };

  if (!Object.values(checks).every(Boolean)) {
    throw new Error(`${id} failed admission: ${JSON.stringify(checks)}`);
  }

  return {
    id,
    title: generation.title ?? publicMethodPrompts[id].structure,
    prompt_sha256: generation.prompt_sha256,
    response,
    generation_worker: generation.worker ?? generationFiles.find((file) => file.results?.some((item) => item.id === id))?.worker ?? 'codex-isolated-generator',
    evaluation: {
      evaluator: evaluation.evaluator ?? evaluationFile.evaluator ?? 'codex-method-example-evaluator',
      scores: evaluation.scores,
      total_score: totalScore,
      hard_flags: hardFlags,
      verdict: evaluation.verdict,
      summary: evaluation.summary,
    },
    local_checks: checks,
  };
});

let results = validatedResults;
if (selectedIds.length) {
  const existing = JSON.parse(await readFile(outputPath, 'utf8'));
  const merged = new Map(existing.results.map((result) => [result.id, result]));
  for (const result of validatedResults) merged.set(result.id, result);
  results = exactIds.map((id) => merged.get(id));
  if (results.some((result) => !result)) throw new Error('Partial admission could not preserve the complete catalog.');
}

const admitted = {
  schema_version: 'hearth.public-method-harness.v1',
  generated_at: new Date().toISOString(),
  runner: 'Codex method-example harness',
  execution_boundary: 'Generation records retain per-result worker provenance; new executions use ephemeral Codex passes with a read-only tool policy and no persisted sessions.',
  evaluation_method: 'Separate Codex evaluator plus deterministic local admission checks.',
  evaluation_limit: 'Harness evaluation supports example quality only; it is not human acceptance or evidence of method efficacy.',
  method_count: results.length,
  passed_count: results.length,
  partial_admission: selectedIds.length ? validationIds : null,
  results,
};

await writeFile(outputPath, `${JSON.stringify(admitted, null, 2)}\n`, 'utf8');
process.stdout.write(`${results.length} method examples admitted to ${outputPath}\n`);
