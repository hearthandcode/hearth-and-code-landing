import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'yaml';
const packet = parse(await readFile(new URL('../src/data/contrastive-fork-benchmark-pilot.yaml', import.meta.url), 'utf8'));

test('pilot is bounded to #002 with six synthetic cases, four conditions and three repeats', () => {
  assert.equal(packet.catalog_id, 'PTA-001-006');
  assert.equal(packet.fixtures.length, 6);
  assert.deepEqual(packet.budget.conditions, ['casual', 'power', 'engineer', 'engineer_technique']);
  assert.equal(packet.budget.maximum_generation_calls, packet.fixtures.length * packet.budget.conditions.length * packet.budget.repeats_per_condition);
  assert.equal(packet.budget.maximum_generation_calls, 72);
  assert.equal(packet.budget.judge_calls, 0);
  assert.deepEqual(packet.fixtures.map((fixture) => fixture.id), ['CF-01','CF-02','CF-03','CF-04','CF-05','CF-06']);
  assert.deepEqual(packet.fixtures.map((fixture) => fixture.split), ['development','development','development','holdout','holdout','holdout']);
  assert.equal(new Set(packet.fixtures.map((fixture) => fixture.scenario)).size, 6);
  assert.ok(packet.fixtures.every((fixture) => ['customer','policy','informal','role','decision'].every((field) => fixture[field]?.length > 20)));
});

test('rubric and effect boundaries do not mistake infrastructure or comparison for authority', () => {
  assert.equal(packet.rubric.length, 8);
  assert.equal(new Set(packet.rubric.map((item) => item.id)).size, 8);
  assert.ok(packet.rubric.every((item) => Object.keys(item).length === 2 && item.check.length > 45));
  assert.match(packet.execution, /^held_/);
  assert.match(packet.backend, /distinct Atlas project/);
  assert.match(packet.budget.on_budget_unknown, /hold/);
  assert.match(packet.study_design.release_rule, /false authority claim blocks/);
});
