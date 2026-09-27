// Render the authored YAML into a client-safe JSON projection; --check has no write effect.
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
const yaml = parse(readFileSync('src/data/prompt-technique-exemplars.yaml', 'utf8'));
const batch = parse(readFileSync('src/data/prompt-technique-batch-001.yaml', 'utf8'));
const identities = parse(readFileSync('src/data/prompt-technique-identities.yaml', 'utf8'));
const authored = [...yaml.entries, ...batch.entries];
if (new Set(authored.map((entry) => entry.slug)).size !== authored.length) throw new Error('Duplicate technique exemplar slug');
if (identities.entries.length !== authored.length) throw new Error('Every authored technique needs its own identity');
const bySlug = new Map(identities.entries.map((identity) => [identity.slug, identity]));
const entries = authored.map((entry) => {
  const identity = bySlug.get(entry.slug);
  if (!identity) throw new Error(`Missing technique identity for ${entry.slug}`);
  const { slug, ...definition } = identity;
  return { ...entry, definition };
});
const rendered = `${JSON.stringify({ schema_version: yaml.schema_version, entries }, null, 2)}\n`;
const path = 'src/data/prompt-technique-exemplars.json';
if (process.argv.includes('--check')) {
  if (readFileSync(path, 'utf8') !== rendered) throw new Error('Exemplar JSON is stale; regenerate it from YAML.');
  console.log('Exemplar projection matches YAML.');
} else {
  writeFileSync(path, rendered);
  console.log('Rendered authored YAML into client-safe JSON.');
}
