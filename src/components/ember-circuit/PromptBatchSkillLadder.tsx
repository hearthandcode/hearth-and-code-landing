import review from '../../data/prompt-technique-batch-001-review.json';
import { renderResponseMarkdown } from './response-markdown';

const labels: Record<string, string> = { met: 'Met here', partly_met: 'Partly met', not_met: 'Not met', not_observable: 'Not observable' };
const tierLabel: Record<string, string> = { casual: 'Casual user', power: 'AI power user', engineer: 'Agentic engineer', engineer_technique: 'Engineer using the technique' };
const entries = new Map(review.entries.map((entry) => [entry.slug, entry]));

export function PromptBatchSkillLadder({ slug }: { slug: string }) {
  const entry = entries.get(slug);
  if (!entry) return <p className="ec-prompt-sheet__editorial-hold">Batch comparison unavailable for this technique.</p>;
  return <div className="ec-skill-ladder" data-ec-component="PromptBatchSkillLadder" data-slug={slug}>
    <header className="ec-skill-ladder__brief">
      <p className="ec-batch-candidate">{review.status} · {entry.status} · owner {review.owner_disposition}</p>
      <h4>{entry.scenario}</h4>
      <p><strong>Decision being explored:</strong> {entry.decision_question}</p>
      <div><strong>Observed technique contribution</strong><p>{entry.technique_observation}</p></div>
      <div className="is-caution"><strong>Adversarial counterweight</strong><p>{entry.counterweight}</p></div>
      <p className="ec-skill-ladder__decision">{entry.non_claim}</p>
    </header>
    <details className="ec-batch-source-facts"><summary>Source fixture · inspect the facts behind the prompts</summary><ol>{entry.source_facts.map((fact) => <li key={fact}>{fact}</li>)}</ol></details>
    <div className="ec-skill-ladder__matrix-scroll"><table className="ec-skill-ladder__matrix"><caption>One observed response per prompting style · no aggregate score</caption>
      <thead><tr><th scope="col">Criterion</th>{entry.levels.map((level) => <th scope="col" key={level.id}>{tierLabel[level.id]}</th>)}</tr></thead>
      <tbody>{entry.rubric.map((criterion, index) => <tr key={criterion}><th scope="row">{criterion}</th>{entry.levels.map((level) => <td key={level.id} data-result={level.observations[index]}><strong>{labels[level.observations[index]] || 'Not reviewed'}</strong></td>)}</tr>)}</tbody>
    </table></div>
    <div className="ec-skill-ladder__levels">
      {entry.levels.map((level, index) => <details key={level.id} className="ec-skill-ladder__level">
        <summary><span>{String(index + 1).padStart(2, '0')}</span><strong>{tierLabel[level.id]}</strong><small>Source facts represented: {level.input_fact_ids.join(', ')}</small><b aria-hidden="true">⌄</b></summary>
        <p><strong>Response audit:</strong> {level.finding}</p>
        {/<tool_call>|\[<tool_call>/i.test(level.response) && <p className="ec-batch-output-hold"><strong>HOLD:</strong> Model-generated tool-call syntax appears as final text. No Pi tool event executed; this is not a completed handoff.</p>}
        <div className="ec-skill-ladder__pair"><section><h5>Submitted prompt</h5><pre>{level.prompt}</pre></section><section><h5>Observed {review.model} response</h5><div className="ec-skill-ladder__response" dangerouslySetInnerHTML={{ __html: renderResponseMarkdown(level.response) }} /></section></div>
        <footer>Isolated Pi · {level.tool_events} tool events · Prompt SHA-256: {level.prompt_sha256} · Response SHA-256: {level.response_sha256}</footer>
      </details>)}
    </div>
    <p className="ec-skill-ladder__boundary">Clean provider route: {review.provider}/{review.model}. The source, receipt and audit are candidate review records; no model output is accepted as professional advice, technique efficacy or external-effect authority.</p>
  </div>;
}
