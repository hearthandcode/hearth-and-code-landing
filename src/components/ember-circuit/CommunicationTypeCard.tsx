import type { BaseProps } from './types';
import { tokenize, toHtml } from '../../data/hcan-highlight';

export interface CommunicationTypeCardProps extends BaseProps {
  label?: string;
}

/**
 * Static grid-box info card for the "Communication Type" concept.
 * No popover, no <details> — renders inline as a constrained grid component.
 *
 * Source: Hearth & Code Hub canonical article, project 0047, "What HCAN is"
 * and "The grammar" sections. The canonical simplest line
 * `orient @~/any-folder :Brief ?gaps !no-write` is shown as the example.
 */
export function CommunicationTypeCard({
  label = 'A communication type',
  className,
}: CommunicationTypeCardProps) {
  const sampleProgram = 'orient @~/any-folder :Brief ?gaps !no-write';
  const htmlProgram = toHtml(tokenize(sampleProgram));

  return (
    <aside
      className={className ? `ec-hcan-commtype ${className}` : 'ec-hcan-commtype'}
      aria-labelledby="ec-hcan-commtype-title"
    >
      <header className="ec-hcan-commtype__head">
        <p className="ec-hcan-commtype__eyebrow">{label}</p>
        <h3 id="ec-hcan-commtype-title" className="ec-hcan-commtype__title">
          What a communication type is, concretely
        </h3>
      </header>

      <div className="ec-hcan-commtype__grid">
        <dl className="ec-hcan-commtype__properties">
          <div className="ec-hcan-commtype__property">
            <dt>Vocabulary</dt>
            <dd>A closed set of verbs, shapes, probes, guards, and labels — ten primitives, no silent extension.</dd>
          </div>
          <div className="ec-hcan-commtype__property">
            <dt>Grammar</dt>
            <dd>One canonical order: verb @bindings :shape -&gt; operation ?probes !guards.</dd>
          </div>
          <div className="ec-hcan-commtype__property">
            <dt>Output shape</dt>
            <dd>Every line names its return type: :Brief, :Map, :Vec&lt;Card&gt;, :SafeReturn.</dd>
          </div>
          <div className="ec-hcan-commtype__property">
            <dt>Identity</dt>
            <dd>HCAN — Hearthside Compact Agent Notation. The same line reads the same in any agent.</dd>
          </div>
        </dl>

        <div className="ec-hcan-commtype__program-block">
          <p className="ec-hcan-commtype__program-caption">The simplest possible line</p>
          <pre className="ec-hcan-commtype__program" aria-label={`HCAN example program: ${sampleProgram}`}>
            <code dangerouslySetInnerHTML={{ __html: htmlProgram }} />
          </pre>
          <p className="ec-hcan-commtype__program-note">
            Run it in any agent. If the return names the authoritative route, labels every claim,
            lists unknowns honestly, states non-effects, and closes with one runnable next action,
            the surface is working.
          </p>
        </div>
      </div>

      <footer className="ec-hcan-commtype__foot">
        <p>
          HCAN does not execute and does not compile. It is a communication type: it compresses
          intent, scope, uncertainty, and boundaries into one reviewable line. A guard names a
          boundary the program refuses to cross — it never grants authority the agent does not
          already hold.
        </p>
      </footer>
    </aside>
  );
}

export default CommunicationTypeCard;
