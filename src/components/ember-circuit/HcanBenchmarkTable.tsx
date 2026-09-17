import type { BaseProps } from './types';
import {
  canonicalAnalyticalScores,
  canonicalGenerativeScores,
  type HcanMatrixSummary,
} from '../../data/canonical-matrices';

export interface HcanBenchmarkTableProps extends BaseProps {
  panel: 'analytical' | 'generative';
  analyticalScores?: typeof canonicalAnalyticalScores | null;
  generativeScores?: typeof canonicalGenerativeScores | null;
  mode?: 'compact' | 'full';
}

/** Translate the canonical dimension label (e.g. "d01 scope visible at a glance")
 * into public language: strip the project-local code, keep the human phrase,
 * capitalize the first letter. Codes stay available as a data attribute so the
 * projection keeps its traceable link to the canonical row. */
function humanizeDimension(raw: string): { code: string | null; label: string } {
  const trimmed = raw.trim();
  const match = /^([dg]\d{2})\s+(.*)$/.exec(trimmed);
  if (!match) return { code: null, label: trimmed.charAt(0).toUpperCase() + trimmed.slice(1) };
  const label = match[2].charAt(0).toUpperCase() + match[2].slice(1);
  return { code: match[1], label };
}

const SUMMARY_LABELS: Record<string, string> = {
  wins: 'Dimensions won',
  ties: 'Ties',
  losses: 'Losses',
  preference: 'Judge preference',
  avg_hcan: 'HCAN average',
  avg_prose: 'Prose average',
  avg_tier: 'Average tier',
  s_tier_count: 'S-tier rows',
  a_tier_count: 'A-tier rows',
};

const SUMMARY_ORDER = [
  'wins',
  'ties',
  'losses',
  'preference',
  'avg_hcan',
  'avg_prose',
  'avg_tier',
  's_tier_count',
  'a_tier_count',
] as const;

export function HcanBenchmarkTable({
  panel,
  analyticalScores = canonicalAnalyticalScores,
  generativeScores = canonicalGenerativeScores,
  mode = 'full',
  className,
}: HcanBenchmarkTableProps) {
  if (panel === 'analytical' && !analyticalScores) return null;
  if (panel === 'generative' && !generativeScores) return null;
  const data = panel === 'analytical' ? analyticalScores! : generativeScores!;
  const tierScale = data.tier_scale ?? 'S>=4.8, A>=4.2, B>=3.6, C>=3.0, D>=2.4, F<2.4';
  const hasConsensus = panel === 'generative';
  const judges = hasConsensus && 'judges' in data ? (data as { judges?: string[] }).judges : undefined;

  return (
    <section
      className={`ec-hcan-benchmark ec-hcan-benchmark--${panel} ${className ?? ''}`}
      data-panel={panel}
      data-tier-scale={tierScale}
    >
      <header className="ec-hcan-benchmark__head">
        <p className="ec-hcan-benchmark__eyebrow">
          {panel === 'analytical' ? 'Analytical protocol' : 'Generative protocol'}
        </p>
        <h3 className="ec-hcan-benchmark__title">
          {panel === 'analytical'
            ? 'Structure and discipline, judged blind'
            : 'Synthesis and ideation, three judges'}
        </h3>
        <p className="ec-hcan-benchmark__deck">
          {panel === 'analytical'
            ? 'HCAN against equivalent plain-language requests, one blind cross-family judge, sixteen quality dimensions.'
            : 'HCAN against plain prose on within-capability tasks, majority vote across three judge families.'}
        </p>
        {judges && judges.length > 0 && (
          <p className="ec-hcan-benchmark__judges">Judges: {judges.join(' · ')}</p>
        )}
        <p className="ec-hcan-benchmark__tier-scale">Tier scale: {tierScale}</p>
      </header>

      <div className="ec-hcan-benchmark__table-wrap">
        <table className="ec-hcan-benchmark__table">
          <thead>
            <tr>
              <th scope="col">Dimension</th>
              <th scope="col" className="ec-hcan-benchmark__col--hcan">HCAN</th>
              <th scope="col" className="ec-hcan-benchmark__col--prose">Prose</th>
              <th scope="col">Tier</th>
              <th scope="col">Result</th>
              {hasConsensus && <th scope="col">Judges</th>}
            </tr>
          </thead>
          <tbody>
            {data.rows.map((row, ri) => (
              <BenchmarkRow key={ri} row={row} panel={panel} mode={mode} />
            ))}
          </tbody>
        </table>
      </div>

      {data.summary && (
        <div className="ec-hcan-benchmark__metrics">
          <p className="ec-hcan-benchmark__metrics-title">Panel metrics</p>
          <table className="ec-hcan-benchmark__metrics-table">
            <tbody>
              {SUMMARY_ORDER.filter((key) => data.summary && key in data.summary).map((key) => (
                <tr key={key} data-metric={key}>
                  <th scope="row">{SUMMARY_LABELS[key]}</th>
                  <td>{String(data.summary![key as keyof HcanMatrixSummary])}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

function BenchmarkRow({
  row,
  panel,
  mode,
}: {
  row: ReadonlyArray<string>;
  panel: 'analytical' | 'generative';
  mode: 'compact' | 'full';
}) {
  const [dimension, hcanScore, proseScore, tier, result, judgeConsensus] = row as readonly [
    string,
    string,
    string,
    string,
    string,
    string?,
  ];
  const { code, label } = humanizeDimension(dimension);
  const hcanNum = parseFloat(hcanScore);
  const proseNum = parseFloat(proseScore);

  return (
    <tr data-dim={code ?? undefined} data-tier={tier} data-result={result.toLowerCase()}>
      <th scope="row" className="ec-hcan-benchmark__dim">
        {label}
      </th>
      <td className="ec-hcan-benchmark__cell ec-hcan-benchmark__cell--hcan">
        <span className="ec-hcan-benchmark__score">{hcanScore}</span>
        {mode === 'full' && Number.isFinite(hcanNum) && (
          <span
            className="ec-hcan-benchmark__bar ec-hcan-benchmark__bar--hcan"
            style={{ ['--bar-pct' as string]: `${(hcanNum / 5) * 100}%` }}
            aria-hidden="true"
          />
        )}
      </td>
      <td className="ec-hcan-benchmark__cell ec-hcan-benchmark__cell--prose">
        <span className="ec-hcan-benchmark__score">{proseScore}</span>
        {mode === 'full' && Number.isFinite(proseNum) && (
          <span
            className="ec-hcan-benchmark__bar ec-hcan-benchmark__bar--prose"
            style={{ ['--bar-pct' as string]: `${(proseNum / 5) * 100}%` }}
            aria-hidden="true"
          />
        )}
      </td>
      <td>
        <span className={`ec-hcan-benchmark__tier ec-hcan-benchmark__tier--${tier.toLowerCase()}`}>
          {tier}
        </span>
      </td>
      <td>
        <span className={`ec-hcan-benchmark__result ec-hcan-benchmark__result--${result.toLowerCase()}`}>
          {result.toLowerCase() === 'win' ? 'HCAN' : result.toLowerCase() === 'loss' ? 'Prose' : 'Tie'}
        </span>
      </td>
      {panel === 'generative' && (
        <td className="ec-hcan-benchmark__cell--consensus">{judgeConsensus ?? '—'}</td>
      )}
    </tr>
  );
}

export default HcanBenchmarkTable;
