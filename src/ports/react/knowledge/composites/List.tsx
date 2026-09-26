/**
 * List (React port)
 * Source: src/components/knowledge/composites/List.astro
 * Knowledge composite (k-composite): c-list
 */
import * as React from 'react';

interface ListItem {
  content: string;
  href?: string;
}

export interface ListProps {
  items: ListItem[];
  variant?: 'normal' | 'compact';
  className?: string;
}

export function List({ items, variant = 'normal', className = '' }: ListProps) {
  const classes = ['kc-list', `kc-list--${variant}`, className].filter(Boolean).join(' ');
  return (
    <ul className={classes}>
      {items.map((item, i) => (
        <li key={i} className="kc-list__item">
          {item.href ? (
            <a className="kc-list__link" href={item.href}>{item.content}</a>
          ) : (
            <span className="kc-list__content">{item.content}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
