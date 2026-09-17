import { useState, type ReactNode } from 'react';

export interface DataTableColumn {
  key: string;
  label: string;
  numeric?: boolean;
  sortable?: boolean;
  className?: string;
  render?: (value: string, row: readonly string[]) => ReactNode;
}

export interface DataTableProps {
  columns: DataTableColumn[];
  rows: readonly (readonly string[])[];
  initialSort?: { key: string; dir: 'asc' | 'desc' };
  ariaLabel?: string;
}

function compare(a: readonly string[], b: readonly string[], colIndex: number, numeric: boolean): number {
  const va = a[colIndex] ?? '';
  const vb = b[colIndex] ?? '';
  if (numeric) {
    const na = parseFloat(va);
    const nb = parseFloat(vb);
    if (Number.isFinite(na) && Number.isFinite(nb)) return na - nb;
  }
  return va.localeCompare(vb);
}

/** Base primitive: sortable data table. Click a column header to sort asc,
 * click again to flip desc. No raw HTML tables at the composite layer. */
export function DataTable({ columns, rows, initialSort, ariaLabel }: DataTableProps) {
  const firstSortable = columns.find((c) => c.sortable !== false);
  const [sort, setSort] = useState<{ key: string; dir: 'asc' | 'desc' }>(
    initialSort ?? { key: firstSortable?.key ?? columns[0].key, dir: 'asc' },
  );

  const sortIndex = columns.findIndex((c) => c.key === sort.key);
  const sortCol = sortIndex >= 0 ? columns[sortIndex] : undefined;
  const sorted = sortCol
    ? [...rows].sort((a, b) =>
        sort.dir === 'asc'
          ? compare(a, b, sortIndex, sortCol.numeric === true)
          : compare(b, a, sortIndex, sortCol.numeric === true),
      )
    : rows;

  function toggle(key: string) {
    setSort((prev) => (prev.key === key ? { key, dir: prev.dir === 'asc' ? 'desc' : 'asc' } : { key, dir: 'asc' }));
  }

  return (
    <div className="ec-hcan-table__wrap">
      <table className="ec-hcan-table" aria-label={ariaLabel}>
        <thead>
          <tr>
            {columns.map((col) => {
              const sortable = col.sortable !== false;
              const isActive = sort.key === col.key;
              const ariaSort = isActive ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none';
              return (
                <th key={col.key} scope="col" aria-sort={sortable ? ariaSort : 'none'} className={col.className}>
                  {sortable ? (
                    <button type="button" className="ec-hcan-table__sort" onClick={() => toggle(col.key)}>
                      <span>{col.label}</span>
                      {sortable && (
                        <span className="ec-hcan-table__sort-ind" aria-hidden="true">
                          {isActive ? (sort.dir === 'asc' ? '\u2191' : '\u2193') : '\u2195'}
                        </span>
                      )}
                    </button>
                  ) : (
                    <span>{col.label}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, ri) => (
            <tr key={ri}>
              {columns.map((col, ci) => (
                <td key={col.key} className={col.className}>
                  {col.render ? col.render(row[ci] ?? '', row) : row[ci]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;
