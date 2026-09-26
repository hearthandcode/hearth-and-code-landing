/**
 * RunLog (React port)
 * Source: src/components/knowledge/composites/RunLog.astro
 * Knowledge composite (k-composite): k-run-log
 *
 * Interactive: severity filter + expand details
 */
import * as React from 'react';

type Severity = 'info' | 'success' | 'caution' | 'warning' | 'error' | 'critical';
interface LogEntry {
  timestamp: string;
  severity: Severity;
  source: string;
  message: string;
  details?: string;
}

export interface RunLogProps {
  entries: LogEntry[];
  filterable?: boolean;
  className?: string;
}

export function RunLog({ entries, filterable = true, className = '' }: RunLogProps) {
  const [filter, setFilter] = React.useState<string>('all');
  const [expanded, setExpanded] = React.useState<Record<number, boolean>>({});
  const severities = ['all', 'info', 'success', 'caution', 'warning', 'error', 'critical'];
  const classes = ['kc-run-log', className].filter(Boolean).join(' ');

  return (
    <section className={classes}>
      {filterable && (
        <div className="kc-run-log__filters">
          {severities.map((s) => (
            <button
              key={s}
              className={`kc-run-log__filter ${filter === s ? 'is-active' : ''}`}
              onClick={() => setFilter(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}
      <ol className="kc-run-log__entries">
        {entries.map((e, i) => (
          <li
            key={i}
            className={`kc-run-log__entry kc-run-log__entry--${e.severity}`}
            style={{ display: filter === 'all' || filter === e.severity ? '' : 'none' }}
          >
            <button
              className="kc-run-log__header"
              onClick={() => setExpanded((p) => ({ ...p, [i]: !p[i] }))}
            >
              <span className="kc-run-log__time">{e.timestamp}</span>
              <span className="kc-run-log__dot" aria-hidden="true" />
              <span className="kc-run-log__source">{e.source}</span>
              <span className="kc-run-log__msg">{e.message}</span>
            </button>
            {e.details && (
              <pre
                className="kc-run-log__details"
                style={{ display: expanded[i] ? 'block' : 'none' }}
              >
                {e.details}
              </pre>
            )}
          </li>
        ))}
      </ol>
    </section>
  );
}
