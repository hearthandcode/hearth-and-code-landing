/**
 * ConceptTerm (React port)
 *
 * Auto-generated from: k-concept-term
 * Source: src/components/knowledge/atoms/ConceptTerm.astro
 *
 * NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
 */

export interface ConceptTermProps {
  term: string;
  type: string;
  definition?: string;
  href?: string;
}

export function ConceptTerm({
  term,
  type = "noun",
  definition,
  href,
}: ConceptTermProps) {
  return (
    <div className="kc-k-concept-term kc-k-concept-term--placeholder">
      <span>ConceptTerm (React port)</span>
      {/* TODO: port rendering logic from src/components/knowledge/atoms/ConceptTerm.astro */}
    </div>
  );
}
