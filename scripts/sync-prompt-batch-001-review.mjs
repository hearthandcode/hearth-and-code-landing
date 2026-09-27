// Render frozen Batch 1 source, observations and digest-bound audit for the Methods React reader.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
const source = readFileSync('src/data/prompt-technique-batch-001-ladders.yaml');
const digest = createHash('sha256').update(source).digest('hex');
const draft = parse(source.toString('utf8'));
const fixtures = parse(readFileSync('src/data/prompt-technique-batch-001.yaml', 'utf8'));
const runs = JSON.parse(readFileSync('src/data/prompt-technique-batch-001-ladder-runs.json', 'utf8'));
const audit = parse(readFileSync('src/data/prompt-technique-batch-001-ladder-analysis.yaml', 'utf8'));
const successor = JSON.parse(readFileSync('src/data/prompt-technique-002-revision-review.json', 'utf8'));
if (runs.batch_sha256 !== digest || audit.batch_sha256 !== digest || draft.entries.length !== 8 || runs.records.length !== 32 || audit.entries.length !== 8) throw new Error('Stale Batch 1 source, receipt or analysis; refuse rendering');
const entries = draft.entries.map((entry, index) => {
  const findings = audit.entries[index];
  const fixture = fixtures.entries[index];
  if (entry.slug !== findings.slug || entry.slug !== fixture?.slug || entry.conditions.length !== 4) throw new Error(`Mismatched review entry ${entry.slug}`);
  const levels = entry.conditions.map((condition, tier) => {
    const run = runs.records[index * 4 + tier];
    const finding = findings.tiers[tier];
    if (run.slug !== entry.slug || run.id !== condition.id || finding.id !== condition.id || findings.reviewed_response_sha256[condition.id] !== run.response_sha256) throw new Error(`Stale tier ${entry.slug}/${condition.id}`);
    return { id: condition.id, input_fact_ids: condition.input_fact_ids, prompt: run.prompt, prompt_sha256: run.prompt_sha256, response: run.response, response_sha256: run.response_sha256, tool_events: run.tool_events, finding: finding.finding, observations: finding.observations };
  });
  return { slug: entry.slug, catalog_position: entry.catalog_position, status: findings.status, scenario: entry.scenario, decision_question: entry.decision_question, source_facts: fixture.example.source_packet, rubric: entry.rubric, technique_observation: findings.technique_observation, counterweight: findings.counterweight, non_claim: entry.non_claim, levels };
});
if (entries[0].slug !== successor.slug || successor.catalog_position !== 2 || successor.levels.length !== 4 || successor.rubric.length !== 8) throw new Error('Technique 002 successor mismatch');
entries[0] = { ...entries[0], status: successor.status, rubric: successor.rubric, technique_observation: successor.technique_observation, counterweight: successor.counterweight, non_claim: successor.non_claim, score_basis: 'Eight preregistered, equal-weight 0–2 dimensions; unobservable criteria are excluded. Two dimensions reward fork structure, so totals are not style-neutral or a test of general technique efficacy.', levels: successor.levels };
const result = `${JSON.stringify({ schema_version: 'hnc.prompt-technique-batch-reader.v1', status: audit.review_status, owner_disposition: audit.owner_disposition, batch_sha256: digest, provider: runs.provider, model: runs.model, entries }, null, 2)}\n`;
const path = 'src/data/prompt-technique-batch-001-review.json';
if (process.argv.includes('--check')) {
  if (readFileSync(path, 'utf8') !== result) throw new Error('Stale Methods batch-review projection');
  console.log('Methods batch-review projection matches frozen source, receipt and audit.');
} else { writeFileSync(path, result); console.log('Rendered Batch 1 review into Methods reader projection.'); }
