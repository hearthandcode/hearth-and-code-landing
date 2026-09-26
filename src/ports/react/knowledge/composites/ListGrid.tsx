/**
 * ListGrid (React port)
 * Source: src/components/knowledge/composites/ListGrid.astro
 * Knowledge composite (k-composite): c-list-grid
 */
import * as React from 'react';

interface GridItem {
  content: string;
  href?: string;
}

export interface ListGridProps {
  items: GridItem[];
  columns?: number;
  className?: string;
}

export function ListGrid({ items, columns = 4, className = '' }: ListGridProps) {
  const classes = ['kc-list-grid', className].filter(Boolean).join(' ');
  return (
    <ul
      className={classes}
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${12}rem, 1fr))` }}
    >
      {items.map((item, i) => (
        <li key={i} className="kc-list-grid__item">
          {item.href ? (
            <a className="kc-list-grid__link" href={item.href}>{item.content}</a>
          ) : (
            <span>{item.content}</span>
          )}
        </li>
      ))}
    </ul>
  );
}
