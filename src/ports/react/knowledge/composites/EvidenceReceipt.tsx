/**
 * EvidenceReceipt (React port)
 * Source: src/components/knowledge/composites/EvidenceReceipt.astro
 * Knowledge composite (k-composite): k-evidence-receipt
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
  className?: string;
}

export function EvidenceReceipt({
  id,
  type,
  description,
  hash,
  hashAlgorithm = 'sha256',
  timestamp,
  witness,
  locator,
  className = '',
}: EvidenceReceiptProps) {
  const shortHash = `${hash.slice(0, 16)}…`;
  const classes = ['kc-evidence-receipt', `kc-evidence-receipt--${type}`, className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <div className="kc-evidence-receipt__corner">
        <span className="kc-evidence-receipt__icon" aria-hidden="true">▪</span>
        <span className="kc-evidence-receipt__type">{type}</span>
      </div>
      <p className="kc-evidence-receipt__desc">{description}</p>
      <dl className="kc-evidence-receipt__details">
        <div>
          <dt>ID</dt>
          <dd>{id}</dd>
        </div>
        <div>
          <dt>Hash</dt>
          <dd>
            <code>{hashAlgorithm}:{shortHash}</code>
          </dd>
        </div>
        <div>
          <dt>Sealed</dt>
          <dd>
            <time dateTime={timestamp}>{timestamp}</time>
          </dd>
        </div>
        {witness && (
          <div>
            <dt>Witness</dt>
            <dd>{witness}</dd>
          </div>
        )}
        {locator && (
          <div>
            <dt>Locator</dt>
            <dd>{locator}</dd>
          </div>
        )}
      </dl>
    </article>
  );
}
