// Canonical article data, adapted to the brief's component prop shapes.
// Single source of truth: 0047/09-field-journal/0001-hcan-field-journal-article.md
// (per the brief: "parse them as props; do not add data not in YAML blocks").

import type { BenchmarkRow, BenchmarkSummary } from '../components/hcan/HCANBenchmark';
import { hcanExamples } from './hcan-program-cards';
import { canonicalAnalyticalScores } from './matrices/analytical-scores';
import { canonicalGenerativeScores } from './matrices/generative-scores';
import { canonicalMethodology } from './matrices/methodology';
import { canonicalToolingSupport } from './matrices/tooling-support';
import { canonicalFeatureInventory } from './matrices/feature-inventory';
import { canonicalFutureExtensions } from './matrices/future-extensions';
import { canonicalStierTargets } from './matrices/stier-targets';
import { canonicalGrammar } from './matrices/grammar';

export { hcanExamples };

export function humanizeDim(raw: string): string {
  const stripped = raw.replace(/^[dg]\d+\s+/, '');
  return stripped.charAt(0).toUpperCase() + stripped.slice(1);
}

function toRows(matrix: typeof canonicalAnalyticalScores | typeof canonicalGenerativeScores, generative: boolean): BenchmarkRow[] {
  return matrix.rows.map((r) => {
    const row = generative
      ? { dimension: r[0], hcan: parseFloat(r[1]), prose: parseFloat(r[2]), tier: r[3], result: r[4], consensus: r[5] }
      : { dimension: r[0], hcan: parseFloat(r[1]), prose: parseFloat(r[2]), tier: r[3], result: r[4] };
    return { ...row, dimension: humanizeDim(String(row.dimension)) } as BenchmarkRow;
  });
}

export const analyticalPanel = {
  panel: 'analytical' as const,
  title: canonicalAnalyticalScores.title,
  tierScale: canonicalAnalyticalScores.tier_scale,
  rows: toRows(canonicalAnalyticalScores, false),
  summary: canonicalAnalyticalScores.summary as unknown as BenchmarkSummary,
};

export const generativePanel = {
  panel: 'generative' as const,
  title: canonicalGenerativeScores.title,
  tierScale: canonicalGenerativeScores.tier_scale,
  rows: toRows(canonicalGenerativeScores, true),
  summary: canonicalGenerativeScores.summary as unknown as BenchmarkSummary,
};

export const methodologyMatrix = { ...canonicalMethodology };
export const toolingMatrix = { ...canonicalToolingSupport };
export const featureMatrix = { ...canonicalFeatureInventory };
export const futureMatrix = { ...canonicalFutureExtensions };
export const stierMatrix = { ...canonicalStierTargets };

export const grammarPrimitives = canonicalGrammar.map((g) => ({
  name: g.name,
  symbol: g.symbol ?? '—',
  purpose: g.purpose,
  example: g.example,
  nonExample: g.non_example,
}));

/** Attributed summaries from two distinct candidate project records.
 * The versioned results are reported, not independently reconciled here. */
export const protocolSummaries = {
  analytical: {
    version: 'v4.2',
    wins: '15/16',
    tiers: '10 S · 5 A · 1 B',
    preference: 'reported unanimous (5-0)',
    avg: '4.71',
    loss: 'brevity 4.0 B vs 4.6 A (accepted structural trade)',
    note: 'Separate rendering-brief summary; detailed bars below show the v3 article matrix, not these v4.2 rows.',
  },
  generative: {
    version: '13-dim panel',
    wins: '13/13',
    tiers: '3 S · 4 A',
    preference: 'reported 8\u20131 preference (3 judges, 3 fixtures)',
    avg: '4.3 vs 3.1',
    loss: 'human evaluator preferred the information shape but found the one-line cards difficult to read',
    note: 'Project record reports 13/13 dimensions on three within-capability fixtures; not a general efficacy result.',
  },
};
