/**
 * HumanGate (React port)
 * Source: src/components/knowledge/composites/HumanGate.astro
 * Knowledge composite (k-composite): k-human-gate
 *
 * Sealed gate with reviewer + disposition
 */
import * as React from 'react';

export interface HumanGateProps {
  id: string;
  name: string;
  description: string;
  reviewer: string;
  reviewerRole?: string;
  decision: 'approved' | 'rejected' | 'pending' | 'escalated';
  sealedAt?: string;
  criteria?: string[];
  className?: string;
}

const decisionIcons: Record<string, string> = {
  approved: '✓',
  rejected: '✗',
  pending: '○',
  escalated: '↑',
};

export function HumanGate({
  id,
  name,
  description,
  reviewer,
  reviewerRole,
  decision,
  sealedAt,
  criteria = [],
  className = '',
}: HumanGateProps) {
  const initials = reviewer.split(' ').map((w) => w[0]).slice(0, 2).join('');
  const classes = ['kc-human-gate', `kc-human-gate--${decision}`, className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <div className="kc-human-gate__seal">
        <span className="kc-human-gate__seal-icon" aria-hidden="true">
          {decisionIcons[decision]}
        </span>
      </div>
      <div className="kc-human-gate__body">
        <header className="kc-human-gate__header">
          <span className="kc-human-gate__id">{id}</span>
          <h4 className="kc-human-gate__name">{name}</h4>
          <span className="kc-human-gate__decision">{decision}</span>
        </header>
        <p className="kc-human-gate__desc">{description}</p>
        {criteria.length > 0 && (
          <ul className="kc-human-gate__criteria">
            {criteria.map((c, i) => (
              <li key={i}>
                <span className="kc-human-gate__check" aria-hidden="true">▪</span>
                {c}
              </li>
            ))}
          </ul>
        )}
        <footer className="kc-human-gate__footer">
          <div className="kc-human-gate__reviewer">
            <span className="kc-human-gate__avatar">{initials}</span>
            <div>
              <strong>{reviewer}</strong>
              {reviewerRole && <span>{reviewerRole}</span>}
            </div>
          </div>
          {sealedAt && (
            <time className="kc-human-gate__sealed">Sealed: {sealedAt}</time>
          )}
        </footer>
      </div>
    </article>
  );
}
