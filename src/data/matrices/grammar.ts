// HCAN grammar entries.
// Source: Hearth & Code Hub, project 0047, canonical §"The grammar".

import type { HcanGrammarEntry } from './matrix-types';

export const canonicalGrammar: HcanGrammarEntry[] = [
  {
    name: 'verb',
    symbol: '-',
    purpose: 'what kind of work (inspect, synth, plan, compare, return, design, draft, ...)',
    example: 'inspect',
    non_example: '! should not be a verb (verbs go in the work slot, not the guard slot)',
  },
  {
    name: 'binding',
    symbol: '@',
    purpose: 'anchor to a context or source',
    example: '@~/projects/my-app',
    non_example: 'word without @ does not bind to anything',
  },
  {
    name: 'shape',
    symbol: ':',
    purpose: 'type the return',
    example: ':Map',
    non_example: 'Map without : is a free noun; shapes must be prefixed',
  },
  {
    name: 'flow',
    symbol: '->',
    purpose: 'the route or transform',
    example: '-> map(fields...)',
    non_example: '-> binds one directional flow; | forks to parallel; & joins',
  },
  {
    name: 'probe',
    symbol: '?',
    purpose: 'a check that must answer (PASS/FAIL/UNKNOWN)',
    example: '?gaps',
    non_example: 'probes must be checkable; "?" without a check name is not a probe',
  },
  {
    name: 'guard',
    symbol: '!',
    purpose: 'a boundary that binds the whole run',
    example: '!no-write',
    non_example: 'guards run before and after the verb; they cannot grant new permissions',
  },
  {
    name: 'label',
    symbol: '%',
    purpose: 'epistemic class on a claim (source, evidence, inference, hypothesis, proposal, projection, receipt, unknown)',
    example: '%evidence',
    non_example: 'labels use the eight-term closed vocabulary; cannot invent a ninth',
  },
  {
    name: 'hold',
    symbol: 'hold until',
    purpose: 'fail-closed pause until a named condition',
    example: 'hold until tests-pass',
    non_example: 'hold is the only way to suspend; there is no unconditional "force"',
  },
  {
    name: 'definition',
    symbol: '=',
    purpose: 'reusable, hygienic, validator-checked',
    example: 'compare = !no-write line ?counterexample :EvidenceMap where covers = %evidence',
    non_example: 'must be a single line expression; cannot span multiple lines',
  },
  {
    name: 'set',
    symbol: '[T, T, T]',
    purpose: 'create a closed set with one or more type tokens (heterogeneous and nested)',
    example: '[Evidence, Inference, Proposal]',
    non_example: 'mixed shapes must be wrapped: declare Tokens = [Evidence, Inference]',
  },
];
