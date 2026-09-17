import { HCANExampleYamlCard } from './HCANExampleYamlCard';
import { HCANProgram } from './HCANProgram';
import { hcanExamples, type HcanExample } from '../../data/hcan-program-cards';

export interface HcanExampleProps {
  /** Canonical example id, case-insensitive ('e01', 'E01', ...). Looked up
   * against hcanExamples; the record is passed directly with `example=` for
   * test fixtures or post-publication deltas. */
  id?: string;
  /** Or pass the example record directly. */
  example?: HcanExample;
}

/** Per-example shell composing the canonical HCAN program block (syntax-highlighted
 * by the project HCAN tokenizer) with the HCANExampleYamlCard structured-output
 * renderer for the canonical per-example YAML response.
 *
 * Source: Hearth & Code Hub, project 0047, canonical Hermes projection instructions
 * (5 React components, item 2 `<HCANExample example={yaml} />`).
 */
export function HcanExample({ id, example }: HcanExampleProps) {
  // Resolve by id when only an id is given. Canonical ids are uppercase
  // ('E01'); the MDX passes lowercase ('e01') — compare case-insensitively so
  // both spellings resolve to the same record.
  const record =
    example ??
    (id
      ? hcanExamples.find((candidate) => candidate.id.toLowerCase() === id.toLowerCase())
      : undefined);

  if (!record) {
    return (
      <div className="ec-hcan-example ec-hcan-example--missing" role="note">
        <em>
          Missing example record{typeof id === 'string' ? ` (id=${id})` : ''}. Known ids:{' '}
          {hcanExamples.map((candidate) => candidate.id).join(', ')}.
        </em>
      </div>
    );
  }

  return (
    <article
      className={`ec-hcan-example ec-hcan-example--${record.protocol}`}
      aria-labelledby={`example-${record.id.toLowerCase()}-title`}
      data-example-id={record.id}
      data-protocol={record.protocol}
      data-domain={record.domain}
    >
      <header className="ec-hcan-example__head">
        <div className="ec-hcan-example__index">{record.id.toUpperCase()}</div>
        <div className="ec-hcan-example__heading">
          <h3 id={`example-${record.id.toLowerCase()}-title`} className="ec-hcan-example__title">
            {record.title}
          </h3>
          <p className="ec-hcan-example__meta">
            <span className="ec-hcan-example__domain">{record.domain}</span>
            <span className={`ec-hcan-example__protocol ec-hcan-example__protocol--${record.protocol}`}>
              {record.protocol} protocol
            </span>
          </p>
        </div>
      </header>

      <HCANProgram code={record.program} caption="Program" />

      <div className="ec-hcan-example__output">
        <p className="ec-hcan-example__output-label">Response — canonical structured output</p>
        <HCANExampleYamlCard yaml={record.yaml} />
      </div>
    </article>
  );
}

export default HcanExample;
