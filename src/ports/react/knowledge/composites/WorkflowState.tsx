/**
 * WorkflowState (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface WorkflowStateProps {
states: string[];
current: string;
transitions: Transition[];
class?: string;
  className?: string;
}

export function WorkflowState(props: WorkflowStateProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-workflowstate', className].filter(Boolean).join(' ')}>
      <span className="kc-workflowstate__placeholder">WorkflowState (React port)</span>
    </div>
  );
}
