/**
 * HashDigest (React port)
 * Source: src/components/knowledge/atoms/HashDigest.astro
 * Knowledge primitive (k-atom): k-hash-digest
 *
 * Short hash with click-to-copy (interactive)
 */
import * as React from 'react';

export interface HashDigestProps {
  hash: string;
  algorithm?: 'sha256' | 'sha1' | 'md5' | 'blake3';
  prefix?: boolean;
  className?: string;
}

export function HashDigest({
  hash,
  algorithm = 'sha256',
  prefix = true,
  className = '',
}: HashDigestProps) {
  const id = React.useId();
  const [copied, setCopied] = React.useState(false);
  const display = prefix ? `${algorithm}:${hash.slice(0, 12)}…` : hash.slice(0, 12);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch (e) {
      console.error('Copy failed', e);
    }
  };

  return (
    <span
      className={['kc-hash-digest', className].filter(Boolean).join(' ')}
      onClick={handleCopy}
      title={`Click to copy · ${algorithm}:${hash}`}
      style={{ cursor: 'pointer' }}
    >
      <span className="kc-hash-digest__algo">{algorithm}</span>
      <span className="kc-hash-digest__hash">{display}</span>
      <span className="kc-hash-digest__copy" aria-hidden="true">⧉</span>
      {copied && <span className="kc-hash-digest__copied">copied</span>}
    </span>
  );
}
