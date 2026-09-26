/**
 * ConceptCard (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface ConceptCardProps {
term: string;
definition: string;
type?: string;
relations?: Relation[];
source?: string;
class?: string;
  className?: string;
}

export function ConceptCard(props: ConceptCardProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-conceptcard', className].filter(Boolean).join(' ')}>
      <span className="kc-conceptcard__placeholder">ConceptCard (React port)</span>
    </div>
  );
}
