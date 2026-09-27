import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CatalogEntry, TemplateTech } from '../../data/vendored-data';
import exemplars from '../../data/prompt-technique-exemplars.json';
import comparisons from '../../data/prompt-technique-comparisons.json';
import batchOneComparisons from '../../data/prompt-technique-comparisons.batch-001.json';
import { renderResponseMarkdown } from './response-markdown';

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
  const [activeTab, setActiveTab] = useState(0);
  const exemplar = exemplars.entries.find((item) => item.slug === entry.slug);
  const comparison = [...comparisons.comparisons, ...batchOneComparisons.comparisons].find((item) => item.slug === entry.slug);
  const samples = comparison?.samples ?? [];
  const tabs = [
    { label: 'Baseline prompt', text: samples.find((s) => s.condition === 'baseline')?.submitted_prompt },
    { label: 'Baseline response', text: samples.find((s) => s.condition === 'baseline')?.response },
    { label: 'Technique prompt', text: samples.find((s) => s.condition === 'applied')?.submitted_prompt },
    { label: 'Technique response', text: samples.find((s) => s.condition === 'applied')?.response },
  ];
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

        {exemplar && <nav className="ec-prompt-sheet__section-nav" aria-label="Technique sections">
          {['How it works', 'When to use it', 'Limitations', 'Matched example'].map((label, index) => <button type="button" key={label} onClick={() => sheetRef.current?.querySelector(`#tech-section-${index + 1}`)?.scrollIntoView({ block: 'start', behavior: 'smooth' })}>{String(index + 1).padStart(2, '0')} · {label}</button>)}
        </nav>}
        {exemplar ? <div className="ec-prompt-sheet__body ec-prompt-sheet__body--four">
          <section id="tech-section-1" className="ec-prompt-sheet__section ec-prompt-sheet__section--01">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">01</span><h3 className="ec-prompt-sheet__section-title">How it works · {exemplar.setting}</h3></header>
            <p className="ec-prompt-sheet__mechanism">{exemplar.mechanism}</p>
            <ol className="ec-prompt-sheet__steps">{exemplar.applied_process.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
          </section>
          <section id="tech-section-2" className="ec-prompt-sheet__section ec-prompt-sheet__section--02">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">02</span><h3 className="ec-prompt-sheet__section-title">When and why to use it</h3></header>
            <ol className="ec-prompt-sheet__steps">{exemplar.when_to_use.map((step, index) => <li key={step.title}><span>{String(index + 1).padStart(2, '0')}</span><div><strong>{step.title}</strong><p>{step.detail}</p></div></li>)}</ol>
          </section>
          <section id="tech-section-3" className="ec-prompt-sheet__section ec-prompt-sheet__section--03">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">03</span><h3 className="ec-prompt-sheet__section-title">Specific limitations</h3></header>
            <ul className="ec-prompt-sheet__limits">{exemplar.limitations.map((limit) => <li key={limit.title}><strong>{limit.title}</strong><p>{limit.detail}</p></li>)}</ul>
          </section>
          <section id="tech-section-4" className="ec-prompt-sheet__section ec-prompt-sheet__section--04">
            <header className="ec-prompt-sheet__section-head"><span className="ec-prompt-sheet__section-num">04</span><h3 className="ec-prompt-sheet__section-title">A matched, isolated task</h3></header>
            <p className="ec-prompt-sheet__mechanism">{exemplar.example.scenario}. Same source packet and model route for both prompts; the instruction framing changes.</p>
            <p className="ec-prompt-sheet__mechanism"><strong>Comparison question:</strong> {exemplar.example.comparison_predicate}</p>
            {comparison ? <div className="ec-prompt-sheet__comparison">
              <p className="ec-prompt-sheet__delta"><strong>What changed in the prompt:</strong> {comparison.editorial_delta}</p>
              <div className="ec-prompt-sheet__tabs" role="tablist" aria-label={`${entry.title} demonstration`} onKeyDown={(event) => {
                const next = event.key === 'ArrowRight' ? (activeTab + 1) % 4 : event.key === 'ArrowLeft' ? (activeTab + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
                if (next === null) return;
                event.preventDefault(); setActiveTab(next);
                (event.currentTarget.querySelectorAll('button')[next] as HTMLButtonElement)?.focus();
              }}>
                {tabs.map((tab, index) => <button key={tab.label} type="button" role="tab" id={`demo-tab-${entry.slug}-${index}`} aria-controls={`demo-panel-${entry.slug}`} aria-selected={activeTab === index} tabIndex={activeTab === index ? 0 : -1} onClick={() => setActiveTab(index)}>{tab.label}</button>)}
              </div>
              <div role="tabpanel" id={`demo-panel-${entry.slug}`} aria-labelledby={`demo-tab-${entry.slug}-${activeTab}`} className="ec-prompt-sheet__comparison-panel">
                <h4>{tabs[activeTab].label}</h4>
                {activeTab % 2 === 1 && 'public_redaction' in samples[activeTab === 1 ? 0 : 1] && <p className="ec-prompt-sheet__redaction">{samples[activeTab === 1 ? 0 : 1].public_redaction}</p>}
                {activeTab % 2 === 0
                  ? <pre className="ec-prompt-sheet__submitted-prompt">{tabs[activeTab].text}</pre>
                  : <div className="ec-prompt-sheet__rendered-response" dangerouslySetInnerHTML={{ __html: renderResponseMarkdown(tabs[activeTab].text ?? '') }} />
                }
              </div>
              <aside className="ec-prompt-sheet__comparison-receipt"><strong>Observed limitations · {comparison.review_status}</strong>
                <ul>{comparison.observed_limits.map((limit) => <li key={limit}>{limit}</li>)}</ul>
                <p>{comparison.boundary}</p><small>{comparison.provider}/{comparison.model} · 0 tool events · prompt/response digests retained in the comparison receipt.</small>
              </aside>
            </div> : <p>Matched execution pair pending. No model output has been captured for this technique.</p>}
          </section>
        </div> : <div className="ec-prompt-sheet__editorial-hold"><strong>Technique-specific editorial review pending</strong><p>This technique has not yet received its own applied steps, use criteria, limitations and matched provider-backed example. The older source projection is withheld rather than presented as tailored instruction.</p></div>}
      </article>
    </div>,
    document.body
  );
}
