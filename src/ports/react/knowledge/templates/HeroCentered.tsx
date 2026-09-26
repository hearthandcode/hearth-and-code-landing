/**
 * HeroCentered (React port)
 * Source: src/components/knowledge/templates/HeroCentered.astro
 * Knowledge template (k-template): k-hero-centered
 */
import * as React from 'react';

export interface HeroCenteredProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export function HeroCentered({
  eyebrow,
  title,
  lede,
  accent = 'balanced',
  size = 'md',
  children,
  className = '',
}: HeroCenteredProps) {
  const classes = [
    'ec-hero',
    `ec-hero-centered--${accent}`,
    `ec-hero-centered--${size}`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="ec-hero__inner">
        {eyebrow && <p className="ec-hero__eyebrow">{eyebrow}</p>}
        <h1 className="ec-hero__title">{title}</h1>
        {lede && <p className="ec-hero__lede">{lede}</p>}
        {children && <div className="ec-hero__actions">{children}</div>}
      </div>
    </section>
  );
}
