/**
 * QuoteCard (React port)
 * Source: src/components/knowledge/composites/QuoteCard.astro
 * Knowledge composite (k-composite): c-quote-card
 */
import * as React from 'react';

export interface QuoteCardProps {
  quote: string;
  attribution?: string;
  source?: string;
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function QuoteCard({
  quote,
  attribution,
  source,
  accent = 'balanced',
  className = '',
}: QuoteCardProps) {
  const classes = ['kc-quote-card', `kc-quote-card--${accent}`, className].filter(Boolean).join(' ');
  return (
    <blockquote className={classes}>
      <div className="kc-quote-card__mark" aria-hidden="true">"</div>
      <p className="kc-quote-card__quote">{quote}</p>
      {(attribution || source) && (
        <footer className="kc-quote-card__attribution">
          {attribution && <span className="kc-quote-card__author">{attribution}</span>}
          {source && <span className="kc-quote-card__source">— {source}</span>}
        </footer>
      )}
    </blockquote>
  );
}
