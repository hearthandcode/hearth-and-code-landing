import type { BaseProps, LinkItem } from './types';
import { HCANProgram } from './HCANProgram';
import type {
  HcanExampleYaml,
  HcanFinding,
  HcanExampleCard,
  HcanProbeAnswer,
} from '../../data/hcan-program-cards';

export interface HCANExampleYamlCardProps extends BaseProps {
  yaml: HcanExampleYaml;
}

/**
 * Structured output renderer for an HCAN example YAML.
 *
 * Source: Hearth & Code Hub canonical article, project 0047,
 * "Hermes projection instructions" → React components to build, item 2 (`<HCANExample>`)
 * and the canonical §316 generative-protocol card contract.
 *
 * Layout matches the canonical instruction:
 *   findings → labeled claim list (each with its `%label` badge)
 *   probe_answers → verdict table (PASS / FAIL / UNKNOWN)
 *   cards → card grid (each card shows map() content + discipline fields)
 *   next → a nested `<HCANProgram>`
 *   effects → a muted non-effects banner
 */
export function HCANExampleYamlCard({ yaml, className }: HCANExampleYamlCardProps) {
  const output = yaml.output;
  const sections: Array<{ key: string; content: React.ReactNode }> = [];

  if (output.findings && output.findings.length) {
    sections.push({
      key: 'findings',
      content: (
        <ul className="ec-hcan-findings">
          {output.findings.map((f: HcanFinding, i: number) => (
            <li key={i} className={`ec-hcan-finding ec-hcan-finding--${f.label.replace('%', '')}`}>
              <span className={`ec-hcan-finding__label ec-hcan-finding__label--${f.label.replace('%', '')}`}>{f.label}</span>
              <span className="ec-hcan-finding__claim">{f.claim}</span>
            </li>
          ))}
        </ul>
      ),
    });
  }

  if (output.probe_answers && output.probe_answers.length) {
    sections.push({
      key: 'probe_answers',
      content: (
        <table className="ec-hcan-probes">
          <thead>
            <tr>
              <th scope="col">Probe</th>
              <th scope="col">Verdict</th>
              <th scope="col">Reason</th>
            </tr>
          </thead>
          <tbody>
            {output.probe_answers.map((a: HcanProbeAnswer, i: number) => {
              const color =
                a.verdict === 'PASS'
                  ? { color: '#79c99e', bg: 'rgba(121,201,158,0.10)' }
                  : a.verdict === 'FAIL'
                    ? { color: '#e28c86', bg: 'rgba(226,140,134,0.10)' }
                    : { color: '#f4b860', bg: 'rgba(244,184,96,0.10)' };
              return (
                <tr key={i}>
                  <td><code className="ec-hcan-probes__probe">{a.probe}</code></td>
                  <td>
                    <span className="ec-hcan-probes__verdict" style={{ color: color.color, background: color.bg }}>
                      {a.verdict}
                    </span>
                  </td>
                  <td>{a.reason}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      ),
    });
  }

  if (output.cards && output.cards.length) {
    sections.push({
      key: 'cards',
      content: (
        <div className="ec-hcan-cards">
          {output.cards.map((c: HcanExampleCard, i: number) => {
            const entries = Object.entries(c.content);
            const primaryTitle =
              (c.content.name as string | undefined) ??
              (c.content.tailored_claim as string | undefined) ??
              `Card ${i + 1}`;
            return (
              <article
                key={i}
                className={`ec-hcan-card ${c.verdict?.startsWith('dies') ? 'ec-hcan-card--dies' : 'ec-hcan-card--survives'}`}
              >
                <header className="ec-hcan-card__head">
                  <span
                    className={`ec-hcan-card__label ${c.label ? `ec-hcan-card__label--${c.label.replace('%', '')}` : ''}`}
                  >
                    {c.label ?? '%proposal'}
                  </span>
                  <span className="ec-hcan-card__verdict">{c.verdict ?? 'survives'}</span>
                </header>
                <h4 className="ec-hcan-card__name">{primaryTitle}</h4>
                {entries.length > 0 && (
                  <dl className="ec-hcan-card__content">
                    {entries.map(([k, v]) => (
                      <div key={k}>
                        <dt>{k.replaceAll('_', ' ')}</dt>
                        <dd>{v}</dd>
                      </div>
                    ))}
                  </dl>
                )}
                {c.relation && (
                  <p className="ec-hcan-card__relation">
                    <strong>Relation</strong> {c.relation}
                  </p>
                )}
                {c.precedent && (
                  <p className="ec-hcan-card__precedent">
                    <strong>Precedent:</strong> {c.precedent}
                  </p>
                )}
                {c.falsifier && (
                  <p className="ec-hcan-card__falsifier">
                    <strong>Falsifier:</strong> {c.falsifier}
                  </p>
                )}
              </article>
            );
          })}
        </div>
      ),
    });
  }

  if (output.unknown_table && output.unknown_table.length) {
    sections.push({
      key: 'unknown_table',
      content: (
        <table className="ec-hcan-unknown">
          <thead>
            <tr>
              <th>What</th>
              <th>Why unknown</th>
              <th>Smallest resolver</th>
            </tr>
          </thead>
          <tbody>
            {output.unknown_table.map((u, i) => (
              <tr key={i}>
                <td>{u.what}</td>
                <td>{u.why}</td>
                <td><code>{u.resolver}</code></td>
              </tr>
            ))}
          </tbody>
        </table>
      ),
    });
  }

  return (
    <article className={className ? `ec-hcan-example-yaml ${className}` : 'ec-hcan-example-yaml'}>
      <header className="ec-hcan-example-yaml__head">
        <span className="ec-hcan-example-yaml__id">{yaml.id}</span>
        <h3 className="ec-hcan-example-yaml__title">{yaml.title}</h3>
        <p className="ec-hcan-example-yaml__meta">
          <span className="ec-hcan-example-yaml__domain">{yaml.domain}</span>
          <span className="ec-hcan-example-yaml__protocol">{yaml.protocol}</span>
        </p>
        <HCANProgram code={yaml.program} />
      </header>

      {sections.length === 0 && (
        <p className="ec-hcan-example-yaml__empty">No structured output sections recorded in this example.</p>
      )}

      {sections.map((s, i) => (
        <section key={s.key} className="ec-hcan-example-yaml__section">
          <h4>{numberedSectionTitle(i + 1, s.key)}</h4>
          {s.content}
        </section>
      ))}

      {output.not_checked && (
        <section className="ec-hcan-example-yaml__section">
          <h4>Not checked</h4>
          <p className="ec-hcan-example-yaml__not-checked">{output.not_checked}</p>
        </section>
      )}

      {output.next && (
        <section className="ec-hcan-example-yaml__section">
          <h4>Next runnable HCAN line</h4>
          <HCANProgram code={output.next} pill="next" />
        </section>
      )}

      {output.effects && (
        <aside className="ec-hcan-example-yaml__effects" role="note">
          <strong>Non-effects.</strong> {output.effects}
        </aside>
      )}

      {output.safe_stop && (
        <aside className="ec-hcan-example-yaml__safe-stop" role="note">
          <strong>Safe stop.</strong> {output.safe_stop}
        </aside>
      )}
    </article>
  );
}

function numberedSectionTitle(index: number, key: string): string {
  const titleByKey: Record<string, string> = {
    findings: 'Findings',
    probe_answers: 'Probe answers',
    cards: 'Cards',
    unknown_table: 'Unknown table',
  };
  return `${String(index).padStart(2, '0')} · ${titleByKey[key] ?? key}`;
}

/**
 * Optional cross-link list yielded by an example. Reserved for future use
 * when adjacent records surface in the projection; not present in any
 * canonical example today.
 */
export const _LINK_ITEM_TYPE_GUARD: LinkItem | null = null;

export default HCANExampleYamlCard;
