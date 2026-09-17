import { useState } from 'react';
import type { ProcessCardData } from '../../data/portfolio-data';

/**
 * PortfolioImplementationCard — a 4-section bounded info card for processes.
 * Renders the corpus-review or implementation-campaign process inline.
 * Uses Ember Circuit tokens.
 */
export function PortfolioImplementationCard({ process }: { process: ProcessCardData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="pic-card"
      data-process={process.id}
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-surface-rule)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        cursor: 'pointer',
        transition: 'border-color 200ms, box-shadow 200ms',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Kicker */}
      <p
        style={{
          margin: 0,
          color: 'var(--color-accent-plasma)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        Bounded process
      </p>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
      >
        {process.title}
      </h3>

      {/* Description */}
      <p
        style={{
          margin: 0,
          color: 'var(--color-text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          maxWidth: '52ch',
        }}
      >
        {process.description}
      </p>

      {/* Step list (always visible) */}
      <ol
        style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          display: 'grid',
          gap: '0.75rem',
        }}
      >
        {process.steps.map((step, i) => (
          <li
            key={step.name}
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              gap: '1rem',
              alignItems: 'start',
              paddingBlock: '0.5rem',
              borderBottom: i < process.steps.length - 1 ? '1px solid var(--color-surface-rule)' : 'none',
            }}
          >
            <span
              style={{
                color: 'var(--color-accent-ember)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.8rem',
                fontWeight: 600,
                minWidth: '2rem',
              }}
            >
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <p style={{ margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-display)', fontSize: '1.1rem' }}>
                {step.name}
              </p>
              <p style={{ margin: '0.15rem 0 0', color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.55 }}>
                {step.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      {/* Expandable 4-section bounded info */}
      {expanded && (
        <div
          className="pic-sections"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
            gap: '1.25rem',
            paddingTop: '1rem',
            marginTop: '0.5rem',
            borderTop: '1px solid var(--color-surface-rule)',
          }}
        >
          <section>
            <h4
              style={{
                margin: '0 0 0.5rem',
                color: 'var(--color-accent-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Overview
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {process.sections.overview}
            </p>
          </section>
          <section>
            <h4
              style={{
                margin: '0 0 0.5rem',
                color: 'var(--color-accent-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Inputs
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {process.sections.inputs}
            </p>
          </section>
          <section>
            <h4
              style={{
                margin: '0 0 0.5rem',
                color: 'var(--color-accent-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Outputs
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {process.sections.outputs}
            </p>
          </section>
          <section>
            <h4
              style={{
                margin: '0 0 0.5rem',
                color: 'var(--color-accent-gold)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.65rem',
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              Receipt
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {process.sections.receipt}
            </p>
          </section>
        </div>
      )}

      <p
        style={{
          margin: 0,
          color: 'var(--color-accent-plasma)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.04em',
          opacity: 0.7,
        }}
      >
        {expanded ? '▲ Collapse' : '▼ Expand detail'}
      </p>
    </article>
  );
}
