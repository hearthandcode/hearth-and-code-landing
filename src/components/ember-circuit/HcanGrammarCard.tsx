import type { BaseProps } from './types';
import type { HcanGrammarEntry } from '../../data/canonical-matrices';

export interface HcanGrammarCardProps extends BaseProps {
  primitive?: string;
  grammar: HcanGrammarEntry[];
}

/** Canonical HCAN grammar entries, rendered as cards.
 * Source: Hearth & Code Hub, project 0047, canonical article §"The grammar".
 * When `primitive` is given, renders a focused detail view.
 * Otherwise renders the full entry list as a tile grid. */
export function HcanGrammarCard({ primitive, grammar, className }: HcanGrammarCardProps) {
  const entry = primitive ? grammar.find((g) => g.name === primitive || g.symbol === primitive) : null;
  if (entry) {
    return (
      <article className={`ec-hcan-grammar-card ec-hcan-grammar-card--detail ${className ?? ''}`} data-primitive={entry.name}>
        <header className="ec-hcan-grammar-card__head">
          <span className="ec-hcan-grammar-card__name">{entry.name}</span>
          <span className="ec-hcan-grammar-card__symbol">{entry.symbol || '—'}</span>
        </header>
        <p className="ec-hcan-grammar-card__purpose">{entry.purpose}</p>
        <pre className="ec-hcan-grammar-card__example">{entry.example}</pre>
        {entry.non_example && (
          <>
            <p className="ec-hcan-grammar-card__non-example-label">non-example</p>
            <pre className="ec-hcan-grammar-card__non-example">{entry.non_example}</pre>
          </>
        )}
      </article>
    );
  }

  return (
    <section className={`ec-hcan-grammar-cards ${className ?? ''}`} aria-label="HCAN primitive grammar reference">
      {grammar.map((g) => (
        <article key={g.name} className="ec-hcan-grammar-card ec-hcan-grammar-card--tile" data-primitive={g.name}>
          <header className="ec-hcan-grammar-card__head">
            <span className="ec-hcan-grammar-card__name">{g.name}</span>
            <span className="ec-hcan-grammar-card__symbol">{g.symbol || '—'}</span>
          </header>
          <p className="ec-hcan-grammar-card__purpose">{g.purpose}</p>
          <pre className="ec-hcan-grammar-card__example">{g.example}</pre>
        </article>
      ))}
    </section>
  );
}

export default HcanGrammarCard;
