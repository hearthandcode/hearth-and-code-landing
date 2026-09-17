import type { BaseProps } from './types';
import { HCANProgram } from './HCANProgram';
import { hcanEnvelopeLayers } from '../../data/hcan-program-cards';

export interface HCANEnvelopeProps extends BaseProps {
  program: string;
  /** Optional narrative for the LEGEND layer. */
  legend?: string;
  /** Optional inline SHAPES list. */
  shapes?: string[];
  /** Optional inline RULES. */
  rules?: string[];
}

/**
 * Layered diagram of the portable envelope.
 *
 * Source: Hearth & Code Hub canonical article, project 0047,
 * "The language tooling → The portable envelope" (§354-356):
 *   TITLE → LEGEND → SHAPES → RULES → lines
 *
 * Renders the five canonical layers in canonical order, with the HCAN
 * program rendered inside the LINES layer using HCANProgram so the
 * syntax highlighting reads in context.
 */
export function HCANEnvelope({
  program,
  legend,
  shapes,
  rules,
  className,
}: HCANEnvelopeProps) {
  const shapesLine = shapes && shapes.length
    ? shapes.join(' · ')
    : ':Brief · :Map · :Vec<Card> · :Table · :Spec · :SafeReturn · :Schema · :Patch · :Question';
  const rulesLine = rules && rules.length
    ? rules.join(' · ')
    : "1) canonical line order; 2) probes answer PASS / FAIL / UNKNOWN; 3) guards bind the run; 4) fail-closed on missing evidence";

  return (
    <article
      className={className ? `ec-hcan-envelope ${className}` : 'ec-hcan-envelope'}
      aria-label="Portable envelope"
    >
      <ol className="ec-hcan-envelope__diagram">
        {hcanEnvelopeLayers.map((layer, i) => {
          const isLines = layer.id === 'LINES';
          return (
            <li key={layer.id} className={`ec-hcan-envelope__layer ec-hcan-envelope__layer--${layer.id.toLowerCase()}`}>
              <header>
                <span className="ec-hcan-envelope__index">{String(i + 1).padStart(2, '0')}</span>
                <h3>{layer.name}</h3>
              </header>
              <p className="ec-hcan-envelope__role">{layer.role}</p>

              {layer.id === 'LEGEND' && legend && (
                <pre className="ec-hcan-envelope__excerpt">{legend}</pre>
              )}

              {layer.id === 'SHAPES' && (
                <pre className="ec-hcan-envelope__excerpt">{shapesLine}</pre>
              )}

              {layer.id === 'RULES' && (
                <pre className="ec-hcan-envelope__excerpt">{rulesLine}</pre>
              )}

              {isLines && <HCANProgram code={program} pill="lines" />}
            </li>
          );
        })}
      </ol>
    </article>
  );
}

export default HCANEnvelope;
