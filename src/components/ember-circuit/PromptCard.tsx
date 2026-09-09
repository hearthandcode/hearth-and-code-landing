import { useEffect } from 'react';
import { createPortal } from 'react-dom';
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
  const sections = (entry.sections || []).slice(0, 8);
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

        <div className="ec-prompt-sheet__body">
          {sections.map((section, index) => (
            <section
              key={section.title}
              className={`ec-prompt-sheet__section ec-prompt-sheet__section--${String(index + 1).padStart(2, '0')}`}
            >
              <header className="ec-prompt-sheet__section-head">
                <span className="ec-prompt-sheet__section-num">{String(index + 1).padStart(2, '0')}</span>
                <h3 className="ec-prompt-sheet__section-title">{section.title}</h3>
              </header>
              <div
                className="ec-prompt-sheet__prose ec-md"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(section.body || '') }}
              />
            </section>
          ))}
        </div>
      </article>
    </div>,
    document.body
  );
}
