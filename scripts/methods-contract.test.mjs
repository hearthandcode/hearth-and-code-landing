import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';
import { parse } from 'yaml';

const contract = parse(await readFile(new URL('../src/data/methods-page.yaml', import.meta.url), 'utf8'));
const promptAtlas = JSON.parse(await readFile(new URL('../src/data/vendored/prompt-catalog.json', import.meta.url), 'utf8'));
const editorial = parse(await readFile(new URL('../src/data/prompt-technique-editorial.yaml', import.meta.url), 'utf8'));
const exemplars = parse(await readFile(new URL('../src/data/prompt-technique-exemplars.yaml', import.meta.url), 'utf8'));
const renderedExemplars = JSON.parse(await readFile(new URL('../src/data/prompt-technique-exemplars.json', import.meta.url), 'utf8'));
const comparison = JSON.parse(await readFile(new URL('../src/data/prompt-technique-comparisons.json', import.meta.url), 'utf8')).comparisons[0];

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
  assert.match(contract.prompt_lab.description, /four-section technique dispositions/);
});

test('the revised technique and field-card workflow enforces one authored exemplar and a matched two-run receipt', () => {
  assert.match(editorial.scope, /35 public method field cards/);
  const exemplar = exemplars.entries[0];
  assert.deepEqual(renderedExemplars, exemplars, 'rendered JSON must match the YAML authoring contract');
  assert.equal(exemplar.slug, '01-dynamic-context-assembly');
  for (const field of ['applied_process', 'when_to_use', 'limitations']) assert.equal(exemplar[field].length, 4);
  assert.equal(comparison.slug, exemplar.slug);
  assert.equal(comparison.review_status, 'candidate-needs-revision');
  assert.deepEqual(comparison.samples.map((sample) => sample.condition), ['baseline', 'applied']);
  for (const sample of comparison.samples) {
    assert.equal(sample.tool_events, 0);
    assert.equal(createHash('sha256').update(sample.submitted_prompt).digest('hex'), sample.prompt_sha256);
    assert.equal(createHash('sha256').update(sample.response).digest('hex'), sample.response_sha256);
    assert.doesNotMatch(sample.submitted_prompt, /Hearth|Code|Exocore|Astro|Hub|pi-ember/i);
  }
  assert.ok(comparison.observed_limits.length >= 2);
  assert.match(comparison.observed_limits.join(' '), /Monday stock|tomato pasta/);
  assert.doesNotMatch(exemplar.example.applied_instruction, /Dynamic Context Assembly/i);
  for (const mechanism of ['Reconcile', 'superseded', 'source and timestamp', 'ingredient', 'Check the draft']) {
    assert.match(exemplar.example.applied_instruction, new RegExp(mechanism, 'i'));
  }
  const [baseline, applied] = comparison.samples.map((sample) => sample.submitted_prompt);
  const sharedPacket = exemplar.example.source_packet.map((fact, index) => `${index + 1}. ${fact}`).join('\n');
  assert.equal(createHash('sha256').update(sharedPacket).digest('hex'), comparison.source_packet_sha256);
  assert.match(comparison.system_prompt_sha256, /^[a-f0-9]{64}$/);
  for (const fact of exemplar.example.source_packet) {
    assert.ok(baseline.includes(fact) && applied.includes(fact), `same source fact: ${fact.slice(0, 30)}`);
  }
  assert.ok(sharedPacket.length > 400);
  assert.match(contract.field_library.source_boundary, /same technique-specific editorial and paired-run review/);
});

test('the contract preserves the public method and authority boundaries', () => {
  assert.match(contract.page.disposition.boundary, /not universal prescriptions/i);
  assert.match(contract.field_library.source_boundary, /does not grant capability/i);
  assert.match(contract.practice_boundaries.human_boundary.human_gate, /Meaning/);
});
