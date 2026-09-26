/**
 * ProjectStatus (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface ProjectStatusProps {
name: string;
owner: string;
status: 'on-track' | 'at-risk' | 'blocked' | 'complete' | 'archived';
progress: number;
lastActivity: string;
blockers?: string[];
nextMilestone?: string;
class?: string;
  className?: string;
}

export function ProjectStatus(props: ProjectStatusProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-projectstatus', className].filter(Boolean).join(' ')}>
      <span className="kc-projectstatus__placeholder">ProjectStatus (React port)</span>
    </div>
  );
}
