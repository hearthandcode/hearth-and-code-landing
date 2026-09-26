/**
 * ReviewerChip (React port)
 * Source: src/components/knowledge/atoms/ReviewerChip.astro
 * Knowledge primitive (k-atom): k-reviewer-chip
 *
 * Reviewer identity chip with decision
 */
import * as React from 'react';

export interface ReviewerChipProps {
  name: string;
  initials?: string;
  role?: string;
  decision?: 'approved' | 'rejected' | 'pending' | 'abstained';
  className?: string;
}

export function ReviewerChip({
  name,
  initials,
  role,
  decision,
  className = '',
}: ReviewerChipProps) {
  const init = initials ?? name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const classes = [
    'kc-reviewer-chip',
    decision ? `kc-reviewer-chip--${decision}` : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      <span className="kc-reviewer-chip__avatar">{init}</span>
      <span className="kc-reviewer-chip__body">
        <span className="kc-reviewer-chip__name">{name}</span>
        {role && <span className="kc-reviewer-chip__role">{role}</span>}
      </span>
      {decision && <span className="kc-reviewer-chip__decision">{decision}</span>}
    </span>
  );
}
