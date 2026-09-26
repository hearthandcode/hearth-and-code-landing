/**
 * ConceptTerm (React port)
 * Source: src/components/knowledge/atoms/ConceptTerm.astro
 * Knowledge primitive (k-atom): k-concept-term
 *
 * Defined term with type indicator
 */
import * as React from 'react';

export interface ConceptTermProps {
  term: string;
  type?: 'noun' | 'verb' | 'adjective' | 'phrase' | 'abbreviation';
  definition?: string;
  href?: string;
  className?: string;
}

const typeIndicators: Record<string, string> = {
  noun: '◆',
  abbreviation: '⌖',
  verb: '◆',
  phrase: '◆',
  adjective: '◆',
};

export function ConceptTerm({
  term,
  type = 'noun',
  definition,
  href,
  className = '',
}: ConceptTermProps) {
  const classes = ['kc-concept-term', `kc-concept-term--${type}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      <span className="kc-concept-term__type" aria-label={`type: ${type}`}>{typeIndicators[type]}</span>
      <span className="kc-concept-term__label">{term}</span>
    </>
  );
  return href ? (
    <a className={classes} title={definition} href={href}>{content}</a>
  ) : (
    <span className={classes} title={definition}>{content}</span>
  );
}
