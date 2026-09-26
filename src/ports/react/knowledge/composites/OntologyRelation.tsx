/**
 * OntologyRelation (React port)
 * Source: src/components/knowledge/composites/OntologyRelation.astro
 * Knowledge composite (k-composite): k-ontology-relation
 */
import * as React from 'react';

type Verb = 'is-a' | 'part-of' | 'causes' | 'requires' | 'enables' | 'extends' | 'same-as';
const arrows: Record<'forward' | 'backward' | 'bidirectional', string> = {
  forward: '→',
  backward: '←',
  bidirectional: '↔',
};

export interface OntologyRelationProps {
  subject: string;
  subjectType?: string;
  verb: Verb;
  object: string;
  objectType?: string;
  direction?: 'forward' | 'backward' | 'bidirectional';
  className?: string;
}

export function OntologyRelation({
  subject,
  subjectType,
  verb,
  object,
  objectType,
  direction = 'forward',
  className = '',
}: OntologyRelationProps) {
  const classes = ['kc-ontology-relation', `kc-ontology-relation--${verb}`, className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <div className="kc-ontology-relation__subject">
        <span className="kc-ontology-relation__concept">{subject}</span>
        {subjectType && <span className="kc-ontology-relation__type">{subjectType}</span>}
      </div>
      <div className="kc-ontology-relation__connector">
        <span className="kc-ontology-relation__verb">{verb}</span>
        <span className="kc-ontology-relation__arrow" aria-hidden="true">{arrows[direction]}</span>
      </div>
      <div className="kc-ontology-relation__object">
        <span className="kc-ontology-relation__concept">{object}</span>
        {objectType && <span className="kc-ontology-relation__type">{objectType}</span>}
      </div>
    </div>
  );
}
