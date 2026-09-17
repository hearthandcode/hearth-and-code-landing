import { useEffect, useRef, useState } from 'react';
import {
  hcanExamples,
  hcanGrammar,
  hcanProtocolOrder,
  hcanProtocols,
  hcanEvaluationLayers,
  type HcanExample,
  type HcanExampleCard,
} from '../../data/hcan-program-cards';
import { HCANProgram } from './HCANProgram';
import { HCANExampleYamlCard } from './HCANExampleYamlCard';
import { HCANEnvelope } from './HCANEnvelope';
import { CommunicationTypeCard } from './CommunicationTypeCard';

const DOMAIN_TINT: Record<string, { tint: string; ink: string; label: string }> = {
  'software-development': { tint: 'rgba(130,196,195,0.12)', ink: 'var(--ec-plasma-500)', label: 'Software' },
  'business-management': { tint: 'rgba(212,171,99,0.12)', ink: 'var(--ec-gold-500)', label: 'Business' },
  'brand-strategy': { tint: 'rgba(167,139,250,0.12)', ink: 'var(--ec-violet-300)', label: 'Brand' },
  career: { tint: 'rgba(240,122,55,0.12)', ink: 'var(--ec-ember-500)', label: 'Career' },
  'knowledge-management': { tint: 'rgba(121,201,158,0.12)', ink: '#79c99e', label: 'Knowledge' },
  research: { tint: 'rgba(196,90,58,0.14)', ink: 'var(--ec-copper-500)', label: 'Research' },
  'personal-productivity': { tint: 'rgba(240,184,96,0.10)', ink: '#f4b860', label: 'Practice' },
};

function domainTint(d: string) {
  return DOMAIN_TINT[d] ?? { tint: 'rgba(244,184,96,0.08)', ink: 'var(--ec-gold-500)', label: d };
}

function ExampleTile({ example, onOpen }: { example: HcanExample; onOpen: () => void }) {
  const tint = domainTint(example.domain);
  return (
    <button
      type="button"
      className="ec-hcan-example-tile"
      onClick={onOpen}
      aria-label={`Open example ${example.id} — ${example.title}`}
      style={{ ['--tile-tint' as string]: tint.tint, ['--tile-ink' as string]: tint.ink }}
    >
      <header>
        <span className="ec-hcan-example-tile__id">{example.id}</span>
        <span className="ec-hcan-example-tile__domain" style={{ color: tint.ink, background: tint.tint }}>{tint.label}</span>
      </header>
      <h3 className="ec-hcan-example-tile__title">{example.title}</h3>
      <p className="ec-hcan-example-tile__program">
        <code>{example.program}</code>
      </p>
      <footer>
        <span className="ec-hcan-example-tile__protocol">{example.protocol}</span>
        <span aria-hidden="true">→</span>
      </footer>
    </button>
  );
}

