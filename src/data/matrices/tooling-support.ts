// Matrix 5: tooling-support
import type { HcanMatrix } from './matrix-types';

export const canonicalToolingSupport: HcanMatrix = {
  id: 'tooling-support',
  title: 'Implemented Tooling Support Matrix',
  columns: ['surface', 'what', 'test_evidence', 'deployment'],
  rows: [
    ['validator', 'line grammar, shapes, constructors, guards, probes, labels, holds', '14/14 fixtures, python + node twins', 'live in extension'],
    ['LSP server', 'completion (context-aware with docs), hover, diagnostics (debounced async)', '11/11 stdio + 6/6 TCP protocol tests', 'stdio + TCP deployed'],
    ['syntax highlighting', 'TextMate, highlight.js, vim, tokenizer library \u2014 one grammar', 'lossless on 5 canonical lines; token classes verified', '4 renderers deployed'],
    ['Pi extension', 'live editor + AI ghost + intellisense + autocomplete + eval + compare + compose', 'load-tested; freeze-fixed; ghost-verified against real pi-tui classes', '9 commands installed'],
    ['portable envelope', 'self-describing wrapper for skill-less agents', 'validated in 2 model families; deviations recorded', 'spec deployed'],
    ['Docker LSP', 'live TCP process, healthchecked, hub read-only', 'compose configured, healthcheck verified', 'docker-compose ready'],
    ['tutorial', '32 sections across 6 parts including ESS domain mappings', 'all program lines validated', 'committed'],
    ['field journal', 'public-safe article with 8 examples + Hermes React specs', 'all 8 programs validated', 'committed'],
    ['benchmark harness', '3-layer evaluation (LLM judge, multi-judge, human disposition)', '52 model calls, 11 benchmark records', 'reusable pattern'],
  ],
};
