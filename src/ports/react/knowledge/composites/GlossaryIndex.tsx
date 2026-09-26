/**
 * GlossaryIndex (React port)
 * Source: src/components/knowledge/composites/GlossaryIndex.astro
 * Knowledge composite (k-composite): k-glossary-index
 *
 * Interactive: search filter + letter nav
 */
import * as React from 'react';

interface Entry {
  term: string;
  definition: string;
  seeAlso?: string[];
}

export interface GlossaryIndexProps {
  entries: Entry[];
  filterable?: boolean;
  className?: string;
}

export function GlossaryIndex({
  entries,
  filterable = true,
  className = '',
}: GlossaryIndexProps) {
  const [query, setQuery] = React.useState('');

  const grouped: Record<string, Entry[]> = {};
  entries.forEach((e) => {
    const letter = e.term[0].toUpperCase();
    if (!grouped[letter]) grouped[letter] = [];
    grouped[letter].push(e);
  });
  const letters = Object.keys(grouped).sort();

  const filterEntries = (q: string) => {
    if (!q) return entries;
    const lower = q.toLowerCase();
    return entries.filter(
      (e) => e.term.toLowerCase().includes(lower) ||
             e.definition.toLowerCase().includes(lower) ||
             (e.seeAlso || []).some((s) => s.toLowerCase().includes(lower))
    );
  };

  return (
    <div className={['kc-glossary', className].filter(Boolean).join(' ')}>
      {filterable && (
        <input
          type="search"
          className="kc-glossary__search"
          placeholder="Filter terms..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <nav className="kc-glossary__nav" aria-label="Letter navigation">
        {letters.map((l) => (
          <a key={l} href={`#kc-glossary-${l}`} className="kc-glossary__nav-link">{l}</a>
        ))}
      </nav>
      <div className="kc-glossary__content">
        {letters.map((l) => {
          const filtered = filterEntries(query).filter((e) => e.term[0].toUpperCase() === l);
          if (filtered.length === 0) return null;
          return (
            <section key={l} className="kc-glossary__section" id={`kc-glossary-${l}`}>
              <h3 className="kc-glossary__letter">{l}</h3>
              <dl className="kc-glossary__list">
                {filtered.map((e, i) => (
                  <div key={i} className="kc-glossary__entry">
                    <dt className="kc-glossary__term">{e.term}</dt>
                    <dd className="kc-glossary__definition">{e.definition}</dd>
                    {e.seeAlso && e.seeAlso.length > 0 && (
                      <dd className="kc-glossary__see-also">see also: {e.seeAlso.join(', ')}</dd>
                    )}
                  </div>
                ))}
              </dl>
            </section>
          );
        })}
      </div>
    </div>
  );
}
