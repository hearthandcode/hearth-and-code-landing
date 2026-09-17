import { useState } from 'react';
import type { ReviewBriefData } from '../../data/portfolio-data';

/**
 * PortfolioReviewBrief — an 8-section bounded card for reference docs.
 * Renders each reference doc as an expandable inline card (no page navigation).
 * Uses Ember Circuit tokens.
 */
export function PortfolioReviewBrief({ brief }: { brief: ReviewBriefData }) {
  const [expanded, setExpanded] = useState(false);

  const sections = [
    { label: 'Overview', body: brief.sections.overview },
    { label: 'Purpose', body: brief.sections.purpose },
    { label: 'Scope', body: brief.sections.scope },
    { label: 'Evidence', body: brief.sections.evidence },
    { label: 'Boundaries', body: brief.sections.boundaries },
    { label: 'Status', body: brief.sections.status },
    { label: 'Source', body: brief.sections.source },
    { label: 'Next', body: brief.sections.next },
  ];

  return (
    <article
      className="prb-card"
      data-brief={brief.id}
      style={{
        background: 'var(--color-surface-recessed)',
        border: '1px solid var(--color-surface-rule)',
        borderRadius: 'var(--radius-md)',
        padding: 'clamp(1rem, 2.5vw, 1.5rem)',
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        cursor: 'pointer',
        transition: 'border-color 200ms',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* Kicker + num */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.75rem' }}>
        <span
          style={{
            color: 'var(--color-accent-ember)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
          }}
        >
          {brief.num}
        </span>
        <span
          style={{
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          {brief.kicker}
        </span>
      </div>

      {/* Title */}
      <h4
        style={{
          margin: 0,
          color: 'var(--color-text-primary)',
          fontFamily: 'var(--font-display)',
          fontSize: '1.25rem',
          fontWeight: 400,
          lineHeight: 1.1,
        }}
      >
        {brief.title}
      </h4>

      {/* Collapsed: overview only */}
      {!expanded && (
        <p
          style={{
            margin: 0,
            color: 'var(--color-text-secondary)',
            fontSize: '0.82rem',
            lineHeight: 1.55,
            maxWidth: '60ch',
          }}
        >
          {brief.sections.overview}
        </p>
      )}

      {/* Expanded: all 8 sections */}
      {expanded && (
        <div
          className="prb-sections"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '0.85rem',
            paddingTop: '0.75rem',
            marginTop: '0.25rem',
            borderTop: '1px solid var(--color-surface-rule)',
          }}
        >
          {sections.map((s) => (
            <section key={s.label}>
              <p
                style={{
                  margin: '0 0 0.35rem',
                  color: 'var(--color-accent-gold)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.6rem',
                  letterSpacing: '0.06em',
                  textTransform: 'uppercase',
                }}
              >
                {s.label}
              </p>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.8rem', lineHeight: 1.6 }}>
                {s.body}
              </p>
            </section>
          ))}
        </div>
      )}

      <p
        style={{
          margin: 0,
          color: 'var(--color-accent-ember)',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: '0.04em',
          opacity: 0.6,
        }}
      >
        {expanded ? '▲ Collapse' : '▼ Expand brief'}
      </p>
    </article>
  );
}
