/**
 * SectionFeatures (React port)
 * Source: src/components/knowledge/templates/SectionFeatures.astro
 * Knowledge template (k-template): t-section-features
 */
import * as React from 'react';
import { Icon } from '../atoms/Icon';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface SectionFeaturesProps {
  eyebrow?: string;
  title: string;
  lede?: string;
  features: Feature[];
  columns?: number;
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function SectionFeatures({
  eyebrow,
  title,
  lede,
  features,
  columns = 3,
  accent = 'hearth',
  className = '',
}: SectionFeaturesProps) {
  const classes = [
    'ec-section',
    `ec-section-features--${accent}`,
    className,
  ].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="ec-section-features__inner">
        <header className="ec-section-features__header">
          {eyebrow && <p className="ec-section__eyebrow">{eyebrow}</p>}
          <h2 className="ec-section__title">{title}</h2>
          {lede && <p className="ec-section__lede">{lede}</p>}
        </header>
        <div className={`ec-features-grid ec-features-grid--cols-${columns}`}>
          {features.map((f, i) => (
            <article key={i} className="ec-feature-card">
              <div className="ec-feature-card__icon" aria-hidden="true">
                <Icon name={f.icon} size="md" />
              </div>
              <div className="ec-feature-card__content">
                <h3 className="ec-feature-card__title">{f.title}</h3>
                <p className="ec-feature-card__description">{f.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
