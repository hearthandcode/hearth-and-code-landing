/**
 * EmptyState (React port)
 * Source: src/components/knowledge/composites/EmptyState.astro
 * Knowledge composite (k-composite): k-empty-state
 */
import * as React from 'react';

export interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  actionLabel?: string;
  actionHref?: string;
  className?: string;
}

export function EmptyState({
  icon = 'search',
  title,
  description,
  actionLabel,
  actionHref,
  className = '',
}: EmptyStateProps) {
  const classes = ['kc-empty-state', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="kc-empty-state__icon" aria-hidden="true">{icon === 'search' ? '🔍' : '○'}</div>
      <h3 className="kc-empty-state__title">{title}</h3>
      {description && <p className="kc-empty-state__description">{description}</p>}
      {actionLabel && actionHref && (
        <a href={actionHref} className="kc-empty-state__action">{actionLabel}</a>
      )}
    </div>
  );
}
