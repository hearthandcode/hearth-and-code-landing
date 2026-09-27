// Digest-bound review-packet validation. Semantic judgments remain authored and contestable.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
const sha = (s) => createHash('sha256').update(s).digest('hex');
const batchRaw = readFileSync('src/data/prompt-technique-batch-001-ladders.yaml');
const batch = parse(batchRaw.toString('utf8'));
const runs = JSON.parse(readFileSync('src/data/prompt-technique-batch-001-ladder-runs.json', 'utf8'));
const audit = parse(readFileSync('src/data/prompt-technique-batch-001-ladder-analysis.yaml', 'utf8'));
const assert = (ok, message) => { if (!ok) throw new Error(message); };
assert(audit.batch_sha256 === sha(batchRaw) && runs.batch_sha256 === sha(batchRaw), 'source batch drift');
assert(audit.entries.length === 8 && runs.records.length === 32, 'incomplete review packet');
assert(audit.owner_disposition === 'pending' && audit.source_candidate_verified === false, 'review cannot self-approve source');
const ids = ['casual', 'power', 'engineer', 'engineer_technique'];
const values = new Set(['met', 'partly_met', 'not_met', 'not_observable']);
for (const [index, entry] of audit.entries.entries()) {
  const source = batch.entries[index];
  assert(entry.slug === source.slug && entry.catalog_position === source.catalog_position, `identity/order mismatch ${index}`);
  assert(entry.rubric_ids.length === source.rubric.length && entry.tiers.length === 4, `${entry.slug}: missing rubric or tier`);
  assert(entry.technique_observation?.length > 75 && entry.counterweight?.length > 75, `${entry.slug}: shallow technique audit`);
  for (const [tierIndex, tier] of entry.tiers.entries()) {
    const run = runs.records[index * 4 + tierIndex];
    assert(tier.id === ids[tierIndex] && run.id === tier.id && run.slug === entry.slug, `${entry.slug}: tier mismatch`);
    assert(entry.reviewed_response_sha256[tier.id] === run.response_sha256 && run.response_sha256 === sha(run.response), `${entry.slug}/${tier.id}: stale finding`);
    assert(tier.observations.length === entry.rubric_ids.length && tier.observations.every((value) => values.has(value)), `${entry.slug}/${tier.id}: missing criterion judgment`);
    assert(tier.finding?.length > 100, `${entry.slug}/${tier.id}: shallow response finding`);
  }
}
console.log('Review-packet gate: 8 source-aligned entries, 32 current-digest findings, owner disposition pending. Qualitative claims require independent human reading.');
