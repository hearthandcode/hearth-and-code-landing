/**
 * PageHeader (React port)
 * Source: src/components/knowledge/templates/PageHeader.astro
 * Knowledge template (k-template): t-page-header
 */
import * as React from 'react';

export interface PageHeaderProps {
  title: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function PageHeader({
  title,
  subtitle,
  size = 'md',
  accent = 'balanced',
  className = '',
}: PageHeaderProps) {
  const classes = [
    'ec-page-header',
    `ec-page-header--${accent}`,
    `ec-page-header--${size}`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <header className={classes}>
      <h1 className="ec-page-header__title">{title}</h1>
      {subtitle && <p className="ec-page-header__subtitle">{subtitle}</p>}
    </header>
  );
}
