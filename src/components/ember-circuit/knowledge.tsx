import type { ReactNode } from 'react';
import type { BaseProps, MatrixRow } from './types';

const cx = (...values: Array<string | undefined | false>) => values.filter(Boolean).join(' ');

export function ClaimCard({ label, claim, evidence, limit, posture, className }: BaseProps & {
  label: string; claim: string; evidence: string; limit: string; posture: 'supported' | 'provisional' | 'held';
}) {
  return <article className={cx('ec-claim-card', `ec-posture--${posture}`, className)} data-ec-component="ClaimCard"><header><span>{label}</span><strong>{posture}</strong></header><blockquote>{claim}</blockquote><dl><div><dt>Evidence</dt><dd>{evidence}</dd></div><div><dt>Limit</dt><dd>{limit}</dd></div></dl></article>;
}

export function SourceCard({ id, title, kind, revision, use, access, className }: BaseProps & {
  id: string; title: string; kind: string; revision: string; use: string; access: string;
}) {
  return <article className={cx('ec-source-card', className)} data-ec-component="SourceCard"><span className="ec-source-card__spine">{id}</span><div><p>{kind}</p><h3>{title}</h3><dl><div><dt>Revision</dt><dd>{revision}</dd></div><div><dt>Public use</dt><dd>{use}</dd></div><div><dt>Access</dt><dd>{access}</dd></div></dl></div></article>;
}

export function ConceptCard({ term, reading, relation, nearMiss, className }: BaseProps & {
  term: string; reading: string; relation: string; nearMiss: string;
}) {
  return <article className={cx('ec-concept-card', className)} data-ec-component="ConceptCard"><header><span>Concept</span><h3>{term}</h3></header><p>{reading}</p><footer><span><b>Relation</b>{relation}</span><span><b>Near-miss</b>{nearMiss}</span></footer></article>;
}

export function SynthesisBoard({ title, observations, interpretations, proposals, gaps, className }: BaseProps & {
  title: string; observations: string[]; interpretations: string[]; proposals: string[]; gaps: string[];
}) {
  const lanes = [['Observation', observations], ['Interpretation', interpretations], ['Proposal', proposals], ['Gap', gaps]] as const;
  return <section className={cx('ec-synthesis-board', className)} data-ec-component="SynthesisBoard"><header><span>Synthesis board</span><h3>{title}</h3></header><div>{lanes.map(([label, items]) => <section key={label} data-lane={label.toLowerCase()}><h4>{label}</h4><ul>{items.map((item) => <li key={item}>{item}</li>)}</ul></section>)}</div></section>;
}

export function TensionPair({ left, right, bridge, className }: BaseProps & {
  left: { label: string; text: string }; right: { label: string; text: string }; bridge: string;
}) {
  return <article className={cx('ec-tension-pair', className)} data-ec-component="TensionPair"><section><span>A</span><h3>{left.label}</h3><p>{left.text}</p></section><div><i aria-hidden="true" /><p>{bridge}</p><i aria-hidden="true" /></div><section><span>B</span><h3>{right.label}</h3><p>{right.text}</p></section></article>;
}

export function EvidenceMatrix({ caption, rows, className }: BaseProps & { caption: string; rows: MatrixRow[] }) {
  return <div className={cx('ec-evidence-matrix', className)} data-ec-component="EvidenceMatrix" tabIndex={0} role="region" aria-label={caption}><table><caption>{caption}</caption><thead><tr><th>Object</th><th>Source</th><th>Posture</th><th>Limit</th></tr></thead><tbody>{rows.map((row) => <tr key={row.subject}><th scope="row">{row.subject}</th><td>{row.source}</td><td><span>{row.posture}</span></td><td>{row.limit}</td></tr>)}</tbody></table></div>;
}

export function QuestionLedger({ title, questions, className }: BaseProps & { title: string; questions: Array<{ id: string; question: string; changesWhen: string; owner: string }> }) {
  return <section className={cx('ec-question-ledger', className)} data-ec-component="QuestionLedger"><header><span>Open questions</span><h3>{title}</h3></header><ol>{questions.map((item) => <li key={item.id}><span>{item.id}</span><h4>{item.question}</h4><dl><div><dt>Changes when</dt><dd>{item.changesWhen}</dd></div><div><dt>Held by</dt><dd>{item.owner}</dd></div></dl></li>)}</ol></section>;
}

export function GlossaryEntry({ term, plain, technical, boundary, symbol, className }: BaseProps & {
  term: string; plain: string; technical: string; boundary: string; symbol?: ReactNode;
}) {
  return <article className={cx('ec-glossary-entry', className)} data-ec-component="GlossaryEntry"><header>{symbol && <i>{symbol}</i>}<h3>{term}</h3></header><dl><div><dt>Plain reading</dt><dd>{plain}</dd></div><div><dt>Technical reading</dt><dd>{technical}</dd></div><div><dt>Boundary</dt><dd>{boundary}</dd></div></dl></article>;
}
