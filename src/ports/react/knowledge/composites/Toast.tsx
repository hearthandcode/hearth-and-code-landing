/**
 * Toast (React port)
 * Source: src/components/knowledge/composites/Toast.astro
 * Knowledge composite (k-composite): c-toast
 */
import * as React from 'react';

type Variant = 'success' | 'error' | 'info' | 'warning';

export interface ToastProps {
  visible?: boolean;
  variant?: Variant;
  title?: string;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
  duration?: number;
  className?: string;
  children?: React.ReactNode;
}

export function Toast({
  visible = true,
  variant = 'success',
  title,
  position = 'bottom-right',
  duration = 5000,
  className = '',
  children,
}: ToastProps) {
  const [show, setShow] = React.useState(visible);

  React.useEffect(() => {
    if (visible && duration > 0) {
      const t = setTimeout(() => setShow(false), duration);
      return () => clearTimeout(t);
    }
  }, [visible, duration]);

  const classes = [
    'kc-toast',
    `kc-toast--${variant}`,
    `kc-toast--${position}`,
    className,
  ].filter(Boolean).join(' ');

  if (!show) return null;

  return (
    <div className={classes} role="status">
      {title && <h4 className="kc-toast__title">{title}</h4>}
      {children && <div className="kc-toast__body">{children}</div>}
      <button className="kc-toast__dismiss" onClick={() => setShow(false)} aria-label="Dismiss">×</button>
    </div>
  );
}
