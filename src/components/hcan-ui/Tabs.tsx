export interface TabItem {
  id: string;
  label: string;
  count?: number;
}

export interface TabsProps {
  items: TabItem[];
  active: string;
  onSelect: (id: string) => void;
  ariaLabel?: string;
}

/** Base primitive: controlled tab strip. Parent owns state so tabs compose
 * into larger panels without nested-state surprises. */
export function Tabs({ items, active, onSelect, ariaLabel }: TabsProps) {
  return (
    <div className="ec-hcan-tabs" role="tablist" aria-label={ariaLabel}>
      {items.map((item) => (
        <button
          key={item.id}
          type="button"
          role="tab"
          id={`ec-hcan-tab-${item.id}`}
          aria-selected={item.id === active}
          aria-controls={`ec-hcan-tabpanel-${item.id}`}
          className={item.id === active ? 'ec-hcan-tabs__tab ec-hcan-tabs__tab--active' : 'ec-hcan-tabs__tab'}
          onClick={() => onSelect(item.id)}
        >
          <span className="ec-hcan-tabs__label">{item.label}</span>
          {typeof item.count === 'number' && (
            <span className="ec-hcan-tabs__count">{item.count}</span>
          )}
        </button>
      ))}
    </div>
  );
}

export default Tabs;
