/**
 * PromptPattern (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface PromptPatternProps {
name: string;
category: 'reasoning' | 'extraction' | 'transformation' | 'generation' | 'analysis' | 'tooling';
template: string;
variables?: { name: string; description: string }[];
example?: { input?: string; output: string };
author?: string;
class?: string;
  className?: string;
}

export function PromptPattern(props: PromptPatternProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-promptpattern', className].filter(Boolean).join(' ')}>
      <span className="kc-promptpattern__placeholder">PromptPattern (React port)</span>
    </div>
  );
}
