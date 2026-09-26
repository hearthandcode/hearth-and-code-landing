/**
 * SourceChain (React port)
 * Source: src/components/knowledge/composites/SourceChain.astro
 * Knowledge composite (k-composite): k-source-chain
 *
 * Tree of citations linking back to root evidence
 */
import * as React from 'react';

interface SourceNode {
  id: string;
  label: string;
  author?: string;
  year?: number | string;
  href?: string;
  provenance?: 'primary' | 'derived' | 'cited' | 'verified' | 'inferred';
  children?: SourceNode[];
}

const provenanceColors: Record<string, string> = {
  primary: 'var(--color-accent-plasma)',
  derived: 'var(--color-accent-signal)',
  cited: 'var(--color-accent-violet)',
  verified: 'var(--color-state-success)',
  inferred: 'var(--color-accent-gold)',
};

export interface SourceChainProps {
  root: SourceNode;
  className?: string;
}

function renderNode(node: SourceNode): React.ReactNode {
  const color = node.provenance ? provenanceColors[node.provenance] : 'var(--color-accent-signal)';
  return (
    <li key={node.id} className={`kc-source-chain__node kc-source-chain__node--${node.provenance || 'cited'}`}>
      <div className="kc-source-chain__item">
        <span className="kc-source-chain__line" />
        <span className="kc-source-chain__marker" style={{ background: color }} />
        <span className="kc-source-chain__label">{node.label}</span>
        {node.author && <span className="kc-source-chain__author">{node.author} ({node.year || '—'})</span>}
        <span className="kc-source-chain__prov">{node.provenance || 'cited'}</span>
      </div>
      {node.children && node.children.length > 0 && (
        <ul>{node.children.map(renderNode)}</ul>
      )}
    </li>
  );
}

export function SourceChain({ root, className = '' }: SourceChainProps) {
  return (
    <div className={['kc-source-chain', className].filter(Boolean).join(' ')}>
      <ul className="kc-source-chain__root">{renderNode(root)}</ul>
    </div>
  );
}
