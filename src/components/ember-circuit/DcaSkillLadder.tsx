import ladderProjection from '../../data/dca-skill-ladder-v2-projection.json';
import runs from '../../data/dca-skill-ladder-v2-runs.json';
import { renderResponseMarkdown } from './response-markdown';

const { ladder, analysis } = ladderProjection;
const assessments = new Map(analysis.assessments.map((entry) => [entry.id, entry]));
const responses = new Map(runs.records.map((entry) => [entry.id, entry]));
const resultLabel: Record<string, string> = { met: 'Met here', partly_met: 'Partly met', not_met: 'Not met', not_observable: 'Not observable' };

export function DcaSkillLadder() {
  return <div className="ec-skill-ladder">
    <header className="ec-skill-ladder__brief">
      <h4>{analysis.briefing.title}</h4>
      <p>{analysis.briefing.orientation}</p>
      <div><strong>Observed contribution</strong><p>{analysis.briefing.observed_shift}</p></div>
      <div className="is-caution"><strong>Counterexample in the technique run</strong><p>{analysis.briefing.counterweight}</p></div>
      <p className="ec-skill-ladder__decision">{analysis.briefing.next_decision}</p>
    </header>
    <div className="ec-skill-ladder__matrix-scroll">
      <table className="ec-skill-ladder__matrix">
        <caption>One observed response per prompting style · criterion-by-criterion, not a score</caption>
        <thead><tr><th scope="col">Criterion</th>{ladder.conditions.map((condition) => <th scope="col" key={condition.id}>{condition.label}</th>)}</tr></thead>
        <tbody>{analysis.criteria.map((criterion) => <tr key={criterion.id}>
          <th scope="row">{criterion.label}</th>
          {ladder.conditions.map((condition) => {
            const finding = assessments.get(condition.id)?.findings.find((item) => item.criterion === criterion.id);
            return <td key={condition.id} data-result={finding?.result}><strong>{resultLabel[finding?.result ?? ''] || 'Not reviewed'}</strong><small>{finding?.note}</small></td>;
          })}
        </tr>)}</tbody>
      </table>
    </div>
    <div className="ec-skill-ladder__levels">
      {ladder.conditions.map((condition, index) => {
        const assessment = assessments.get(condition.id);
        const record = responses.get(condition.id);
        return <details key={condition.id} className="ec-skill-ladder__level">
          <summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{condition.label}</strong><small>{assessment?.headline}</small><b aria-hidden="true">⌄</b></summary>
          <p><strong>Information supplied:</strong> {condition.source_coverage}. {condition.framing} {assessment?.summary}</p>
          {record ? <div className="ec-skill-ladder__pair">
            <section><h5>Submitted prompt</h5><pre>{record.prompt}</pre></section>
            <section><h5>MiniMax-M3 response · observed</h5><div className="ec-skill-ladder__response" dangerouslySetInnerHTML={{ __html: renderResponseMarkdown(record.response) }} /></section>
          </div> : <p>Provider receipt pending; no model response is represented.</p>}
          {record && <footer>Isolated Pi · 0 tool events · Prompt SHA-256: {record.prompt_sha256} · Response SHA-256: {record.response_sha256}</footer>}
        </details>;
      })}
    </div>
    <p className="ec-skill-ladder__boundary">{ladder.evaluation.non_claim}</p>
  </div>;
}
