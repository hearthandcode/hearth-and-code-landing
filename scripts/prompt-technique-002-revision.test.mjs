import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'yaml';
const source = await readFile(new URL('../src/data/prompt-technique-002-revision.yaml', import.meta.url));
const revision = parse(source.toString('utf8'));
const analysis = parse(await readFile(new URL('../src/data/prompt-technique-002-revision-analysis.yaml', import.meta.url), 'utf8'));
const run = JSON.parse(await readFile(new URL('../src/data/prompt-technique-002-revision-run.json', import.meta.url), 'utf8'));
const prior = JSON.parse(await readFile(new URL('../src/data/prompt-technique-batch-001-ladder-runs.json', import.meta.url), 'utf8'));
const projection = JSON.parse(await readFile(new URL('../src/data/prompt-technique-002-revision-review.json', import.meta.url), 'utf8'));
const methods = JSON.parse(await readFile(new URL('../src/data/prompt-technique-batch-001-review.json', import.meta.url), 'utf8'));
const sha = (value) => createHash('sha256').update(value).digest('hex');

test('eight dimensions were frozen for one successor prompt; prior engineer run remains unchanged', () => {
  assert.equal(revision.scoring.dimensions.length, 8);
  assert.equal(new Set(revision.scoring.dimensions.map((d) => d.id)).size, 8);
  assert.equal(run.revision_sha256, sha(source));
  assert.equal(run.prompt, revision.engineer_technique_prompt);
  assert.equal(run.prompt_sha256, sha(run.prompt));
  assert.equal(run.response_sha256, sha(run.response));
  assert.equal(run.tool_events, 0);
  assert.equal(run.provider, 'minimax-oauth');
  assert.equal(run.model, 'MiniMax-M3');
  assert.equal(analysis.revision_source_sha256, run.revision_sha256);
  assert.equal(analysis.prior_batch_sha256, prior.batch_sha256);
  const engineer = prior.records.find((r) => r.catalog_position === 2 && r.id === 'engineer');
  assert.equal(run.prior_engineer_response_sha256, engineer.response_sha256);
  assert.notEqual(run.prompt, prior.records.find((r) => r.catalog_position === 2 && r.id === 'engineer_technique').prompt);
});

test('all four score totals are derived from digest-bound, observable criteria', () => {
  assert.equal(analysis.tiers.length, 4);
  for (const [index, tier] of analysis.tiers.entries()) {
    const response = tier.id === 'engineer_technique' ? run : prior.records.find((r) => r.catalog_position === 2 && r.id === tier.id);
    assert.equal(analysis.reviewed_response_sha256[tier.id], response.response_sha256);
    assert.deepEqual(tier.dimensions.map((d) => d.id), revision.scoring.dimensions.map((d) => d.id));
    const graded = tier.dimensions.filter((d) => typeof d.score === 'number');
    assert.ok(tier.dimensions.every((d) => [0, 1, 2, 'not_observable'].includes(d.score) && d.evidence.length > 45));
    assert.deepEqual(projection.levels[index].score, { points: graded.reduce((n, d) => n + d.score, 0), maximum: graded.length * 2, observable_dimensions: graded.length, total_dimensions: 8 });
  }
  assert.deepEqual(projection.levels.map((level) => [level.score.points, level.score.maximum]), [[5, 10], [7, 16], [11, 16], [13, 16]]);
  assert.equal(methods.entries[0].levels[3].response_sha256, run.response_sha256);
  assert.equal(methods.entries[1].rubric.length, 4, 'other Batch 1 cards remain unchanged');
  assert.equal(analysis.owner_disposition, 'pending');
});
