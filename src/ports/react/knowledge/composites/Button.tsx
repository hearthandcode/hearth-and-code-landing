/**
 * Button (React port - though Button is technically a primitive, we include
 * it here as a composite-level component for the showcase)
 * Source: src/components/primitives/Button.astro
 */
import * as React from 'react';

export interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  loading?: boolean;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
  ariaLabel?: string;
  className?: string;
  onClick?: () => void;
  children?: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'md',
  disabled = false,
  loading = false,
  href,
  type = 'button',
  ariaLabel,
  className = '',
  onClick,
  children,
}: ButtonProps) {
  const classes = [
    'ec-button',
    `ec-button--${variant}`,
    `ec-button--${size}`,
    loading ? 'is-loading' : '',
    className,
  ].filter(Boolean).join(' ');
  if (href) {
    return (
      <a className={classes} href={href} aria-label={ariaLabel}>
        <span className="ec-button__content">{children}</span>
      </a>
    );
  }
  return (
    <button
      className={classes}
      disabled={disabled}
      type={type}
      aria-label={ariaLabel}
      onClick={onClick}
    >
      <span className="ec-button__content">{children}</span>
    </button>
  );
}