function ProbeAnswers({ answers }: { answers: HcanExample['probe_answers'] }) {
  return (
    <table className="ec-hcan-probes" aria-label="Probe answers">
      <thead>
        <tr>
          <th scope="col">Probe</th>
          <th scope="col">Verdict</th>
          <th scope="col">Reason</th>
        </tr>
      </thead>
      <tbody>
        {answers.map((a, i) => {
          const c =
            a.verdict === 'PASS'
              ? { fill: '#79c99e', bg: 'rgba(121,201,158,0.10)' }
              : a.verdict === 'FAIL'
                ? { fill: '#e28c86', bg: 'rgba(226,140,134,0.10)' }
                : { fill: '#f4b860', bg: 'rgba(244,184,96,0.10)' };
          return (
            <tr key={`${a.probe}-${i}`}>
              <td><code className="ec-hcan-probes__probe">{a.probe}</code></td>
              <td>
                <span className="ec-hcan-probes__verdict" style={{ color: c.fill, background: c.bg }}>
                  {a.verdict}
                </span>
              </td>
              <td>{a.reason}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function FindingList({ items }: { items: NonNullable<HcanExample['findings']> }) {
  return (
    <ul className="ec-hcan-findings">
      {items.map((f, i) => (
        <li key={i} className={`ec-hcan-finding ec-hcan-finding--${f.label.replace('%', '')}`}>
          <span className={`ec-hcan-finding__label ec-hcan-finding__label--${f.label.replace('%', '')}`}>{f.label}</span>
          <span className="ec-hcan-finding__claim">{f.claim}</span>
        </li>
      ))}
    </ul>
  );
}

/** Render a card with user-defined map() content as a flat key/value list,
 * plus the discipline fields. */
function CardGrid({ cards }: { cards: HcanExampleCard[] }) {
  return (
    <div className="ec-hcan-cards">
      {cards.map((c, i) => {
        const contentEntries = Object.entries(c.content);
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
              <span className={`ec-hcan-card__label ${c.label ? `ec-hcan-card__label--${c.label.replace('%', '')}` : ''}`}>
                {c.label ?? '%proposal'}
              </span>
              <span className="ec-hcan-card__verdict">{c.verdict ?? 'survives'}</span>
            </header>
            <h4 className="ec-hcan-card__name">{primaryTitle}</h4>
            {contentEntries.length > 0 && (
              <dl className="ec-hcan-card__content">
                {contentEntries.map(([k, v]) => (
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
  );
}

function UnknownTable({ rows }: { rows: NonNullable<HcanExample['unknown_table']> }) {
  return (
    <table className="ec-hcan-unknown">
      <thead>
        <tr>
          <th>What</th>
          <th>Why unknown</th>
          <th>Smallest resolver</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((u, i) => (
          <tr key={i}>
            <td>{u.what}</td>
            <td>{u.why}</td>
            <td>
              <code>{u.resolver}</code>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function ExampleSheet({
  example,
  output,
  onClose,
}: {
  example: HcanExample;
  output: 'tile' | 'yaml';
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tint = domainTint(example.domain);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) dialog.showModal();
  }, []);

  const close = () => dialogRef.current?.close();

  // The HCANExampleYamlCard receives the verbatim YAML record.
  return (
    <dialog
      ref={dialogRef}
      className="ec-hcan-sheet"
      onClose={onClose}
      onCancel={onClose}
      aria-labelledby={`hcan-sheet-${example.id}`}
      style={{ ['--sheet-tint' as string]: tint.tint, ['--sheet-ink' as string]: tint.ink }}
    >
      <article>
        <header className="ec-hcan-sheet__masthead">
          <div>
            <p className="ec-hcan-sheet__meta">
              <span className="ec-hcan-sheet__id">{example.id}</span>
              <span
                className="ec-hcan-sheet__domain"
                style={{ color: tint.ink, background: tint.tint }}
              >
                {tint.label}
              </span>
              <span className="ec-hcan-sheet__protocol">{example.protocol}</span>
            </p>
            <h2 id={`hcan-sheet-${example.id}`} className="ec-hcan-sheet__title">
              {example.title}
            </h2>
          </div>
          <button type="button" onClick={close} aria-label={`Close ${example.title}`}>
            ×
          </button>
        </header>

        {output === 'yaml' ? (
          <HCANExampleYamlCard yaml={example.yaml} />
        ) : (
          <TileSheetBody example={example} />
        )}
      </article>
    </dialog>
  );
}

/** Body sections when the user picked "open" from the tile — keeps the legacy
 * per-section layout (program, findings/cards, probe answers, unknown table,
 * not checked, next runnable, non-effects). The 'open-as-yaml' variant uses
 * HCANExampleYamlCard which renders the same sections but driven by the
 * canonical yaml block (and includes safe_stop when the canonical does). */
function TileSheetBody({ example }: { example: HcanExample }) {
  return (
    <>
      <section className="ec-hcan-sheet__program">
        <h3>Program</h3>
        <HCANProgram code={example.program} />
      </section>

      {example.findings && (
        <section className="ec-hcan-sheet__section">
          <h3>Findings</h3>
          <FindingList items={example.findings} />
        </section>
      )}

      {example.cards && (
        <section className="ec-hcan-sheet__section">
          <h3>Cards</h3>
          <CardGrid cards={example.cards} />
        </section>
      )}

      <section className="ec-hcan-sheet__section">
        <h3>Probe answers</h3>
        <ProbeAnswers answers={example.probe_answers} />
      </section>

      {example.unknown_table && (
        <section className="ec-hcan-sheet__section">
          <h3>Unknown table</h3>
          <UnknownTable rows={example.unknown_table} />
        </section>
      )}

      {example.not_checked && (
        <section className="ec-hcan-sheet__section">
          <h3>Not checked</h3>
          <p className="ec-hcan-sheet__not-checked">{example.not_checked}</p>
        </section>
      )}

      {example.next && (
        <section className="ec-hcan-sheet__section">
          <h3>Next runnable HCAN line</h3>
          <HCANProgram code={example.next} pill="next" />
        </section>
      )}

      {example.effects && (
        <aside className="ec-hcan-sheet__effects" role="note">
          <strong>Non-effects.</strong> {example.effects}
        </aside>
      )}
    </>
  );
}

function GrammarCard({
  primitive,
  isActive,
  onSelect,
  index,
}: {
  primitive: (typeof hcanGrammar)[number];
  isActive: boolean;
  onSelect: () => void;
  index: number;
}) {
  return (
    <button
      type="button"
      className={`ec-hcan-grammar-card ${isActive ? 'ec-hcan-grammar-card--active' : ''}`}
      onClick={onSelect}
      aria-pressed={isActive}
    >
      <span className="ec-hcan-grammar-card__num">{String(index + 1).padStart(2, '0')}</span>
      <span className="ec-hcan-grammar-card__symbol">{primitive.symbol}</span>
      <span className="ec-hcan-grammar-card__name">{primitive.name}</span>
    </button>
  );
}

/** Model-agnostic preamble — the HCAN envelope summary an untrained agent
 * needs to evaluate the protocol. Verbatim phrasing from the canonical, plus
 * a single flattened program line for plain prose readers. */
function ModelAgnosticPreamble() {
  return (
    <section className="ec-hcan-preamble" aria-labelledby="ec-hcan-preamble-title">
      <header>
        <p className="ec-hcan-preamble__eyebrow">Getting started / model-agnostic</p>
        <h3 id="ec-hcan-preamble-title">A condensed summary for any agent</h3>
      </header>
      <p>
        HCAN is a communication type, not a runtime. A line is a request to an agent
        (you), not code you execute. Read it as English-shaped structured text:
        a <strong>verb</strong> names the work, an <strong>@anchor</strong> binds it to
        a context, a <strong>:shape</strong> types the return, a <strong>flow</strong>
        narrows it, <strong>?probes</strong> are checks that must answer PASS / FAIL /
        UNKNOWN, and <strong>!guards</strong> bind the whole run. Evaluations are
        PASS / FAIL / UNKNOWN only; unknown is honest, not failure. Everything else
        is metadata.
      </p>
      <pre className="ec-hcan-preamble__line"><code>
orient @~/any-folder :Brief ?gaps !no-write
      </code></pre>
      <p className="ec-hcan-preamble__hint">
        Try <code>orient @~/any-folder :Brief ?gaps !no-write</code> first. Five
        primitives, one canonical line order, no extension required.
      </p>
    </section>
  );
}

export default function HcanGrammarLibrary() {
  const [view, setView] = useState<'examples' | 'grammar' | 'protocols' | 'envelope' | 'yaml'>(
    'examples',
  );
  const [selectedExample, setSelectedExample] = useState<HcanExample | null>(null);
  const [sheetMode, setSheetMode] = useState<'tile' | 'yaml'>('tile');
  const [activePrimitive, setActivePrimitive] = useState(0);

  const primitive = hcanGrammar[activePrimitive];

  // A demo envelope for the envelope view: use E01 since it includes
  // the full normalized line and a next runnable line, both clearly
  // observable without skill primitives installed.
  const demoEnvelopeProgram = hcanExamples[0].program;

  return (
    <section className="ec-hcan-library" aria-labelledby="hcan-library-title">
      <header className="ec-hcan-library__masthead">
        <p className="ec-hcan-library__eyebrow">Ember Circuit / products / HCAN grammar library</p>
        <h2 id="hcan-library-title">Eight primitives. Two protocols. One canonical order.</h2>
        <p className="ec-hcan-library__dek">
          A condensed symbolic notation for talking to AI agents the way you talk to a compiler. Typed. Source-bound. Bounded. Falsifiable. Portable.
          It never executes, never compiles, never grants authority.
        </p>
      </header>

      <ModelAgnosticPreamble />

      <nav className="ec-hcan-library__tabs" aria-label="HCAN views">
        <button type="button" aria-pressed={view === 'examples'} onClick={() => setView('examples')}>
          Eight examples <span aria-hidden="true">·</span> eight domains
        </button>
        <button type="button" aria-pressed={view === 'grammar'} onClick={() => setView('grammar')}>
          Eight primitives <span aria-hidden="true">·</span> canonical order
        </button>
        <button type="button" aria-pressed={view === 'protocols'} onClick={() => setView('protocols')}>
          Two protocols <span aria-hidden="true">·</span> benchmarks
        </button>
        <button type="button" aria-pressed={view === 'envelope'} onClick={() => setView('envelope')}>
          Portable envelope
        </button>
        <button type="button" aria-pressed={view === 'yaml'} onClick={() => setView('yaml')}>
          Structured YAML outputs
        </button>
      </nav>

      {view === 'examples' && (
        <div className="ec-hcan-library__panel" role="tabpanel">
          <p className="ec-hcan-library__panel-dek">
            Each example is a validated HCAN program paired with a structured output panel. Open any tile
            to see the program, the findings, the probe answers, and the smallest runnable next action.
            Open <em>as YAML</em> to see the canonical example block rendered into a fully-structured card
            via <code>HCANExampleYamlCard</code>.
          </p>
          <div className="ec-hcan-example-grid" role="list">
            {hcanExamples.map((example) => (
              <ExampleTile
                key={example.id}
                example={example}
                onOpen={() => {
                  setSelectedExample(example);
                  setSheetMode('tile');
                }}
              />
            ))}
          </div>
          {selectedExample && sheetMode === 'tile' && (
            <ExampleSheet
              example={selectedExample}
              output="tile"
              onClose={() => {
                setSelectedExample(null);
                setSheetMode('tile');
              }}
            />
          )}
        </div>
      )}

      {view === 'grammar' && (
        <div className="ec-hcan-library__panel" role="tabpanel">
          <p className="ec-hcan-library__panel-dek">
            The canonical order is fixed: <strong>{hcanProtocolOrder.join(' · ')}</strong>. Click a primitive to see its purpose, an example, and a non-example the validator rejects.
          </p>
          <div className="ec-hcan-grammar-grid" role="list">
            {hcanGrammar.map((p, i) => (
              <GrammarCard
                key={p.symbol}
                primitive={p}
                index={i}
                isActive={i === activePrimitive}
                onSelect={() => setActivePrimitive(i)}
              />
            ))}
          </div>
          <article className="ec-hcan-grammar-detail">
            <header>
              <span className="ec-hcan-grammar-detail__num">{String(activePrimitive + 1).padStart(2, '0')}</span>
              <h3>{primitive.name}</h3>
              <code>{primitive.symbol}</code>
            </header>
            <dl>
              <dt>Purpose</dt>
              <dd>{primitive.purpose}</dd>
              <dt>Example</dt>
              <dd><HCANProgram code={primitive.example} /></dd>
              <dt>Non-example</dt>
              <dd><HCANProgram code={primitive.nonexample} /></dd>
            </dl>
            {primitive.symbol === 'verb' && (
              <aside className="ec-hcan-grammar-detail__commtype">
                <CommunicationTypeCard label="What a communication type is" />
              </aside>
            )}
          </article>
        </div>
      )}

      {view === 'protocols' && (
        <div className="ec-hcan-library__panel" role="tabpanel">
          <p className="ec-hcan-library__panel-dek">
            The leading verb selects the protocol automatically. Both protocols wrap the human's <code>map()</code> fields with discipline rather than overriding them.
          </p>
          <div className="ec-hcan-protocol-grid">
            {hcanProtocols.map((protocol) => (
              <article key={protocol.id} className="ec-hcan-protocol-card" data-protocol={protocol.id}>
                <header>
                  <h3>{protocol.name}</h3>
                  <span className="ec-hcan-protocol-card__ratio">
                    {protocol.benchmark.wins} / {protocol.benchmark.dimensions} dimensions won
                  </span>
                </header>
                <p>{protocol.description}</p>
                <h4>Benchmark</h4>
                <dl className="ec-hcan-protocol-card__benchmark">
                  <div>
                    <dt>Panels</dt>
                    <dd>{protocol.benchmark.panels}</dd>
                  </div>
                  <div>
                    <dt>Wins</dt>
                    <dd>{protocol.benchmark.wins}</dd>
                  </div>
                  <div>
                    <dt>Losses</dt>
                    <dd>{protocol.benchmark.losses}</dd>
                  </div>
                </dl>
                {protocol.benchmark.strengths && (
                  <div className="ec-hcan-protocol-card__bars" aria-label="HCAN vs prose benchmark bars">
                    {protocol.benchmark.strengths.map((s) => (
                      <div key={s.dimension} className="ec-hcan-protocol-card__bar-row">
                        <span className="ec-hcan-protocol-card__bar-label">{s.dimension}</span>
                        <div className="ec-hcan-protocol-card__bar-track">
                          <div
                            className="ec-hcan-protocol-card__bar-hcan"
                            style={{ width: `${(s.hcan / 5) * 100}%` }}
                            aria-label={`HCAN ${s.hcan.toFixed(1)} of 5`}
                          />
                          <div
                            className="ec-hcan-protocol-card__bar-prose"
                            style={{
                              width: `${(s.prose / 5) * 100}%`,
                              left: `${(s.prose / 5) * 100}%`,
                            }}
                            aria-label={`prose ${s.prose.toFixed(1)} of 5`}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
          <section className="ec-hcan-protocol-card__evaluation">
            <h3>Evaluation methodology — three layers</h3>
            <ol>
              {hcanEvaluationLayers.map((layer) => (
                <li key={layer.id}>
                  <strong>{layer.name}.</strong> {layer.method} <em>(answers: {layer.question})</em>
                </li>
              ))}
            </ol>
          </section>
        </div>
      )}

      {view === 'envelope' && (
        <div className="ec-hcan-library__panel" role="tabpanel">
          <p className="ec-hcan-library__panel-dek">
            Any HCAN program can be wrapped in a self-describing envelope that runs in any agent with no tooling installed. Five layers, in canonical order.
            The diagram below uses <code>E01</code> as a worked program line.
          </p>
          <HCANEnvelope
            program={demoEnvelopeProgram}
            legend="HCAN grammar gloss: verb @anchor :shape -> flow ?probe !guard %label"
            shapes={[':Brief', ':Map', ':Vec<Card>', ':Table', ':Spec', ':SafeReturn', ':Schema', ':Patch', ':Question']}
            rules={[
              '1) line order is fixed: verb @ : -> ? ! %',
              '2) probes answer PASS / FAIL / UNKNOWN',
              '3) guards bind the run, not the agent',
              '4) fail-closed on missing evidence',
            ]}
          />
          <aside className="ec-hcan-preamble">
            <p>
              <strong>Why this matters.</strong> The envelope is the
              model-agnostic, skill-agnostic distribution format. An agent receives
              the envelope and reads its own grammar from the LEGEND layer; it does
              not need an installed HCAN runtime to evaluate the program.
            </p>
          </aside>
        </div>
      )}

      {view === 'yaml' && (
        <div className="ec-hcan-library__panel" role="tabpanel">
          <p className="ec-hcan-library__panel-dek">
            The eight canonical YAML example blocks rendered through one
            <code> HCANExampleYamlCard </code> component each. Open any card to read its
            full output verbatim. The findings table, the probe-verdict table, and the
            card grid are rendered from the structured data record passed as the
            <code> yaml </code> prop.
          </p>
          <div className="ec-hcan-yaml-grid">
            {hcanExamples.map((example) => (
              <button
                key={example.id}
                type="button"
                className="ec-hcan-example-tile"
                onClick={() => {
                  setSelectedExample(example);
                  setSheetMode('yaml');
                }}
                aria-label={`Open YAML card for ${example.id} — ${example.title}`}
                style={{
                  ['--tile-tint' as string]: domainTint(example.domain).tint,
                  ['--tile-ink' as string]: domainTint(example.domain).ink,
                }}
              >
                <header>
                  <span className="ec-hcan-example-tile__id">{example.id}</span>
                  <span
                    className="ec-hcan-example-tile__domain"
                    style={{
                      color: domainTint(example.domain).ink,
                      background: domainTint(example.domain).tint,
                    }}
                  >
                    {domainTint(example.domain).label}
                  </span>
                </header>
                <h3 className="ec-hcan-example-tile__title">{example.title}</h3>
                <p className="ec-hcan-example-tile__program">
                  <code>{example.program}</code>
                </p>
                <footer>
                  <span className="ec-hcan-example-tile__protocol">yaml</span>
                  <span aria-hidden="true">→</span>
                </footer>
              </button>
            ))}
          </div>
          {selectedExample && sheetMode === 'yaml' && (
            <ExampleSheet
              example={selectedExample}
              output="yaml"
              onClose={() => {
                setSelectedExample(null);
                setSheetMode('tile');
              }}
            />
          )}
        </div>
      )}

      <footer className="ec-hcan-library__footer">
        <p>
          <strong>Source of truth.</strong> Canonical article in the Hearth &amp; Code Hub (project 0047); Hub status: candidate / review-required / verified: false.
          This projection carries the same program lines and structured outputs and is published on the landing surface for review.
        </p>
        <p className="ec-hcan-library__footer-shape">
          The 5 React components in the canonical instructions are wired here:
          <code> HCANProgram</code>, <code>HCANExampleYamlCard</code>,
          <code> HCANEnvelope</code>, <code>CommunicationTypeCard</code>, the
          grammar / protocol / example library itself. The benchmark table and the
          harder-tasks panel pause here for the 16-dimension rubric you offered to
          produce.
        </p>
      </footer>
    </section>
  );
}
