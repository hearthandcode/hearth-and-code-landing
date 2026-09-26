/**
 * ConfidenceBar (React port)
 * Source: src/components/knowledge/atoms/ConfidenceBar.astro
 * Knowledge primitive (k-atom): k-confidence-bar
 *
 * Confidence level visualization
 */
import * as React from 'react';

export interface ConfidenceBarProps {
  value: number;
  max?: number;
  variant?: 'low' | 'medium' | 'high' | 'stated';
  showValue?: boolean;
  className?: string;
}

export function ConfidenceBar({
  value,
  max = 100,
  variant = 'medium',
  showValue = false,
  className = '',
}: ConfidenceBarProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  const classes = ['kc-confidence-bar', `kc-confidence-bar--${variant}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      <span className="kc-confidence-bar__track">
        <span className="kc-confidence-bar__fill" style={{ width: `${pct}%` }} />
      </span>
      {showValue && <span className="kc-confidence-bar__value">{pct.toFixed(0)}%</span>}
    </span>
  );
}
