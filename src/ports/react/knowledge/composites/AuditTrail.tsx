/**
 * AuditTrail (React port)
 * Source: src/components/knowledge/composites/AuditTrail.astro
 * Knowledge composite (k-composite): k-audit-trail
 *
 * Append-only event log with search filter
 */
import * as React from 'react';

type Outcome = 'success' | 'failure' | 'pending';
interface Event {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  target?: string;
  outcome?: Outcome;
  meta?: Record<string, string>;
}

export interface AuditTrailProps {
  events: Event[];
  filterable?: boolean;
  className?: string;
}

export function AuditTrail({
  events,
  filterable = true,
  className = '',
}: AuditTrailProps) {
  const [query, setQuery] = React.useState('');

  const filtered = query
    ? events.filter((e) => e.text?.toLowerCase?.().includes(query.toLowerCase()) ||
        [e.actor, e.action, e.target, JSON.stringify(e.meta || {})].some(
          (v) => (v || '').toLowerCase().includes(query.toLowerCase())
        ))
    : events;

  return (
    <section className={['kc-audit-trail', className].filter(Boolean).join(' ')}>
      {filterable && (
        <input
          type="search"
          className="kc-audit-trail__search"
          placeholder="Filter events..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      )}
      <ol className="kc-audit-trail__events">
        {filtered.map((e) => (
          <li key={e.id} className={`kc-audit-trail__event kc-audit-trail__event--${e.outcome || 'success'}`}>
            <span className="kc-audit-trail__time">{e.timestamp}</span>
            <span className="kc-audit-trail__dot" aria-hidden="true" />
            <div className="kc-audit-trail__body">
              <div className="kc-audit-trail__headline">
                <span className="kc-audit-trail__actor">{e.actor}</span>
                <span className="kc-audit-trail__action">{e.action}</span>
                {e.target && <span className="kc-audit-trail__target">{e.target}</span>}
              </div>
              {e.meta && Object.keys(e.meta).length > 0 && (
                <div className="kc-audit-trail__meta">
                  {Object.entries(e.meta).map(([k, v]) => (
                    <span key={k} className="kc-audit-trail__meta-item">
                      <span className="kc-audit-trail__meta-key">{k}</span>
                      <span className="kc-audit-trail__meta-val">{v}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>
            <span className="kc-audit-trail__id">{e.id}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
