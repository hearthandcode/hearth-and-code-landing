/**
 * WorkflowState (React port)
 * Source: src/components/knowledge/composites/WorkflowState.astro
 * Knowledge composite (k-composite): k-workflow-state
 *
 * Current state + allowed transitions (interactive: click to change state)
 */
import * as React from 'react';

interface Transition {
  to: string;
  label: string;
  requires?: string;
}

export interface WorkflowStateProps {
  states: string[];
  current: string;
  transitions: Transition[];
  className?: string;
}

export function WorkflowState({
  states,
  current: initialCurrent,
  transitions,
  className = '',
}: WorkflowStateProps) {
  const [current, setCurrent] = React.useState(initialCurrent);
  const classes = ['kc-workflow-state', className].filter(Boolean).join(' ');
  return (
    <div className={classes} data-current={current}>
      <div className="kc-workflow-state__track">
        {states.map((s) => (
          <div
            key={s}
            className={`kc-workflow-state__node${s === current ? ' is-current' : ''}`}
          >
            <span className="kc-workflow-state__dot"></span>
            <span className="kc-workflow-state__label">{s}</span>
          </div>
        ))}
      </div>
      <div className="kc-workflow-state__transitions">
        <span className="kc-workflow-state__from">From: <strong>{current}</strong></span>
        {transitions.filter((t) => t.to !== current).map((t, i) => (
          <button
            key={i}
            className="kc-workflow-state__btn"
            onClick={() => setCurrent(t.to)}
            type="button"
          >
            {t.label}
            {t.requires && <span className="kc-workflow-state__req">({t.requires})</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
