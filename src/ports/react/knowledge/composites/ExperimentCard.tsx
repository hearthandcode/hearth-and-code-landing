/**
 * ExperimentCard (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface ExperimentCardProps {
id: string;
title: string;
hypothesis: string;
method: string;
results: string;
conclusion: string;
outcome?: 'confirmed' | 'refuted' | 'inconclusive' | 'in-progress';
class?: string;
  className?: string;
}

export function ExperimentCard(props: ExperimentCardProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-experimentcard', className].filter(Boolean).join(' ')}>
      <span className="kc-experimentcard__placeholder">ExperimentCard (React port)</span>
    </div>
  );
}
