/**
 * ProvenanceMarker (React port)
 * Source: src/components/knowledge/atoms/ProvenanceMarker.astro
 * Knowledge primitive (k-atom): k-provenance-marker
 *
 * Provenance badge (6 kinds)
 */
import * as React from 'react';

export interface ProvenanceMarkerProps {
  kind: 'primary' | 'derived' | 'cited' | 'verified' | 'inferred' | 'speculative';
  source?: string;
  className?: string;
}

const kindIcons: Record<string, string> = {
  primary: '◉',
  derived: '⊛',
  cited: '↗',
  verified: '✓',
  inferred: '◐',
  speculative: '◌',
};

export function ProvenanceMarker({
  kind,
  source,
  className = '',
}: ProvenanceMarkerProps) {
  const classes = ['kc-provenance', `kc-provenance--${kind}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes} title={source}>
      <span className="kc-provenance__icon" aria-hidden="true">{kindIcons[kind]}</span>
      <span className="kc-provenance__label">{kind}</span>
    </span>
  );
}
