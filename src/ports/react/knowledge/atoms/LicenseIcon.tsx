/**
 * LicenseIcon (React port)
 * Source: src/components/knowledge/atoms/LicenseIcon.astro
 * Knowledge primitive (k-atom): k-license
 *
 * License type indicator (9 types)
 */
import * as React from 'react';

export interface LicenseIconProps {
  license: 'CC-BY' | 'CC-BY-SA' | 'CC-BY-NC' | 'MIT' | 'Apache-2.0' | 'GPL-3.0' | 'BSD-3' | 'CC0' | 'proprietary' | 'unknown';
  href?: string;
  className?: string;
}

export function LicenseIcon({ license, href, className = '' }: LicenseIconProps) {
  const classes = ['kc-license', `kc-license--${license}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      <span className="kc-license__icon" aria-hidden="true">©</span>
      <span className="kc-license__label">{license}</span>
    </>
  );
  return href ? (
    <a className={classes} href={href} title={license}>{content}</a>
  ) : (
    <span className={classes} title={license}>{content}</span>
  );
}
