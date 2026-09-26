/**
 * LinkGroup (React port)
 * Source: src/components/knowledge/composites/LinkGroup.astro
 * Knowledge composite (k-composite): c-link-group
 */
import * as React from 'react';

interface Link {
  label: string;
  href?: string;
  description?: string;
}

export interface LinkGroupProps {
  title: string;
  links: Link[];
  variant?: 'horizontal' | 'vertical';
  className?: string;
}

export function LinkGroup({
  title,
  links,
  variant = 'vertical',
  className = '',
}: LinkGroupProps) {
  const classes = ['kc-link-group', `kc-link-group--${variant}`, className].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <h4 className="kc-link-group__title">{title}</h4>
      <ul className={`kc-link-group__list kc-link-group__list--${variant === 'horizontal' ? 'inline' : 'divider'}`}>
        {links.map((l, i) => (
          <li key={i} className="kc-link-group__item">
            {l.href ? (
              <a className="kc-link-group__link" href={l.href}>
                {l.description && <small>{l.description}</small>}
                <span className="kc-link-group__label">{l.label}</span>
              </a>
            ) : (
              <span className="kc-link-group__link">
                {l.description && <small>{l.description}</small>}
                <span className="kc-link-group__label">{l.label}</span>
              </span>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
