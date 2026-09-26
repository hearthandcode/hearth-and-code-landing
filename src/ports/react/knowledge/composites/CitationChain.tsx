/**
 * CitationChain (React port)
 * Source: src/components/knowledge/composites/CitationChain.astro
 * Knowledge composite (k-composite): k-citation-chain
 *
 * Linear chain of citations
 */
import * as React from 'react';

interface Citation {
  author: string;
  year: number | string;
  locator?: string;
  href?: string;
}

export interface CitationChainProps {
  citations: Citation[];
  label?: string;
  separator?: 'arrow' | 'pipe' | 'dot';
  className?: string;
}

const separatorMap: Record<string, string> = {
  arrow: '→',
  pipe: '│',
  dot: '·',
};

export function CitationChain({
  citations,
  label,
  separator = 'arrow',
  className = '',
}: CitationChainProps) {
  const sep = separatorMap[separator];
  const classes = ['kc-citation-chain', `kc-citation-chain--${separator}`, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      {label && <p className="kc-citation-chain__label">{label}</p>}
      <div className="kc-citation-chain__list">
        {citations.map((c, i) => (
          <span key={i} className="kc-citation-chain__item">
            <span className="kc-citation-chain__index">{i + 1}</span>
            <span className="kc-citation-chain__ref">
              <a
                className="kc-citation-chain__link"
                href={c.href}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <span className="kc-citation-chain__author">{c.author}</span>
                <span className="kc-citation-chain__year">({c.year})</span>
                {c.locator && <span className="kc-citation-chain__locator">{c.locator}</span>}
              </a>
            </span>
            {i < citations.length - 1 && (
              <span className="kc-citation-chain__sep" aria-hidden="true">{sep}</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
}
