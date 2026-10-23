import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import type { CatalogEntry, TemplateTech } from '../../data/vendored-data';
import exemplars from '../../data/prompt-technique-exemplars.json';
import runPacket from '../../data/prompt-technique-generated-prompts.json';
import subagentRuns from '../../data/prompt-technique-subagent-runs.json';
import { promptTechniqueRunBySlug } from '../../data/prompt-technique-run-batches';
import { editorialForTechnique } from '../../data/prompt-technique-editorial';
import { DcaSkillLadder } from './DcaSkillLadder';
import { PromptBatchSkillLadder } from './PromptBatchSkillLadder';

interface PromptDemonstration {
  source_id: string;
  runner: string;
  run_date: string;
  prompt_sha256: string;
  response_sha256: string;
  response: string;
  source_facts_supplied?: boolean;
  runtime?: {
    kernel_version: string;
    profile: string;
    provider: string;
    model: string;
    reasoning_effort: string;
    execution_mode: string;
  };
  receipt_sha256?: string;
  semantic_review?: string;
  semantic_reviewed_by?: string;
}

const TYPE_COLORS: Record<string, { tint: string; ink: string; label: string }> = {
  core: { tint: 'rgba(244,184,96,0.10)', ink: 'var(--ec-gold-500)', label: 'Core' },
  contrastive: { tint: 'rgba(185,148,237,0.12)', ink: 'var(--ec-violet-300)', label: 'Contrastive' },
  staged: { tint: 'rgba(63,224,208,0.12)', ink: 'var(--ec-plasma-500)', label: 'Staged' },
  receipt: { tint: 'rgba(255,196,108,0.10)', ink: '#FFB761', label: 'Receipt' },
  boundary: { tint: 'rgba(194,90,58,0.14)', ink: 'var(--ec-copper-400)', label: 'Boundary' },
  schema: { tint: 'rgba(63,224,208,0.10)', ink: 'var(--ec-plasma-300)', label: 'Schema' },
  position: { tint: 'rgba(185,148,237,0.10)', ink: 'var(--ec-violet-400)', label: 'Position' },
  query: { tint: 'rgba(255,196,108,0.10)', ink: '#FFB761', label: 'Query' },
  falsifier: { tint: 'rgba(194,90,58,0.10)', ink: 'var(--ec-copper-500)', label: 'Falsifier' },
  adaptive: { tint: 'rgba(63,224,208,0.10)', ink: 'var(--ec-plasma-400)', label: 'Adaptive' },
};

function colorFor(t: string) {
  return TYPE_COLORS[t] || { tint: 'rgba(244,184,96,0.08)', ink: 'var(--ec-gold-500)', label: t };
}

function firstSeam(entry: CatalogEntry): string {
  return exemplars.entries.some((item) => item.slug === entry.slug) ? 'Editorial exemplar' : 'Editorial review pending';
}

export interface PromptCardProps {
  entry: CatalogEntry;
  tech?: TemplateTech;
  onOpen?: () => void;
  onOpenLab?: () => void;
  onClose?: () => void;
}

/** A denser, more typographic grid tile. */
export function PromptCardTile({ entry, onOpen }: PromptCardProps) {
  const color = colorFor(entry.type);
  return (
    <button
      type="button"
      className="ec-prompt-card"
      onClick={onOpen}
      aria-label={`Open ${entry.title}`}
      style={{ ['--card-tint' as any]: color.tint, ['--card-ink' as any]: color.ink }}
    >
      <header className="ec-prompt-card__head">
        <span className="ec-prompt-card__type">{color.label}</span>
        <span className="ec-prompt-card__num">№{String(entry.number).padStart(3, '0')}</span>
      </header>
      <h3 className="ec-prompt-card__title">{entry.title}</h3>
      <footer className="ec-prompt-card__foot">
        <span className="ec-prompt-card__seam">{firstSeam(entry)}</span>
        <span className="ec-prompt-card__arrow" aria-hidden="true">→</span>
      </footer>
    </button>
  );
}

