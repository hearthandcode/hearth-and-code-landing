// Explicit provider-backed comparison runs; not part of site build or visitor runtime.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { parse } from 'yaml';
import { runIsolatedMiniMax } from './pi-clean-isolated.mjs';
if (process.argv[2] !== '--run') throw new Error('Pass --run for 16 paid isolated MiniMax-M3 turns.');
const batch = parse(readFileSync('src/data/prompt-technique-batch-001.yaml', 'utf8'));
if (batch.entries.length !== 8) throw new Error('Batch must contain exactly eight entries');
const sha = (s) => createHash('sha256').update(s).digest('hex');
const system = 'You are a helpful assistant. Use only the supplied synthetic task facts. Do not claim external verification or actions you did not perform.';
const output = 'src/data/prompt-technique-comparisons.batch-001-clean.json';
const stage = '/tmp/prompt-technique-batch-001-clean-stage.json';
if (existsSync(output)) throw new Error('Batch output already exists; refusing overwrite.');
const records = existsSync(stage) ? JSON.parse(readFileSync(stage, 'utf8')).comparisons : [];
for (const entry of batch.entries) {
  if (records.some((item) => item.slug === entry.slug)) continue;
  const packet = entry.example.source_packet.map((fact, index) => `${index + 1}. ${fact}`).join('\n');
  const samples = [];
  for (const condition of ['baseline', 'applied']) {
    const prompt = `Synthetic professional task (no real client or external action):\n${entry.example.task}\n\nSupplied facts:\n${packet}\n\nInstructions:\n${condition === 'baseline' ? entry.example.baseline_instruction : entry.example.applied_instruction}\n\nReturn a candidate response for review. Do not invent facts or claim to have taken action.`;
    const run = runIsolatedMiniMax({ prompt, system });
    samples.push({ condition, submitted_prompt: run.prompt, prompt_sha256: run.prompt_sha256, response: run.response, response_sha256: run.response_sha256, executed_at: run.executed_at, tool_events: run.tool_events });
    console.log(`${entry.slug} ${condition} ${run.response.length} chars`);
  }
  records.push({ schema_version: 'hnc.prompt-comparison-receipt.v1', slug: entry.slug, provider: 'minimax-oauth', model: 'MiniMax-M3', execution_mode: 'clean pi-auth service, fresh Pi home, no Hub/plugin mount, no AGENTS/APPEND_SYSTEM, no tools/session/extensions', system_prompt_sha256: sha(system), source_packet_sha256: sha(packet), comparison_predicate: entry.example.comparison_predicate, task_class: entry.example.scenario, samples, review_status: 'candidate-needs-review', editorial_delta: 'The baseline asks for the task result; the applied prompt operationalizes this technique with specific constraints and checks. Compare both responses against the stated predicate before drawing any conclusion.', observed_limits: ['Unreviewed model outputs: inspect both responses for invented claims, missing checks and unsupported external effects before approving this teaching example.'], boundary: 'One synthetic matched pair; not evidence of general technique efficacy, real-world verification, or authority for an external action.' });
  writeFileSync(stage, `${JSON.stringify({ comparisons: records }, null, 2)}\n`);
}
records.sort((a, b) => batch.entries.findIndex((entry) => entry.slug === a.slug) - batch.entries.findIndex((entry) => entry.slug === b.slug));
writeFileSync(output, `${JSON.stringify({ comparisons: records }, null, 2)}\n`, { flag: 'wx' });
console.log(`Created ${output} with ${records.length} matched pairs.`);
