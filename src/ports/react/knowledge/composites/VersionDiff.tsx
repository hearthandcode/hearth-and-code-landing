/**
 * VersionDiff (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface VersionDiffProps {
before: { version: string; lines: Line[] };
after: { version: string; lines: Line[] };
class?: string;
  className?: string;
}

export function VersionDiff(props: VersionDiffProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-versiondiff', className].filter(Boolean).join(' ')}>
      <span className="kc-versiondiff__placeholder">VersionDiff (React port)</span>
    </div>
  );
}
