import type { BaseProps } from './types';
import { canonicalMethodology } from '../../data/matrices/methodology';

export interface HcanMethodologyProps extends BaseProps {}

/** Evaluation-methodology component: each canonical layer renders as its own
 * card in a numbered stack — layer name, method, judges, fixtures, the question
 * the layer answers, and its finding. Totals surface as a footer strip.
 *
 * Source: Hearth & Code Hub, project 0047, canonical "Data matrix → Evaluation
 * methodology" (L1, L1-rep, L2, L3).
 */
export function HcanMethodology({ className }: HcanMethodologyProps) {
  const totals: string[] = [];
  if (canonicalMethodology.total_model_calls)
    totals.push(`${canonicalMethodology.total_model_calls} model calls`);
  if (canonicalMethodology.total_human_sessions)
    totals.push(`${canonicalMethodology.total_human_sessions} human session`);
  const reusable = canonicalMethodology.reusable === true;

  return (
    <section
      className={className ? `ec-hcan-method ${className}` : 'ec-hcan-method'}
      aria-labelledby="ec-hcan-method-title"
    >
      <header className="ec-hcan-method__head">
        <p className="ec-hcan-method__eyebrow">Evaluation methodology</p>
        <h3 id="ec-hcan-method-title" className="ec-hcan-method__title">
          Four layers, four different questions
        </h3>
        <p className="ec-hcan-method__deck">
          Each layer answers a question the previous one cannot. No single layer is trusted alone.
        </p>
      </header>

      <ol className="ec-hcan-method__layers">
        {canonicalMethodology.rows.map((row, index) => {
          const [layer, method, judges, fixtures, question, finding] = row as readonly [
            string,
            string,
            string,
            string,
            string,
            string,
          ];
          return (
            <li key={layer} className="ec-hcan-method__layer" data-layer={layer}>
              <div className="ec-hcan-method__layer-rail">
                <span className="ec-hcan-method__layer-index">{String(index + 1).padStart(2, '0')}</span>
                <span className="ec-hcan-method__layer-line" aria-hidden="true" />
              </div>
              <article className="ec-hcan-method__layer-card">
                <header className="ec-hcan-method__layer-head">
                  <h4 className="ec-hcan-method__layer-name">{layer}</h4>
                  <p className="ec-hcan-method__layer-stats">
                    <span>{judges} {judges === '1' ? 'judge' : 'judges'}</span>
                    <span>{fixtures} {fixtures === '1' ? 'fixture' : 'fixtures'}</span>
                  </p>
                </header>
                <p className="ec-hcan-method__layer-method">{method}</p>
                <p className="ec-hcan-method__layer-question">
                  <span className="ec-hcan-method__question-label">Asks</span> {question}
                </p>
                <p className="ec-hcan-method__layer-finding">
                  <span className="ec-hcan-method__finding-label">Found</span> {finding}
                </p>
              </article>
            </li>
          );
        })}
      </ol>

      {(totals.length > 0 || reusable) && (
        <footer className="ec-hcan-method__foot">
          {totals.length > 0 && <p className="ec-hcan-method__totals">{totals.join(' · ')}</p>}
          {reusable && (
            <p className="ec-hcan-method__reusable">
              Reusable pattern — the harness, fixtures, and judge protocol generalize to other
              notation comparisons.
            </p>
          )}
        </footer>
      )}
    </section>
  );
}

export default HcanMethodology;
