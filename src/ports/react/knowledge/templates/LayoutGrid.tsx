/**
 * LayoutGrid (React port)
 * Source: src/components/knowledge/templates/LayoutGrid.astro
 * Knowledge template (k-template): t-layout-grid
 */
import * as React from 'react';

export interface LayoutGridProps {
  columns?: number;
  gap?: 'sm' | 'normal' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export function LayoutGrid({
  columns = 3,
  gap = 'normal',
  children,
  className = '',
}: LayoutGridProps) {
  const classes = ['ec-layout-grid', className].filter(Boolean).join(' ');
  return (
    <div
      className={classes}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gap === 'sm' ? '0.5rem' : gap === 'lg' ? '2rem' : '1rem',
      }}
    >
      {children}
    </div>
  );
}
