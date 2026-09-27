// Read-only structural/provenance gate; semantic judgment remains a separate authored audit.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
const sha = (s) => createHash('sha256').update(s).digest('hex');
const raw = readFileSync('src/data/prompt-technique-batch-001-ladders.yaml');
const batch = parse(raw.toString('utf8'));
const receipt = JSON.parse(readFileSync('src/data/prompt-technique-batch-001-ladder-runs.json', 'utf8'));
const assert = (condition, message) => { if (!condition) throw new Error(message); };
assert(receipt.batch_sha256 === sha(raw), 'source draft changed after provider run');
assert(receipt.provider === 'minimax-oauth' && receipt.model === 'MiniMax-M3', 'route mismatch');
assert(receipt.records.length === 32, 'not 32 responses');
const holds = [];
let position = 0;
for (const entry of batch.entries) for (const tier of entry.conditions) {
  const run = receipt.records[position++];
  const id = `${entry.catalog_position}/${tier.id}`;
  assert(run.slug === entry.slug && run.id === tier.id && run.catalog_position === entry.catalog_position, `${id}: identity/order mismatch`);
  assert(run.batch_sha256 === receipt.batch_sha256 && run.prompt === tier.prompt && run.prompt_sha256 === sha(tier.prompt), `${id}: prompt provenance mismatch`);
  assert(run.response_sha256 === sha(run.response), `${id}: response digest mismatch`);
  assert(run.provider === receipt.provider && run.model === receipt.model && run.tool_events === 0 && run.executed_at, `${id}: model/tool receipt mismatch`);
  assert(run.response.trim().length > 100, `${id}: empty or very short final answer`);
  if (/<tool_call>|\[<tool_call>|\{"name":\s*"(?:bash|read|write|edit)"/i.test(run.response)) holds.push({ id, issue: 'model emitted tool-call syntax as final text; no Pi tool event was executed' });
  if (/Cognitectus|Hearth\s*&\s*Code|Exocore|hub\.review_packet|magister memoriae/i.test(run.response)) holds.push({ id, issue: 'internal project vocabulary appeared in final text' });
}
console.log(JSON.stringify({ status: 'structural-only', runs: position, source_digest: receipt.batch_sha256, holds, caveat: 'No efficacy, claim accuracy, task correctness or source alignment follows from this gate.' }, null, 2));
