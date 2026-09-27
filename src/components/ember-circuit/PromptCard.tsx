import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { promptAtlasExecutionBySlug } from '../../data/vendored-data';
import type { CatalogEntry, TemplateTech } from '../../data/vendored-data';
import { renderMarkdown } from './markdown';

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
  const first = entry.sections?.[0]?.title || 'Technique';
  return first.toLowerCase();
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
  // Lock body scroll while open and handle ESC
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener('keydown', onKey); };
  }, [onClose]);

  const color = colorFor(entry.type);
  const sourceSection = (title: string) => entry.sections?.find((section) => section.title === title)?.body || '';
  const execution = promptAtlasExecutionBySlug.get(entry.slug);
  const appliedSteps = [
    ['Frame the task', `Name the practical, engineering, creative, or research task and declare the inputs, constraint, and intended artifact before applying ${entry.title}.`],
    ['Apply the mechanism', sourceSection('How it works') || `Apply ${entry.title} only to the declared task and context.`],
    ['Compare the result', `Inspect the result against a simpler baseline or named acceptance predicate; preserve material differences instead of treating fluency as success.`],
    ['Return with limits', `Record what the technique changed, what was not tested, and the next human-held decision or review step.`],
  ];
  const useSteps = [
    ['Match', sourceSection('When to use it') || `Use ${entry.title} only when its mechanism materially changes the task.`],
    ['Bound', 'Confirm that the task has named inputs, a proportionate consequence level, and no missing human gate.'],
    ['Try', 'Apply the technique to one bounded artifact rather than an undifferentiated request.'],
    ['Stop or revise', 'Do not use it when a direct source settles the task, added structure outweighs the uncertainty, or the required evidence is absent.'],
  ];
  if (typeof document === 'undefined') return null;

  return createPortal(
    <div className="ec-sheet-backdrop" onClick={onClose} role="presentation">
      <article
        className="ec-prompt-sheet"
        aria-labelledby={`prompt-sheet-${entry.slug}`}
        style={{ ['--sheet-tint' as any]: color.tint, ['--sheet-ink' as any]: color.ink }}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="ec-prompt-sheet__masthead">
          <div className="ec-prompt-sheet__meta">
            <span className="ec-prompt-sheet__type">{color.label}</span>
            <span className="ec-prompt-sheet__num">№{String(entry.number).padStart(3, '0')}</span>
            {tech?.template && <span className="ec-prompt-sheet__pill">template ready</span>}
          </div>
          <h2 id={`prompt-sheet-${entry.slug}`} className="ec-prompt-sheet__title">{entry.title}</h2>
          <div className="ec-prompt-sheet__actions">
            {onOpenLab && (
              <button type="button" className="ec-prompt-sheet__lab" onClick={onOpenLab}>
                Open in Prompt Lab <span aria-hidden="true">↗</span>
              </button>
            )}
            <button type="button" className="ec-prompt-sheet__close" onClick={onClose} aria-label="Close sheet">×</button>
          </div>
        </header>

        <div className="ec-prompt-sheet__body ec-prompt-sheet__body--four">
          <section className="ec-prompt-sheet__section ec-prompt-sheet__section--01">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">01</span><h3 className="ec-prompt-sheet__section-title">Applied four-step process</h3></header>
            <ol className="ec-prompt-sheet__steps">
              {appliedSteps.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><div className="ec-prompt-sheet__prose ec-md" dangerouslySetInnerHTML={{ __html: renderMarkdown(detail) }} /></div></li>)}
            </ol>
          </section>
          <section className="ec-prompt-sheet__section ec-prompt-sheet__section--02">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">02</span><h3 className="ec-prompt-sheet__section-title">When to use it</h3></header>
            <ol className="ec-prompt-sheet__steps">
              {useSteps.map(([title, detail], index) => <li key={title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{title}</strong><div className="ec-prompt-sheet__prose ec-md" dangerouslySetInnerHTML={{ __html: renderMarkdown(detail) }} /></div></li>)}
            </ol>
          </section>
          <section className="ec-prompt-sheet__section ec-prompt-sheet__section--03">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">03</span><h3 className="ec-prompt-sheet__section-title">Limitations and boundary</h3></header>
            <div className="ec-prompt-sheet__prose ec-md" dangerouslySetInnerHTML={{ __html: renderMarkdown(sourceSection('Limitations')) }} />
            <aside className="ec-prompt-sheet__limit"><strong>Public boundary</strong><p>This technique is a public learning projection. It does not grant capability, prove general effectiveness, or authorize an external effect.</p></aside>
          </section>
          <section className="ec-prompt-sheet__section ec-prompt-sheet__section--04">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">04</span><h3 className="ec-prompt-sheet__section-title">Demonstrated isolated task</h3></header>
            {execution ? <div className="ec-prompt-sheet__execution">
              <p><strong>{execution.provider}/{execution.model}</strong> · isolated Pi execution · {execution.tool_events} tool events</p>
              <h4>{execution.task_class}</h4>
              <details><summary>Submitted execution prompt</summary><pre>{execution.submitted_prompt}</pre></details>
              <details open><summary>Captured model response</summary><pre>{execution.response}</pre></details>
              <aside><strong>Receipt boundary</strong><p>{execution.receipt_boundary}</p><small>Prompt SHA-256: {execution.prompt_sha256}<br />Response SHA-256: {execution.response_sha256}</small></aside>
            </div> : <aside className="ec-prompt-sheet__execution-pending"><strong>Execution receipt pending</strong><p>No isolated MiniMax-M3 execution has been captured for this technique yet. This surface does not substitute a fictional response for an actual model receipt.</p></aside>}
          </section>
        </div>
      </article>
    </div>,
    document.body
  );
}
