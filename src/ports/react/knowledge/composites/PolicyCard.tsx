/**
 * PolicyCard (React port)
 * Source: src/components/knowledge/composites/PolicyCard.astro
 * Knowledge composite (k-composite): k-policy-card
 */
import * as React from 'react';

type Status = 'draft' | 'active' | 'suspended' | 'retired';

export interface PolicyCardProps {
  id: string;
  title: string;
  statement: string;
  effectiveDate: string;
  scope: string;
  owner?: string;
  status?: Status;
  className?: string;
}

export function PolicyCard({
  id,
  title,
  statement,
  effectiveDate,
  scope,
  owner,
  status = 'active',
  className = '',
}: PolicyCardProps) {
  const classes = ['kc-policy-card', `kc-policy-card--${status}`, className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <header className="kc-policy-card__header">
        <div className="kc-policy-card__id-row">
          <span className="kc-policy-card__id">{id}</span>
          <span className="kc-policy-card__status">{status}</span>
        </div>
        <h4 className="kc-policy-card__title">{title}</h4>
      </header>
      <p className="kc-policy-card__statement">{statement}</p>
      <footer className="kc-policy-card__footer">
        <span className="kc-policy-card__meta">
          <span className="kc-policy-card__label">Effective</span>
          <time>{effectiveDate}</time>
        </span>
        <span className="kc-policy-card__meta">
          <span className="kc-policy-card__label">Scope</span>
          <span>{scope}</span>
        </span>
        {owner && (
          <span className="kc-policy-card__meta">
            <span className="kc-policy-card__label">Owner</span>
            <span>{owner}</span>
          </span>
        )}
      </footer>
    </article>
  );
}
