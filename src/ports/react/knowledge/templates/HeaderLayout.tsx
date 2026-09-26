/**
 * HeaderLayout (React port)
 * Source: src/components/knowledge/templates/HeaderLayout.astro
 * Knowledge template (k-template): t-layout-header
 */
import * as React from 'react';

export interface HeaderLayoutProps {
  title: string;
  stickyHeader?: boolean;
  children?: React.ReactNode;
  className?: string;
}

export function HeaderLayout({
  title,
  stickyHeader = false,
  children,
  className = '',
}: HeaderLayoutProps) {
  const classes = ['ec-layout-header', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <header
        className="ec-layout-header__header"
        style={{
          position: stickyHeader ? 'sticky' : 'static',
          top: 0,
          padding: '1rem',
          borderBottom: '1px solid var(--color-surface-rule)',
          background: 'var(--color-surface-raised)',
        }}
      >
        <h2 className="ec-layout-header__title">{title}</h2>
      </header>
      <div className="ec-layout-header__content">{children}</div>
    </div>
  );
}
