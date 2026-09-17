import { useState } from 'react';

export interface BenchmarkRow {
  dimension: string;
  hcan: number;
  prose: number;
  tier: string;
  result: 'WIN' | 'LOSS' | 'tie';
  consensus?: string;
}

export interface BenchmarkSummary {
  wins: number;
  ties: number;
  losses: number;
  preference?: string;
  avg_hcan?: number;
  avg_prose?: number;
  avg_tier?: string;
  s_tier_count?: number;
  a_tier_count?: number;
}

export interface HCANBenchmarkProps {
  panel: 'analytical' | 'generative';
  title: string;
  tierScale?: string;
  rows: BenchmarkRow[];
  summary?: BenchmarkSummary;
}

const TIER_COLORS: Record<string, string> = {
  S: '#22c55e', A: '#0ea5e9', B: '#eab308', C: '#f97316', D: '#ef4444', F: '#b91c1c',
};
const RESULT_COLORS: Record<string, string> = {
  WIN: '#22c55e', LOSS: '#ef4444', tie: '#8d8579',
};

type SortKey = 'dimension' | 'hcan' | 'prose' | 'tier' | 'result';

export default function HCANBenchmark({ panel, title, tierScale, rows, summary }: HCANBenchmarkProps) {
  const [sort, setSort] = useState<{ key: SortKey; dir: 'asc' | 'desc' }>({ key: 'hcan', dir: 'desc' });

  const sorted = [...rows].sort((a, b) => {
    let cmp = 0;
    if (sort.key === 'dimension' || sort.key === 'tier' || sort.key === 'result') {
      cmp = String(a[sort.key]).localeCompare(String(b[sort.key]));
    } else {
      cmp = (a[sort.key] as number) - (b[sort.key] as number);
    }
    return sort.dir === 'asc' ? cmp : -cmp;
  });

  const setNextSort = (key: SortKey) => {
    setSort(prev =>
      prev.key === key
        ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { key, dir: 'desc' }
    );
  };

  const arrow = (key: SortKey) => (sort.key === key ? (sort.dir === 'asc' ? ' ↑' : ' ↓') : '');

  const stats: Array<[string, string]> = [];
  if (summary) {
    stats.push(['dimensions won', `${summary.wins}/${rows.length}`]);
    if (summary.preference) stats.push(['preference', summary.preference]);
    if (summary.avg_hcan !== undefined) stats.push(['avg hcan', summary.avg_hcan.toFixed(2)]);
    if (summary.avg_prose !== undefined) stats.push(['avg prose', summary.avg_prose.toFixed(2)]);
    if (summary.avg_tier) stats.push(['avg tier', summary.avg_tier]);
    if (summary.s_tier_count !== undefined) stats.push(['S-tiers', String(summary.s_tier_count)]);
    if (summary.a_tier_count !== undefined) stats.push(['A-tiers', String(summary.a_tier_count)]);
  }

  return (
    <section className={`hcanx-benchmark hcanx-benchmark--${panel}`} data-panel={panel}>
      <header className="hcanx-benchmark__header">
        <p className="hcanx-benchmark__eyebrow">{panel} panel</p>
        <h3 className="hcanx-benchmark__title">{title}</h3>
        {tierScale && <p className="hcanx-benchmark__scale">tier scale: {tierScale}</p>}
      </header>

      {stats.length > 0 && (
        <div className="hcanx-benchmark__stats">
          {stats.map(([label, value]) => (
            <div className="hcanx-stat" key={label}>
              <span className="hcanx-stat__label">{label}</span>
              <span className="hcanx-stat__value">{value}</span>
            </div>
          ))}
        </div>
      )}

      <div className="hcanx-benchmark__chart" role="img" aria-label={`HCAN vs prose scores across ${rows.length} dimensions`}>
        <div className="hcanx-chart-legend">
          <span><i style={{ background: '#f07a37' }} /> hcan</span>
          <span><i style={{ background: '#4b4237' }} /> prose</span>
        </div>
        {sorted.map((row) => {
          const W = 300;
          const pct = (n: number) => (n / 5) * (W - 8);
          return (
            <div className="hcanx-bar-row" key={row.dimension} data-dim={row.dimension}>
              <span className="hcanx-bar-row__label" title={row.dimension}>{row.dimension}</span>
              <svg className="hcanx-bar-row__svg" viewBox={`0 0 ${W} 44`} preserveAspectRatio="none" aria-hidden="true">
                <rect x="4" y="8" width={pct(row.hcan)} height="10" rx="2" fill="#f07a37" />
                <rect x="4" y="26" width={pct(row.prose)} height="10" rx="2" fill="#4b4237" />
                <text x={pct(row.hcan) + 8} y="17" fontSize="10" fill="#f1e7d2">{row.hcan.toFixed(1)}</text>
                <text x={pct(row.prose) + 8} y="35" fontSize="10" fill="#8d8579">{row.prose.toFixed(1)}</text>
              </svg>
              <span
                className="hcanx-tier"
                data-tier={row.tier}
                style={{ color: TIER_COLORS[row.tier] ?? '#8d8579', borderColor: TIER_COLORS[row.tier] ?? '#8d8579' }}
              >
                {row.tier}
              </span>
              <span className="hcanx-result" style={{ color: RESULT_COLORS[row.result] ?? '#8d8579' }}>
                {row.result === 'tie' ? 'tie' : row.result.toLowerCase() === 'win' ? 'hcan' : 'prose'}
              </span>
              {row.consensus && <span className="hcanx-consensus">{row.consensus}</span>}
            </div>
          );
        })}
      </div>

      <table className="hcanx-table">
        <thead>
          <tr>
            <th><button type="button" onClick={() => setNextSort('dimension')}>dimension{arrow('dimension')}</button></th>
            <th><button type="button" onClick={() => setNextSort('hcan')}>hcan{arrow('hcan')}</button></th>
            <th><button type="button" onClick={() => setNextSort('prose')}>prose{arrow('prose')}</button></th>
            <th><button type="button" onClick={() => setNextSort('tier')}>tier{arrow('tier')}</button></th>
            <th><button type="button" onClick={() => setNextSort('result')}>result{arrow('result')}</button></th>
            {panel === 'generative' && <th>consensus</th>}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row) => (
            <tr key={row.dimension} data-tier={row.tier} data-result={row.result}>
              <td>{row.dimension}</td>
              <td className="hcanx-table__num">{row.hcan.toFixed(1)}</td>
              <td className="hcanx-table__num">{row.prose.toFixed(1)}</td>
              <td><span className="hcanx-tier" data-tier={row.tier} style={{ color: TIER_COLORS[row.tier] ?? '#8d8579', borderColor: TIER_COLORS[row.tier] ?? '#8d8579' }}>{row.tier}</span></td>
              <td style={{ color: RESULT_COLORS[row.result] ?? '#8d8579' }}>{row.result === 'tie' ? 'tie' : row.result.toLowerCase() === 'win' ? 'hcan' : 'prose'}</td>
              {panel === 'generative' && <td>{row.consensus ?? '\u2014'}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
