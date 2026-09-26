/**
 * TaxonomyTree (React port)
 * Source: src/components/knowledge/composites/TaxonomyTree.astro
 * Knowledge composite (k-composite): k-taxonomy-tree
 *
 * Interactive: click to expand/collapse nodes
 */
import * as React from 'react';

interface Node {
  id: string;
  label: string;
  description?: string;
  children?: Node[];
}

export interface TaxonomyTreeProps {
  root: Node;
  initiallyExpanded?: number;
  className?: string;
}

function renderNode(node: Node, depth: number, expandedDepth: number, parentOpen: boolean): React.ReactNode {
  if (!parentOpen) return null;
  const hasChildren = node.children && node.children.length > 0;
  const isOpen = depth < expandedDepth;
  return (
    <li
      key={node.id}
      className={`kc-taxonomy-tree__item ${hasChildren ? 'has-children' : ''} ${isOpen ? 'is-expanded' : ''}`}
    >
      <div className="kc-taxonomy-tree__row">
        <span className="kc-taxonomy-tree__toggle" aria-hidden="true" />
        <span className="kc-taxonomy-tree__label">{node.label}</span>
        {node.description && <span className="kc-taxonomy-tree__desc">{node.description}</span>}
      </div>
      {hasChildren && (
        <ul>
          {node.children!.map((child) => renderNode(child, depth + 1, expandedDepth, isOpen))}
        </ul>
      )}
    </li>
  );
}

export function TaxonomyTree({
  root,
  initiallyExpanded = 1,
  className = '',
}: TaxonomyTreeProps) {
  const classes = ['kc-taxonomy-tree', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <ul className="kc-taxonomy-tree__root">
        {renderNode(root, 0, initiallyExpanded, true)}
      </ul>
    </div>
  );
}
