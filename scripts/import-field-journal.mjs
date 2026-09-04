import { cp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const landingRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const journalRoot = path.resolve(landingRoot, '../hearthandcode-field-journal');
const sourcePosts = path.join(journalRoot, 'src/content/posts');
const destinationPosts = path.join(landingRoot, 'src/content/journal');
const destinationComponents = path.join(landingRoot, 'src/components/journal');
const destinationStyles = path.join(landingRoot, 'src/styles/field-journal');
const componentFiles = ['PromptCard.tsx', 'FieldStudyFrame.astro', 'EipoCallout.astro', 'RecordCard.astro', 'GovernedFlow.astro', 'TermNote.astro', 'MovementArc.astro', 'StyleBudget.astro', 'VolumeAtlas.astro', 'ReturnTrail.tsx', 'BoundaryForge.tsx', 'HumanGateCircuit.tsx', 'ImmutableRevisionChain.tsx', 'GovernedAgentLoop.tsx'];
const styleFiles = ['prompt-card.css', 'return-trail.css', 'boundary-forge.css', 'human-gate-circuit.css', 'immutable-revision-chain.css', 'governed-agent-loop.css'];
const promptCardPalette = new Map([
  ['#f8f1e6', '#211d18'], ['#d2ad7b', 'rgba(216,189,145,.35)'], ['#241b14', '#f1e7d2'],
  ['#3c2618', '#3a291f'], ['#211915', '#171614'], ['#df8738', '#f4b860'],
  ['#fffaf2', '#f7ead2'], ['#ffd486', '#4a3721'], ['#ffe6b8', '#8a6842'],
  ['#2c190b', '#f1e7d2'], ['#f5d8b8', '#d4c5ad'], ['#f0a85d', '#f4b860'],
  ['#ddc6a7', 'rgba(216,189,145,.2)'], ['#7b3d16', '#f4b860'], ['#2f241b', '#d4c5ad'],
  ['#b6531d', '#e85b4e'], ['#efe0ca', '#29231e'], ['#dbc09a', 'rgba(216,189,145,.24)'],
  ['#3a2118', '#211d18'], ['#f0a354', '#f4b860'], ['#fff8ee', '#f7ead2'], ['#ffd18b', '#f4b860'],
]);

await rm(destinationPosts, { recursive: true, force: true });
await rm(destinationComponents, { recursive: true, force: true });
await rm(destinationStyles, { recursive: true, force: true });
await mkdir(destinationPosts, { recursive: true });
await mkdir(destinationComponents, { recursive: true });
await mkdir(destinationStyles, { recursive: true });

const published = [];
for (const file of await readdir(sourcePosts)) {
  if (!file.endsWith('.mdx')) continue;
  const source = await readFile(path.join(sourcePosts, file), 'utf8');
  if (!/^status: published$/m.test(source)) continue;
  const ported = source.replaceAll("../../components/", "../../components/journal/");
  await writeFile(path.join(destinationPosts, file), ported);
  published.push(file);
}

for (const file of componentFiles) {
  const source = await readFile(path.join(journalRoot, 'src/components', file), 'utf8');
  await writeFile(path.join(destinationComponents, file), source.replaceAll("../styles/", "../../styles/field-journal/"));
}
for (const file of styleFiles) {
  let source = await readFile(path.join(journalRoot, 'src/styles', file), 'utf8');
  if (file === 'prompt-card.css') {
    for (const [from, to] of promptCardPalette) source = source.replaceAll(from, to);
  }
  await writeFile(path.join(destinationStyles, file), source);
}
for (const file of ['exocore-workbench.png', 'public-journal-boundary.png']) await cp(path.join(journalRoot, 'public/images/posts', file), path.join(landingRoot, 'public/images', file));

const revision = execFileSync('git', ['-C', journalRoot, 'rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
await writeFile(path.join(destinationPosts, 'SOURCE.json'), JSON.stringify({
  source_repository: 'hearthandcode-field-journal',
  source_revision: revision,
  import_policy: 'published posts only; no review or draft records',
  imported_paths: published.sort(),
}, null, 2) + '\n');

console.log(`Imported ${published.length} published Field Journal entries from ${revision}.`);
