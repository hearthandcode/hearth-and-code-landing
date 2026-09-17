import { useState } from 'react';
import type { BaseProps } from './types';
import { canonicalFeatureInventory } from '../../data/canonical-matrices';

export interface HcanFeatureTabsProps extends BaseProps {
  /** Tabs are the actual categories present in the canonical matrix
   * (language, protocol, tooling, docs). */
  countsLabel?: string;
}

type Row = ReadonlyArray<string>;

function groupByCategory(rows: readonly Row[]): Array<{ category: string; rows: Row[] }> {
  const order: string[] = [];
  const buckets = new Map<string, Row[]>();
  for (const row of rows) {
    const [feature, category] = row;
    if (!category) continue;
    if (!buckets.has(category)) {
      buckets.set(category, []);
      order.push(category);
    }
    buckets.get(category)!.push(row);
  }
  return order.map((category) => ({ category, rows: buckets.get(category)! }));
}

/** Tabbed feature-inventory panel. Tabs are derived from the canonical matrix's
 * own category column — not invented — so the projection stays source-bound.
 *
 * Source: Hearth & Code Hub, project 0047, canonical "Data matrix → Feature inventory".
 */
export function HcanFeatureTabs({ className }: HcanFeatureTabsProps) {
  const groups = groupByCategory(canonicalFeatureInventory.rows);
  const [active, setActive] = useState<string>(groups[0]?.category ?? '');

  const current = groups.find((group) => group.category === active) ?? groups[0];

  return (
    <section
      className={className ? `ec-hcan-features ${className}` : 'ec-hcan-features'}
      aria-labelledby="ec-hcan-features-title"
    >
      <header className="ec-hcan-features__head">
        <p className="ec-hcan-features__eyebrow">Feature inventory</p>
        <h3 id="ec-hcan-features-title" className="ec-hcan-features__title">
          What exists today, by category
        </h3>
        <p className="ec-hcan-features__deck">
          Every feature below is implemented and deployed. The inventory is grouped by the
          canonical matrix's own categories.
        </p>
      </header>

      <div
        className="ec-hcan-features__tabs"
        role="tablist"
        aria-label="Feature categories"
      >
        {groups.map((group) => (
          <button
            key={group.category}
            type="button"
            role="tab"
            id={`ec-hcan-features-tab-${group.category}`}
            aria-selected={group.category === active}
            aria-controls={`ec-hcan-features-panel-${group.category}`}
            className={`ec-hcan-features__tab ${group.category === active ? 'ec-hcan-features__tab--active' : ''}`}
            onClick={() => setActive(group.category)}
          >
            <span className="ec-hcan-features__tab-name">{group.category}</span>
            <span className="ec-hcan-features__tab-count">{group.rows.length}</span>
          </button>
        ))}
      </div>

      {current && (
        <div
          className="ec-hcan-features__panel"
          role="tabpanel"
          id={`ec-hcan-features-panel-${current.category}`}
          aria-labelledby={`ec-hcan-features-tab-${current.category}`}
        >
          <ul className="ec-hcan-features__list">
            {current.rows.map((row) => {
              const [feature, , status, description] = row as readonly [
                string,
                string,
                string,
                string,
              ];
              return (
                <li key={feature} className="ec-hcan-features__item" data-status={status}>
                  <div className="ec-hcan-features__item-head">
                    <span className="ec-hcan-features__item-name">{feature}</span>
                    <span className="ec-hcan-features__item-status">{status}</span>
                  </div>
                  <p className="ec-hcan-features__item-desc">{description}</p>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </section>
  );
}

export default HcanFeatureTabs;
