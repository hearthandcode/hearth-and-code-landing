/**
 * ProductCard (React port)
 * Source: src/components/knowledge/composites/ProductCard.astro
 * Knowledge composite (k-composite): c-product-card
 */
import * as React from 'react';

export interface ProductCardProps {
  title: string;
  description: string;
  price?: string;
  href?: string;
  className?: string;
}

export function ProductCard({
  title,
  description,
  price,
  href = '#',
  className = '',
}: ProductCardProps) {
  const classes = ['kc-product-card', className].filter(Boolean).join(' ');
  return (
    <a href={href} className={classes}>
      <h3 className="kc-product-card__title">{title}</h3>
      <p className="kc-product-card__description">{description}</p>
      {price && <span className="kc-product-card__price">{price}</span>}
    </a>
  );
}
