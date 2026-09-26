/**
 * CitationRef (React port)
 *
 * Auto-generated from: k-citation-ref
 * Source: src/components/knowledge/atoms/CitationRef.astro
 *
 * NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
 */

export interface CitationRefProps {
  author: string;
  year: string;
  locator?: string;
  href?: string;
  variant: string;
}

export function CitationRef({
  author,
  year,
  locator,
  href,
  variant = "inline",
}: CitationRefProps) {
  return (
    <div className="kc-k-citation-ref kc-k-citation-ref--placeholder">
      <span>CitationRef (React port)</span>
      {/* TODO: port rendering logic from src/components/knowledge/atoms/CitationRef.astro */}
    </div>
  );
}
