/**
 * TestimonialCard (React port)
 * Source: src/components/knowledge/composites/TestimonialCard.astro
 * Knowledge composite (k-composite): c-testimonial-card
 */
import * as React from 'react';

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role?: string;
  rating?: number; // 1-5
  accent?: 'hearth' | 'code' | 'balanced' | 'ember' | 'signal' | 'violet';
  className?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  rating,
  accent = 'balanced',
  className = '',
}: TestimonialCardProps) {
  const classes = ['kc-testimonial-card', `kc-testimonial-card--${accent}`, className].filter(Boolean).join(' ');
  return (
    <blockquote className={classes}>
      <p className="kc-testimonial-card__quote">"{quote}"</p>
      <footer className="kc-testimonial-card__footer">
        {rating !== undefined && (
          <div className="kc-testimonial-card__rating" aria-label={`Rating: ${rating} of 5`}>
            {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}
          </div>
        )}
        <cite className="kc-testimonial-card__cite">
          <strong>{author}</strong>
          {role && <span>{role}</span>}
        </cite>
      </footer>
    </blockquote>
  );
}
