// Explicit paid four-prompt provider run; each prompt is fully authored, not a shared wrapper.
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
if (process.argv[2] !== '--run') throw new Error('Use --run to request four isolated MiniMax-M3 turns.');
const ladder = parse(readFileSync('src/data/dca-skill-ladder-v2.yaml', 'utf8'));
if (ladder.conditions.length !== 4) throw new Error('Expected exactly four authored prompts');
const sha = (text) => createHash('sha256').update(text).digest('hex');
const system = 'You are a tool-free assistant handling a synthetic catering task. Work only from facts given in this prompt. Do not claim external verification, a supplier contact, reservation, order, published quote or customer send. Do not include any persona or proprietary framework name. Return a candidate for human review; no hidden reasoning.';
const route = '/home/cosmatrexis/devel/hearthandcode/internal/pi-ember-exocore/docker/pi-codex-container/bin/pi-container';
const flags = ['--provider', 'minimax-oauth', '--model', 'MiniMax-M3', '--thinking', 'off', '--mode', 'json', '--print', '--no-session', '--no-tools', '--no-extensions', '--no-skills', '--no-prompt-templates', '--no-context-files', '--system-prompt', system];
const output = 'src/data/dca-skill-ladder-v2-runs.json';
const stage = '/tmp/dca-skill-ladder-v2-stage.json';
const records = [];
for (const condition of ladder.conditions) {
  const run = spawnSync(route, [...flags, condition.prompt], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024, timeout: 360000 });
  if (run.status !== 0) throw new Error(`${condition.id}: Pi exit ${run.status}; prior complete records at ${stage}`);
  const rows = run.stdout.trim().split('\n').map((line) => JSON.parse(line));
  const raw = rows.findLast((row) => row.type === 'message_end' && row.message?.role === 'assistant')?.message?.content?.filter((part) => part.type === 'text').map((part) => part.text).join('\n');
  const response = raw?.replace(/^<think>[\s\S]*?<\/think>\s*/, '').trim();
  if (!response || rows.some((row) => String(row.type).includes('tool'))) throw new Error(`${condition.id}: empty response or tool event`);
  records.push({ id: condition.id, label: condition.label, prompt: condition.prompt, prompt_sha256: sha(condition.prompt), response, response_sha256: sha(response), executed_at: rows.find((row) => row.type === 'session')?.timestamp, tool_events: 0 });
  writeFileSync(stage, `${JSON.stringify({ records }, null, 2)}\n`);
  console.log(`${condition.id}: ${response.length} chars; ${sha(response)}`);
}
writeFileSync(output, `${JSON.stringify({ schema_version: 'hnc.prompt-skill-ladder-runs.v2', slug: ladder.slug, provider: 'minimax-oauth', model: 'MiniMax-M3', system_prompt_sha256: sha(system), execution_mode: 'pi-container --print --no-session --no-tools --no-extensions --no-skills --no-prompt-templates --no-context-files --thinking off', records }, null, 2)}\n`, { flag: 'wx' });
