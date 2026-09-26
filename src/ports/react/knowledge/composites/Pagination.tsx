/**
 * Pagination (React port)
 * Source: src/components/knowledge/composites/Pagination.astro
 * Knowledge composite (k-composite): c-pagination
 */
import * as React from 'react';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
  className?: string;
}

export function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = '',
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);
  const classes = ['kc-pagination', 'kc-pagination--numbers', className].filter(Boolean).join(' ');
  return (
    <nav className={classes} aria-label="Pagination">
      <button
        className="kc-pagination__prev"
        disabled={currentPage === 1}
        onClick={() => onPageChange?.(currentPage - 1)}
      >
        ← Previous
      </button>
      <ul className="kc-pagination__list">
        {pages.map((p) => (
          <li key={p}>
            <button
              className={`kc-pagination__page ${p === currentPage ? 'is-current' : ''}`}
              onClick={() => onPageChange?.(p)}
              aria-current={p === currentPage ? 'page' : undefined}
            >
              {p}
            </button>
          </li>
        ))}
      </ul>
      <button
        className="kc-pagination__next"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange?.(currentPage + 1)}
      >
        Next →
      </button>
    </nav>
  );
}
