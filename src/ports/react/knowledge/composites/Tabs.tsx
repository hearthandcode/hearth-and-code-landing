/**
 * Tabs (React port)
 * Source: src/components/knowledge/composites/Tabs.astro
 * Knowledge composite (k-composite): c-tabs
 */
import * as React from 'react';

interface Tab {
  id: string;
  label: string;
  content: string;
}

export interface TabsProps {
  tabs: Tab[];
  className?: string;
}

export function Tabs({ tabs, className = '' }: TabsProps) {
  const [active, setActive] = React.useState(tabs[0]?.id);
  const activeTab = tabs.find((t) => t.id === active);
  const classes = ['kc-tabs', 'kc-tabs--horizontal', 'kc-tabs--underline', className].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="kc-tabs__list" role="tablist">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            role="tab"
            className={`kc-tabs__trigger ${t.id === active ? 'is-active' : ''}`}
            data-tab-id={t.id}
            aria-selected={t.id === active}
            onClick={() => setActive(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="kc-tabs__panel is-active" role="tabpanel" data-tab-panel={active}>
        {activeTab?.content || ''}
      </div>
    </div>
  );
}
