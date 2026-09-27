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
const batchOne = parse(await readFile(new URL('../src/data/prompt-technique-batch-001.yaml', import.meta.url), 'utf8'));
const batchReceipts = JSON.parse(await readFile(new URL('../src/data/prompt-technique-comparisons.batch-001.json', import.meta.url), 'utf8')).comparisons;
const comparison = JSON.parse(await readFile(new URL('../src/data/prompt-technique-comparisons.json', import.meta.url), 'utf8')).comparisons[0];
const ladder = parse(await readFile(new URL('../src/data/dca-skill-ladder.yaml', import.meta.url), 'utf8'));
const ladderAnalysis = parse(await readFile(new URL('../src/data/dca-skill-ladder-analysis.yaml', import.meta.url), 'utf8'));
const ladderRuns = JSON.parse(await readFile(new URL('../src/data/dca-skill-ladder-runs.json', import.meta.url), 'utf8'));
const ladderProjection = JSON.parse(await readFile(new URL('../src/data/dca-skill-ladder-projection.json', import.meta.url), 'utf8'));

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
  assert.deepEqual(renderedExemplars.entries, [...exemplars.entries, ...batchOne.entries], 'rendered JSON must match ordered YAML authoring contracts');
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

test('DCA skill ladder has four fixed-packet MiniMax turns and a digest-bound, non-ranking analysis', () => {
  const ids = ['casual', 'power', 'engineer', 'engineer_dca'];
  assert.deepEqual(ladder.conditions.map((condition) => condition.id), ids);
  assert.deepEqual(ladderRuns.records.map((record) => record.id), ids);
  assert.deepEqual(ladderProjection, { ladder, analysis: ladderAnalysis });
  assert.deepEqual(ladderAnalysis.assessments.map((assessment) => assessment.id), ids);
  assert.equal(ladderAnalysis.criteria.length, 6);
  assert.ok(ladder.conditions[3].instruction.startsWith(ladder.conditions[2].instruction));
  assert.doesNotMatch(ladder.conditions[2].instruction, /decision-sized context brief/i);
  assert.match(ladder.conditions[3].instruction, /decision-sized context brief/i);
  assert.match(ladder.evaluation.non_claim, /not.*general efficacy|Neither contrast proves general efficacy/i);
  const packet = exemplars.entries[0].example.source_packet.map((fact, index) => `${index + 1}. ${fact}`).join('\n');
  assert.equal(createHash('sha256').update(packet).digest('hex'), ladderRuns.source_packet_sha256);
  for (let i = 0; i < 4; i++) {
    const record = ladderRuns.records[i];
    assert.equal(record.tool_events, 0);
    assert.equal(createHash('sha256').update(record.prompt).digest('hex'), record.prompt_sha256);
    assert.equal(createHash('sha256').update(record.response).digest('hex'), record.response_sha256);
    assert.equal(ladderAnalysis.reviewed_response_sha256[record.id], record.response_sha256);
    assert.ok(record.prompt.includes(ladder.conditions[i].instruction));
    for (const fact of exemplars.entries[0].example.source_packet) assert.ok(record.prompt.includes(fact));
    assert.equal(ladderAnalysis.assessments[i].findings.length, 6);
    for (const finding of ladderAnalysis.assessments[i].findings) assert.ok(ladder.evaluation.result_values.includes(finding.result));
  }
  assert.equal(ladderAnalysis.assessments[3].findings.find((finding) => finding.criterion === 'capacity').result, 'not_met');
});

test('Batch 1 has eight ordered, tailored techniques and two honest provider receipts per technique', () => {
  assert.deepEqual(batchOne.atlas_positions, [2, 3, 4, 5, 6, 7, 8, 9]);
  assert.equal(batchOne.entries.length, 8);
  assert.equal(batchReceipts.length, 8);
  const slugs = promptAtlas.slice(1, 9).map((item) => item.slug);
  assert.deepEqual(batchOne.entries.map((item) => item.slug), slugs);
  assert.deepEqual(batchReceipts.map((item) => item.slug), slugs);
  for (const [index, entry] of batchOne.entries.entries()) {
    for (const key of ['applied_process', 'when_to_use', 'limitations']) {
      assert.equal(entry[key].length, 4, `${entry.slug}/${key}`);
      for (const item of entry[key]) {
        assert.deepEqual(Object.keys(item).sort(), ['detail', 'title'], `${entry.slug}/${key}: reject YAML comma-truncated extra keys`);
        assert.ok(item.detail.length >= 35, `${entry.slug}/${key}: detail incomplete`);
      }
    }
    assert.doesNotMatch(entry.example.applied_instruction, new RegExp(promptAtlas[index + 1].title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'));
    const receipt = batchReceipts[index];
    assert.equal(receipt.provider, 'minimax-oauth'); assert.equal(receipt.model, 'MiniMax-M3');
    assert.equal(receipt.review_status, 'candidate-needs-revision');
    assert.equal(receipt.review_passes.adversarial, 'completed-on-bound-digests');
    assert.equal(receipt.review_passes.source_alignment, 'completed-on-bound-digests');
    assert.equal(receipt.review_passes.owner_disposition, 'pending');
    assert.equal(receipt.samples.length, 2);
    assert.ok(receipt.observed_limits.length >= 2);
    const facts = entry.example.source_packet.map((fact, i) => `${i + 1}. ${fact}`).join('\n');
    assert.equal(createHash('sha256').update(facts).digest('hex'), receipt.source_packet_sha256);
    for (const sample of receipt.samples) {
      assert.equal(sample.tool_events, 0);
      assert.equal(createHash('sha256').update(sample.submitted_prompt).digest('hex'), sample.prompt_sha256);
      assert.equal(createHash('sha256').update(sample.response).digest('hex'), sample.response_sha256);
      assert.equal(receipt.reviewed_response_sha256[sample.condition], sample.response_sha256, 'review note must match the current response');
      assert.doesNotMatch(sample.submitted_prompt, /Hearth|Exocore|Cognitectus|pi-ember|Hub/);
      for (const fact of entry.example.source_packet) assert.ok(sample.submitted_prompt.includes(fact));
      assert.ok(sample.submitted_prompt.includes(entry.example[`${sample.condition}_instruction`]), `${entry.slug}: authored prompt drift`);
      assert.doesNotMatch(sample.response, /Cognitectus|Hearth|Exocore|hub\.review_packet|magister memoriae/i);
    }
  }
});

test('the contract preserves the public method and authority boundaries', () => {
  assert.match(contract.page.disposition.boundary, /not universal prescriptions/i);
  assert.match(contract.field_library.source_boundary, /does not grant capability/i);
  assert.match(contract.practice_boundaries.human_boundary.human_gate, /Meaning/);
});
