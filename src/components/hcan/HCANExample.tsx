import HCANProgram from './HCANProgram';

export interface HcanFinding {
  claim: string;
  label: string;
  locator?: string;
  qualifier?: string;
}

export interface HcanCard {
  [key: string]: unknown;
  relation?: string;
  falsifier?: string;
  verdict?: string;
  uncertainty?: string;
  label?: string;
}

export interface HcanProbeAnswer {
  probe: string;
  verdict: string;
  reason: string;
}

export interface HcanUnknownRow {
  what: string;
  why: string;
  resolver: string;
  cost?: string;
}

export interface HCANExampleData {
  id: string;
  domain: string;
  title: string;
  program: string;
  protocol: 'analytical' | 'generative';
  output: {
    normalized?: string;
    findings?: HcanFinding[];
    cards?: HcanCard[];
    probe_answers?: HcanProbeAnswer[];
    unknown_table?: HcanUnknownRow[];
    not_checked?: string;
    next?: string;
    effects?: string;
    safe_stop?: string;
  };
}

const DOMAIN_COLORS: Record<string, string> = {
  'software-development': '#3b82f6',
  'business-management': '#22c55e',
  'brand-strategy': '#a855f7',
  'job-application': '#f97316',
  'research': '#14b8a6',
  'knowledge-management': '#ec4899',
  'session-management': '#6b7280',
};

const LABEL_COLORS: Record<string, string> = {
  source: '#3b82f6',
  evidence: '#22c55e',
  inference: '#eab308',
  hypothesis: '#f97316',
  proposal: '#a855f7',
  projection: '#8b5cf6',
  receipt: '#06b6d4',
  unknown: '#6b7280',
};

const QUALIFIER_COLORS: Record<string, string> = {
  high: '#22c55e',
  medium: '#eab308',
  low: '#6b7280',
};

function labelKey(label: string): string {
  return label.replace('%', '');
}

function labelColor(label: string): string {
  return LABEL_COLORS[labelKey(label)] ?? '#6b7280';
}

/** Cards discipline fields (per the canonical generative protocol). */
const DISCIPLINE_KEYS = ['relation', 'falsifier', 'verdict', 'uncertainty', 'label'];

export default function HCANExample({ example }: { example: HCANExampleData }) {
  const { output } = example;
  const domainColor = DOMAIN_COLORS[example.domain] ?? '#6b7280';
  const protocolColor = example.protocol === 'analytical' ? '#6366f1' : '#f59e0b';

  const cards = output.cards ?? [];
  const disciplinePairs = cards.map((card) => {
    const content: Array<[string, string]> = [];
    const discipline: Array<[string, string]> = [];
    for (const [k, v] of Object.entries(card)) {
      const text = typeof v === 'string' ? v : JSON.stringify(v);
      if (DISCIPLINE_KEYS.includes(k)) discipline.push([k, text]);
      else content.push([k, text]);
    }
    return { content, discipline };
  });

  return (
    <article className="hcanx-example" data-example-id={example.id} data-protocol={example.protocol}>
      <header className="hcanx-example__header">
        <span
          className="hcanx-example__domain"
          style={{ background: domainColor }}
          title={example.domain}
        >
          {example.id} · {example.domain}
        </span>
        <h3 className="hcanx-example__title">{example.title}</h3>
        <span className="hcanx-example__protocol" style={{ background: protocolColor }}>
          {example.protocol}
        </span>
      </header>

      <div className="hcanx-example__program">
        <HCANProgram code={example.program} />
      </div>

      <div className="hcanx-example__output">
        {output.findings && output.findings.length > 0 && (
          <section className="hcanx-example__findings">
            {output.normalized && <HCANProgram code={output.normalized} compact />}
            {output.findings.map((f, i) => (
              <p className="hcanx-finding" key={i}>
                <span className="hcanx-finding__label" style={{ color: labelColor(f.label), borderColor: labelColor(f.label) }}>
                  {f.label}
                </span>
                <span className="hcanx-finding__text">{f.claim}</span>
                {f.locator && <code className="hcanx-finding__locator">{f.locator}</code>}
                {f.qualifier && (
                  <span className="hcanx-finding__qualifier" style={{ color: QUALIFIER_COLORS[f.qualifier.replace('@', '')] ?? '#6b7280' }}>
                    {f.qualifier}
                  </span>
                )}
              </p>
            ))}
          </section>
        )}

        {cards.length > 0 && (
          <section className="hcanx-example__cards">
            {disciplinePairs.map((pair, ci) => (
              <div className="hcanx-gcard" key={ci}>
                <div className="hcanx-gcard__content">
                  {pair.content.map(([k, v]) => (
                    <p key={k}><strong>{k}:</strong> {v}</p>
                  ))}
                </div>
                {pair.discipline.length > 0 && (
                  <footer className="hcanx-gcard__discipline">
                    {pair.discipline.map(([k, v]) => (
                      <span key={k}><em>{k}</em> {v}</span>
                    ))}
                  </footer>
                )}
              </div>
            ))}
          </section>
        )}

        {output.probe_answers && output.probe_answers.length > 0 && (
          <div className="hcanx-table-scroll" role="region" aria-label="Probe results" tabIndex={0}>
          <table className="hcanx-probes">
            <thead>
              <tr><th>Probe</th><th>Verdict</th><th>Reason</th></tr>
            </thead>
            <tbody>
              {output.probe_answers.map((p, i) => (
                <tr key={i}>
                  <td className="hcanx-probes__name">{p.probe}</td>
                  <td><span className={`verdict verdict-${p.verdict}`}>{p.verdict}</span></td>
                  <td>{p.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}

        {output.unknown_table && output.unknown_table.length > 0 && (
          <div className="hcanx-table-scroll" role="region" aria-label="Unknowns" tabIndex={0}>
          <table className="hcanx-unknowns">
            <thead>
              <tr><th>What</th><th>Why</th><th>Resolver</th>{(output.unknown_table.some(r => r.cost)) && <th>Cost</th>}</tr>
            </thead>
            <tbody>
              {output.unknown_table.map((u, i) => (
                <tr key={i}>
                  <td>{u.what}</td>
                  <td>{u.why}</td>
                  <td>{u.resolver}</td>
                  {u.cost && <td>{u.cost}</td>}
                </tr>
              ))}
            </tbody>
          </table>
          </div>
        )}

        {output.not_checked && <p className="hcanx-notchecked">⊘ not checked: {output.not_checked}</p>}

        {output.next && (
          <div className="hcanx-next">
            <span className="hcanx-next__arrow" aria-hidden="true">→</span>
            <HCANProgram code={output.next} compact />
          </div>
        )}

        {output.effects && <p className="hcanx-effects">🛡 {output.effects}</p>}
        {output.safe_stop && <p className="hcanx-safestop">{output.safe_stop}</p>}
      </div>
    </article>
  );
}
