/**
 * HeroSplit (React port)
 * Source: src/components/knowledge/templates/HeroSplit.astro
 * Knowledge template (k-template): k-hero-split
 */
import * as React from 'react';

export interface HeroSplitProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  children?: React.ReactNode;
  className?: string;
}

export function HeroSplit({
  eyebrow,
  title,
  lede,
  accent = 'hearth',
  children,
  className = '',
}: HeroSplitProps) {
  const classes = [
    'ec-hero',
    `ec-hero-split--${accent}`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="ec-hero-split__copy">
        {eyebrow && <p className="ec-hero__eyebrow">{eyebrow}</p>}
        <h1 className="ec-hero__title">{title}</h1>
        {lede && <p className="ec-hero__lede">{lede}</p>}
        {children && <div className="ec-hero__actions">{children}</div>}
      </div>
    </section>
  );
}
