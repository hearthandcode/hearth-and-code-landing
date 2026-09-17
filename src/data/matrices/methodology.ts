// Matrix 4: methodology
import type { HcanMatrix } from './matrix-types';

export const canonicalMethodology: HcanMatrix = {
  id: 'methodology',
  title: 'Evaluation Methodology',
  columns: ['layer', 'method', 'judges', 'fixtures', 'question', 'finding'],
  rows: [
    ['L1 LLM judge', 'blind A/B, same performer, 16 dims per panel', '1', '5', 'is the output structurally better?', 'analytical 14/16; generative 4/16 on hard tasks (model ceiling)'],
    ['L1-rep easier fixtures', 'same method, tasks within model capability', '1', '3', 'does the protocol help when the model can perform?', 'generative flipped to 13/13 \u2014 model ceiling confirmed'],
    ['L2 multi-judge', '3 judge models, majority vote per dimension', '3', '3', 'is the result robust across judge families?', '13/13 unanimous \u2014 single-judge confirmed'],
    ['L3 human disposition', 'blind tabbed comparison (/hcan-compare), pick + reason', '1 human', '3', 'does the human want to use it?', 'prefers structure; can\'t read format yet \u2014 skill issue, not design flaw'],
  ],
  total_model_calls: 52,
  total_human_sessions: 1,
  reusable: true,
};
