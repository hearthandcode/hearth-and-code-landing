/**
 * SynthesisSummary (React port)
 * Source: src/components/knowledge/composites/SynthesisSummary.astro
 * Knowledge composite (k-composite): k-synthesis-summary
 *
 * Multi-source summary with per-claim attribution
 */
import * as React from 'react';

interface Claim {
  text: string;
  sources: { author: string; year: number | string }[];
  confidence?: number;
}

export interface SynthesisSummaryProps {
  title?: string;
  claims: Claim[];
  consensus?: number;
  className?: string;
}

function confidenceClass(c?: number): string {
  if (c === undefined) return '';
  return c >= 80 ? 'kc-synthesis__conf--high' : c >= 50 ? 'kc-synthesis__conf--medium' : 'kc-synthesis__conf--low';
}

export function SynthesisSummary({
  title,
  claims,
  consensus,
  className = '',
}: SynthesisSummaryProps) {
  const classes = ['kc-synthesis', className].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      {title && (
        <header className="kc-synthesis__header">
          <h3 className="kc-synthesis__title">{title}</h3>
          {consensus !== undefined && (
            <span className="kc-synthesis__consensus">Consensus: {consensus}%</span>
          )}
        </header>
      )}
      <ol className="kc-synthesis__claims">
        {claims.map((c, i) => (
          <li key={i} className="kc-synthesis__claim">
            <span className="kc-synthesis__index">[{i + 1}]</span>
            <span className="kc-synthesis__text">{c.text}</span>
            <span className="kc-synthesis__sources">
              {c.sources.map((s, j) => (
                <span key={j} className="kc-synthesis__source">
                  {s.author} ({s.year}){j < c.sources.length - 1 ? ', ' : ''}
                </span>
              ))}
            </span>
            {c.confidence !== undefined && (
              <span className={`kc-synthesis__conf ${confidenceClass(c.confidence)}`}>
                {c.confidence}%
              </span>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
