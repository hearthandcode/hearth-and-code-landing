// Explicit paid batch of 32 provider turns. Each turn uses fresh no-Hub Pi home.
// A stage file permits restart after interruption; final output is create-only.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import { runIsolatedMiniMax } from './pi-clean-isolated.mjs';
if (process.argv[2] !== '--run') throw new Error('Pass --run to authorize 32 clean MiniMax-M3 turns.');
const batch = parse(readFileSync('src/data/prompt-technique-batch-001-ladders.yaml', 'utf8'));
if (batch.entries.length !== 8 || batch.entries.some((entry) => entry.conditions.length !== 4)) throw new Error('Expected exactly eight four-prompt entries');
const output = 'src/data/prompt-technique-batch-001-ladder-runs.json';
const stage = '/tmp/prompt-technique-batch-001-ladder-stage.json';
if (existsSync(output)) throw new Error('Final receipt already exists; no further provider spend authorized by this run.');
const sha = (s) => createHash('sha256').update(s).digest('hex');
const frozenBatch = sha(readFileSync('src/data/prompt-technique-batch-001-ladders.yaml'));
const system = 'You are a helpful assistant. Answer only from the user input. Do not claim actions or verification you have not performed.';
const records = existsSync(stage) ? JSON.parse(readFileSync(stage, 'utf8')).records : [];
for (const entry of batch.entries) {
  for (const condition of entry.conditions) {
    const key = `${entry.slug}:${condition.id}`;
    const previous = records.find((record) => `${record.slug}:${record.id}` === key);
    if (previous) {
      if (previous.prompt_sha256 !== sha(condition.prompt) || previous.batch_sha256 !== frozenBatch) throw new Error(`${key}: staged prompt or batch drift; hold`);
      continue;
    }
    const result = runIsolatedMiniMax({ prompt: condition.prompt, system });
    records.push({ slug: entry.slug, catalog_position: entry.catalog_position, id: condition.id, source_fact_ids: condition.input_fact_ids, batch_sha256: frozenBatch, ...result });
    writeFileSync(stage, `${JSON.stringify({ batch_sha256: frozenBatch, records }, null, 2)}\n`);
    console.log(`${entry.catalog_position}/${condition.id}: ${result.response.length} final chars; ${result.response_sha256}`);
  }
}
if (records.length !== 32) throw new Error(`Incomplete batch: ${records.length}/32`);
const receipt = { schema_version: 'hnc.prompt-technique-batch-ladder-runs.v1', batch_id: batch.batch_id, batch_sha256: frozenBatch, provider: 'minimax-oauth', model: 'MiniMax-M3', system_prompt_sha256: records[0].system_prompt_sha256, isolation: 'fresh per-turn PI_CODING_AGENT_DIR through one-shot pi-auth; no Hub/plugin mount, AGENTS, APPEND_SYSTEM, explicit extensions, tools or saved sessions', limitation: 'Provider/model and tool-event status observed in Pi JSON. System prompt serialization at provider boundary is not independently attested. Single-turn responses are observations, not efficacy or approval.', records };
writeFileSync(output, `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' });
console.log(`Created ${output}: 32/32 records.`);
