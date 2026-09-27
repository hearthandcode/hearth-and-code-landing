// Deliberate one-exemplar offline authoring harness. Explicit --run is a paid provider action.
// Run from the landing repository root; no live provider call is made by the website.
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';

if (process.argv[2] !== '--run') throw new Error('Use --run to explicitly request two MiniMax-M3 provider calls.');
const exemplar = parse(readFileSync('src/data/prompt-technique-exemplars.yaml', 'utf8')).entries.find((e) => e.slug === '01-dynamic-context-assembly');
if (!exemplar) throw new Error('Exemplar not found');
const sha256 = (s) => createHash('sha256').update(s).digest('hex');
const facts = exemplar.example.source_packet.map((fact, i) => `${i + 1}. ${fact}`).join('\n');
const route = '/home/cosmatrexis/devel/hearthandcode/internal/pi-ember-exocore/docker/pi-codex-container/bin/pi-container';
const system = 'You are an isolated, tool-free catering assistant. Answer only from the supplied facts. Do not mention software projects, proprietary frameworks, source-envelope identifiers, programming, or evaluation systems. Do not claim to have consulted outside sources, verified ingredients, placed an order, or performed an external action. Output only a provisional catering plan and customer reply; no hidden reasoning.';
const common = ['--provider', 'minimax-oauth', '--model', 'MiniMax-M3', '--thinking', 'off', '--mode', 'json', '--print', '--no-session', '--no-tools', '--no-extensions', '--no-skills', '--no-prompt-templates', '--no-context-files', '--system-prompt', system];
const results = [];
for (const condition of ['baseline', 'applied']) {
  const prompt = `Professional task (synthetic, public-safe facts; no real customer):\n${exemplar.example.task}\n\nSource packet:\n${facts}\n\nInstruction:\n${condition === 'baseline' ? exemplar.example.baseline_instruction : exemplar.example.applied_instruction}\n\nOutput a provisional plan and short customer reply. Do not invent verified dietary safety or an order confirmation.`;
  const run = spawnSync(route, [...common, prompt], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024, timeout: 300000 });
  if (run.status !== 0) throw new Error(`${condition} Pi run failed: exit ${run.status}; no receipt written`);
  const rows = run.stdout.trim().split('\n').map((row) => JSON.parse(row));
  const message = rows.findLast((row) => row.type === 'message_end' && row.message?.role === 'assistant')?.message;
  const raw = message?.content?.filter((item) => item.type === 'text').map((item) => item.text).join('\n');
  const response = raw?.replace(/^<think>[\s\S]*?<\/think>\s*/, '').trim();
  if (!response || rows.some((row) => String(row.type).includes('tool'))) throw new Error(`${condition}: empty response or tool event; no receipt written`);
  results.push({ condition, submitted_prompt: prompt, prompt_sha256: sha256(prompt), response, response_sha256: sha256(response), executed_at: rows.find((row) => row.type === 'session')?.timestamp, tool_events: 0 });
  console.log(`${condition}: response ${response.length} chars, sha256 ${sha256(response)}`);
}
const receipt = {
  schema_version: 'hnc.prompt-comparison-receipt.v1',
  slug: exemplar.slug,
  provider: 'minimax-oauth', model: 'MiniMax-M3',
  execution_mode: 'pi-container --print --no-session --no-tools --no-extensions --no-skills --no-prompt-templates --no-context-files --thinking off',
  comparison_predicate: exemplar.example.comparison_predicate,
  task_class: exemplar.example.scenario,
  samples: results,
  boundary: 'One synthetic demonstration pair; not evidence of technique efficacy, real stock, dietary safety, an order placement, or an authorized external action.'
};
writeFileSync('src/data/prompt-technique-comparisons.json', JSON.stringify({ comparisons: [receipt] }, null, 2) + '\n', { flag: 'wx' });
