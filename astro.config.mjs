import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [mdx(), react()],
  build: {
    format: 'directory',
  },
  server: {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  },
  preview: {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
    },
  },
  vite: {
    server: {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
    preview: {
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
      },
    },
  },
  markdown: {
    shikiConfig: {
      // Register the canonical HCAN TextMate grammar so any ```hcan fenced block
      // in MDX/Markdown renders with the canonical token classes. Source of truth:
      // Hearth & Code Hub, project 0047, internal/.../0007-hcan-syntax-highlighting/hcan.tmLanguage.json
      // Projection copy lives at src/data/hcan.tmLanguage.json.
      // The injection site is `markdown` (Astro's content + MDX render path).
      wrap: true,
      langs: [
        {
          path: './src/data/hcan.tmLanguage.json',
          scopeName: 'source.hcan',
        },
        // Projection of exocore-sigil/tooling/vscode/lexical/syntaxes/sigil.tmLanguage.json
        // (source SHA-256 d5d211d3bb57cae5391a89df90eb12d5a3b54fce2215cc5886a3aecab9e29132).
        // Only its display name is changed to "sigil" for fenced-code resolution.
        {
          path: './src/data/sigil.tmLanguage.json',
          scopeName: 'source.exocore-sigil',
        },
        'yaml',
        'json',
        'bash',
        'diff',
      ],
      langAlias: {
        yml: 'yaml',
      },
      theme: 'github-dark',
    },
  },
});
