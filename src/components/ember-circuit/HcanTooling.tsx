import type { BaseProps } from './types';
import { canonicalToolingSupport } from '../../data/canonical-matrices';

export interface HcanToolingProps extends BaseProps {}

/** Tooling-support card grid. Each canonical matrix row becomes one Ember Circuit
 * card: surface name as the card head, "what" as the body, test evidence and
 * deployment as the card's provenance footer — per the design system's
 * "a card exposes object type, working posture, and a useful return or limit".
 *
 * Source: Hearth & Code Hub, project 0047, canonical "Data matrix → Implemented
 * tooling support".
 */
export function HcanTooling({ className }: HcanToolingProps) {
  return (
    <section
      className={className ? `ec-hcan-tooling ${className}` : 'ec-hcan-tooling'}
      aria-labelledby="ec-hcan-tooling-title"
    >
      <header className="ec-hcan-tooling__head">
        <p className="ec-hcan-tooling__eyebrow">Implemented tooling support</p>
        <h3 id="ec-hcan-tooling-title" className="ec-hcan-tooling__title">
          Nine surfaces, each with test evidence
        </h3>
        <p className="ec-hcan-tooling__deck">
          Every tooling surface below carries its test evidence and deployment state. Nothing
          is listed as planned.
        </p>
      </header>

      <div className="ec-hcan-tooling__grid">
        {canonicalToolingSupport.rows.map((row, index) => {
          const [surface, what, testEvidence, deployment] = row as readonly [
            string,
            string,
            string,
            string,
          ];
          return (
            <article
              key={surface}
              className="ec-hcan-tooling__card"
              data-surface={surface}
            >
              <header className="ec-hcan-tooling__card-head">
                <span className="ec-hcan-tooling__card-index">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h4 className="ec-hcan-tooling__card-name">{surface}</h4>
              </header>
              <p className="ec-hcan-tooling__card-what">{what}</p>
              <footer className="ec-hcan-tooling__card-foot">
                <div className="ec-hcan-tooling__card-evidence">
                  <span className="ec-hcan-tooling__card-evidence-label">Tested</span>
                  <span>{testEvidence}</span>
                </div>
                <div className="ec-hcan-tooling__card-deploy">
                  <span className="ec-hcan-tooling__card-deploy-label">Deployed</span>
                  <span>{deployment}</span>
                </div>
              </footer>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default HcanTooling;
