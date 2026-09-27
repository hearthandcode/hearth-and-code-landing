// Data projection only. Client JSON is derived from authored YAML; runs stay separate.
import { readFileSync, writeFileSync } from 'node:fs';
import { parse } from 'yaml';
const ladder = parse(readFileSync('src/data/dca-skill-ladder-v2.yaml', 'utf8'));
const analysis = parse(readFileSync('src/data/dca-skill-ladder-v2-analysis.yaml', 'utf8'));
if (ladder.slug !== analysis.slug || ladder.conditions.length !== 4 || analysis.assessments.length !== 4) throw new Error('Skill ladder mismatch');
const output = `${JSON.stringify({ ladder, analysis }, null, 2)}\n`;
const path = 'src/data/dca-skill-ladder-v2-projection.json';
if (process.argv.includes('--check')) {
  if (readFileSync(path, 'utf8') !== output) throw new Error('Stale DCA projection');
  console.log('DCA ladder projection matches YAML.');
} else {
  writeFileSync(path, output);
  console.log('DCA ladder projection rendered.');
}
