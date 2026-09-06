import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';

import { publicMethodPrompts } from '../src/data/public-method-prompts.ts';

const args = process.argv.slice(2);
const option = (name, fallback) => {
  const index = args.indexOf(name);
  return index === -1 ? fallback : args[index + 1];
};
const selectedIds = option('--ids', '').split(',').map((id) => id.trim()).filter(Boolean);
const outputPath = resolve(option('--output', 'src/data/public-method-harness-results.json'));
const stageOption = option('--stage', '');
const stagePath = stageOption ? resolve(stageOption) : null;
const shouldAdmit = !stagePath || args.includes('--admit');
if (!selectedIds.length) throw new Error('Pass at least one method ID through --ids.');
for (const id of selectedIds) if (!publicMethodPrompts[id]) throw new Error(`Unknown public method ID: ${id}`);

const sha256 = (value) => createHash('sha256').update(value).digest('hex');
const workdir = await mkdtemp(join(tmpdir(), 'hearth-method-harness-'));
const generationSchemaPath = join(workdir, 'generation.schema.json');
const evaluationSchemaPath = join(workdir, 'evaluation.schema.json');
const generationOutputPath = join(workdir, 'generation.json');
const evaluationOutputPath = join(workdir, 'evaluation.json');
const combinedGenerationPath = join(workdir, 'combined-generation.json');
const combinedEvaluationPath = join(workdir, 'combined-evaluation.json');

const generationSchema = {
  type: 'object', additionalProperties: false, required: ['results'],
  properties: { results: { type: 'array', minItems: selectedIds.length, maxItems: selectedIds.length, items: {
    type: 'object', additionalProperties: false, required: ['id', 'title', 'response'],
    properties: { id: { type: 'string', enum: selectedIds }, title: { type: 'string' }, response: { type: 'string' } },
  } } },
};
const scoreProperties = Object.fromEntries(['method_fidelity', 'scenario_fidelity', 'boundary_fidelity', 'public_safety', 'reader_utility'].map((key) => [key, { type: 'integer', minimum: 0, maximum: 2 }]));
const evaluationSchema = {
  type: 'object', additionalProperties: false, required: ['results'],
  properties: { results: { type: 'array', minItems: selectedIds.length, maxItems: selectedIds.length, items: {
    type: 'object', additionalProperties: false, required: ['id', 'scores', 'hard_flags', 'verdict', 'summary'],
    properties: {
      id: { type: 'string', enum: selectedIds },
      scores: { type: 'object', additionalProperties: false, required: Object.keys(scoreProperties), properties: scoreProperties },
      hard_flags: { type: 'array', items: { type: 'string' } },
      verdict: { type: 'string', enum: ['pass', 'revise'] },
      summary: { type: 'string' },
    },
  } } },
};

const runCodex = (instruction, schemaPath, resultPath) => {
  execFileSync('codex', [
    'exec', '--ephemeral', '--ignore-user-config', '--skip-git-repo-check',
    '--sandbox', 'read-only', '--output-schema', schemaPath, '--output-last-message', resultPath, '-',
  ], { cwd: workdir, input: instruction, encoding: 'utf8', timeout: selectedIds.length === 1 ? 600_000 : 240_000, maxBuffer: 4 * 1024 * 1024 });
};

