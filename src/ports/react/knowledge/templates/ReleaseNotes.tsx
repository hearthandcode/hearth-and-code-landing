/**
 * ReleaseNotes (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface ReleaseNotesProps {
product: string;
releases: Release[];
class?: string;
  className?: string;
}

export function ReleaseNotes(props: ReleaseNotesProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-releasenotes', className].filter(Boolean).join(' ')}>
      <span className="kc-releasenotes__placeholder">ReleaseNotes (React port)</span>
    </div>
  );
}
