/**
 * SeverityDot (React port)
 * Source: src/components/knowledge/atoms/SeverityDot.astro
 * Knowledge primitive (k-atom): k-severity-dot
 *
 * Severity indicator with 6 levels, optional pulsing animation
 */
import * as React from 'react';

export interface SeverityDotProps {
  severity: 'info' | 'success' | 'caution' | 'warning' | 'error' | 'critical';
  label?: string;
  size?: 'sm' | 'md' | 'lg';
  pulsing?: boolean;
  className?: string;
}

export function SeverityDot({
  severity,
  label,
  size = 'md',
  pulsing = false,
  className = '',
}: SeverityDotProps) {
  const classes = [
    'kc-severity-dot',
    `kc-severity-dot--${severity}`,
    `kc-severity-dot--${size}`,
    pulsing ? 'is-pulsing' : '',
    className,
  ].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      <span className="kc-severity-dot__pip" aria-hidden="true" />
      {label && <span className="kc-severity-dot__label">{label}</span>}
    </span>
  );
}
