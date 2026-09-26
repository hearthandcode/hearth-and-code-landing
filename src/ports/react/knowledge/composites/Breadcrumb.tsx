/**
 * Breadcrumb (React port)
 * Source: src/components/knowledge/composites/Breadcrumb.astro
 * Knowledge composite (k-composite): c-breadcrumb
 */
import * as React from 'react';

interface Crumb {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: Crumb[];
  className?: string;
}

export function Breadcrumb({ items, className = '' }: BreadcrumbProps) {
  const classes = ['kc-breadcrumb', className].filter(Boolean).join(' ');
  return (
    <nav className={classes} aria-label="Breadcrumb">
      <ol className="kc-breadcrumb__list">
        {items.map((c, i) => (
          <li key={i} className="kc-breadcrumb__item">
            {c.href && i < items.length - 1 ? (
              <a href={c.href} className="kc-breadcrumb__link">{c.label}</a>
            ) : (
              <span className="kc-breadcrumb__current" aria-current="page">{c.label}</span>
            )}
            {i < items.length - 1 && <span className="kc-breadcrumb__sep" aria-hidden="true">/</span>}
          </li>
        ))}
      </ol>
    </nav>
  );
}
