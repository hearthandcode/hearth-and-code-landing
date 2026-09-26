/**
 * ClaimMarker (React port)
 * Source: src/components/knowledge/atoms/ClaimMarker.astro
 * Knowledge primitive (k-atom): k-claim-marker
 *
 * Numbered claim marker for citations
 */
import * as React from 'react';

export interface ClaimMarkerProps {
  index: number;
  confidence?: number;
  href?: string;
  className?: string;
}

export function ClaimMarker({
  index,
  confidence,
  href,
  className = '',
}: ClaimMarkerProps) {
  const color =
    confidence === undefined ? 'var(--color-text-secondary)' :
    confidence >= 80 ? 'var(--color-state-success)' :
    confidence >= 50 ? 'var(--color-accent-gold)' :
    'var(--color-state-error)';
  const classes = ['kc-claim-marker', className].filter(Boolean).join(' ');
  const content = (
    <>
      <span className="kc-claim-marker__bracket">[</span>
      <span className="kc-claim-marker__index">{index}</span>
      <span className="kc-claim-marker__bracket">]</span>
    </>
  );
  return (
    <TagWrapper Tag={href ? 'a' : 'span'} href={href} className={classes} style={{ '--claim-color': color } as React.CSSProperties} title={confidence !== undefined ? `Confidence: ${confidence}%` : undefined}>
      {content}
    </TagWrapper>
  );
}

function TagWrapper({ Tag, href, className, style, title, children }: any) {
  if (Tag === 'a') {
    return <a className={className} style={style} title={title} href={href}>{children}</a>;
  }
  return <span className={className} style={style} title={title}>{children}</span>;
}
