/**
 * PaperSummary (React port)
 *
 * Generated skeleton from Astro composite. Hand-port the render logic
 * for full visual parity.
 */
import * as React from 'react';

export interface PaperSummaryProps {
title: string;
authors: string[];
year: number | string;
venue?: string;
abstract: string;
claims: string[];
limitations: string[];
citationCount?: number;
doi?: string;
class?: string;
  className?: string;
}

export function PaperSummary(props: PaperSummaryProps) {
  const { className = '', ...rest } = props as any;
  return (
    <div className={['kc-papersummary', className].filter(Boolean).join(' ')}>
      <span className="kc-papersummary__placeholder">PaperSummary (React port)</span>
    </div>
  );
}
