import { useEffect, useState } from 'react';

export interface PanelTabItem {
  id: string;
  label: string;
  detail?: string;
}

interface Props {
  items: readonly PanelTabItem[];
  scope: 'surface' | 'collection';
  label: string;
}

const panelSelector = (scope: Props['scope']) => `[data-${scope}-panel]`;

export default function PanelTabs({ items, scope, label }: Props) {
  const [active, setActive] = useState(items[0]?.id ?? '');

  useEffect(() => {
    const selectForFragment = () => {
      const fragment = window.location.hash.slice(1);
      if (!fragment) return;
      const target = document.getElementById(fragment);
      const containingPanel = items.find((item) => {
        const panel = document.getElementById(`${scope}-panel-${item.id}`);
        return panel?.contains(target) ?? false;
      });
      if (containingPanel) setActive(containingPanel.id);
    };
    selectForFragment();
    window.addEventListener('hashchange', selectForFragment);
    return () => window.removeEventListener('hashchange', selectForFragment);
  }, [items, scope]);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>(panelSelector(scope)).forEach((panel) => {
      panel.hidden = panel.dataset[`${scope}Panel`] !== active;
    });
  }, [active, scope]);

  if (items.length < 2) return null;

  const select = (id: string) => setActive(id);
  const moveFocus = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === 'Home'
      ? 0
      : event.key === 'End'
        ? items.length - 1
        : (index + (event.key === 'ArrowRight' ? 1 : -1) + items.length) % items.length;
    select(items[next].id);
    document.getElementById(`${scope}-tab-${items[next].id}`)?.focus();
  };

  return <nav className={`panel-tabs panel-tabs--${scope}`} aria-label={label}>
    <span className="panel-tabs__label">Reading panels</span>
    <div className="panel-tabs__list" role="tablist">
      {items.map((item, index) => <button
        id={`${scope}-tab-${item.id}`}
        key={item.id}
        type="button"
        role="tab"
        aria-selected={active === item.id}
        aria-controls={`${scope}-panel-${item.id}`}
        tabIndex={active === item.id ? 0 : -1}
        onClick={() => select(item.id)}
        onKeyDown={(event) => moveFocus(event, index)}
      >
        <span>{String(index + 1).padStart(2, '0')}</span>
        <strong>{item.label}</strong>
        {item.detail && <small>{item.detail}</small>}
      </button>)}
    </div>
  </nav>;
}
