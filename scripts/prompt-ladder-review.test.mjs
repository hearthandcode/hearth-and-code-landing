import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'yaml';

const source = await readFile(new URL('../src/data/prompt-technique-batch-001-ladders.yaml', import.meta.url));
const draft = parse(source.toString('utf8'));
const runs = JSON.parse(await readFile(new URL('../src/data/prompt-technique-batch-001-ladder-runs.json', import.meta.url), 'utf8'));
const audit = parse(await readFile(new URL('../src/data/prompt-technique-batch-001-ladder-analysis.yaml', import.meta.url), 'utf8'));
const projection = JSON.parse(await readFile(new URL('../src/data/prompt-technique-batch-001-review.json', import.meta.url), 'utf8'));
const sha = (value) => createHash('sha256').update(value).digest('hex');

test('eight ordered prompt ladders have 32 clean-route results', () => {
  assert.equal(draft.entries.length, 8);
  assert.deepEqual(draft.entries.map((entry) => entry.catalog_position), [2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(runs.batch_sha256, sha(source));
  assert.equal(projection.batch_sha256, sha(source));
  assert.equal(projection.entries.length, 8);
  assert.equal(projection.entries.flatMap((entry) => entry.levels).length, 32);
  assert.equal(runs.records.length, 32);
  assert.equal(runs.provider, 'minimax-oauth');
  assert.equal(runs.model, 'MiniMax-M3');
  assert.match(runs.isolation, /fresh per-turn PI_CODING_AGENT_DIR/);
  for (const [index, record] of runs.records.entries()) {
    const sourceTier = draft.entries[Math.floor(index / 4)].conditions[index % 4];
    assert.equal(record.prompt, sourceTier.prompt);
    assert.equal(record.prompt_sha256, sha(record.prompt));
    assert.equal(record.response_sha256, sha(record.response));
    assert.equal(record.tool_events, 0);
    assert.equal(record.model, runs.model);
    assert.equal(record.provider, runs.provider);
  }
});

test('current digest-bound audit is review-only and keeps the tool-shaped failure visible', () => {
  assert.equal(audit.owner_disposition, 'pending');
  assert.equal(audit.source_candidate_verified, false);
  assert.equal(audit.entries.length, 8);
  for (const [index, entry] of audit.entries.entries()) {
    assert.equal(entry.slug, draft.entries[index].slug);
    assert.equal(entry.tiers.length, 4);
    for (const [tierIndex, tier] of entry.tiers.entries()) {
      assert.equal(tier.observations.length, draft.entries[index].rubric.length);
      const response = runs.records[index * 4 + tierIndex];
      assert.equal(entry.reviewed_response_sha256[tier.id], response.response_sha256);
    }
  }
  const museum = audit.entries.find((entry) => entry.catalog_position === 7);
  assert.match(museum.counterweight, /tool-call syntax/i);
  assert.match(runs.records.find((record) => record.catalog_position === 7 && record.id === 'casual').response, /<tool_call>/);
});
