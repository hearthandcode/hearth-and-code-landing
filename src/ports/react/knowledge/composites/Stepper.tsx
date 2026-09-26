/**
 * Stepper (React port)
 * Source: src/components/knowledge/composites/Stepper.astro
 * Knowledge composite (k-composite): c-stepper
 */
import * as React from 'react';

interface Step {
  label: string;
}

export interface StepperProps {
  steps: Step[];
  currentStep: number;
  className?: string;
}

export function Stepper({ steps, currentStep, className = '' }: StepperProps) {
  const classes = ['kc-stepper', `kc-stepper--horizontal`, className].filter(Boolean).join(' ');
  return (
    <ol className={classes}>
      {steps.map((s, i) => (
        <li
          key={i}
          className={`kc-stepper__step ${i + 1 === currentStep ? 'is-current' : ''} ${i + 1 < currentStep ? 'is-complete' : ''}`}
        >
          <span className="kc-stepper__dot">{i + 1}</span>
          <span className="kc-stepper__label">{s.label}</span>
        </li>
      ))}
    </ol>
  );
}
