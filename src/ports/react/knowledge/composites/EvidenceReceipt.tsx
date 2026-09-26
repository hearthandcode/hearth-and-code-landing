/**
 * EvidenceReceipt (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface EvidenceReceiptProps {
id: string;
type: 'document' | 'testimony' | 'observation' | 'measurement' | 'artifact';
description: string;
hash: string;
hashAlgorithm?: 'sha256' | 'sha1' | 'blake3';
timestamp: string;
witness?: string;
locator?: string;
class?: string;
  className?: string;
}

export function EvidenceReceipt(props: EvidenceReceiptProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-evidencereceipt', className].filter(Boolean).join(' ')}>
      <span className="kc-evidencereceipt__placeholder">EvidenceReceipt (React port)</span>
    </div>
  );
}
