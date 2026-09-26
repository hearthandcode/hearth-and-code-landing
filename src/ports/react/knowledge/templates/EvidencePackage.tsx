/**
 * EvidencePackage (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface EvidencePackageProps {
title: string;
claim: string;
receipts: Receipt[];
sealedBy?: string;
sealedAt?: string;
class?: string;
  className?: string;
}

export function EvidencePackage(props: EvidencePackageProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-evidencepackage', className].filter(Boolean).join(' ')}>
      <span className="kc-evidencepackage__placeholder">EvidencePackage (React port)</span>
    </div>
  );
}
