// Build a review-only successor projection for one technique; no provider call.
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
const sha = (s) => createHash('sha256').update(s).digest('hex');
const source = readFileSync('src/data/prompt-technique-002-revision.yaml');
const revision = parse(source.toString('utf8'));
const analysis = parse(readFileSync('src/data/prompt-technique-002-revision-analysis.yaml', 'utf8'));
const next = JSON.parse(readFileSync('src/data/prompt-technique-002-revision-run.json', 'utf8'));
const prior = JSON.parse(readFileSync('src/data/prompt-technique-batch-001-ladder-runs.json', 'utf8'));
const draft = parse(readFileSync('src/data/prompt-technique-batch-001-ladders.yaml', 'utf8'));
if (revision.catalog_position !== 2 || revision.slug !== draft.entries[0].slug || analysis.slug !== revision.slug || next.slug !== revision.slug) throw new Error('Successor identity mismatch');
if (analysis.revision_source_sha256 !== sha(source) || next.revision_sha256 !== sha(source) || analysis.prior_batch_sha256 !== prior.batch_sha256 || next.source_batch_sha256 !== prior.batch_sha256) throw new Error('Successor source drift');
if (analysis.dimension_ids.join(',') !== revision.scoring.dimensions.map((dimension) => dimension.id).join(',')) throw new Error('Eight-dimensional rubric drift');
const ids = ['casual', 'power', 'engineer', 'engineer_technique'];
const levels = analysis.tiers.map((tier, index) => {
  if (tier.id !== ids[index] || tier.dimensions.length !== 8) throw new Error(`Tier/rubric mismatch ${tier.id}`);
  const record = tier.id === 'engineer_technique' ? next : prior.records.find((item) => item.catalog_position === 2 && item.id === tier.id);
  if (!record || analysis.reviewed_response_sha256[tier.id] !== record.response_sha256 || sha(record.response) !== record.response_sha256 || sha(record.prompt) !== record.prompt_sha256) throw new Error(`Stale finding ${tier.id}`);
  const numeric = tier.dimensions.filter((item) => typeof item.score === 'number');
  if (tier.dimensions.some((item) => ![0, 1, 2, 'not_observable'].includes(item.score) || item.evidence.length < 45)) throw new Error(`Invalid score/evidence ${tier.id}`);
  const points = numeric.reduce((total, item) => total + item.score, 0);
  return { id: tier.id, prompt: record.prompt, prompt_sha256: record.prompt_sha256, response: record.response, response_sha256: record.response_sha256, tool_events: record.tool_events, input_fact_ids: draft.entries[0].conditions[index].input_fact_ids, finding: tier.summary, information_coverage: tier.information_coverage, observations: tier.dimensions.map((item) => item.score), score: { points, maximum: numeric.length * 2, observable_dimensions: numeric.length, total_dimensions: 8 }, evidence: tier.dimensions.map((item) => item.evidence) };
});
const output = { schema_version: 'hnc.prompt-technique-revision-reader.v1', slug: revision.slug, catalog_position: 2, status: analysis.review_status, owner_disposition: analysis.owner_disposition, rubric: revision.scoring.dimensions.map((dimension) => dimension.title), technique_observation: analysis.technique_observation, counterweight: analysis.counterweight, next_action: analysis.next_action, non_claim: revision.comparison_boundary, levels };
const content = `${JSON.stringify(output, null, 2)}\n`;
const path = 'src/data/prompt-technique-002-revision-review.json';
if (process.argv.includes('--check')) {
  if (readFileSync(path, 'utf8') !== content) throw new Error('Stale technique 002 revision projection');
  console.log('Technique 002 revision projection current.');
} else { writeFileSync(path, content); console.log('Technique 002 eight-dimensional review rendered.'); }
