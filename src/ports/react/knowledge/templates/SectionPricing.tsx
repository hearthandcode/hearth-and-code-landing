/**
 * SectionPricing (React port)
 * Source: src/components/knowledge/templates/SectionPricing.astro
 * Knowledge template (k-template): t-section-pricing
 */
import * as React from 'react';

interface Tier {
  tier: string;
  price: string;
  features: string[];
  highlighted?: boolean;
}

export interface SectionPricingProps {
  eyebrow?: string;
  title: string;
  tiers: Tier[];
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function SectionPricing({
  eyebrow,
  title,
  tiers,
  accent = 'balanced',
  className = '',
}: SectionPricingProps) {
  const classes = ['ec-section', `ec-section-pricing--${accent}`, className].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="ec-section-pricing__inner">
        <header className="ec-section-pricing__header">
          {eyebrow && <p className="ec-section__eyebrow">{eyebrow}</p>}
          <h2 className="ec-section__title">{title}</h2>
        </header>
        <div className="ec-pricing-grid">
          {tiers.map((t, i) => (
            <article key={i} className={`ec-pricing-card ${t.highlighted ? 'ec-pricing-card--highlighted' : ''}`}>
              <h3 className="ec-pricing-card__tier">{t.tier}</h3>
              <div className="ec-pricing-card__price">{t.price}</div>
              <ul className="ec-pricing-card__features">
                {t.features.map((f, j) => <li key={j}>{f}</li>)}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
