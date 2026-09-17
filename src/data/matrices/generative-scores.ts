// Matrix 3: generative-scores
import type { HcanMatrix } from './matrix-types';

export const canonicalGenerativeScores: HcanMatrix = {
  id: 'generative-scores',
  title: 'Generative Panel \u2014 HCAN vs Plain Prose (3-Judge Consensus)',
  columns: ['dimension', 'hcan_avg', 'prose_avg', 'tier', 'result', 'judge_consensus'],
  tier_scale: 'S\u22654.8, A\u22654.2, B\u22653.6, C\u22653.0, D\u22652.4, F<2.4',
  judges: ['zai/glm-5.3', 'openrouter/auto', 'openai-codex'],
  rows: [
    ['g01 ideation breadth', '4.3', '3.6', 'A', 'WIN', '3/3 WIN'],
    ['g02 novelty (not near-copies)', '3.9', '2.9', 'B', 'WIN', '3/3 WIN'],
    ['g03 relation grounding', '4.7', '3.5', 'A', 'WIN', '3/3 WIN'],
    ['g06 pruning discipline', '3.6', '2.7', 'B', 'WIN', '3/3 WIN'],
    ['g07 synthesis across sources', '4.6', '3.2', 'A', 'WIN', '3/3 WIN'],
    ['g08 falsifiability', '4.9', '2.9', 'S', 'WIN', '3/3 WIN'],
    ['g10 precedent awareness', '4.6', '3.8', 'A', 'WIN', '3/3 WIN'],
    ['g11 surprise (non-obvious yet plausible)', '3.9', '2.8', 'B', 'WIN', '3/3 WIN'],
    ['g12 coherence across ideas', '4.6', '3.8', 'A', 'WIN', '3/3 WIN'],
    ['g13 actionability', '3.3', '3.1', 'C', 'WIN', '2/3 WIN, 1 tie'],
    ['g14 risk surface named', '4.8', '3.3', 'S', 'WIN', '3/3 WIN'],
    ['g15 generativity (seeds further work)', '4.1', '3.2', 'B', 'WIN', '3/3 WIN'],
    ['g16 calibration', '4.8', '2.5', 'S', 'WIN', '3/3 WIN'],
  ],
  summary: {
    wins: 13,
    ties: 0,
    losses: 0,
    preference: '8\u20131 hcan (3 judges \u00d7 3 fixtures)',
    avg_hcan: 4.3,
    avg_prose: 3.1,
    avg_tier: 'A',
    s_tier_count: 3,
    a_tier_count: 4,
  },
};
