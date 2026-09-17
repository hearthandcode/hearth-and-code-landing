import { useState } from 'react';
import HCANProgram from './HCANProgram';

export interface GrammarPrimitive {
  name: string;
  symbol: string;
  purpose: string;
  example: string;
  nonExample?: string;
}

const SYMBOL_COLORS: Record<string, string> = {
  verb: '#c78dfa', binding: '#78beff', shape: '#96dc96', flow: '#8c96a5',
  probe: '#ffc85a', guard: '#ff8278', label: '#fabe5a', suspend: '#82dcdc',
  define: '#78beff', join: '#8c96a5', fork: '#8c96a5',
};

const ORDER = ['verb', 'binding', 'shape', 'flow', 'probe', 'guard', 'label', 'define', 'join', 'fork', 'suspend'];

/** Component 4 per the brief: the ten grammar primitives as a card wall
 * with the canonical order line above. Click a card to flip to the non-example. */
export default function HCANGrammar({ primitives }: { primitives: GrammarPrimitive[] }) {
  const [flipped, setFlipped] = useState<string | null>(null);

  return (
    <section className="hcanx-grammar" aria-label="HCAN grammar primitives">
      <HCANProgram compact code={'verb @bindings :shape -> operation ?probes !guards'} className="hcanx-grammar__order" />
      <div className="hcanx-grammar__grid">
        {primitives.map((p) => {
          const color = SYMBOL_COLORS[p.name] ?? '#8d8579';
          const isFlipped = flipped === p.name;
          return (
            <button
              type="button"
              key={p.name}
              className={`hcanx-gcard hcanx-gcard--primitive${isFlipped ? ' hcanx-gcard--flipped' : ''}`}
              data-primitive={p.name}
              onClick={() => setFlipped(isFlipped ? null : p.name)}
              aria-pressed={isFlipped}
            >
              <header className="hcanx-gcard__head">
                <span className="hcanx-gcard__symbol" style={{ color }}>{p.symbol}</span>
                <span className="hcanx-gcard__name">{p.name}</span>
              </header>
              {!isFlipped ? (
                <>
                  <p className="hcanx-gcard__purpose">{p.purpose}</p>
                  <code className="hcanx-gcard__example">{p.example}</code>
                </>
              ) : (
                p.nonExample ? (
                  <p className="hcanx-gcard__nonexample"><em>non-example</em> {p.nonExample}</p>
                ) : (
                  <p className="hcanx-gcard__purpose">{p.purpose}</p>
                )
              )}
            </button>
          );
        })}
      </div>
      <p className="hcanx-grammar__hint">click a primitive to see its non-example</p>
    </section>
  );
}
