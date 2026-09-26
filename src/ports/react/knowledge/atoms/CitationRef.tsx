/**
 * CitationRef (React port)
 * Source: src/components/knowledge/atoms/CitationRef.astro
 * Knowledge primitive (k-atom): k-citation-ref
 *
 * Minimal source reference (author/year/locator)
 */
import * as React from 'react';

export interface CitationRefProps {
  author: string;
  year: number | string;
  locator?: string;
  href?: string;
  variant?: 'inline' | 'footnote' | 'parenthetical';
  className?: string;
}

export function CitationRef({
  author,
  year,
  locator,
  href,
  variant = 'inline',
  className = '',
}: CitationRefProps) {
  const classes = ['kc-citation-ref', `kc-citation-ref--${variant}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      <span className="kc-citation-ref__author">{author}</span>
      <span className="kc-citation-ref__year">({year})</span>
      {locator && <span className="kc-citation-ref__locator">{locator}</span>}
    </>
  );
  if (href) {
    return <a className={classes} href={href}>{content}</a>;
  }
  return <span className={classes}>{content}</span>;
}

const styles = `
.kc-citation-ref {
  display: inline-flex;
  align-items: baseline;
  gap: 0.15em;
  font-family: var(--font-mono);
  font-size: 0.8125rem;
  color: var(--color-text-secondary);
}
.kc-citation-ref__author { color: var(--color-text-display); }
.kc-citation-ref__year { color: var(--color-text-secondary); }
.kc-citation-ref__locator {
  color: var(--color-accent-signal);
  font-weight: var(--font-weight-medium);
}
.kc-citation-ref--link { text-decoration: none; }
.kc-citation-ref--link:hover { color: var(--color-accent-plasma); }
.kc-citation-ref--footnote {
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  border-bottom: 1px dotted var(--color-surface-rule-strong);
}
.kc-citation-ref--parenthetical { color: var(--color-text-secondary); }
`;

export function CitationRefStyles() {
  return <style dangerouslySetInnerHTML={{ __html: styles }} />;
}
