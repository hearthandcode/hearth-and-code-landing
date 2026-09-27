// Explicit one-turn successor run; never edits frozen Batch 1 provider evidence.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
import { runIsolatedMiniMax } from './pi-clean-isolated.mjs';
if (process.argv[2] !== '--run') throw new Error('Pass --run to authorize one MiniMax-M3 turn.');
const output = 'src/data/prompt-technique-002-revision-run.json';
if (existsSync(output)) throw new Error('Successor receipt exists; refuse overwrite and provider spend.');
const source = readFileSync('src/data/prompt-technique-002-revision.yaml');
const revision = parse(source.toString('utf8'));
const prior = JSON.parse(readFileSync('src/data/prompt-technique-batch-001-ladder-runs.json', 'utf8'));
const engineer = prior.records.find((r) => r.catalog_position === 2 && r.id === 'engineer');
if (revision.catalog_position !== 2 || !engineer || revision.engineer_technique_prompt.includes(engineer.prompt)) throw new Error('Invalid successor prompt or non-distinct engineer condition');
const system = 'You are a helpful assistant. Answer only from the user input. Do not claim actions or verification you have not performed.';
const result = runIsolatedMiniMax({ prompt: revision.engineer_technique_prompt, system });
const sha = (v) => createHash('sha256').update(v).digest('hex');
const receipt = { schema_version: 'hnc.prompt-technique-revision-run.v1', slug: revision.slug, revision_sha256: sha(source), source_batch_sha256: prior.batch_sha256, prior_engineer_response_sha256: engineer.response_sha256, provider: result.provider, model: result.model, isolation: 'fresh Pi home, no Hub/plugin mount, no APPEND_SYSTEM, no tools/session', ...result };
writeFileSync(output, `${JSON.stringify(receipt, null, 2)}\n`, { flag: 'wx' });
console.log(`Captured revised technique response: ${result.response.length} chars; ${result.response_sha256}`);
