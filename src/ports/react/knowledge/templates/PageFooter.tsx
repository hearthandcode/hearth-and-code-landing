/**
 * PageFooter (React port)
 * Source: src/components/knowledge/templates/PageFooter.astro
 * Knowledge template (k-template): t-page-footer
 */
import * as React from 'react';

interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface PageFooterProps {
  copyright: string;
  columns?: FooterColumn[];
  className?: string;
}

export function PageFooter({
  copyright,
  columns = [],
  className = '',
}: PageFooterProps) {
  const classes = ['ec-page-footer', className].filter(Boolean).join(' ');
  return (
    <footer className={classes}>
      <div className="ec-page-footer__inner">
        {columns.length > 0 && (
          <div className="ec-page-footer__columns">
            {columns.map((col, i) => (
              <div key={i} className="ec-page-footer__column">
                <h3 className="ec-page-footer__column-title">{col.title}</h3>
                <ul className="ec-page-footer__column-list">
                  {col.links.map((l, j) => (
                    <li key={j}>
                      <a href={l.href} className="ec-page-footer__column-link">{l.label}</a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}
        <div className="ec-page-footer__bottom">
          <p className="ec-page-footer__copyright">{copyright}</p>
        </div>
      </div>
    </footer>
  );
}
