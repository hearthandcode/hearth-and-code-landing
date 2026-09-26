/**
 * SearchBar (React port)
 * Source: src/components/knowledge/composites/SearchBar.astro
 * Knowledge composite (k-composite): c-search-bar
 */
import * as React from 'react';

export interface SearchBarProps {
  placeholder?: string;
  onSubmit?: (query: string) => void;
  className?: string;
}

export function SearchBar({
  placeholder = 'Search...',
  onSubmit,
  className = '',
}: SearchBarProps) {
  const [value, setValue] = React.useState('');
  const classes = ['kc-search-bar', className].filter(Boolean).join(' ');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(value);
  };

  return (
    <form
      className={`${classes} kc-search-bar--compact kc-search-bar--md`}
      role="search"
      onSubmit={handleSubmit}
    >
      <div className="kc-search-bar__input-wrap">
        <span className="kc-search-bar__icon" aria-hidden="true">🔍</span>
        <input
          type="search"
          name="search"
          placeholder={placeholder}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="kc-input kc-input--md kc-search-bar__input"
        />
      </div>
      <button type="submit" className="kc-search-bar__submit" aria-label="Search">
        →
      </button>
    </form>
  );
}
