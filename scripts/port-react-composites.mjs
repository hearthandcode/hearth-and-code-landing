#!/usr/bin/env node
/**
 * port-react-composites.mjs
 *
 * For each Astro composite/template, generate:
 *  1. A React .tsx file with the same prop interface but with a
 *     working JSX rendering (with reasonable placeholder content)
 *  2. A .stories.tsx file with controls based on the props
 *
 * This is a fast bulk approach. After this, we hand-port key components
 * to add real visual parity.
 */

import { readFileSync, writeFileSync, readdirSync } from 'fs';
import { join } from 'path';

const SRC_COMPOSITES = 'src/components/knowledge/composites';
const SRC_TEMPLATES = 'src/components/knowledge/templates';
const DST = 'src/ports/react/knowledge';

function extractInterface(content) {
  // Extract props interface block
  const m = content.match(/interface\s+Props\s*\{([\s\S]*?)\n\}/);
  if (!m) return null;
  return m[1].trim();
}

function extractComponentName(content) {
  const m = content.match(/import\s+\*\s+as\s+(\w+)\s+from\s+['"]d3['"]/);
  if (m) return m[1];
  const m2 = content.match(/^const\s+(\w+)\s*=\s*\(.*?\)\s*=>/m);
  if (m2) return m2[1];
  return null;
}

function extractPropsFromDestructure(content) {
  // Look for const { ... } = Astro.props;
  const m = content.match(/const\s*\{([^}]+)\}\s*=\s*Astro\.props\s*;/s);
  if (!m) return null;
  return m[1].split(',')
    .map((p) => {
      let name = p.trim().split('=')[0].trim();
      // Skip the 'class: className' alias — only 'class' is renamed
      if (name === 'class: className') return null;
      // Skip any prop with a colon (it's a destructured alias we don't want as a control)
      if (name.includes(':')) return null;
      return name;
    })
    .filter(Boolean);
}

function tsTypeFromAstro(propLine) {
  // e.g. "data: any[]" or "showValues = true" (with default)
  // Convert to TS: number|string for unions, any[] preserved
  return propLine.trim();
}

function buildPropsInterface(name, interfaceBody) {
  if (!interfaceBody) return `export interface ${name}Props {\n  className?: string;\n}`;
  // Convert Astro Props interface to TS Props interface
  const lines = interfaceBody.split('\n').map((l) => l.trim()).filter(Boolean);
  const tsLines = lines.map((line) => {
    // Drop Astro-specific defaults
    return line.replace(/=\s*[^:]+,?$/, '').replace(/=\s*[^:]+$/, '');
  });
  return `export interface ${name}Props {\n${tsLines.join('\n')}\n  className?: string;\n}`;
}

function buildReact(name, interfaceBody, styleBlock, jsxFallback) {
  const propsInterface = buildPropsInterface(name, interfaceBody);
  // Extract destructure names
  const propNames = (interfaceBody || '').split('\n').map((l) => {
    const m = l.trim().match(/^(\w+)(\??):/);
    return m ? m[1] : null;
  }).filter(Boolean);

  return `/**
 * ${name} (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

${propsInterface}

export function ${name}(props: ${name}Props) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-${name.toLowerCase()}', className].filter(Boolean).join(' ')}>
      ${jsxFallback}
    </div>
  );
}
`;
}

function buildStory(name, propsList) {
  const propControls = (propsList || []).filter((p) => !['className', 'children'].includes(p))
    .slice(0, 5)  // limit controls to first 5 for clarity
    .map((p) => `    ${p}: { control: 'text' },`)
    .join('\n');

  return `import type { Meta, StoryObj } from '@storybook/react';
import { ${name} } from './${name}';

const meta: Meta<typeof ${name}> = {
  title: 'Knowledge/${layerTitle}/${name}',
  component: ${name},
  tags: ['autodocs'],
  argTypes: {
${propControls}
  },
};

export default meta;
type Story = StoryObj<typeof ${name}>;

export const Default: Story = { args: {} };
`;
}

function processDirectory(srcDir, dstSubdir) {
  const dstDir = join(DST, dstSubdir);
  const files = readdirSync(srcDir).filter((f) => f.endsWith('.astro'));

  // Map layer names to Storybook section titles
  const layerTitle = dstSubdir === 'atoms' ? 'Atoms'
    : dstSubdir === 'composites' ? 'Composites'
    : dstSubdir === 'templates' ? 'Templates'
    : dstSubdir.charAt(0).toUpperCase() + dstSubdir.slice(1);

  let count = 0;
  for (const file of files) {
    const srcPath = join(srcDir, file);
    const dstPath = join(dstDir, file.replace('.astro', '.tsx'));
    const content = readFileSync(srcPath, 'utf-8');

    const componentName = file.replace('.astro', '');
    const interfaceBody = extractInterface(content);
    const propNames = extractPropsFromDestructure(content);

    // Build a meaningful JSX placeholder based on the component type
    const jsxFallback = `<span className="kc-${componentName.toLowerCase()}__placeholder">${componentName} (React port)</span>`;

    const tsx = buildReact(componentName, interfaceBody, '', jsxFallback);
    writeFileSync(dstPath, tsx);

    const story = buildStory(componentName, propNames, layerTitle);
    writeFileSync(dstPath.replace('.tsx', '.stories.tsx'), story);

    console.log(`Generated ${dstSubdir}/${file}`);
    count++;
  }
  return count;
}

console.log('=== Composites ===');
const c1 = processDirectory(SRC_COMPOSITES, 'composites');
console.log('\n=== Templates ===');
const c2 = processDirectory(SRC_TEMPLATES, 'templates');
console.log(`\nGenerated ${c1} composites + ${c2} templates with stories.`);
