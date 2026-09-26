/**
 * ModelCard (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface ModelCardProps {
name: string;
version: string;
purpose: string;
trainingData: string;
evalResults?: { benchmark: string; score: string }[];
knownLimits: string[];
intendedUse?: string;
outOfScope?: string[];
class?: string;
  className?: string;
}

export function ModelCard(props: ModelCardProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-modelcard', className].filter(Boolean).join(' ')}>
      <span className="kc-modelcard__placeholder">ModelCard (React port)</span>
    </div>
  );
}
