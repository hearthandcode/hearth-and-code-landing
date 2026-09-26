/**
 * Alert (React port)
 * Source: src/components/knowledge/composites/Alert.astro
 * Knowledge composite (k-composite): k-alert
 */
import * as React from 'react';

export interface AlertProps {
  variant: 'info' | 'success' | 'caution' | 'warning' | 'error' | 'danger';
  title?: string;
  children?: React.ReactNode;
  dismissible?: boolean;
  className?: string;
}

const variantIcons: Record<string, string> = {
  info: 'ⓘ', success: '✓', caution: '⚠', warning: '⚠', error: '✕', danger: '✕',
};

export function Alert({
  variant,
  title,
  children,
  dismissible = false,
  className = '',
}: AlertProps) {
  const [visible, setVisible] = React.useState(true);
  if (!visible) return null;
  const classes = ['kc-alert', `kc-alert--${variant}`, className].filter(Boolean).join(' ');
  return (
    <div className={classes} role={variant === 'error' || variant === 'danger' ? 'alert' : 'status'}>
      <span className="kc-alert__icon" aria-hidden="true">{variantIcons[variant] || variantIcons.info}</span>
      <div className="kc-alert__content">
        {title && <h4 className="kc-alert__title">{title}</h4>}
        {children && <div className="kc-alert__body">{children}</div>}
      </div>
      {dismissible && (
        <button
          className="kc-alert__dismiss"
          onClick={() => setVisible(false)}
          aria-label="Dismiss"
          type="button"
        >
          ✕
        </button>
      )}
    </div>
  );
}
