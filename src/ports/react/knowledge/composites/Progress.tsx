/**
 * Progress (React port)
 * Source: src/components/knowledge/composites/Progress.astro
 * Knowledge composite (k-composite): k-progress
 */
import * as React from 'react';

export interface ProgressProps {
  value: number;
  label?: string;
  variant?: 'ember' | 'signal' | 'success' | 'caution';
  className?: string;
}

export function Progress({ value, label, variant = 'ember', className = '' }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, value));
  const classes = ['kc-progress', `kc-progress--${variant}`, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div
        className="kc-progress__track"
        role="progressbar"
        aria-valuenow={value}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={label ? `${label}: ${value}%` : undefined}
      >
        <div className="kc-progress__bar" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
