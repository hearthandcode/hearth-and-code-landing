/**
 * CreativeProjectBrief (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface CreativeProjectBriefProps {
title: string;
premise: string;
arc: any[];
sampleDialogue: any[];
characters: { name: string; role: string; description: string }[];
class?: string;
  className?: string;
}

export function CreativeProjectBrief(props: CreativeProjectBriefProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-creativeprojectbrief', className].filter(Boolean).join(' ')}>
      <span className="kc-creativeprojectbrief__placeholder">CreativeProjectBrief (React port)</span>
    </div>
  );
}
