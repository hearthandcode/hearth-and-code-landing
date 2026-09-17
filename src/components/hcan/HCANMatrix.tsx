import { useState } from 'react';

export interface HcanMatrixData {
  id: string;
  title: string;
  columns: string[];
  tierScale?: string;
  rows: ReadonlyArray<ReadonlyArray<string>>;
  summary?: Record<string, unknown>;
  totals?: Record<string, unknown>;
}

/** Component 5 per the brief: generic sortable matrix renderer with
 * column header sort + optional summary footer. */
export default function HCANMatrix({ matrix, compact = false }: { matrix: HcanMatrixData; compact?: boolean }) {
  const [sort, setSort] = useState<{ col: number; dir: 'asc' | 'desc' } | null>(null);

  const numeric = (v: string) => {
    const n = parseFloat(v);
    return Number.isFinite(n) ? n : null;
  };

  const sorted = sort === null ? matrix.rows : [...matrix.rows].sort((a, b) => {
    const av = a[sort.col] ?? '';
    const bv = b[sort.col] ?? '';
    const an = numeric(String(av));
    const bn = numeric(String(bv));
    const cmp = an !== null && bn !== null ? an - bn : String(av).localeCompare(String(bv));
    return sort.dir === 'asc' ? cmp : -cmp;
  });

  const setNextSort = (col: number) => {
    setSort(prev =>
      prev && prev.col === col
        ? { col, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { col, dir: 'asc' }
    );
  };

  return (
    <section className="hcanx-matrix" data-matrix-id={matrix.id} data-compact={compact || undefined}>
      <header className="hcanx-matrix__head">
        <h3 className="hcanx-matrix__title">{matrix.title}</h3>
        {matrix.tierScale && <p className="hcanx-matrix__scale">{matrix.tierScale}</p>}
      </header>
      <div className="hcanx-matrix__scroll">
        <table className="hcanx-table">
          <thead>
            <tr>
              {matrix.columns.map((col, ci) => (
                <th key={col}>
                  <button type="button" onClick={() => setNextSort(ci)}>
                    {col}{sort && sort.col === ci ? (sort.dir === 'asc' ? ' \u2191' : ' \u2193') : ''}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td key={ci} className={ci === 0 ? 'hcanx-table__rowlabel' : undefined}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {matrix.summary && (
        <footer className="hcanx-matrix__summary">
          {Object.entries(matrix.summary).map(([k, v]) => (
            <span key={k}><em>{k.replace(/_/g, ' ')}</em> {String(v)}</span>
          ))}
        </footer>
      )}
      {matrix.totals && (
        <footer className="hcanx-matrix__summary">
          {Object.entries(matrix.totals).map(([k, v]) => (
            <span key={k}><em>{k.replace(/_/g, ' ')}</em> {String(v)}</span>
          ))}
        </footer>
      )}
    </section>
  );
}
