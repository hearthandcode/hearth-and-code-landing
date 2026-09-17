import type { BaseProps } from './types';

export interface HcanHarderTasksProps extends BaseProps {
  panel: 'analytical' | 'generative';
}

/** Harder-tasks panel.
 * Source: Hearth & Code Hub, project 0047, canonical §"harder creative tasks".
 * The panel surfaces the harder-task finding (14/16 analytical, 4/16 generative on
 * hard fixtures; generative flipped to 13/13 on easier fixtures) and frames it
 * as a model-ceiling finding, not a notation finding. */
export function HcanHarderTasks({ panel, className }: HcanHarderTasksProps) {
  // Use template literals everywhere; avoid embedded apostrophes.
  const data = panel === 'analytical'
    ? {
        name: 'Analytical',
        scope: 'single-shot, promptable, structural',
        panelResult: '14 wins / 16 dimensions',
        harder: '4 wins / 16 dimensions on harder fixtures (model ceiling)',
        easier: 'n/a (within-model across conditions)',
        what: 'On analytical tasks, HCAN wins 14 of 16 dimensions blind-A/B (4-to-1 preference).',
        why: 'Both HCAN and prose score D/F on harder creative tasks. The notation cannot lift a model across its ceiling.',
        mechanism: 'When the underlying reasoning is within capability, structure (boundary discipline 5.0 vs 3.2, calibrated confidence 4.8 vs 3.4) dominates. When the reasoning crosses the ceiling, both notations degrade equally.',
        where: 'HCAN should excel on harder tasks where the model can perform but the prompt lacks a usable frame \u2014 the format supplies what the prompt forgets. Unverified: any specific harder fixture family.',
      }
    : {
        name: 'Generative',
        scope: 'open-ended ideation, synthesis across sources',
        panelResult: '13 wins / 13 dimensions (3-judge consensus)',
        harder: '4 wins / 16 dimensions on harder creative tasks (model ceiling)',
        easier: '13 wins / 13 on easier fixtures \u2014 model ceiling confirmed',
        what: 'On generative tasks within the capability of the model, HCAN wins all 13 dimensions with 3-judge consensus (8-to-1 preference, 3 S-tier rows on g08 falsifiability, g14 risk surface named, g16 calibration).',
        why: 'On harder creative tasks, the generative protocol scores D/F tier. The capability, not the notation, is the limiting factor. Without easy-fixture controls, the D/F would have looked like a notation failure.',
        mechanism: 'The generative protocol adds structural supports (card contract, fusion requirement, discipline fields) the model would not produce on its own. Within capability, those supports are a net win. Beyond capability, no support structure can manufacture novelty.',
        where: 'HCAN should excel on harder generative tasks where the model can synthesize but not structure \u2014 the card contract supplies boundary discipline and source grounding. Unverified: any specific harder generative fixture.',
      };

  return (
    <aside
      className={`ec-hcan-harder-tasks ec-hcan-harder-tasks--${panel} ${className ?? ''}`}
      aria-labelledby={`harder-tasks-${panel}`}
    >
      <header className="ec-hcan-harder-tasks__header">
        <h3 id={`harder-tasks-${panel}`}>Harder tasks &mdash; what the panel covers</h3>
        <p className="ec-hcan-harder-tasks__scope">{data.name} panel: {data.scope}</p>
      </header>

      <dl className="ec-hcan-harder-tasks__scores">
        <div><dt>Wins within capability</dt><dd>{data.panelResult}</dd></div>
        <div><dt>Harder-fixture score</dt><dd>{data.harder}</dd></div>
        <div><dt>Easier-fixture score</dt><dd>{data.easier}</dd></div>
      </dl>

      <section>
        <h4>What the panel found</h4>
        <p>{data.what}</p>
      </section>

      <section>
        <h4>Why both notations score D/F on harder tasks</h4>
        <p>{data.why}</p>
        <p>{data.mechanism}</p>
      </section>

      <section>
        <h4>Where HCAN should excel on harder tasks (unverified)</h4>
        <p>{data.where}</p>
        <p className="ec-hcan-harder-tasks__boundary">
          <strong>Boundary:</strong> this projection surfaces a hypothesis about
          where HCAN may help, drawn from what the canonical notes about
          generative-protocol supports. It is not an evaluation claim; we have
          no harder-fixture results for either panel beyond the canonical totals.
        </p>
      </section>
    </aside>
  );
}

export default HcanHarderTasks;
