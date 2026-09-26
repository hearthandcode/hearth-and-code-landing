/**
 * SeverityDot (React port)
 *
 * Auto-generated from: k-severity-dot
 * Source: src/components/knowledge/atoms/SeverityDot.astro
 *
 * NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
 */

export interface SeverityDotProps {
  severity: string;
  label?: string;
  size: string;
  pulsing: boolean;
}

export function SeverityDot({
  severity,
  label,
  size = "md",
  pulsing = false,
}: SeverityDotProps) {
  return (
    <div className="kc-k-severity-dot kc-k-severity-dot--placeholder">
      <span>SeverityDot (React port)</span>
      {/* TODO: port rendering logic from src/components/knowledge/atoms/SeverityDot.astro */}
    </div>
  );
}
