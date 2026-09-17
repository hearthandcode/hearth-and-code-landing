import { PortfolioOrientationCard } from './PortfolioOrientationCard';
import { PortfolioImplementationCard } from './PortfolioImplementationCard';
import { PortfolioReviewBrief } from './PortfolioReviewBrief';
import { surfaces, processes, reviewBriefs, vocabTerms } from '../../data/portfolio-data';

/**
 * PortfolioApp — the complete portfolio surface as a single React component.
 * Renders 8 surface cards (PortfolioOrientationCard), 2 process cards (PortfolioImplementationCard),
 * a vocabulary section, and 16 reference briefs (PortfolioReviewBrief).
 * All content is inline — no page navigation. Uses Ember Circuit tokens.
 */
export function PortfolioApp() {
  return (
    <div
      className="portfolio-app"
      style={{
        background: 'var(--color-surface-primary)',
        color: 'var(--color-text-primary)',
        fontFamily: 'var(--font-body)',
        fontSize: '1rem',
        lineHeight: 1.6,
        minHeight: '100vh',
      }}
    >
      {/* Hero */}
      <header
        className="portfolio-hero"
        style={{
          padding: 'clamp(3rem, 8vw, 6rem) clamp(1rem, 4vw, 3rem) clamp(2rem, 5vw, 3rem)',
        }}
      >
        <p
          style={{
            margin: '0 0 1rem',
            color: 'var(--color-accent-ember)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.7rem, 1.5vw, 0.85rem)',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}
        >
          Working surface
        </p>
        <h1
          style={{
            margin: '0 0 1.5rem',
            color: 'var(--color-text-display)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.5rem, 6vw, 5rem)',
            fontWeight: 400,
            lineHeight: 0.95,
            letterSpacing: '-0.04em',
          }}
        >
          Project portfolio
        </h1>
        <p
          style={{
            margin: 0,
            color: 'var(--color-text-secondary)',
            fontSize: 'clamp(1rem, 2vw, 1.25rem)',
            lineHeight: 1.65,
            maxWidth: '62ch',
          }}
        >
          Six working surfaces and two bounded processes, composing a local-first knowledge
          system. Each surface is a projection from the Hearth &amp; Code Hub — the canonical
          source. Every claim is source-bound. Every status is honest.
        </p>
      </header>

      {/* Surface cards — bento grid */}
      <section
        className="portfolio-surfaces"
        style={{
          padding: '0 clamp(1rem, 4vw, 3rem) 3rem',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 360px), 1fr))',
            gap: 'clamp(0.75rem, 2vw, 1.25rem)',
          }}
        >
          {surfaces.map((s) => (
            <PortfolioOrientationCard key={s.id} surface={s} />
          ))}
        </div>
      </section>

      {/* Process cards */}
      <section
        className="portfolio-processes"
        style={{
          padding: '0 clamp(1rem, 4vw, 3rem) 3rem',
        }}
      >
        <h2
          style={{
            margin: '0 0 1.5rem',
            color: 'var(--color-text-display)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          Bounded processes
        </h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 400px), 1fr))',
            gap: 'clamp(0.75rem, 2vw, 1.25rem)',
          }}
        >
          {processes.map((p) => (
            <PortfolioImplementationCard key={p.id} process={p} />
          ))}
        </div>
      </section>

      {/* Vocabulary */}
      <section
        className="portfolio-vocab"
        style={{
          padding: '0 clamp(1rem, 4vw, 3rem) 3rem',
        }}
      >
        <h2
          style={{
            margin: '0 0 1.5rem',
            color: 'var(--color-text-display)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          Bounded vocabulary
        </h2>
        <p
          style={{
            margin: '0 0 1.5rem',
            color: 'var(--color-text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.65,
            maxWidth: '58ch',
          }}
        >
          Eight terms. No ninth. Every claim in the working surface uses one of these labels.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '0.75rem',
          }}
        >
          {vocabTerms.map((v) => (
            <div
              key={v.term}
              style={{
                background: 'var(--color-surface-raised)',
                border: '1px solid var(--color-surface-rule)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem 1.25rem',
              }}
            >
              <p
                style={{
                  margin: '0 0 0.35rem',
                  color: 'var(--color-accent-ember)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                }}
              >
                {v.term}
              </p>
              <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: '0.82rem', lineHeight: 1.55 }}>
                {v.def}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Reference briefs — 16 PortfolioReviewBrief cards */}
      <section
        className="portfolio-references"
        style={{
          padding: '0 clamp(1rem, 4vw, 3rem) 4rem',
        }}
      >
        <h2
          style={{
            margin: '0 0 1.5rem',
            color: 'var(--color-text-display)',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 400,
            lineHeight: 1,
            letterSpacing: '-0.03em',
          }}
        >
          Reference briefs
        </h2>
        <p
          style={{
            margin: '0 0 2rem',
            color: 'var(--color-text-secondary)',
            fontSize: '0.95rem',
            lineHeight: 1.65,
            maxWidth: '58ch',
          }}
        >
          Sixteen public-safe reference documents, each rendered as an expandable 8-section brief.
          Click any card to expand the full overview.
        </p>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '0.75rem',
          }}
        >
          {reviewBriefs.map((b) => (
            <PortfolioReviewBrief key={b.id} brief={b} />
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          padding: '2rem clamp(1rem, 4vw, 3rem) 4rem',
          borderTop: '1px solid var(--color-surface-rule)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: 'var(--color-text-secondary)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            letterSpacing: '0.04em',
          }}
        >
          Hearth &amp; Code — a local-first knowledge system. Every surface here is a projection;
          the Hub remains the canonical source.{' '}
          <a
            href="/"
            style={{
              color: 'var(--color-accent-ember)',
              textDecoration: 'none',
            }}
          >
            ← Studio
          </a>
          {'  ·  '}
          <a
            href="/hcan/"
            style={{
              color: 'var(--color-accent-ember)',
              textDecoration: 'none',
            }}
          >
            HCAN →
          </a>
        </p>
      </footer>
    </div>
  );
}
