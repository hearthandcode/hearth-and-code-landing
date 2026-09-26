/**
 * EvidenceStrength (React port)
 * Source: src/components/knowledge/atoms/EvidenceStrength.astro
 * Knowledge primitive (k-atom): k-evidence-strength
 *
 * 5-tier evidence strength indicator
 */
import * as React from 'react';

export interface EvidenceStrengthProps {
  tier: 'anecdotal' | 'weak' | 'moderate' | 'strong' | 'conclusive';
  showLabel?: boolean;
  className?: string;
}

const tierIndex: Record<string, number> = {
  anecdotal: 0, weak: 1, moderate: 2, strong: 3, conclusive: 4,
};

export function EvidenceStrength({
  tier,
  showLabel = true,
  className = '',
}: EvidenceStrengthProps) {
  const idx = tierIndex[tier];
  const classes = ['kc-evidence-strength', `kc-evidence-strength--${tier}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      <span className="kc-evidence-strength__bars" aria-label={`Evidence strength: ${tier}`}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span
            key={i}
            className={`kc-evidence-strength__bar${i <= idx ? ' is-filled' : ''}`}
          />
        ))}
      </span>
      {showLabel && <span className="kc-evidence-strength__label">{tier}</span>}
    </span>
  );
}
