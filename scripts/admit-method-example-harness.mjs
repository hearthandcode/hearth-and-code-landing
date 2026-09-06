import { createHash } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

import { publicMethods } from '../src/data/public-method-library.ts';

const args = process.argv.slice(2);
const option = (name) => {
  const index = args.indexOf(name);
  if (index === -1 || !args[index + 1]) throw new Error(`Missing required ${name} argument.`);
  return args[index + 1];
};

const generationPaths = option('--generations').split(',').map((path) => resolve(path.trim()));
const evaluationPath = resolve(option('--evaluations'));
const outputPath = resolve(option('--output'));
const sha256 = (value) => createHash('sha256').update(value).digest('hex');

const generationFiles = await Promise.all(generationPaths.map(async (path) => JSON.parse(await readFile(path, 'utf8'))));
const evaluationFile = JSON.parse(await readFile(evaluationPath, 'utf8'));
const generations = generationFiles.flatMap((file) => file.results ?? []);
const evaluations = evaluationFile.results ?? [];

const exactIds = publicMethods.map((method) => method.id);
const observedIds = generations.map((result) => result.id);
const evaluationIds = evaluations.map((result) => result.id);

if (generations.length !== exactIds.length || new Set(observedIds).size !== exactIds.length) {
  throw new Error(`Expected ${exactIds.length} unique generations; received ${generations.length}.`);
}
if (evaluations.length !== exactIds.length || new Set(evaluationIds).size !== exactIds.length) {
  throw new Error(`Expected ${exactIds.length} unique evaluations; received ${evaluations.length}.`);
}
if (exactIds.some((id) => !observedIds.includes(id) || !evaluationIds.includes(id))) {
  throw new Error('Generation or evaluation set does not cover the exact public method catalog.');
}

const rubricDimensions = ['method_fidelity', 'scenario_fidelity', 'boundary_fidelity', 'public_safety', 'reader_utility'];
const forbidden = /(?:sk-[A-Za-z0-9_-]{16,}|-----BEGIN .*PRIVATE KEY-----|\/home\/[^/\s]+|api[_ -]?key\s*[:=]|password\s*[:=]|kubeconfig|private key)/i;
const unresolvedPlaceholder = /\[(?:paste|insert|term|reader decision|describe|add [^\]]*here)[^\]]*\]/i;

const results = publicMethods.map((method) => {
  const generation = generations.find((result) => result.id === method.id);
  const evaluation = evaluations.find((result) => result.id === method.id);
  const response = String(generation.response ?? '').trim();
  const words = response.split(/\s+/).filter(Boolean).length;
  const scores = rubricDimensions.map((dimension) => Number(evaluation.scores?.[dimension]));
  const hardFlags = Array.isArray(evaluation.hard_flags) ? evaluation.hard_flags : ['invalid hard_flags'];
  const totalScore = scores.reduce((sum, score) => sum + score, 0);
  const checks = {
    promptDigest: generation.prompt_sha256 === sha256(method.prompt),
    responseLength: words >= 180 && words <= 550,
    noUnresolvedPlaceholders: !unresolvedPlaceholder.test(response),
    noSensitiveMaterial: !forbidden.test(response),
    completeRubric: scores.every((score) => Number.isInteger(score) && score >= 0 && score <= 2),
    passingScore: totalScore >= 8 && scores.every((score) => score >= 1),
    noHardFlags: hardFlags.length === 0,
    passingVerdict: evaluation.verdict === 'pass',
  };

  if (!Object.values(checks).every(Boolean)) {
    throw new Error(`${method.id} failed admission: ${JSON.stringify(checks)}`);
  }

  return {
    id: method.id,
    title: method.title,
    prompt_sha256: generation.prompt_sha256,
    response,
    generation_worker: generation.worker ?? generationFiles.find((file) => file.results?.some((item) => item.id === method.id))?.worker ?? 'codex-isolated-generator',
    evaluation: {
      evaluator: evaluationFile.evaluator ?? 'codex-isolated-evaluator',
      scores: evaluation.scores,
      total_score: totalScore,
      hard_flags: hardFlags,
      verdict: evaluation.verdict,
      summary: evaluation.summary,
    },
    local_checks: checks,
  };
});

const admitted = {
  schema_version: 'hearth.public-method-harness.v1',
  generated_at: new Date().toISOString(),
  runner: 'Codex isolated task workers',
  execution_boundary: 'Stateless generation workers with no tools, external effects, or external agent-runtime access.',
  evaluation_method: 'Separate Codex evaluator plus deterministic local admission checks.',
  evaluation_limit: 'Harness evaluation supports example quality only; it is not human acceptance or evidence of method efficacy.',
  method_count: results.length,
  passed_count: results.length,
  results,
};

await writeFile(outputPath, `${JSON.stringify(admitted, null, 2)}\n`, 'utf8');
process.stdout.write(`${results.length} method examples admitted to ${outputPath}\n`);
