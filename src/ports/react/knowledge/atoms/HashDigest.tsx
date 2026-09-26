/**
 * HashDigest (React port)
 *
 * Auto-generated from: k-hash-digest
 * Source: src/components/knowledge/atoms/HashDigest.astro
 *
 * NOTE: Skeleton port. Visual fidelity depends on host framework CSS.
 */

export interface HashDigestProps {
  hash: string;
  algorithm: string;
  prefix: boolean;
}

export function HashDigest({
  hash,
  algorithm = "sha256",
  prefix = true,
}: HashDigestProps) {
  return (
    <div className="kc-k-hash-digest kc-k-hash-digest--placeholder">
      <span>HashDigest (React port)</span>
      {/* TODO: port rendering logic from src/components/knowledge/atoms/HashDigest.astro */}
    </div>
  );
}
