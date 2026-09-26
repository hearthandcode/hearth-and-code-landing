/**
 * Modal (React port)
 * Source: src/components/knowledge/templates/Modal.astro
 * Knowledge template (k-template): t-modal
 */
import * as React from 'react';

export interface ModalProps {
  id: string;
  title: string;
  size?: 'sm' | 'md' | 'lg';
  children?: React.ReactNode;
  className?: string;
}

export function Modal({ id, title, size = 'md', children, className = '' }: ModalProps) {
  const classes = ['ec-modal', `ec-modal--${size}`, className].filter(Boolean).join(' ');
  return (
    <div id={id} className={classes}>
      <div className="ec-modal__backdrop" />
      <div className="ec-modal__dialog">
        <header className="ec-modal__header">
          <h3 className="ec-modal__title">{title}</h3>
          <button className="ec-modal__close" aria-label="Close">×</button>
        </header>
        <div className="ec-modal__body">{children}</div>
      </div>
    </div>
  );
}
