// Structural gate only; adversarial source/response reading remains human work.
import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';
const [batchPath, receiptPath] = process.argv.slice(2);
if (!batchPath || !receiptPath) throw new Error('Usage: node scripts/audit-prompt-batch.mjs <batch.yaml> <comparisons.json>');
const atlas = JSON.parse(readFileSync('src/data/vendored/prompt-catalog.json', 'utf8'));
const batch = parse(readFileSync(batchPath, 'utf8'));
const identities = parse(readFileSync('src/data/prompt-technique-identities.yaml', 'utf8')).entries;
const comparisons = JSON.parse(readFileSync(receiptPath, 'utf8')).comparisons;
const sha = (s) => createHash('sha256').update(s).digest('hex');
const check = (condition, message) => { if (!condition) throw new Error(message); };
check(batch.entries.length === 8 && comparisons.length === 8, 'batch and comparison must each contain eight entries');
check(new Set(batch.atlas_positions).size === 8, 'positions must be unique');
for (let i = 0; i < 8; i++) {
  const entry = batch.entries[i], receipt = comparisons[i], source = atlas[batch.atlas_positions[i] - 1];
  check(source?.slug === entry.slug && receipt.slug === entry.slug, `source/receipt mismatch at position ${batch.atlas_positions[i]}`);
  const identity = identities.find((item) => item.slug === entry.slug);
  check(identity && ['what', 'distinguishes', 'mechanism', 'not_this'].every((field) => identity[field]?.length > 75), `${entry.slug}: incomplete unique technique identity`);
  for (const field of ['applied_process', 'when_to_use', 'limitations']) {
    check(entry[field]?.length === 4, `${entry.slug}: ${field} must contain four items`);
    for (const item of entry[field]) {
      check(Object.keys(item).sort().join(',') === 'detail,title', `${entry.slug}: YAML item split into extra keys in ${field}`);
      check(item.title?.length > 6 && item.detail?.length > 35, `${entry.slug}: incomplete ${field} item`);
    }
  }
  check(receipt.samples?.length === 2 && receipt.samples[0].condition === 'baseline' && receipt.samples[1].condition === 'applied', `${entry.slug}: missing matched pair`);
  check(receipt.provider === 'minimax-oauth' && receipt.model === 'MiniMax-M3', `${entry.slug}: route mismatch`);
  check(receipt.review_passes?.adversarial === 'completed-on-bound-digests' && receipt.review_passes?.source_alignment === 'completed-on-bound-digests', `${entry.slug}: review passes missing`);
  check(receipt.review_passes.owner_disposition === 'pending', `${entry.slug}: owner disposition should remain pending`);
  check(receipt.observed_limits?.length >= 2 && receipt.editorial_delta?.length > 60, `${entry.slug}: incomplete current-digest review`);
  const packet = entry.example.source_packet.map((fact, n) => `${n + 1}. ${fact}`).join('\n');
  check(sha(packet) === receipt.source_packet_sha256, `${entry.slug}: packet changed after execution`);
  for (const sample of receipt.samples) {
    check(sample.tool_events === 0 && sample.executed_at, `${entry.slug}: missing no-tool receipt`);
    check(sha(sample.submitted_prompt) === sample.prompt_sha256 && sha(sample.response) === sample.response_sha256, `${entry.slug}: digest mismatch`);
    check(receipt.reviewed_response_sha256?.[sample.condition] === sample.response_sha256, `${entry.slug}: stale review finding`);
    for (const fact of entry.example.source_packet) check(sample.submitted_prompt.includes(fact), `${entry.slug}: prompt lost source fact`);
    check(sample.submitted_prompt.includes(entry.example[`${sample.condition}_instruction`]), `${entry.slug}: submitted prompt no longer matches authored instruction`);
    check(!/Cognitectus|Hearth|Exocore|hub\.review_packet|magister memoriae/i.test(sample.response), `${entry.slug}: internal label in public response`);
  }
}
console.log(`Structural/digest gate: ${batch.entries.length} entries, 16 matched turns, current findings. Semantic and visual audit still required.`);
