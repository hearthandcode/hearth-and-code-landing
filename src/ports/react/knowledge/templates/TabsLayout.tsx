/**
 * TabsLayout (React port)
 * Source: src/components/knowledge/templates/TabsLayout.astro
 * Knowledge template (k-template): t-layout-tabs
 */
import * as React from 'react';
import Tabs from '../composites/Tabs';

export interface TabsLayoutProps {
  tabs: { id: string; label: string; content: string }[];
  className?: string;
}

export function TabsLayout({ tabs, className = '' }: TabsLayoutProps) {
  return (
    <div className={['ec-layout-tabs', className].filter(Boolean).join(' ')}>
      <Tabs tabs={tabs} />
    </div>
  );
}
