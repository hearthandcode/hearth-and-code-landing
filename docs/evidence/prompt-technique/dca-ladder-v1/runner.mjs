// Deliberate four-turn provider-backed authoring run. No website runtime effect.
import { createHash } from 'node:crypto';
import { spawnSync } from 'node:child_process';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
if (process.argv[2] !== '--run') throw new Error('Use --run to authorize four isolated MiniMax-M3 provider calls.');
const ladder = parse(readFileSync('src/data/dca-skill-ladder.yaml', 'utf8'));
const exemplar = parse(readFileSync('src/data/prompt-technique-exemplars.yaml', 'utf8')).entries.find((e) => e.slug === ladder.slug);
if (!exemplar || ladder.conditions.length !== 4) throw new Error('Ladder/exemplar mismatch');
const sha = (text) => createHash('sha256').update(text).digest('hex');
const facts = exemplar.example.source_packet.map((fact, index) => `${index + 1}. ${fact}`).join('\n');
const system = 'You are a tool-free assistant working from synthetic professional notes. Do not claim to have verified facts externally, placed an order, held a slot, contacted a supplier or performed any effect. Do not include persona or proprietary system names. Answer the delegated task as a candidate for human review. No hidden reasoning.';
const route = '/home/cosmatrexis/devel/hearthandcode/internal/pi-ember-exocore/docker/pi-codex-container/bin/pi-container';
const flags = ['--provider', 'minimax-oauth', '--model', 'MiniMax-M3', '--thinking', 'off', '--mode', 'json', '--print', '--no-session', '--no-tools', '--no-extensions', '--no-skills', '--no-prompt-templates', '--no-context-files', '--system-prompt', system];
const stage = '/tmp/dca-skill-ladder-stage.json';
const records = [];
for (const condition of ladder.conditions) {
  const prompt = `Professional task (synthetic facts):\n${ladder.shared_task}\n\nSource packet (same for all four prompts):\n${facts}\n\nYour instruction:\n${condition.instruction}`;
  const run = spawnSync(route, [...flags, prompt], { encoding: 'utf8', maxBuffer: 12 * 1024 * 1024, timeout: 360000 });
  if (run.status !== 0) throw new Error(`${condition.id}: Pi exited ${run.status}; completed records retained at ${stage}`);
  const rows = run.stdout.trim().split('\n').map((line) => JSON.parse(line));
  const message = rows.findLast((row) => row.type === 'message_end' && row.message?.role === 'assistant')?.message;
  const raw = message?.content?.filter((part) => part.type === 'text').map((part) => part.text).join('\n');
  const response = raw?.replace(/^<think>[\s\S]*?<\/think>\s*/, '').trim();
  if (!response || rows.some((row) => String(row.type).includes('tool'))) throw new Error(`${condition.id}: empty response or tool event`);
  records.push({ id: condition.id, label: condition.label, prompt, prompt_sha256: sha(prompt), response, response_sha256: sha(response), executed_at: rows.find((row) => row.type === 'session')?.timestamp, tool_events: 0 });
  writeFileSync(stage, `${JSON.stringify({ records }, null, 2)}\n`);
  console.log(`${condition.id}: ${response.length} chars; ${sha(response)}`);
}
writeFileSync('src/data/dca-skill-ladder-runs.json', `${JSON.stringify({ schema_version: 'hnc.prompt-skill-ladder-runs.v1', slug: ladder.slug, provider: 'minimax-oauth', model: 'MiniMax-M3', system_prompt_sha256: sha(system), source_packet_sha256: sha(facts), execution_mode: 'pi-container --print --no-session --no-tools --no-extensions --no-skills --no-prompt-templates --no-context-files --thinking off', records }, null, 2)}\n`, { flag: 'wx' });
