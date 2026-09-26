/**
 * StepperLayout (React port)
 * Source: src/components/knowledge/templates/StepperLayout.astro
 * Knowledge template (k-template): t-layout-stepper
 */
import * as React from 'react';

export interface StepperLayoutProps {
  steps: { label: string }[];
  currentStep: number;
  children?: React.ReactNode;
  className?: string;
}

export function StepperLayout({
  steps,
  currentStep,
  children,
  className = '',
}: StepperLayoutProps) {
  const classes = ['ec-layout-stepper', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <ol className="kc-stepper kc-stepper--horizontal">
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
      <div className="ec-layout-stepper__content">{children}</div>
    </div>
  );
}
