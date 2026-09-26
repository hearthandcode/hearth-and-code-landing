/**
 * SectionCTA (React port)
 * Source: src/components/knowledge/templates/SectionCTA.astro
 * Knowledge template (k-template): t-section-cta
 */
import * as React from 'react';

export interface SectionCTAProps {
  title: string;
  description?: string;
  primaryCtaLabel?: string;
  primaryCtaHref?: string;
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function SectionCTA({
  title,
  description,
  primaryCtaLabel = 'Get started',
  primaryCtaHref = '#',
  accent = 'balanced',
  className = '',
}: SectionCTAProps) {
  const classes = [
    'ec-section',
    `ec-section-cta--${accent}`,
    `ec-section-cta--md`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="ec-section-cta__inner">
        <h2 className="ec-section-cta__title">{title}</h2>
        {description && <p className="ec-section-cta__description">{description}</p>}
        <div className="ec-section-cta__actions">
          <a href={primaryCtaHref} className="ec-section-cta__cta">{primaryCtaLabel}</a>
        </div>
      </div>
    </section>
  );
}
