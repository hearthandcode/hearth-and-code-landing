/**
 * ConfidenceBar (React port)
 *
 * Auto-generated from: k-confidence-bar
 * Source: src/components/knowledge/atoms/ConfidenceBar.astro
 *
 * NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
 */

export interface ConfidenceBarProps {
  value: number;
  max: number;
  variant: string;
  showValue: boolean;
}

export function ConfidenceBar({
  value,
  max = 100,
  variant = "medium",
  showValue = false,
}: ConfidenceBarProps) {
  return (
    <div className="kc-k-confidence-bar kc-k-confidence-bar--placeholder">
      <span>ConfidenceBar (React port)</span>
      {/* TODO: port rendering logic from src/components/knowledge/atoms/ConfidenceBar.astro */}
    </div>
  );
}
