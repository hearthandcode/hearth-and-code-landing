// Canonical matrix type definitions.
// Source: Hearth & Code Hub, project 0047, canonical §"Data matrix".
// Each matrix is a row of cells where every cell is a string (numbers stringify);
// `summary` is a free-form projection for the matrix-level stat strip.

export interface HcanMatrixSummary {
  wins?: number;
  ties?: number;
  losses?: number;
  avg_tier?: string;
  avg_hcan?: number;
  avg_prose?: number;
  preference?: string;
  s_tier_count?: number;
  a_tier_count?: number;
  projected_average?: number;
  projected_tier?: string;
  projected_s_count?: number;
  [key: string]: unknown;
}

export interface HcanMatrix {
  id: string;
  title: string;
  columns: string[];
  rows: ReadonlyArray<ReadonlyArray<string>>;
  /** Optional tier legend string. */
  tier_scale?: string;
  /** Optional judges reference (for multi-judge panels). */
  judges?: string[];
  /** Optional per-matrix summary stat strip. */
  summary?: HcanMatrixSummary;
  /** Optional aggregate counts (methodology + tooling tables). */
  total_model_calls?: number;
  total_human_sessions?: number;
  /** Reusable flag (methodology table). */
  reusable?: boolean;
  /** Optional implementation note surfaced in the matrix footer. */
  implementation?: string;
}

/** HCAN grammar entry (canonical §"The grammar"). */
export interface HcanGrammarEntry {
  name: string;
  symbol?: string;
  purpose: string;
  example: string;
  non_example?: string;
}
