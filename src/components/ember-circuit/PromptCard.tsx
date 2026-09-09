import type { CatalogEntry } from '../../data/vendored-data';
import type { TemplateTech } from '../../data/vendored-data';

export interface PromptCardProps {
  entry: CatalogEntry;
  tech?: TemplateTech;
  onOpen?: () => void;
  onOpenLab?: () => void;
  onClose?: () => void;
  selected?: boolean;
}

const TYPE_LABELS: Record<string, string> = {
  core: 'Core', contrastive: 'Contrastive', staged: 'Staged', receipt: 'Receipt',
  boundary: 'Boundary', schema: 'Schema', position: 'Position', query: 'Query',
  falsifier: 'Falsifier', adaptive: 'Adaptive',
};

export function typeLabel(t: string) { return TYPE_LABELS[t] || t.charAt(0).toUpperCase() + t.slice(1); }

function sectionKey(section: { title: string }) {
  return section.title.toLowerCase().replace(/[^a-z]+/g, '-').replace(/(^-|-$)/g, '');
}

/** A compact grid tile for one catalog technique. */
export function PromptCardTile({ entry, onOpen }: PromptCardProps) {
  const key = sectionKey(entry.sections[0] || { title: '' });
  return (
    <button type="button" className="ec-prompt-card" onClick={onOpen} aria-label={`Open ${entry.title}`}>
      <span className="ec-prompt-card__meta">
        <span>{typeLabel(entry.type)}</span>
        <span>#{String(entry.number).padStart(3, '0')}</span>
      </span>
      <strong className="ec-prompt-card__title">{entry.title}</strong>
      <span className="ec-prompt-card__seam">{key || 'technique'}</span>
    </button>
  );
}

/** A visually distinct 8-section presentation of one technique (field file). */
export function PromptCardSheet({ entry, tech, onClose, onOpenLab }: PromptCardProps) {
  const sections = entry.sections || [];
  const sectionsToShow = sections.slice(0, 8);

  return (
    <article className="ec-prompt-sheet" aria-labelledby={`prompt-sheet-${entry.slug}`}>
      <header className="ec-prompt-sheet__masthead">
        <div>
          <p className="ec-prompt-sheet__eyebrow">
            <span>{typeLabel(entry.type)}</span>
            <span>#{String(entry.number).padStart(3, '0')}</span>
            {tech?.template && <span className="ec-prompt-sheet__has-template">template ready</span>}
          </p>
          <h2 id={`prompt-sheet-${entry.slug}`}>{entry.title}</h2>
        </div>
        <div className="ec-prompt-sheet__actions">
          {onOpenLab && <button type="button" className="ec-prompt-sheet__lab" onClick={onOpenLab}>Open in Prompt Lab <span aria-hidden="true">↗</span></button>}
          <button type="button" className="ec-prompt-sheet__close" onClick={onClose} aria-label="Close">×</button>
        </div>
      </header>

      <div className="ec-prompt-sheet__body">
        {sectionsToShow.map((section, index) => (
          <section key={section.title} className={`ec-prompt-sheet__section ec-prompt-sheet__section--${String(index + 1).padStart(2, '0')}`}>
            <header>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <h3>{section.title}</h3>
            </header>
            <div className="ec-prompt-sheet__prose">
              {section.body_html ? <div dangerouslySetInnerHTML={{ __html: section.body_html }} /> : <p>{section.body}</p>}
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}