/**
 * LayoutStack (React port)
 * Source: src/components/knowledge/templates/LayoutStack.astro
 * Knowledge template (k-template): t-layout-stack
 */
import * as React from 'react';

export interface LayoutStackProps {
  gap?: 'sm' | 'normal' | 'lg';
  align?: 'start' | 'center' | 'end' | 'stretch';
  children?: React.ReactNode;
  className?: string;
}

export function LayoutStack({
  gap = 'normal',
  align = 'start',
  children,
  className = '',
}: LayoutStackProps) {
  const classes = ['ec-layout-stack', className].filter(Boolean).join(' ');
  return (
    <div
      className={classes}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: gap === 'sm' ? '0.5rem' : gap === 'lg' ? '2rem' : '1rem',
        alignItems: align === 'start' ? 'flex-start' : align === 'center' ? 'center' : align === 'end' ? 'flex-end' : 'stretch',
      }}
    >
      {children}
    </div>
  );
}
