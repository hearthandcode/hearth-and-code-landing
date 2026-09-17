import type { BaseProps } from './types';
import type { HcanMatrix } from '../../data/canonical-matrices';

export interface HcanMatrixTableProps extends BaseProps {
  matrix: HcanMatrix;
  showSummary?: boolean;
  onlyRows?: number[];
}

export function HcanMatrixTable({ matrix, className, showSummary = true, onlyRows }: HcanMatrixTableProps) {
  const numericIndices = detectNumericColumns(matrix);

  return (
    <section className={`ec-hcan-matrix ${className ?? ''}`} data-matrix-id={matrix.id}>
      <header className="ec-hcan-matrix__head">
        <div>
          <p className="ec-hcan-matrix__eyebrow">canonical matrix \u00b7 {matrix.id}</p>
          <h3 className="ec-hcan-matrix__title">{matrix.title}</h3>
        </div>
        {matrix.tier_scale && (
          <p className="ec-hcan-matrix__tier-scale" aria-label="tier scale">
            <span className="ec-hcan-matrix__tier-scale-label">Tier scale</span>
            <span className="ec-hcan-matrix__tier-scale-values">{matrix.tier_scale}</span>
          </p>
        )}
      </header>

      <div className="ec-hcan-matrix__scroll">
        <table className="ec-hcan-matrix__table" role="table">
          <thead>
            <tr>
              {matrix.columns.map((col, i) => (
                <th
                  key={col + i}
                  scope="col"
                  data-column={col}
                  className={isTierColumn(col) ? 'ec-hcan-matrix__col--tier' : undefined}
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(onlyRows ? matrix.rows.filter((_, i) => onlyRows.includes(i)) : matrix.rows).map((row, ri) => (
              <tr key={ri}>
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    data-column={matrix.columns[ci]}
                    className={
                      numericIndices.has(ci)
                        ? 'ec-hcan-matrix__cell--numeric'
                        : isTierColumn(matrix.columns[ci])
                          ? `ec-hcan-matrix__cell--tier ec-hcan-matrix__cell--tier-${cell.toLowerCase()}`
                          : undefined
                    }
                  >
                    {isTierValue(matrix.columns[ci], cell) ? (
                      <span className={`ec-hcan-tier ec-hcan-tier--${cell.toLowerCase()}`}>{cell}</span>
                    ) : (
                      cell
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showSummary && matrix.summary && (
        <footer className="ec-hcan-matrix__footer">
          {matrix.summary.wins !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="wins">
              <span className="ec-hcan-matrix__stat-label">wins</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.wins}</span>
            </div>
          )}
          {matrix.summary.ties !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="ties">
              <span className="ec-hcan-matrix__stat-label">ties</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.ties}</span>
            </div>
          )}
          {matrix.summary.losses !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="losses">
              <span className="ec-hcan-matrix__stat-label">losses</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.losses}</span>
            </div>
          )}
          {matrix.summary.avg_tier && (
            <div className="ec-hcan-matrix__stat" data-stat="avg-tier">
              <span className="ec-hcan-matrix__stat-label">avg tier</span>
              <span className={`ec-hcan-tier ec-hcan-tier--${matrix.summary.avg_tier.toLowerCase()}`}>{matrix.summary.avg_tier}</span>
            </div>
          )}
          {matrix.summary.avg_hcan !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="avg-hcan">
              <span className="ec-hcan-matrix__stat-label">avg hcan</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.avg_hcan}</span>
            </div>
          )}
          {matrix.summary.avg_prose !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="avg-prose">
              <span className="ec-hcan-matrix__stat-label">avg prose</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.avg_prose}</span>
            </div>
          )}
          {matrix.summary.preference && (
            <div className="ec-hcan-matrix__stat" data-stat="preference">
              <span className="ec-hcan-matrix__stat-label">preference</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.preference}</span>
            </div>
          )}
          {matrix.summary.projected_s_count !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="projected-s">
              <span className="ec-hcan-matrix__stat-label">projected S-tier</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.projected_s_count}</span>
            </div>
          )}
          {matrix.summary.projected_average !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="projected-avg">
              <span className="ec-hcan-matrix__stat-label">projected avg</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.summary.projected_average}</span>
            </div>
          )}
        </footer>
      )}

      {matrix.total_model_calls !== undefined || matrix.total_human_sessions !== undefined ? (
        <footer className="ec-hcan-matrix__footer">
          {matrix.total_model_calls !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="model-calls">
              <span className="ec-hcan-matrix__stat-label">total model calls</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.total_model_calls}</span>
            </div>
          )}
          {matrix.total_human_sessions !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="human-sessions">
              <span className="ec-hcan-matrix__stat-label">total human sessions</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.total_human_sessions}</span>
            </div>
          )}
          {matrix.reusable !== undefined && (
            <div className="ec-hcan-matrix__stat" data-stat="reusable">
              <span className="ec-hcan-matrix__stat-label">reusable</span>
              <span className="ec-hcan-matrix__stat-value">{matrix.reusable ? 'yes' : 'no'}</span>
            </div>
          )}
        </footer>
      ) : null}
    </section>
  );
}

function detectNumericColumns(matrix: HcanMatrix): Set<number> {
  const numericIndices = new Set<number>();
  for (let ci = 0; ci < matrix.columns.length; ci++) {
    if (/score|avg|count|calls|sessions|index|number/i.test(matrix.columns[ci])) {
      numericIndices.add(ci);
      continue;
    }
    const sample = matrix.rows[0]?.[ci];
    if (sample !== undefined && /^-?\d+(\.\d+)?$/.test(sample)) {
      numericIndices.add(ci);
    }
  }
  return numericIndices;
}

function isTierColumn(col: string): boolean {
  return /tier/i.test(col) || /verdict/i.test(col) || /result/i.test(col) || /judge_consensus/i.test(col);
}

function isTierValue(col: string, value: string): boolean {
  return isTierColumn(col) && /^([SAFD])\b/i.test(value);
}

export default HcanMatrixTable;
