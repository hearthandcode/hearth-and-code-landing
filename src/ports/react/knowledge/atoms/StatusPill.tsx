/**
 * StatusPill (React port)
 * Source: src/components/knowledge/atoms/StatusPill.astro
 * Knowledge primitive (k-atom): k-status-pill
 *
 * 10-state status pill
 */
import * as React from 'react';

export interface StatusPillProps {
  status: 'open' | 'closed' | 'pending' | 'sealed' | 'active' | 'archived' | 'review' | 'rejected' | 'approved' | 'draft';
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function StatusPill({
  status,
  label,
  size = 'md',
  className = '',
}: StatusPillProps) {
  const classes = ['kc-status-pill', `kc-status-pill--${status}`, `kc-status-pill--${size}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      <span className="kc-status-pill__dot" aria-hidden="true" />
      <span className="kc-status-pill__label">{label ?? status}</span>
    </span>
  );
}
