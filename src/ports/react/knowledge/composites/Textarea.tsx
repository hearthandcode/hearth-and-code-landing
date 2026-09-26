/**
 * Textarea (React port)
 * Source: src/components/knowledge/composites/Textarea.astro
 * Knowledge composite (k-composite): c-textarea
 */
import * as React from 'react';

export interface TextareaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Textarea({
  placeholder,
  rows = 4,
  value,
  onChange,
  className = '',
}: TextareaProps) {
  return (
    <textarea
      className={['kc-textarea', 'kc-textarea__field', className].filter(Boolean).join(' ')}
      rows={rows}
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      style={{ resize: 'vertical' }}
    />
  );
}
