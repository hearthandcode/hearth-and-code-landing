/**
 * Dashboard (React port)
 * Source: src/components/knowledge/templates/Dashboard.astro
 * Knowledge template (k-template): t-dashboard
 */
import * as React from 'react';

interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface DashboardProps {
  navItems: NavItem[];
  title: string;
  children?: React.ReactNode;
  className?: string;
}

export function Dashboard({ navItems, title, children, className = '' }: DashboardProps) {
  const classes = ['ec-dashboard', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <header className="ec-dashboard__header">
        <h1 className="ec-dashboard__title">{title}</h1>
      </header>
      <div className="ec-dashboard__layout">
        <nav className="ec-dashboard__nav" aria-label="Dashboard navigation">
          <ul className="ec-dashboard__nav-list">
            {navItems.map((item, i) => (
              <li key={i} className="ec-dashboard__nav-item">
                <a
                  href={item.href}
                  className={`ec-dashboard__nav-link ${item.active ? 'is-active' : ''}`}
                  aria-current={item.active ? 'page' : undefined}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <main className="ec-dashboard__main">{children}</main>
      </div>
    </div>
  );
}
