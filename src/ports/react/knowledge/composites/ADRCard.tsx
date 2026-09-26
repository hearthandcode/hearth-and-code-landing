/**
 * ADRCard (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface ADRCardProps {
number: string;
title: string;
status: 'proposed' | 'accepted' | 'rejected' | 'superseded' | 'deprecated';
date: string;
context: string;
decision: string;
consequences: string[];
class?: string;
  className?: string;
}

export function ADRCard(props: ADRCardProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-adrcard', className].filter(Boolean).join(' ')}>
      <span className="kc-adrcard__placeholder">ADRCard (React port)</span>
    </div>
  );
}
