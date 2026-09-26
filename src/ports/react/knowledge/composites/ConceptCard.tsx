/**
 * ConceptCard (React port)
 * Source: src/components/knowledge/composites/ConceptCard.astro
 * Knowledge composite (k-composite): k-concept-card
 *
 * Term + definition + relations
 */
import * as React from 'react';

interface Relation {
  verb: 'is-a' | 'part-of' | 'causes' | 'requires' | 'enables' | 'extends' | 'same-as';
  target: string;
}

export interface ConceptCardProps {
  term: string;
  definition: string;
  type?: string;
  relations?: Relation[];
  source?: string;
  className?: string;
}

export function ConceptCard({
  term,
  definition,
  type,
  relations = [],
  source,
  className = '',
}: ConceptCardProps) {
  const classes = ['kc-concept-card', className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <header className="kc-concept-card__header">
        <h4 className="kc-concept-card__term">{term}</h4>
        {type && <span className="kc-concept-card__type">{type}</span>}
      </header>
      <p className="kc-concept-card__definition">{definition}</p>
      {relations.length > 0 && (
        <div className="kc-concept-card__relations">
          {relations.map((r, i) => (
            <div key={i} className="kc-concept-card__relation">
              <span className="kc-concept-card__verb">{r.verb}</span>
              <span className="kc-concept-card__target">{r.target}</span>
            </div>
          ))}
        </div>
      )}
      {source && <footer className="kc-concept-card__source">— {source}</footer>}
    </article>
  );
}
