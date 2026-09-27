import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'yaml';

const contract = parse(await readFile(new URL('../src/data/methods-page.yaml', import.meta.url), 'utf8'));
const promptAtlas = JSON.parse(await readFile(new URL('../src/data/vendored/prompt-catalog.json', import.meta.url), 'utf8'));

test('the Methods composition contract defines the approved first slice', () => {
  assert.equal(contract.schema_version, 'hnc.public-page-contract.v1');
  assert.equal(contract.page.route, '/methods/');
  assert.equal(contract.core_method.stations.length, 4);
  assert.equal(contract.core_method.stations.flatMap((station) => station.moves).length, 8);
  assert.equal(contract.practice_boundaries.instruments.length, 4);
  assert.equal(contract.field_library.collection_ids.length, 4);
});

test('the Prompt Lab is category-first and bound to the actual atlas taxonomy', () => {
  const promptLab = contract.hero.entry_paths.find((path) => path.label === 'Prompt Lab');
  assert.equal(promptLab.href, '#prompt-lab');
  assert.equal(contract.prompt_lab.id, 'prompt-lab');
  assert.equal(promptAtlas.length, 128);
  assert.equal(new Set(promptAtlas.map((entry) => entry.document)).size, 16);
  assert.equal(new Set(promptAtlas.map((entry) => `${entry.document}::${entry.category}`)).size, 64);
  assert.ok(promptAtlas.every((entry) => entry.document && entry.category && entry.sections.length === 8));
});

test('the contract preserves the public method and authority boundaries', () => {
  assert.match(contract.page.disposition.boundary, /not universal prescriptions/i);
  assert.match(contract.field_library.source_boundary, /does not grant capability/i);
  assert.match(contract.practice_boundaries.human_boundary.human_gate, /Meaning/);
});
