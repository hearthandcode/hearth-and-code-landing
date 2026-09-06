interface PublicMethodEditorialOverride {
  replace: string;
  with: string;
  note: string;
}

export const publicMethodEditorialOverrides: Record<string, PublicMethodEditorialOverride> = {
  'M-34': {
    replace: 'Sigil signals are `○ ready`, `□ hold`, `× fail`, and `↩ return`; they do not enforce anything.',
    with: 'Sigil transition clauses are `ValidatedRecord ∧ checks=pass → ReviewReady`; `mandatory_failure → HoldRecord`; `ReviewRecord ∧ owner_decision=null → HOLD`; and `ReturnBundle ← lineage+status`. Human gloss: the structured language encodes states, guards, ancestry, and return conditions; the visible `○`, `□`, `×`, and `↩` marks are projections of those clauses and enforce nothing.',
    note: 'The Sigil passage was editorially corrected after generation. A fresh harness evaluation is pending; the earlier score is not carried forward.',
  },
};
