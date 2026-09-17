// Matrix 2: analytical-scores
import type { HcanMatrix } from './matrix-types';

export const canonicalAnalyticalScores: HcanMatrix = {
  id: 'analytical-scores',
  title: 'Analytical Panel \u2014 HCAN vs Plain Prose (LLM Judge, Blind A/B)',
  columns: ['dimension', 'hcan_score', 'prose_score', 'tier', 'result'],
  tier_scale: 'S\u22654.8, A\u22654.2, B\u22653.6, C\u22653.0, D\u22652.4, F<2.4',
  rows: [
    ['d01 scope visible at a glance', '3.8', '3.2', 'B', 'WIN'],
    ['d02 claims verifiable by reviewer', '3.4', '2.8', 'C', 'WIN'],
    ['d03 unknowns surfaced honestly', '4.0', '3.0', 'B', 'WIN'],
    ['d04 unknown anatomy (what/why/resolver)', '3.8', '2.2', 'B', 'WIN'],
    ['d05 read-only boundary discipline', '3.8', '3.0', 'B', 'WIN'],
    ['d06 one actionable next step', '3.4', '2.8', 'C', 'WIN'],
    ['d07 claims tied to locators', '3.6', '2.8', 'B', 'WIN'],
    ['d08 evidence vs inference distinguishable', '4.0', '2.4', 'B', 'WIN'],
    ['d09 shape navigable (fields/sections)', '3.4', '3.4', 'C', 'tie'],
    ['d10 economy for content delivered', '2.8', '3.4', 'D', 'LOSS'],
    ['d11 all asked sub-parts covered', '3.4', '3.2', 'C', 'WIN'],
    ['d12 no overclaims (verify before absence)', '3.2', '2.8', 'C', 'WIN'],
    ['d13 at least one disconfirmable check', '3.8', '3.0', 'B', 'WIN'],
    ['d14 another agent could redo it', '3.4', '3.0', 'C', 'WIN'],
    ['d15 human could decide alone', '3.6', '3.0', 'B', 'WIN'],
    ['d16 confidence calibrated', '3.2', '2.6', 'C', 'WIN'],
  ],
  summary: {
    wins: 14,
    ties: 1,
    losses: 1,
    preference: '4\u20131 hcan',
    avg_hcan: 3.6,
    avg_prose: 2.9,
    avg_tier: 'B',
  },
};
