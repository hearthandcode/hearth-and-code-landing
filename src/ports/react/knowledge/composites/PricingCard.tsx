/**
 * PricingCard (React port)
 * Source: src/components/knowledge/composites/PricingCard.astro
 * Knowledge composite (k-composite): c-pricing-card
 */
import * as React from 'react';

export interface PricingCardProps {
  tier: string;
  price: string;
  period?: string;
  features: string[];
  ctaLabel?: string;
  ctaHref?: string;
  highlighted?: boolean;
  className?: string;
}

export function PricingCard({
  tier,
  price,
  period,
  features,
  ctaLabel = 'Get started',
  ctaHref = '#',
  highlighted = false,
  className = '',
}: PricingCardProps) {
  const classes = ['kc-pricing-card', highlighted ? 'kc-pricing-card--highlighted' : '', className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <h3 className="kc-pricing-card__tier">{tier}</h3>
      <div className="kc-pricing-card__price-row">
        <span className="kc-pricing-card__price">{price}</span>
        {period && <span className="kc-pricing-card__period">{period}</span>}
      </div>
      <ul className="kc-pricing-card__features">
        {features.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>
      <a href={ctaHref} className="kc-pricing-card__cta">{ctaLabel}</a>
    </article>
  );
}
