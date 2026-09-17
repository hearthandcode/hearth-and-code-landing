// Barrel for canonical matrices.
// Each matrix is a separate typed module; this file re-exports them
// under stable names so consumers can import from one place.
//
// Source: Hearth & Code Hub, project 0047, canonical §"Data matrix".

export type { HcanMatrix, HcanGrammarEntry, HcanMatrixSummary } from './matrices/matrix-types';

import { canonicalFeatureInventory } from './matrices/feature-inventory';
import { canonicalAnalyticalScores } from './matrices/analytical-scores';
import { canonicalGenerativeScores } from './matrices/generative-scores';
import { canonicalMethodology } from './matrices/methodology';
import { canonicalToolingSupport } from './matrices/tooling-support';
import { canonicalFutureExtensions } from './matrices/future-extensions';
import { canonicalStierTargets } from './matrices/stier-targets';
import { canonicalGrammar } from './matrices/grammar';

export {
  canonicalFeatureInventory,
  canonicalAnalyticalScores,
  canonicalGenerativeScores,
  canonicalMethodology,
  canonicalToolingSupport,
  canonicalFutureExtensions,
  canonicalStierTargets,
  canonicalGrammar,
};

export const canonicalMatrices = [
  canonicalFeatureInventory,
  canonicalAnalyticalScores,
  canonicalGenerativeScores,
  canonicalMethodology,
  canonicalToolingSupport,
  canonicalFutureExtensions,
  canonicalStierTargets,
] as const;
