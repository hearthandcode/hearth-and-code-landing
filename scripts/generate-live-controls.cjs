#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * generate-live-controls.mjs
 *
 * Reads each React port's TypeScript Props interface and generates
 * a live preview config (with controls) for the live.astro page.
 *
 * Output: appends <LivePreview> entries to a JSON file that live.astro
 * reads via Astro's collection API. Simpler: generate a TS file with
 * an array of component configs that live.astro maps over.
 */
const fs_1 = require("fs");
const path_1 = require("path");
const ts = require("typescript");
const SRC = 'src/ports/react/knowledge';
const OUT = 'src/lib/componentRegistry.ts';
function parsePropsInterface(tsSource) {
    // Extract the Props interface
    const sourceFile = ts.createSourceFile('props.ts', tsSource, ts.ScriptTarget.Latest, true);
    const props = [];
    function visit(node) {
        if (ts.isInterfaceDeclaration(node) && /Props$/.test(node.name.text)) {
            for (const member of node.members) {
                if (ts.isPropertySignature(member) && member.name && member.type) {
                    const name = member.name.getText();
                    const typeStr = member.type.getText();
                    // Determine control type
                    let controlType = 'text';
                    let options;
                    let isArray = false;
                    let isString = false;
                    let isNumber = false;
                    let isBoolean = false;
                    // Parse simple types
                    if (typeStr.includes('boolean')) {
                        controlType = 'boolean';
                        isBoolean = true;
                    }
                    else if (typeStr.includes('number')) {
                        controlType = 'number';
                        isNumber = true;
                    }
                    else if (typeStr.includes('string')) {
                        controlType = 'text';
                        isString = true;
                    }
                    // Extract union literal types for select
                    const unionMatch = typeStr.match(/['"]([^'"]+)['"]\s*\|\s*['"]([^'"]+)['"]/);
                    if (typeStr.includes('|') && unionMatch) {
                        controlType = 'select';
                        const matches = typeStr.match(/['"]([^'"]+)['"]/g);
                        if (matches)
                            options = matches.map(m => m.replace(/['"]/g, ''));
                    }
                    // Detect arrays
                    if (typeStr.includes('[]') || typeStr.endsWith('>') || typeStr.startsWith('Array')) {
                        isArray = true;
                    }
                    // Check for default value
                    let hasDefault = false;
                    let defaultValue = undefined;
                    // Look for the const {...} = Astro.props or component prop destructuring
                    // in the file body - that's where defaults live. Skip for now.
                    props.push({
                        name,
                        type: typeStr,
                        hasDefault,
                        isArray,
                        isString,
                        isNumber,
                        isBoolean,
                        unionValues: options,
                    });
                }
            }
        }
        ts.forEachChild(node, visit);
    }
    visit(sourceFile);
    return props;
}
function makeDefaultValue(prop) {
    if (prop.isBoolean)
        return false;
    if (prop.isNumber)
        return 0;
    if (prop.unionValues && prop.unionValues.length > 0)
        return prop.unionValues[0];
    if (prop.isArray)
        return [];
    if (prop.isString)
        return '';
    return null;
}
function generateConfig(filePath, layer) {
    const tsSource = (0, fs_1.readFileSync)(filePath, 'utf-8');
    // Skip if no Props interface
    if (!/interface\s+\w+Props/.test(tsSource) && !/interface\s+Props/.test(tsSource)) {
        // Try to find any Props interface
        if (!/interface\s+\w+Props/.test(tsSource))
            return null;
    }
    const props = parsePropsInterface(tsSource);
    if (props.length === 0)
        return null;
    const componentName = (0, path_1.basename)(filePath, '.tsx');
    const propControls = props
        .filter(p => !p.name.includes('className') && !p.name.includes('children'))
        .slice(0, 8) // Limit controls for UI sanity
        .map(p => {
        const ctrl = { name: p.name, type: p.isBoolean ? 'boolean' : p.isNumber ? 'number' : 'text' };
        if (p.unionValues && p.unionValues.length > 0 && p.unionValues.length <= 8) {
            ctrl.type = 'select';
            ctrl.options = p.unionValues;
        }
        return ctrl;
    });
    const defaultProps = {};
    for (const p of props) {
        if (p.name === 'className' || p.name === 'children')
            continue;
        defaultProps[p.name] = makeDefaultValue(p);
    }
    return {
        name: componentName,
        layer: layer,
        file: filePath.replace('src/', ''),
        description: `${componentName} component (${layer})`,
        defaultProps,
        propControls,
    };
}
const configs = [];
for (const layer of ['atoms', 'composites', 'templates']) {
    const dir = (0, path_1.join)(SRC, layer);
    try {
        const files = (0, fs_1.readdirSync)(dir).filter(f => f.endsWith('.tsx') && !f.endsWith('.stories.tsx'));
        for (const f of files) {
            const cfg = generateConfig((0, path_1.join)(dir, f), layer);
            if (cfg)
                configs.push(cfg);
        }
    }
    catch (e) {
        // dir doesn't exist
    }
}
console.log(`Generated ${configs.length} configs from TS interfaces`);
console.log(`  Atoms: ${configs.filter(c => c.layer === 'atoms').length}`);
console.log(`  Composites: ${configs.filter(c => c.layer === 'composites').length}`);
console.log(`  Templates: ${configs.filter(c => c.layer === 'templates').length}`);
// Write as TS module so it's typed
const tsOutput = `// Auto-generated component registry. Generated by scripts/generate-live-controls.mjs
// Do not edit manually — re-run the script.

export interface ComponentControl {
  name: string;
  type: 'text' | 'number' | 'boolean' | 'select';
  options?: string[];
}

export interface ComponentConfig {
  name: string;
  layer: 'atoms' | 'composites' | 'templates';
  file: string;
  description: string;
  defaultProps: Record<string, unknown>;
  propControls: ComponentControl[];
}

export const componentRegistry: ComponentConfig[] = ${JSON.stringify(configs, null, 2)};

export const componentsByLayer = {
  atoms: componentRegistry.filter(c => c.layer === 'atoms'),
  composites: componentRegistry.filter(c => c.layer === 'composites'),
  templates: componentRegistry.filter(c => c.layer === 'templates'),
};
`;
(0, fs_1.writeFileSync)(OUT, tsOutput);
console.log(`Wrote ${OUT}`);
