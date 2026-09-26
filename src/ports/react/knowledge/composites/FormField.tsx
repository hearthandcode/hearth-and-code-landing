/**
 * FormField (React port)
 * Source: src/components/knowledge/composites/FormField.astro
 * Knowledge composite (k-composite): c-form-field
 */
import * as React from 'react';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  optional?: boolean;
  helper?: string;
  children?: React.ReactNode;
  className?: string;
}

export function FormField({
  label,
  htmlFor,
  required = false,
  optional = false,
  helper,
  children,
  className = '',
}: FormFieldProps) {
  const classes = ['kc-form-field', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <label className="kc-form-field__label" htmlFor={htmlFor}>
        <span>{label}</span>
        {required && <span className="kc-form-field__required" aria-label="required">*</span>}
        {optional && <span className="kc-form-field__optional">(optional)</span>}
      </label>
      {children}
      {helper && <p className="kc-form-field__helper" id={`${htmlFor}-help`}>{helper}</p>}
    </div>
  );
}
