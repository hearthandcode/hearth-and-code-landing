/**
 * PathBreadcrumb (React port)
 * Source: src/components/knowledge/atoms/PathBreadcrumb.astro
 * Knowledge primitive (k-atom): k-path-segment
 *
 * Single file path segment
 */
import * as React from 'react';

export interface PathBreadcrumbProps {
  segment: string;
  href?: string;
  icon?: 'folder' | 'file' | 'package';
  className?: string;
}

const icons = { folder: '◫', file: '◧', package: '⌘' };

export function PathBreadcrumb({
  segment,
  href,
  icon = 'folder',
  className = '',
}: PathBreadcrumbProps) {
  const classes = ['kc-path-segment', className].filter(Boolean).join(' ');
  const content = (
    <>
      <span className="kc-path-segment__icon" aria-hidden="true">{icons[icon]}</span>
      <span className="kc-path-segment__name">{segment}</span>
    </>
  );
  return href ? (
    <a className={classes} href={href}>{content}</a>
  ) : (
    <span className={classes}>{content}</span>
  );
}
