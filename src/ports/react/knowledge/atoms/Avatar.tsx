/**
 * Avatar (React port)
 * Source: src/components/primitives/Avatar.astro
 * Primitive (p-atom): p-avatar
 *
 * Initials or image avatar in a circle.
 */
import * as React from 'react';

export interface AvatarProps {
  name: string;
  initials?: string;
  src?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizeMap: Record<string, string> = {
  sm: '2rem',
  md: '3rem',
  lg: '4rem',
  xl: '6rem',
};

export function Avatar({ name, initials, src, size = 'md', className = '' }: AvatarProps) {
  const init = initials ?? name.split(/\s+/).map((w) => w[0]).slice(0, 2).join('').toUpperCase();
  const dim = sizeMap[size] || sizeMap.md;
  const classes = ['ec-avatar', `ec-avatar--${size}`, className].filter(Boolean).join(' ');
  if (src) {
    return (
      <img
        className={classes}
        src={src}
        alt={name}
        style={{ width: dim, height: dim, borderRadius: '50%', objectFit: 'cover' }}
      />
    );
  }
  return (
    <span
      className={classes}
      aria-hidden={false}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        borderRadius: '50%',
        background: 'var(--color-accent-ember)',
        color: 'var(--color-surface-primary)',
        fontWeight: 'bold',
        fontSize: size === 'sm' ? '0.625rem' : size === 'md' ? '0.875rem' : size === 'lg' ? '1.125rem' : '1.5rem',
      }}
    >
      {init}
    </span>
  );
}
