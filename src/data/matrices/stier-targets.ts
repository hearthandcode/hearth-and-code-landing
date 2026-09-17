// Matrix 7: stier-targets
import type { HcanMatrix } from './matrix-types';

export const canonicalStierTargets: HcanMatrix = {
  id: 'stier-targets',
  title: 'S-Tier Refinement Targets \u2014 Analytical Panel',
  columns: ['dimension', 'current', 'tier', 'projected', 'tier', 'refinement'],
  tier_scale: 'S\u22654.8, A\u22654.2, B\u22653.6, C\u22653.0, D\u22652.4, F<2.4',
  rows: [
    ['d02 verify', '3.4', 'C', '4.4', 'A', 'grounding citations \u2014 every %evidence claim carries a parenthesized locator'],
    ['d10 brevity', '2.8', 'D', '3.6', 'B', 'format compression \u2014 unknowns inline, 4-line scaffolding instead of 8'],
    ['d12 no-overclaim', '3.2', 'C', '4.2', 'A', 'confidence qualifiers \u2014 closed set @high/@medium/@low on every claim'],
    ['d16 calibrated confidence', '3.2', 'C', '4.2', 'A', 'confidence qualifiers (same as d12) \u2014 visible scale makes calibration inspectable'],
    ['d09 structure', '3.4', 'C', '4.4', 'A', 'section anchors \u2014 ## FINDINGS, ## UNKNOWNS, ## NEXT, ## EFFECTS'],
    ['d11 completeness', '3.4', 'C', '4.4', 'A', 'sub-task checklist \u2014 map() fields checked off in the body'],
    ['d14 reproducible', '3.4', 'C', '4.4', 'A', 'method line \u2014 comma-list of actual operations performed'],
    ['d06 next actionability', '3.4', 'C', '4.4', 'A', 'single-command NEXT \u2014 exactly one HCAN line, no prose'],
    ['d01 scope', '3.8', 'B', '4.8', 'S', 'scope-restated header \u2014 the binding echoed at the top of every return'],
    ['d03 unknowns', '4.0', 'B', '4.8', 'S', 'unknown-count badge \u2014 ## UNKNOWNS (3) \u2014 gaps counted, not just listed'],
    ['d04 unknown anatomy', '3.8', 'B', '4.8', 'S', 'resolver-cost column \u2014 trivial|small|medium|large per unknown'],
    ['d05 boundary', '3.8', 'B', '4.8', 'S', 'guard-scope table \u2014 !no-write(files) !no-send(network) \u2014 scope explicit'],
    ['d07 grounding', '3.6', 'B', '4.8', 'S', 'line-number citations \u2014 (L12) or (file:config.yaml) per claim'],
    ['d08 labels', '4.0', 'B', '4.8', 'S', 'label-per-line mandate \u2014 every non-header line carries \u22651 %label'],
    ['d13 falsifiability', '3.8', 'B', '4.8', 'S', 'experiment template \u2014 TEST: hypothesis|method|expected-true|expected-false'],
    ['d15 decision-ready', '3.6', 'B', '4.8', 'S', 'decision-menu \u2014 DECISION: accept|amend|reject + one-line reason'],
  ],
  summary: {
    projected_average: 4.3,
    projected_tier: 'A',
    projected_s_count: 8,
  },
  // Notes field surfaced in title; implementation note is a free-form annotation.
  // Keep parity with the canonical by reusing `summary` field for the projection average.
  implementation: 'protocol-level text changes only \u2014 no grammar changes, no new primitives',
};
