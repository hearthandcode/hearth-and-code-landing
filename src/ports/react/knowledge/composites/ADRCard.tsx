/**
 * ADRCard (React port)
 * Source: src/components/knowledge/composites/ADRCard.astro
 * Knowledge composite (k-composite): k-adr-card
 *
 * Architecture Decision Record (interactive: expand to see details)
 */
import * as React from 'react';

export interface ADRCardProps {
  number: string;
  title: string;
  status: 'proposed' | 'accepted' | 'rejected' | 'superseded' | 'deprecated';
  date: string;
  context: string;
  decision: string;
  consequences: string[];
  className?: string;
}

export function ADRCard({
  number,
  title,
  status,
  date,
  context,
  decision,
  consequences,
  className = '',
}: ADRCardProps) {
  const [open, setOpen] = React.useState(false);
  const classes = ['kc-adr', `kc-adr--${status}`, className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <button
        className={`kc-adr__header ${open ? 'is-expanded' : ''}`}
        onClick={() => setOpen(!open)}
        type="button"
      >
        <div className="kc-adr__id">
          <span className="kc-adr__number">ADR-{number}</span>
          <span className="kc-adr__status">{status}</span>
        </div>
        <h4 className="kc-adr__title">{title}</h4>
        <time className="kc-adr__date">{date}</time>
        <span className="kc-adr__chevron" aria-hidden="true">{open ? '▾' : '▸'}</span>
      </button>
      {open && (
        <div className="kc-adr__body">
          <section className="kc-adr__section">
            <h5 className="kc-adr__label">Context</h5>
            <p>{context}</p>
          </section>
          <section className="kc-adr__section kc-adr__section--decision">
            <h5 className="kc-adr__label">Decision</h5>
            <p>{decision}</p>
          </section>
          <section className="kc-adr__section">
            <h5 className="kc-adr__label">Consequences</h5>
            <ul>
              {consequences.map((c, i) => <li key={i}>{c}</li>)}
            </ul>
          </section>
        </div>
      )}
    </article>
  );
}
