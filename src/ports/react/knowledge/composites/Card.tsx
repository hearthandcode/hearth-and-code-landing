/**
 * Card (React port)
 * Source: src/components/composites/Card.astro
 * Knowledge composite (k-composite): c-card
 */
import * as React from 'react';

export interface CardProps {
  children?: React.ReactNode;
  interactive?: boolean;
  className?: string;
}

export function Card({ children, interactive = false, className = '' }: CardProps) {
  const classes = [
    'kc-card',
    interactive ? 'kc-card--interactive' : '',
    className,
  ].filter(Boolean).join(' ');
  return <div className={classes}>{children}</div>;
}
