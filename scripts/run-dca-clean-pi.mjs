// Explicit four-turn clean Pi authoring run. No provider effect on import.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import { runIsolatedMiniMax } from './pi-clean-isolated.mjs';
if (process.argv[2] !== '--run') throw new Error('Use --run to authorize four MiniMax-M3 requests.');
const ladder = parse(readFileSync('src/data/dca-skill-ladder-v2.yaml', 'utf8'));
if (ladder.conditions.length !== 4) throw new Error('Expected four authored prompts');
if (existsSync('src/data/dca-skill-ladder-v2-runs.json')) throw new Error('Receipt already exists; refusing to spend on a run that cannot be recorded.');
const system = 'You are a helpful assistant. Answer only from the user input. Do not claim actions or verification you have not performed.';
const records = [];
for (const condition of ladder.conditions) {
  const result = runIsolatedMiniMax({ prompt: condition.prompt, system });
  records.push({ id: condition.id, label: condition.label, ...result });
  console.log(`${condition.id}: ${result.response.length} final chars; ${result.response_sha256}`);
}
const receipt = { schema_version: 'hnc.prompt-skill-ladder-runs.clean-pi.v1', slug: ladder.slug, provider: 'minimax-oauth', model: 'MiniMax-M3', system_prompt_sha256: records[0].system_prompt_sha256, isolation: 'pi-auth one-shot service, no Hub/plugin mount, fresh PI_CODING_AGENT_DIR, no discovered or explicit extensions, no AGENTS, no APPEND_SYSTEM, no skills, no tools, no saved session', limitation: 'Pi built-in extensions remain installed but supply no enabled tools; the Pi loader appends a working-directory line. Provider request serialization is not independently attested; model text may reflect training or spontaneous vocabulary.', records };
writeFileSync('src/data/dca-skill-ladder-v2-runs.json', `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' });
