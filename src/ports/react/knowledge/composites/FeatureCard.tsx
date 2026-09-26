/**
 * FeatureCard (React port)
 * Source: src/components/knowledge/composites/FeatureCard.astro
 * Knowledge composite (k-composite): c-feature-card
 */
import * as React from 'react';
import { Icon } from '../atoms/Icon';

export interface FeatureCardProps {
  icon?: string;
  title: string;
  description: string;
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function FeatureCard({
  icon = 'check',
  title,
  description,
  accent = 'balanced',
  className = '',
}: FeatureCardProps) {
  const classes = ['kc-feature-card', `kc-feature-card--${accent}`, `kc-feature-card--md`, className].filter(Boolean).join(' ');
  return (
    <article className={classes}>
      <div className="kc-feature-card__icon" aria-hidden="true">
        <Icon name={icon} size="md" />
      </div>
      <div className="kc-feature-card__content">
        <h3 className="kc-feature-card__title">{title}</h3>
        <p className="kc-feature-card__description">{description}</p>
      </div>
    </article>
  );
}
