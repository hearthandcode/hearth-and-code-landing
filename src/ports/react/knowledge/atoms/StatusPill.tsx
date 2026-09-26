/**
 * StatusPill (React port)
 *
 * Auto-generated from: k-status-pill
 * Source: src/components/knowledge/atoms/StatusPill.astro
 *
 * NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
 */

export interface StatusPillProps {
  status: string;
  label?: string;
  size: string;
}

export function StatusPill({
  status,
  label,
  size = "md",
}: StatusPillProps) {
  return (
    <div className="kc-k-status-pill kc-k-status-pill--placeholder">
      <span>StatusPill (React port)</span>
      {/* TODO: port rendering logic from src/components/knowledge/atoms/StatusPill.astro */}
    </div>
  );
}
