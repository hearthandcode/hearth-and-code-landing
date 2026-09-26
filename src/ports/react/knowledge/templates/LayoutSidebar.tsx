/**
 * LayoutSidebar (React port)
 * Source: src/components/knowledge/templates/LayoutSidebar.astro
 * Knowledge template (k-template): t-layout-sidebar
 */
import * as React from 'react';

export interface LayoutSidebarProps {
  sidebarPosition?: 'left' | 'right';
  sidebarWidth?: string;
  children?: React.ReactNode;
  className?: string;
}

export function LayoutSidebar({
  sidebarPosition = 'left',
  sidebarWidth = '10rem',
  children,
  className = '',
}: LayoutSidebarProps) {
  const classes = ['ec-layout-sidebar', `ec-layout-sidebar--${sidebarPosition}`, className].filter(Boolean).join(' ');
  // Parse children: first child = sidebar, rest = main
  const childArray = React.Children.toArray(children);
  const sidebar = childArray[0];
  const main = childArray.slice(1);

  return (
    <div className={classes} style={{ display: 'flex', gap: '1rem' }}>
      <aside
        className="ec-layout-sidebar__sidebar"
        style={{ flexBasis: sidebarWidth, flexShrink: 0 }}
      >
        {sidebar}
      </aside>
      <main className="ec-layout-sidebar__main" style={{ flex: 1 }}>
        {main}
      </main>
    </div>
  );
}
