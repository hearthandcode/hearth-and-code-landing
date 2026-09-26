/**
 * RelationVerb (React port)
 * Source: src/components/knowledge/atoms/RelationVerb.astro
 * Knowledge primitive (k-atom): k-relation-verb
 *
 * 12 semantic relation types
 */
import * as React from 'react';

export interface RelationVerbProps {
  verb: 'is-a' | 'part-of' | 'causes' | 'requires' | 'enables' | 'precedes' | 'follows' | 'contradicts' | 'supports' | 'extends' | 'instance-of' | 'same-as';
  direction?: 'forward' | 'backward' | 'bidirectional';
  className?: string;
}

const arrows = { forward: '→', backward: '←', bidirectional: '↔' };

export function RelationVerb({
  verb,
  direction = 'forward',
  className = '',
}: RelationVerbProps) {
  const classes = ['kc-relation-verb', `kc-relation-verb--${verb}`, className].filter(Boolean).join(' ');
  return (
    <span className={classes}>
      <span className="kc-relation-verb__arrow" aria-hidden="true">{arrows[direction]}</span>
      <span className="kc-relation-verb__label">{verb}</span>
    </span>
  );
}
