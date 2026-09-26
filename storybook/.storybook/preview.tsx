import type { Preview } from '@storybook/react';
import * as React from 'react';

/**
 * Ember Circuit Storybook Preview
 *
 * Strategy: Create a real CSS file at /ember-circuit.css that's served
 * by the static server. The Storybook preview module's IIFE appends a
 * <link rel="stylesheet"> to the iframe document head on first load.
 *
 * The CSS file is written by `scripts/write-ember-circuit-css.mjs` during
 * `npm run storybook:build` (via the prebuild hook in package.json).
 */

const preview: Preview = {
  decorators: [
    (Story) => {
      React.useEffect(() => {
        if (typeof document === 'undefined') return;
        const head = document.head;
        if (!head) return;

        // Find the location of this script to compute the base path
        const scriptSrc = (document.currentScript as HTMLScriptElement)?.src || '';
        const basePath = scriptSrc.replace(/\/[^/]+$/, '/');
        const cssUrl = `${basePath}ember-circuit.css`;

        // Inject the Ember Circuit stylesheet
        if (!document.getElementById('ember-circuit-stylesheet')) {
          const link = document.createElement('link');
          link.id = 'ember-circuit-stylesheet';
          link.rel = 'stylesheet';
          link.href = cssUrl;
          head.appendChild(link);
        }

        // Fallback: also inject inline if the CSS file fails to load
        if (!document.getElementById('ember-circuit-tokens-fallback')) {
          const style = document.createElement('style');
          style.id = 'ember-circuit-tokens-fallback';
          style.appendChild(document.createTextNode(EMBED_CIRCUIT_TOKENS_CSS_FALLBACK));
          head.appendChild(style);
        }
      }, []);
      return (
        <div className="ec-preview">
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    backgrounds: {
      default: 'ember-circuit',
      values: [
        { name: 'ember-circuit (dark)', value: '#161411' },
        { name: 'raised', value: '#211d18' },
        { name: 'recessed', value: '#0e1114' },
        { name: 'forge (light)', value: '#f1e7d2' },
      ],
    },
    layout: 'padded',
    controls: { expanded: true },
    docs: {
      theme: 'dark' as any,
      source: { type: 'code' },
    },
  },
};

export default preview;

// Inline fallback in case the CSS file isn't served
const EMBED_CIRCUIT_TOKENS_CSS_FALLBACK = `
:root {
  color-scheme: dark;
  --color-surface-primary: #161411;
  --color-surface-raised: #211d18;
  --color-surface-recessed: #0e1114;
  --color-surface-rule: #4b4237;
  --color-surface-rule-strong: #6e5d4b;
  --color-text-primary: #f1e7d2;
  --color-text-secondary: #cfc1ab;
  --color-text-display: #f1e7d2;
  --color-accent-ember: #e85b4e;
  --color-accent-forge: #c25a3a;
  --color-accent-gold: #f4b860;
  --color-accent-violet: #9b5de5;
  --color-accent-amethyst: #c67bea;
  --color-accent-plasma: #3fe0d0;
  --color-accent-signal: #1fb6a8;
  --color-state-success: #8fa395;
  --color-state-caution: #e8923c;
  --color-state-error: #c25a2a;
  --color-state-info: #3fe0d0;
  --color-focus-ring: #3fe0d0;
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Inter', system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;
}
html, body { background: var(--color-surface-primary) !important; color: var(--color-text-primary) !important; }
.ec-preview { background: var(--color-surface-primary); color: var(--color-text-primary); padding: 1.5rem; }
`;
