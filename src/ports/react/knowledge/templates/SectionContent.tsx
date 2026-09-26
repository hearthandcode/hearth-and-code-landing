/**
 * SectionContent (React port)
 * Source: src/components/knowledge/templates/SectionContent.astro
 * Knowledge template (k-template): t-section-content
 */
import * as React from 'react';

export interface SectionContentProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  children?: React.ReactNode;
  className?: string;
}

export function SectionContent({
  eyebrow,
  title,
  lede,
  accent = 'balanced',
  children,
  className = '',
}: SectionContentProps) {
  const classes = [
    'ec-section',
    `ec-section-content--${accent}`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="ec-section-content__inner">
        <header className="ec-section-content__header">
          {eyebrow && <p className="ec-section__eyebrow">{eyebrow}</p>}
          <h2 className="ec-section__title">{title}</h2>
          {lede && <p className="ec-section__lede">{lede}</p>}
        </header>
        {children && <div className="ec-section-content__body">{children}</div>}
      </div>
    </section>
  );
}
