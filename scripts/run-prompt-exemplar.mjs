// Deliberate one-exemplar provider-backed authoring harness. Explicit --run is a paid provider action.
// Run from the landing repository root; no live provider call is made by the website.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import { runIsolatedMiniMax } from './pi-clean-isolated.mjs';

if (process.argv[2] !== '--run') throw new Error('Use --run to explicitly request two MiniMax-M3 provider calls.');
if (existsSync('src/data/prompt-technique-comparisons.clean.json')) throw new Error('Clean receipt already exists; refusing provider spend.');
const exemplar = parse(readFileSync('src/data/prompt-technique-exemplars.yaml', 'utf8')).entries.find((e) => e.slug === '01-dynamic-context-assembly');
if (!exemplar) throw new Error('Exemplar not found');
const sha256 = (s) => createHash('sha256').update(s).digest('hex');
const facts = exemplar.example.source_packet.map((fact, i) => `${i + 1}. ${fact}`).join('\n');
const system = 'You are an isolated, tool-free catering assistant. Answer only from the supplied facts. Do not mention software projects, proprietary frameworks, source-envelope identifiers, programming, or evaluation systems. Do not claim to have consulted outside sources, verified ingredients, placed an order, or performed an external action. Output only a provisional catering plan and customer reply; no hidden reasoning.';
const results = [];
for (const condition of ['baseline', 'applied']) {
  const prompt = `Professional task (synthetic, public-safe facts; no real customer):\n${exemplar.example.task}\n\nSource packet:\n${facts}\n\nInstruction:\n${condition === 'baseline' ? exemplar.example.baseline_instruction : exemplar.example.applied_instruction}\n\nOutput a provisional plan and short customer reply. Do not invent verified dietary safety or an order confirmation.`;
  const run = runIsolatedMiniMax({ prompt, system });
  results.push({ condition, submitted_prompt: run.prompt, prompt_sha256: run.prompt_sha256, response: run.response, response_sha256: run.response_sha256, executed_at: run.executed_at, tool_events: run.tool_events });
  console.log(`${condition}: response ${run.response.length} chars, sha256 ${run.response_sha256}`);
}
const receipt = {
  schema_version: 'hnc.prompt-comparison-receipt.v1',
  slug: exemplar.slug,
  provider: 'minimax-oauth', model: 'MiniMax-M3',
  execution_mode: 'clean pi-auth service, fresh Pi home, no Hub/plugin mount, no AGENTS/APPEND_SYSTEM, no tools/session/extensions',
  system_prompt_sha256: sha256(system),
  source_packet_sha256: sha256(facts),
  comparison_predicate: exemplar.example.comparison_predicate,
  task_class: exemplar.example.scenario,
  samples: results,
  boundary: 'One synthetic demonstration pair; not evidence of technique efficacy, real stock, dietary safety, an order placement, or an authorized external action.'
};
writeFileSync('src/data/prompt-technique-comparisons.clean.json', JSON.stringify({ comparisons: [receipt] }, null, 2) + '\n', { flag: 'wx' });