/** A full-screen overlay sheet (rendered via portal so it floats above everything). */
export function PromptCardSheet({ entry, tech, onClose, onOpenLab }: PromptCardProps) {
  const sheetRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;
  useEffect(() => {
    const priorFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); onCloseRef.current?.(); return; }
      if (event.key !== 'Tab' || !sheetRef.current) return;
      const focusable = [...sheetRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])')].filter((el) => el.getClientRects().length > 0);
      if (!focusable.length) { event.preventDefault(); return; }
      if (event.shiftKey && document.activeElement === focusable[0]) { event.preventDefault(); focusable.at(-1)?.focus(); }
      else if (!event.shiftKey && document.activeElement === focusable.at(-1)) { event.preventDefault(); focusable[0].focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prevOverflow; document.removeEventListener('keydown', onKey); priorFocus?.focus(); };
  }, []);

  const color = colorFor(entry.type);
  const exemplar = exemplars.entries.find((item) => item.slug === entry.slug);
  const packetRun = runPacket.records.find((item) => item.technique_slug === entry.slug);
  const batchRun = promptTechniqueRunBySlug.get(entry.slug);
  const ledgerRun = subagentRuns.runs.find((item) => item.technique_slug === entry.slug && item.status === 'current-sample');
  const subagentRun: PromptDemonstration | undefined = batchRun?.status === 'validated' && batchRun.prompt_sha256 === packetRun?.prompt_sha256
    ? batchRun
    : packetRun?.response && ledgerRun?.prompt_sha256 === packetRun.prompt_sha256 && ledgerRun.response_sha256 === packetRun.response_sha256
      ? {
          source_id: packetRun.source_id,
          runner: ledgerRun.runner,
          run_date: ledgerRun.run_date,
          prompt_sha256: ledgerRun.prompt_sha256,
          response_sha256: ledgerRun.response_sha256,
          response: ledgerRun.response,
          source_facts_supplied: ledgerRun.source_facts_supplied,
        }
      : undefined;
  const editorial = editorialForTechnique(entry, tech);
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="ec-sheet-backdrop" onClick={onClose} role="presentation">
      <article
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        className="ec-prompt-sheet"
        aria-labelledby={`prompt-sheet-${entry.slug}`}
        style={{ ['--sheet-tint' as any]: color.tint, ['--sheet-ink' as any]: color.ink }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ec-prompt-sheet__masthead">
          <div className="ec-prompt-sheet__meta">
            <span className="ec-prompt-sheet__type">{color.label}</span>
            <span className="ec-prompt-sheet__num">№{String(entry.number).padStart(3, '0')}</span>
            {tech?.template && <span className="ec-prompt-sheet__pill">source template available</span>}
          </div>
          <h2 id={`prompt-sheet-${entry.slug}`} className="ec-prompt-sheet__title">{entry.title}</h2>
          <div className="ec-prompt-sheet__actions">
            {onOpenLab && (
              <button type="button" className="ec-prompt-sheet__lab" onClick={onOpenLab}>
                Open in Prompt Lab <span aria-hidden="true">↗</span>
              </button>
            )}
            <button ref={closeRef} type="button" className="ec-prompt-sheet__close" onClick={onClose} aria-label="Close sheet">×</button>
          </div>
        </header>

        <nav className="ec-prompt-sheet__section-nav" aria-label="Technique sections">
          {['Technique Introduction', 'Benefits, Trade-Offs, and Model Risk', 'How To Use', 'Subagent Demonstration'].map((label, index) => <button type="button" key={label} onClick={() => sheetRef.current?.querySelector(`#tech-section-${index + 1}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })}>{String(index + 1).padStart(2, '0')} · {label}</button>)}
        </nav>
        <div className="ec-prompt-sheet__body ec-prompt-sheet__body--editorial4">
          <section id="tech-section-1" className="ec-prompt-sheet__section ec-prompt-sheet__section--01 ec-prompt-sheet__identity">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">01</span><h3 className="ec-prompt-sheet__section-title">Technique Introduction</h3></header>
            <p>{editorial.introduction}</p>
            {exemplar && <><div className="ec-prompt-sheet__identity-grid"><div><strong>Working definition</strong><p>{exemplar.definition.what}</p></div><div><strong>Distinctive move</strong><p>{exemplar.definition.distinguishes}</p></div></div><p className="ec-prompt-sheet__mechanism">{exemplar.mechanism}</p></>}
            <p><strong>Candidate mechanism:</strong> {editorial.mechanism}</p>
            <p><strong>Atlas provenance:</strong> {editorial.sourceNote}</p>
            <p className="ec-prompt-sheet__boundary">Technique records are candidate Atlas projections; this description does not establish general efficacy.</p>
          </section>
          <section id="tech-section-2" className="ec-prompt-sheet__section ec-prompt-sheet__section--02">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">02</span><h3 className="ec-prompt-sheet__section-title">Benefits, Trade-Offs, and Model Risk</h3></header>
            <h4>Potential benefit · not a measured result</h4><p>{editorial.benefit}</p>
            {exemplar && <ol className="ec-prompt-sheet__steps">{exemplar.when_to_use.slice(0, 2).map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>}
            <h4>Trade-offs</h4><ul className="ec-prompt-sheet__limits">{editorial.tradeoffs.map((item) => <li key={item}>{item}</li>)}</ul>
            {exemplar && <ul className="ec-prompt-sheet__limits">{exemplar.limitations.slice(0, 2).map((item) => <li key={item.title}><strong>{item.title}</strong><p>{item.detail}</p></li>)}</ul>}
            <h4>Model risk</h4><p>{editorial.modelRisk}</p>
          </section>
          <section id="tech-section-3" className="ec-prompt-sheet__section ec-prompt-sheet__section--03">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">03</span><h3 className="ec-prompt-sheet__section-title">How To Use</h3></header>
            <p>This practical instruction is tailored to a work task. It embeds the operating principle without naming the catalog technique.</p>
            <pre className="ec-prompt-sheet__submitted-prompt">{editorial.practicalPrompt}</pre>
            {exemplar && <><h4>Applied steps from the editorial exemplar</h4><ol className="ec-prompt-sheet__steps">{exemplar.applied_process.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol></>}
          </section>
          <section id="tech-section-4" className="ec-prompt-sheet__section ec-prompt-sheet__section--04">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">04</span><h3 className="ec-prompt-sheet__section-title">Subagent Demonstration</h3></header>
            <p className="ec-prompt-sheet__boundary">Semantic status: {editorial.semantic_status} · Prompt hash matches current packet: {editorial.promptHashMatches ? 'yes' : 'no'} · Current prompt SHA-256: {editorial.currentPromptSha256 || 'not available'}</p>
            {subagentRun
              ? <><p><strong>Validated prompt-response record.</strong> This subagent response is linked to the exact practical instruction shown in Section 03. It remains a single candidate response, not technique-efficacy evidence.</p><pre className="ec-prompt-sheet__submitted-prompt">{subagentRun.response}</pre><p className="ec-prompt-sheet__boundary">Source ID: {subagentRun.source_id} · Runner: {subagentRun.runner} · Date: {subagentRun.run_date} · Prompt SHA-256: {subagentRun.prompt_sha256} · Response SHA-256: {subagentRun.response_sha256} · Source facts supplied: {subagentRun.source_facts_supplied ? 'yes' : 'no'} · External effects: none recorded.</p>{subagentRun.runtime && <p className="ec-prompt-sheet__boundary">Runtime receipt: Pi–Ember kernel {subagentRun.runtime.kernel_version} · {subagentRun.runtime.profile} · {subagentRun.runtime.provider}/{subagentRun.runtime.model} · {subagentRun.runtime.reasoning_effort} reasoning · {subagentRun.runtime.execution_mode}{subagentRun.receipt_sha256 ? ` · Receipt SHA-256: ${subagentRun.receipt_sha256}` : ''}</p>}</>
              : batchRun
                ? <div className="ec-prompt-sheet__editorial-hold"><strong>Review hold · not validated</strong><p>The captured response is retained below, but it did not pass the technique-specific review criterion. Treat it as an inspectable runtime result, not as a successful demonstration or efficacy evidence.</p>{batchRun.semantic_review && <p><strong>Review note:</strong> {batchRun.semantic_review}{batchRun.semantic_reviewed_by ? ` · Reviewed by ${batchRun.semantic_reviewed_by}` : ''}</p>}<pre className="ec-prompt-sheet__submitted-prompt">{batchRun.response}</pre><p className="ec-prompt-sheet__boundary">Source ID: {batchRun.source_id} · Runner: {batchRun.runner} · Date: {batchRun.run_date} · Prompt SHA-256: {batchRun.prompt_sha256} · Response SHA-256: {batchRun.response_sha256} · External effects: none recorded.</p>{batchRun.runtime && <p className="ec-prompt-sheet__boundary">Runtime receipt: Pi–Ember kernel {batchRun.runtime.kernel_version} · {batchRun.runtime.profile} · {batchRun.runtime.provider}/{batchRun.runtime.model} · {batchRun.runtime.reasoning_effort} reasoning · {batchRun.runtime.execution_mode}{batchRun.receipt_sha256 ? ` · Receipt SHA-256: ${batchRun.receipt_sha256}` : ''}</p>}<p>Current prompt SHA-256: {editorial.currentPromptSha256 || 'not available'}</p></div>
                : <div className="ec-prompt-sheet__editorial-hold"><strong>Not run for this prompt</strong><p>No subagent execution or response is recorded for the practical instruction shown in Section 03. This candidate has not been run; the catalog does not imply execution. Response capture and review remain open.</p><p>Current prompt SHA-256: {editorial.currentPromptSha256 || 'not available'}</p></div>}
            {!subagentRun && !batchRun && entry.slug === '01-dynamic-context-assembly'
              ? <><p><strong>Earlier model demonstration.</strong> This retained response predates the practical instruction shown above and is not a response to that prompt.</p><DcaSkillLadder /></>
              : !subagentRun && !batchRun && exemplar && <><p><strong>Earlier model demonstration.</strong> This retained batch response predates the practical instruction shown above and is not a response to that prompt.</p><PromptBatchSkillLadder slug={entry.slug} /></>}
          </section>
        </div>
      </article>
    </div>,
    document.body
  );
}
