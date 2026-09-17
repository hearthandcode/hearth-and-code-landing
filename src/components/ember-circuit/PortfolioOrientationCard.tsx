import { useState } from 'react';
import type { SurfaceCardData } from '../../data/portfolio-data';

/**
 * PortfolioOrientationCard — a 4-section public-safe projection card.
 * Renders surface-card content inline (no page navigation).
 * Uses Ember Circuit tokens (dark theme, ember accent, serif display).
 */
export function PortfolioOrientationCard({ surface }: { surface: SurfaceCardData }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article
      className="poc-card"
      data-surface={surface.id}
      style={{
        background: 'var(--color-surface-raised)',
        border: '1px solid var(--color-surface-rule)',
        borderRadius: 'var(--radius-lg)',
        padding: 'clamp(1.25rem, 3vw, 2rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        cursor: 'pointer',
        transition: 'border-color 200ms, box-shadow 200ms',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Kicker */}
      <p
        style={{
          margin: 0,
          color: 'var(--color-accent-ember)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.68rem',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
        }}
      >
        {surface.num} / {surface.tag}
      </p>

      {/* Title */}
      <h3
        style={{
          margin: 0,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
          fontWeight: 400,
          lineHeight: 1.05,
          letterSpacing: '-0.02em',
        }}
      >
        {surface.title}
      </h3>

      {/* Summary */}
      <p
        style={{
          margin: 0,
          color: 'var(--color-text-secondary)',
          fontSize: '0.95rem',
          lineHeight: 1.6,
          maxWidth: '52ch',
        }}
      >
        {surface.summary}
      </p>

      {/* Stats */}
      {surface.stats.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
            paddingTop: '0.5rem',
            borderTop: '1px solid var(--color-surface-rule)',
          }}
        >
          {surface.stats.map((s) => (
            <div key={s.label} style={{ display: 'flex', flexDirection: 'column', gap: '0.15rem' }}>
              <span
                style={{
                  color: 'var(--color-text-secondary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.65rem',
                  letterSpacing: '0.04em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </span>
              <span
                style={{
                  color: 'var(--color-text-primary)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                }}
              >
                {s.value}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Expandable 4-section orientation */}
      {expanded && (
        <div
          className="poc-orientation"
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
              What it is
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {surface.orientation.what}
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
              Why it matters
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {surface.orientation.why}
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
              How it works
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {surface.orientation.how}
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
              Status
            </h4>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.85rem', lineHeight: 1.65 }}>
              {surface.orientation.status}
            </p>
          </section>
        </div>
      )}

      {/* Expand hint */}
      <p
        style={{
          margin: 0,
          color: 'var(--color-accent-ember)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.7rem',
          letterSpacing: '0.04em',
          opacity: 0.7,
        }}
      >
        {expanded ? '▲ Collapse' : '▼ Expand orientation'}
      </p>
    </article>
  );
}
