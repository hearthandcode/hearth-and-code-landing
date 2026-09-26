/**
 * StateMachine (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface StateMachineProps {
states: State[];
transitions: Transition[];
class?: string;
  className?: string;
}

export function StateMachine(props: StateMachineProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-statemachine', className].filter(Boolean).join(' ')}>
      <span className="kc-statemachine__placeholder">StateMachine (React port)</span>
    </div>
  );
}
