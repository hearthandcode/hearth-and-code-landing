import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [mdx(), react()],
  build: {
    format: 'directory',
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
