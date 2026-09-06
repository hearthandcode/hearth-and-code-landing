import type { ReactNode } from 'react';

export interface BaseProps { className?: string; }
export interface LinkItem { label: string; href: string; relation?: string; meta?: string; }
export interface TreeNode { id: string; label: string; kind: string; children?: TreeNode[]; }
export interface BoundaryNode { id: string; label: string; group: 'public' | 'service' | 'private'; }
export interface BoundaryEdge { from: string; to: string; label: string; }
export interface MatrixRow { subject: string; source: string; posture: string; limit: string; }
export interface Stage { id: string; title: string; detail: string; state: 'ready' | 'active' | 'held'; }
export interface CollectionViewProps extends BaseProps {
  id?: string; eyebrow: string; title: string; description?: string; count?: number; controls?: ReactNode; children: ReactNode;
}
