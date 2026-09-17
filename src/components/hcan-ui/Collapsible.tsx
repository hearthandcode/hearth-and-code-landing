import { useId, useState, type ReactNode } from 'react';

export interface CollapsibleProps {
  title: string;
  eyebrow?: string;
  summary?: string;
  defaultOpen?: boolean;
  children: ReactNode;
}

/** Base primitive: a bounded panel with a disclosure head. Default collapsed
 * so the page's resting surface stays short; drill-down is opt-in. */
export function Collapsible({ title, eyebrow, summary, defaultOpen = false, children }: CollapsibleProps) {
  const [open, setOpen] = useState(defaultOpen);
  const bodyId = useId();
  return (
    <section className={open ? 'ec-hcan-panel ec-hcan-panel--open' : 'ec-hcan-panel'}>
      <button
        type="button"
        className="ec-hcan-panel__head"
        aria-expanded={open}
        aria-controls={bodyId}
        onClick={() => setOpen(!open)}
      >
        <span className="ec-hcan-panel__head-text">
          {eyebrow && <span className="ec-hcan-panel__eyebrow">{eyebrow}</span>}
          <span className="ec-hcan-panel__title">{title}</span>
          {summary && <span className="ec-hcan-panel__summary">{summary}</span>}
        </span>
        <span className="ec-hcan-panel__chevron" aria-hidden="true">{open ? '\u2212' : '+'}</span>
      </button>
      {open && (
        <div id={bodyId} className="ec-hcan-panel__body">
          {children}
        </div>
      )}
    </section>
  );
}

export default Collapsible;
