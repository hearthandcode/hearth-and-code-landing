/**
 * Select (React port)
 * Source: src/components/knowledge/composites/Select.astro
 * Knowledge composite (k-composite): c-select
 */
import * as React from 'react';

interface Option {
  value: string;
  label: string;
}

export interface SelectProps {
  options: Option[];
  value?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function Select({
  options,
  value,
  placeholder,
  onChange,
  className = '',
}: SelectProps) {
  const classes = ['kc-select', 'kc-select--md', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <select
        className="kc-select__field"
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
      >
        {placeholder && <option value="" disabled>{placeholder}</option>}
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
      <span className="kc-select__icon" aria-hidden="true">▼</span>
    </div>
  );
}