try {
  await writeFile(generationSchemaPath, JSON.stringify(generationSchema), 'utf8');
  await writeFile(evaluationSchemaPath, JSON.stringify(evaluationSchema), 'utf8');
  const selected = selectedIds.map((id) => ({ id, ...publicMethodPrompts[id] }));
  const responseBudget = selectedIds.length === 1 && selectedIds[0] === 'M-33' ? '1,000-1,800' : '180-280';
  runCodex(`You are the generation pass in a public method-example harness. Do not use tools or make external claims. Follow each supplied example prompt as a fictional, concrete worked exercise. Replace its placeholders with the Hearth & Code scenario already specified in the prompt. Produce ${responseBudget} words per response. Respect every stated boundary, include every requested artifact, and do not claim publication, deployment, acceptance, efficacy, or real-world execution. Express each requested Sigil element as structured symbolic language, then provide its human-readable gloss. Return exactly one result for each supplied ID.\n\n${JSON.stringify(selected, null, 2)}`, generationSchemaPath, generationOutputPath);
  const generated = JSON.parse(await readFile(generationOutputPath, 'utf8'));
  if (new Set(generated.results.map((item) => item.id)).size !== selectedIds.length) throw new Error('Generation pass returned duplicate or missing IDs.');

  runCodex(`You are the separate evaluation pass for public worked examples. Score each response from 0-2 on method_fidelity, scenario_fidelity, boundary_fidelity, public_safety, and reader_utility. A pass requires every dimension >=1, total >=8, no unresolved placeholder, no private path or secret, no invented live result, and no claim of method efficacy. Put concrete blocking problems in hard_flags; otherwise use an empty array. Return revise when any pass rule fails. Keep the summary to one useful sentence.\n\n${JSON.stringify(generated.results.map((result) => ({ id: result.id, prompt: publicMethodPrompts[result.id].prompt, response: result.response })), null, 2)}`, evaluationSchemaPath, evaluationOutputPath);
  const evaluated = JSON.parse(await readFile(evaluationOutputPath, 'utf8'));
  if (new Set(evaluated.results.map((item) => item.id)).size !== selectedIds.length) throw new Error('Evaluation pass returned duplicate or missing IDs.');

  const existing = JSON.parse(await readFile(outputPath, 'utf8'));
  let priorGenerations = existing.results.map((result) => ({ id: result.id, title: result.title, prompt_sha256: result.prompt_sha256, response: result.response, worker: result.generation_worker }));
  let priorEvaluations = existing.results.map((result) => ({ id: result.id, evaluator: result.evaluation.evaluator, scores: result.evaluation.scores, hard_flags: result.evaluation.hard_flags, verdict: result.evaluation.verdict, summary: result.evaluation.summary }));
  if (stagePath) {
    try {
      const staged = JSON.parse(await readFile(stagePath, 'utf8'));
      priorGenerations = staged.generations;
      priorEvaluations = staged.evaluations;
    } catch (error) {
      if (error.code !== 'ENOENT') throw error;
    }
  }
  const retainedGenerations = priorGenerations.filter((result) => !selectedIds.includes(result.id));
  const retainedEvaluations = priorEvaluations.filter((result) => !selectedIds.includes(result.id));
  const generations = [
    ...retainedGenerations,
    ...generated.results.map((result) => ({ ...result, prompt_sha256: sha256(publicMethodPrompts[result.id].prompt), worker: 'codex-ephemeral-generator' })),
  ];
  const evaluations = [
    ...retainedEvaluations,
    ...evaluated.results.map((result) => ({ ...result, evaluator: 'codex-ephemeral-evaluator' })),
  ];
  if (stagePath) await writeFile(stagePath, JSON.stringify({ generations, evaluations }, null, 2), 'utf8');
  await writeFile(combinedGenerationPath, JSON.stringify({ worker: 'mixed-provenance-method-harness', results: generations }), 'utf8');
  await writeFile(combinedEvaluationPath, JSON.stringify({ evaluator: 'codex-ephemeral-evaluator', results: evaluations }), 'utf8');
  if (shouldAdmit) {
    const admissionArgs = [resolve('scripts/admit-method-example-harness.mjs'), '--generations', combinedGenerationPath, '--evaluations', combinedEvaluationPath, '--output', outputPath];
    if (selectedIds.length < Object.keys(publicMethodPrompts).length) admissionArgs.push('--only', selectedIds.join(','));
    execFileSync(process.execPath, admissionArgs, { cwd: process.cwd(), stdio: 'inherit' });
    process.stdout.write(`Generated, evaluated, and admitted ${selectedIds.join(', ')} with ephemeral Codex passes.\n`);
  } else {
    process.stdout.write(`Generated and evaluated ${selectedIds.join(', ')} into the staging record; admission remains pending.\n`);
  }
} finally {
  await rm(workdir, { recursive: true, force: true });
}
