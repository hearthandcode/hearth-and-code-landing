/**
 * ProjectStatus (React port)
 * Source: src/components/knowledge/composites/ProjectStatus.astro
 * Knowledge composite (k-composite): k-project-status
 */
import * as React from 'react';

type Status = 'on-track' | 'at-risk' | 'blocked' | 'complete' | 'archived';

export interface ProjectStatusProps {
  name: string;
  owner: string;
  status: Status;
  progress: number;
  lastActivity: string;
  blockers?: string[];
  nextMilestone?: string;
  className?: string;
}

export function ProjectStatus({
  name,
  owner,
  status,
  progress,
  lastActivity,
  blockers,
  nextMilestone,
  className = '',
}: ProjectStatusProps) {
  const classes = ['kc-project-status', `kc-project-status--${status}`, className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <header className="kc-project-status__header">
        <h4 className="kc-project-status__name">{name}</h4>
        <span className="kc-project-status__status">{status}</span>
      </header>
      <div className="kc-project-status__meta">
        <span className="kc-project-status__owner">Owner: <strong>{owner}</strong></span>
        <span className="kc-project-status__activity">Last activity: {lastActivity}</span>
      </div>
      <div className="kc-project-status__progress">
        <div className="kc-project-status__track">
          <div className="kc-project-status__fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="kc-project-status__pct">{progress}%</span>
      </div>
      {nextMilestone && <p className="kc-project-status__milestone">Next: {nextMilestone}</p>}
      {blockers && blockers.length > 0 && (
        <ul className="kc-project-status__blockers">
          {blockers.map((b, i) => (
            <li key={i} className="kc-project-status__blocker">
              <span className="kc-project-status__blocker-icon" aria-hidden="true">⚠</span>
              {b}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}
