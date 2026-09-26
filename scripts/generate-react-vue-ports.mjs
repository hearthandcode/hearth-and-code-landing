#!/usr/bin/env node
/**
 * generate-react-vue-ports.mjs
 *
 * Generates React (TSX) and Vue (SFC) component ports from the
 * knowledge primitives YAML contract.
 *
 * Output:
 *   src/ports/react/knowledge/{atoms,composites,templates}/<Name>.tsx
 *   src/ports/vue/knowledge/{atoms,composites,templates}/<Name>.vue
 *
 * Each generated component has the same prop interface but uses the
 * target framework's idioms (React function component, Vue <script setup>).
 * Styling is preserved as CSS-in-JS using the same token names.
 *
 * NOTE: Generated components are skeletons — they include the right
 * prop interface and structure but visual fidelity depends on the
 * host framework's CSS handling. Use as a starting point.
 */

import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const CONTRACT = '/home/cosmatrexis/devel/hearthandcode/internal/hearthandcode-knowledge-hub/02-design-system/06-knowledge-components/00-knowledge-primitives-system.yaml';
const OUT_BASE = 'src/ports';

// Simple YAML parser (just enough for our contract)
import { parse } from 'yaml';
let yaml;
try {
  yaml = await import('yaml');
} catch (e) {
  console.error('Need yaml package. Run: npm install yaml');
  process.exit(1);
}

const data = yaml.parse(readFileSync(CONTRACT, 'utf-8'));

// Map prop type to TS + Vue
function tsType(prop) {
  if (!prop) return 'any';
  if (prop.type.startsWith("'")) return prop.type.replace(/'/g, '"');
  if (prop.type === 'enum') return 'string';
  if (prop.type === 'string') return 'string';
  if (prop.type === 'number') return 'number';
  if (prop.type === 'boolean') return 'boolean';
  if (prop.type === 'string[]') return 'string[]';
  return 'string';
}

function vueType(prop) {
  return tsType(prop);
}

function generateReactComponent(comp, layer) {
  const imports = [];
  if (layer === 'composite' || layer === 'template') {
    comp.uses_atoms?.forEach((atomId) => {
      const atom = data.atoms.find((a) => a.id === atomId);
      if (atom) imports.push(`import ${atom.name} from '../atoms/${atom.name}';`);
    });
    comp.uses_composites?.forEach((cId) => {
      const c = data.composites.find((x) => x.id === cId);
      if (c) imports.push(`import ${c.name} from '../composites/${c.name}';`);
    });
  }
  return `/**
 * ${comp.name} (React port)
 *
 * Auto-generated from: ${comp.id}
 * Source: ${comp.file}
 *
 * NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
 */
${imports.join('\n')}
export interface ${comp.name}Props {
${comp.props?.map((p) => `  ${p.name}${p.required === false ? '?' : ''}: ${tsType(p)};`).join('\n') || ''}
}

export function ${comp.name}({
${comp.props?.map((p) => `  ${p.name}${p.default !== undefined ? ` = ${JSON.stringify(p.default)}` : ''},`).join('\n') || ''}
}: ${comp.name}Props) {
  return (
    <div className="kc-${comp.id} kc-${comp.id}--placeholder">
      <span>${comp.name} (React port)</span>
      {/* TODO: port rendering logic from ${comp.file} */}
    </div>
  );
}
`;
}

function generateVueComponent(comp, layer) {
  const imports = [];
  if (layer === 'composite' || layer === 'template') {
    comp.uses_atoms?.forEach((atomId) => {
      const atom = data.atoms.find((a) => a.id === atomId);
      if (atom) imports.push(`import ${atom.name} from '../atoms/${atom.name}.vue';`);
    });
    comp.uses_composites?.forEach((cId) => {
      const c = data.composites.find((x) => x.id === cId);
      if (c) imports.push(`import ${c.name} from '../composites/${c.name}.vue';`);
    });
  }
  const propTypes = comp.props?.map((p) =>
    `  ${p.name}${p.required === false ? '?' : ''}: ${vueType(p)};`
  ).join('\n') || '';
  const propDecls = comp.props?.map((p) =>
    `  const ${p.name} = defineProps<{ ${p.name}${p.required === false ? '?' : ''}: ${vueType(p)} }>();`
  ).join('\n') || '';

  return `<!--
  ${comp.name} (Vue port)

  Auto-generated from: ${comp.id}
  Source: ${comp.file}

  NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
-->
${imports.join('\n')}
<script setup lang="ts">
${propDecls || '// no props'}
</script>

<template>
  <div :class="['kc-${comp.id}', 'kc-${comp.id}--placeholder']">
    <span>${comp.name} (Vue port)</span>
    <!-- TODO: port rendering logic from ${comp.file} -->
  </div>
</template>

<style scoped>
.kc-${comp.id} {
  background: var(--color-surface-raised);
  border: 1px solid var(--color-surface-rule);
  border-radius: var(--radius-md);
  padding: var(--space-3);
  color: var(--color-text-display);
}
</style>
`;
}

const stats = { react: { atoms: 0, composites: 0, templates: 0 }, vue: { atoms: 0, composites: 0, templates: 0 } };

for (const layer of ['atoms', 'composites', 'templates']) {
  for (const comp of data[layer]) {
    const reactDir = join(OUT_BASE, 'react/knowledge', layer);
    const vueDir = join(OUT_BASE, 'vue/knowledge', layer);
    mkdirSync(reactDir, { recursive: true });
    mkdirSync(vueDir, { recursive: true });
    writeFileSync(join(reactDir, `${comp.name}.tsx`), generateReactComponent(comp, layer));
    writeFileSync(join(vueDir, `${comp.name}.vue`), generateVueComponent(comp, layer));
    stats.react[layer]++;
    stats.vue[layer]++;
  }
}

// Write a barrel index file for each framework
const reactIndex = `// React barrel — auto-generated\n${data.atoms.map((a) => `export { ${a.name} } from './atoms/${a.name}';`).join('\n')}\n${data.composites.map((c) => `export { ${c.name} } from './composites/${c.name}';`).join('\n')}\n${data.templates.map((t) => `export { ${t.name} } from './templates/${t.name}';`).join('\n')}\n`;
const vueIndex = `// Vue barrel — auto-generated\n${data.atoms.map((a) => `export { default as ${a.name} } from './atoms/${a.name}.vue';`).join('\n')}\n${data.composites.map((c) => `export { default as ${c.name} } from './composites/${c.name}.vue';`).join('\n')}\n${data.templates.map((t) => `export { default as ${t.name} } from './templates/${t.name}.vue';`).join('\n')}\n`;
writeFileSync(join(OUT_BASE, 'react/knowledge/index.ts'), reactIndex);
writeFileSync(join(OUT_BASE, 'vue/knowledge/index.ts'), vueIndex);

console.log('Generated ports:');
console.log(`  React: ${stats.react.atoms} atoms + ${stats.react.composites} composites + ${stats.react.templates} templates = ${stats.react.atoms + stats.react.composites + stats.react.templates}`);
console.log(`  Vue:   ${stats.vue.atoms} atoms + ${stats.vue.composites} composites + ${stats.vue.templates} templates = ${stats.vue.atoms + stats.vue.composites + stats.vue.templates}`);
