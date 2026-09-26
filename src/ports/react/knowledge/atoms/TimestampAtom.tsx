/**
 * TimestampAtom (React port)
 * Source: src/components/knowledge/atoms/TimestampAtom.astro
 * Knowledge primitive (k-atom): k-timestamp
 *
 * Relative time + machine timestamp
 */
import * as React from 'react';

export interface TimestampAtomProps {
  iso: string;
  relative?: string;
  variant?: 'absolute' | 'relative' | 'both';
  className?: string;
}

export function TimestampAtom({
  iso,
  relative,
  variant = 'both',
  className = '',
}: TimestampAtomProps) {
  const classes = ['kc-timestamp', `kc-timestamp--${variant}`, className].filter(Boolean).join(' ');
  const rel = relative ?? iso;
  return (
    <time className={classes} dateTime={iso} title={iso}>
      {variant === 'absolute' && <span>{iso}</span>}
      {variant === 'relative' && <span>{rel}</span>}
      {variant === 'both' && (
        <>
          <span className="kc-timestamp__rel">{rel}</span>
          <span className="kc-timestamp__iso">· {iso}</span>
        </>
      )}
    </time>
  );
}
