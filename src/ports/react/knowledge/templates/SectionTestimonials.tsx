/**
 * SectionTestimonials (React port)
 * Source: src/components/knowledge/templates/SectionTestimonials.astro
 * Knowledge template (k-template): t-section-testimonials
 */
import * as React from 'react';

interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface SectionTestimonialsProps {
  eyebrow?: string;
  title: string;
  testimonials: Testimonial[];
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function SectionTestimonials({
  eyebrow,
  title,
  testimonials,
  accent = 'balanced',
  className = '',
}: SectionTestimonialsProps) {
  const classes = ['ec-section', `ec-section-testimonials--${accent}`, className].filter(Boolean).join(' ');
  return (
    <section className={classes}>
      <div className="ec-section-testimonials__inner">
        <header className="ec-section-testimonials__header">
          {eyebrow && <p className="ec-section__eyebrow">{eyebrow}</p>}
          <h2 className="ec-section__title">{title}</h2>
        </header>
        <div className="ec-testimonials-grid">
          {testimonials.map((t, i) => (
            <blockquote key={i} className="ec-testimonial-card ec-testimonial-card--balanced">
              <p className="ec-testimonial-card__quote">"{t.quote}"</p>
              <footer className="ec-testimonial-card__footer">
                <cite className="ec-testimonial-card__cite">
                  <strong>{t.author}</strong>
                  <span>{t.role}</span>
                </cite>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
