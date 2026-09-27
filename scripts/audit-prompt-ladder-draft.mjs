// Deterministic prompt-draft gate. No provider, publication, or semantic acceptance effect.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
const processContract = parse(readFileSync('src/data/prompt-technique-process.yaml', 'utf8'));
const draft = parse(readFileSync('src/data/prompt-technique-batch-001-ladders.yaml', 'utf8'));
const sourceBatch = parse(readFileSync('src/data/prompt-technique-batch-001.yaml', 'utf8'));
const atlas = JSON.parse(readFileSync('src/data/vendored/prompt-catalog.json', 'utf8'));
const ids = ['casual', 'power', 'engineer', 'engineer_technique'];
const assert = (condition, message) => { if (!condition) throw new Error(message); };
assert(processContract.schema_version === 'hnc.prompt-technique-process.v1', 'process identity mismatch');
const digest = (text) => createHash('sha256').update(text).digest('hex');
for (const [pathKey, hashKey] of [['prompt_ladder', 'prompt_ladder_sha256'], ['clean_provider_receipt', 'clean_provider_receipt_sha256'], ['qualitative_audit', 'qualitative_audit_sha256']]) {
  const ref = processContract.reference_exemplar;
  assert(digest(readFileSync(ref[pathKey])) === ref[hashKey], `DCA reference exemplar drift: ${pathKey}`);
}
assert(processContract.draft_admission.provider_calls === 'held_until_owner_reviews_draft', 'draft gate must hold provider calls');
assert(draft.review_status === 'prompt-draft-review-required' && draft.provider_runs === 'not_started' && draft.response_analysis === 'not_started', 'draft must not imply execution');
assert(draft.entries.length === 8 && new Set(draft.entries.map((e) => e.slug)).size === 8, 'exactly eight unique entries');
assert(draft.catalog_positions.join(',') === '2,3,4,5,6,7,8,9', 'first batch must be ordered #002–#009');
const report = [];
for (const [index, entry] of draft.entries.entries()) {
  const source = sourceBatch.entries[index], catalog = atlas[index + 1];
  assert(entry.catalog_position === index + 2 && entry.slug === source.slug && entry.slug === catalog.slug, `catalogue order mismatch at ${index + 2}`);
  const sourceId = /Atlas ID:\*\*\s*(PTA-\d+-\d+)/.exec(catalog.sections.find((section) => section.title === 'Precise orientation')?.body || '')?.[1];
  assert(entry.source_identity === sourceId, `${entry.slug}: source identity mismatch`);
  assert(entry.source_ref.includes(entry.slug) && entry.source_ref.endsWith('/example/source_packet'), `${entry.slug}: source reference mismatch`);
  assert(entry.decision_question?.length > 45 && entry.rubric?.length >= 4 && entry.non_claim?.length > 65, `${entry.slug}: incomplete decision/rubric/boundary`);
  assert(entry.conditions?.length === 4 && entry.conditions.map((c) => c.id).join(',') === ids.join(','), `${entry.slug}: tier order mismatch`);
  assert(new Set(entry.conditions.map((c) => c.prompt.trim())).size === 4, `${entry.slug}: repeated full prompt`);
  const facts = source.example.source_packet;
  const coverage = entry.conditions.map((condition) => {
    assert(condition.prompt.length >= 180 && condition.framing === undefined, `${entry.slug}/${condition.id}: incomplete or generated wrapper`);
    assert(!/Cognitectus|Hearth\s*&\s*Code|Exocore|hub\.review_packet|\/home\/|api[_ -]?key|MINIMAX_API_KEY/i.test(condition.prompt), `${entry.slug}/${condition.id}: internal or secret text`);
    assert(condition.input_fact_ids.length > 0 && new Set(condition.input_fact_ids).size === condition.input_fact_ids.length && condition.input_fact_ids.every((id) => Number.isInteger(id) && id >= 1 && id <= facts.length), `${entry.slug}/${condition.id}: source coverage invalid`);
    return condition.input_fact_ids.length;
  });
  assert(coverage[0] < facts.length && coverage[2] === facts.length && coverage[3] === facts.length, `${entry.slug}: skill-tier information coverage missing`);
  assert(entry.conditions[3].prompt.length > entry.conditions[2].prompt.length, `${entry.slug}: technique not woven into full prompt`);
  assert(!entry.conditions[3].prompt.includes(entry.conditions[2].prompt), `${entry.slug}: technique prompt merely appended to engineer prompt`);
  report.push({ position: index + 2, slug: entry.slug, prompt_sha256: entry.conditions.map((condition) => digest(condition.prompt)), supplied_fact_counts: coverage });
}
console.log(JSON.stringify({ status: 'prompt-draft-review-required', provider_calls: 0, entries: report }, null, 2));
