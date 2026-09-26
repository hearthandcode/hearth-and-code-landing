/**
 * DeploymentStatus (React port)
 * Source: src/components/knowledge/composites/DeploymentStatus.astro
 * Knowledge composite (k-composite): k-deployment-status
 */
import * as React from 'react';

interface Environment {
  name: string;
  status: 'live' | 'building' | 'failed' | 'paused' | 'deploying';
  version: string;
  lastDeploy?: string;
  health?: 'healthy' | 'degraded' | 'down';
}

export interface DeploymentStatusProps {
  environments: Environment[];
  className?: string;
}

export function DeploymentStatus({ environments, className = '' }: DeploymentStatusProps) {
  const statusColors: Record<string, string> = {
    live: 'var(--color-state-success)',
    building: 'var(--color-accent-gold)',
    failed: 'var(--color-state-error)',
    paused: 'var(--color-text-secondary)',
    deploying: 'var(--color-accent-plasma)',
  };
  const classes = ['kc-deployment', className].filter(Boolean).join(' ');
  return (
    <div className={classes}>
      <header className="kc-deployment__header">
        <span className="kc-deployment__title">Environments</span>
        <span className="kc-deployment__count">{environments.length}</span>
      </header>
      <ul className="kc-deployment__list">
        {environments.map((env, i) => (
          <li key={i} className={`kc-deployment__env kc-deployment__env--${env.status}`}>
            <div className="kc-deployment__main">
              <span className="kc-deployment__name">{env.name}</span>
              <span className="kc-deployment__version">v{env.version}</span>
            </div>
            <div className="kc-deployment__meta">
              {env.lastDeploy && <span className="kc-deployment__time">{env.lastDeploy}</span>}
              {env.health && (
                <span className={`kc-deployment__health kc-deployment__health--${env.health}`}>
                  ● {env.health}
                </span>
              )}
              <span className="kc-deployment__status" style={{ background: statusColors[env.status] }}>
                {env.status}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
