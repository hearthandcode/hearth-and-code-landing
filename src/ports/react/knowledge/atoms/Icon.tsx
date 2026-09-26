/**
 * Icon (React port)
 * Source: src/components/primitives/Icon.astro
 * Primitive (p-atom): p-icon
 *
 * Inline SVG icon. Uses 'use' with a sprite symbol.
 */
import * as React from 'react';

export interface IconProps {
  name: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  color?: string;
  className?: string;
}

const sizeMap: Record<string, string> = {
  xs: '1rem',
  sm: '1.25rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
};

// Minimal inline SVG icon set (used when no sprite is available)
const INLINE_ICONS: Record<string, React.ReactNode> = {
  check: <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />,
  info: <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z" />,
  warning: <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />,
  user: <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />,
  arrow: <path d="M5 12h14m-7-7l7 7-7 7" />,
  close: <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />,
  plus: <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />,
  search: <path d="M15.5 14h-.79l-.28-.27a6.5 6.5 0 1 0-.7.7l.27.28v.79l5 5 1.49-1.49-5-5zm-6 0a4.5 4.5 0 1 1 0-9 4.5 4.5 0 0 1 0 9z" />,
};

export function Icon({ name, size = 'md', color, className = '' }: IconProps) {
  const classes = ['ec-icon', `ec-icon--${size}`, className].filter(Boolean).join(' ');
  const dim = sizeMap[size] || sizeMap.md;
  const path = INLINE_ICONS[name] || INLINE_ICONS.info;
  return (
    <svg
      className={classes}
      width={dim}
      height={dim}
      viewBox="0 0 24 24"
      fill={color || 'currentColor'}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {path}
    </svg>
  );
}
