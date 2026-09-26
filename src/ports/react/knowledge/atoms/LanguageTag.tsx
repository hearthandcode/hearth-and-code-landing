/**
 * LanguageTag (React port)
 * Source: src/components/knowledge/atoms/LanguageTag.astro
 * Knowledge primitive (k-atom): k-language-tag
 *
 * Code language tag with 11 colors
 */
import * as React from 'react';

export interface LanguageTagProps {
  language: string;
  variant?: 'plain' | 'compact' | 'minimal';
  className?: string;
}

const langColors: Record<string, string> = {
  python: 'var(--color-accent-signal)',
  typescript: 'var(--color-accent-plasma)',
  javascript: 'var(--color-accent-gold)',
  rust: 'var(--color-accent-ember)',
  yaml: 'var(--color-accent-violet)',
  json: 'var(--color-text-secondary)',
  bash: 'var(--color-state-success)',
  markdown: 'var(--color-text-display)',
  sql: 'var(--color-state-caution)',
  go: 'var(--color-accent-plasma)',
};

export function LanguageTag({
  language,
  variant = 'plain',
  className = '',
}: LanguageTagProps) {
  const color = langColors[language.toLowerCase()] ?? 'var(--color-text-secondary)';
  const classes = ['kc-language-tag', `kc-language-tag--${variant}`, className].filter(Boolean).join(' ');
  return (
    <span
      className={classes}
      style={{ '--lang-color': color } as React.CSSProperties}
    >
      <span className="kc-language-tag__pip" aria-hidden="true" />
      {variant !== 'minimal' && <span className="kc-language-tag__label">{language}</span>}
    </span>
  );
}
