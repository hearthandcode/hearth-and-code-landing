#!/usr/bin/env node
/**
 * refactor-charts.mjs - safely refactor chart components to use the bundled
 * client script pattern. Uses line-by-line parsing for safety.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const CHARTS_DIR = 'src/components/knowledge/charts';
const files = readdirSync(CHARTS_DIR).filter((f) => f.endsWith('.astro'));

for (const file of files) {
  const path = join(CHARTS_DIR, file);
  const original = readFileSync(path, 'utf-8');

  // Skip DonutChart and MultiLine (they don't have inline scripts)
  if (file === 'DonutChart.astro' || file === 'MultiLine.astro') {
    console.log(`Skip ${file} (re-export)`);
    continue;
  }

  const lines = original.split('\n');

  // Find the Astro.props destructure line (may span multiple lines)
  const fullText = lines.join('\n');
  const destructureMatch = fullText.match(/const\s*\{([^}]+)\}\s*=\s*Astro\.props\s*;/);
  if (!destructureMatch) {
    console.log(`Skip ${file}: no destructure`);
    continue;
  }
  const destructureBody = destructureMatch[1];

  // Extract prop names. The destructure is like:
  //   const { data, height = 240, showAxis = true, class: className = '' } = Astro.props;
  // We want names only: data, height, showAxis (skip 'class:' alias)
  const propNames = destructureBody.split(',')
    .map((p) => {
      const left = p.trim().split('=')[0].trim();
      // Skip the 'class: className' alias — only 'class' is renamed; we don't need it as a chart prop
      if (left === 'class: className') return null;
      return left;
    })
    .filter(Boolean);

  // Build the JSON.stringify props expression
  const propsExpr = `{ ${propNames.map((n) => `${n}: ${n}`).join(', ')} }`;

  // Find the inline <script define:vars={{...}}>...</script> block and remove it
  const newLines = [];
  let inScript = false;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (!inScript) {
      // Detect start of inline script that contains import('d3') somewhere after
      if (line.trim().startsWith('<script define:vars=')) {
        inScript = true;
        // If single-line, just skip
        if (line.includes('</script>')) {
          inScript = false;
        }
        continue;
      }
      newLines.push(line);
    } else {
      // Skip until </script>
      if (line.includes('</script>')) {
        inScript = false;
      }
      // else: skip
    }
  }

  let content = newLines.join('\n');

  // Find the chart container div with data-chart-id
  // Pattern: <div class:list={['kc-X', className]} data-chart-id={chartId}>
  const divRegex = /(<div class:list=\{\[\'kc-[a-z0-9-]+\', className\]\} data-chart-id=\{chartId\})>/;
  if (divRegex.test(content)) {
    content = content.replace(
      divRegex,
      `$1 data-props={JSON.stringify(${propsExpr})}>`,
    );
  } else {
    console.log(`WARN ${file}: no chart div found`);
  }

  // Add the JSON props script before <style> (safer than chasing </svg></div>)
  const propsScript = `\n  <script type="application/json" id={\`props-\${chartId}\`} set:html={JSON.stringify(${propsExpr})}></script>`;
  content = content.replace(/(\n<style>)/, `${propsScript}$1`);

  writeFileSync(path, content);
  console.log(`Refactored ${file}`);
}

console.log('Done');
