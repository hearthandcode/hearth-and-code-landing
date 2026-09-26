/**
 * DOILink (React port)
 * Source: src/components/knowledge/atoms/DOILink.astro
 * Knowledge primitive (k-atom): k-doi-link
 *
 * DOI hyperlink with doi.org resolver
 */
import * as React from 'react';

export interface DOILinkProps {
  doi: string;
  short?: boolean;
  className?: string;
}

export function DOILink({ doi, short = true, className = '' }: DOILinkProps) {
  const url = doi.startsWith('http') ? doi : `https://doi.org/${doi}`;
  const display = short ? doi.replace(/^https?:\/\/(dx\.)?doi\.org\//, 'doi:') : doi;
  return (
    <a className={['kc-doi-link', className].filter(Boolean).join(' ')} href={url} target="_blank" rel="noopener noreferrer" title={doi}>
      <span className="kc-doi-link__icon" aria-hidden="true">⊕</span>
      <span className="kc-doi-link__label">{display}</span>
    </a>
  );
}
