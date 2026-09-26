/**
 * StatCard (React port)
 * Source: src/components/knowledge/composites/StatCard.astro
 * Knowledge composite (k-composite): c-stat-card (note: prefixed c- to match)
 */
import * as React from 'react';

type Trend = 'up' | 'down' | 'flat';

export interface StatCardProps {
  value: string | number;
  label: string;
  trend?: Trend;
  context?: string;
  accent?: 'success' | 'caution' | 'error' | 'balanced' | 'ember' | 'signal' | 'violet' | 'gold';
  className?: string;
}

const trendIcons: Record<Trend, string> = { up: '↑', down: '↓', flat: '→' };

export function StatCard({
  value,
  label,
  trend = 'flat',
  context,
  accent = 'balanced',
  className = '',
}: StatCardProps) {
  const classes = ['kc-stat-card', `kc-stat-card--${accent}`, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="kc-stat-card__value">{value}</div>
      <div className="kc-stat-card__label">{label}</div>
      <div className={`kc-stat-card__trend kc-stat-card__trend--${trend}`}>
        <span>{trendIcons[trend]}</span>
        {context && <span className="kc-stat-card__context">{context}</span>}
      </div>
    </div>
  );
}
