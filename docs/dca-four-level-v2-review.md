# Dynamic Context Assembly · independently authored four-prompt review

Status: candidate for owner review, **not** an effectiveness or user-ability ranking. Supersedes `docs/dca-four-level-review.md` for the live Methods reader. The previous identical-packet design remains separately archived at `docs/evidence/prompt-technique/dca-ladder-v1/`.

## Design correction

The prior ladder pasted one identical source packet and task wrapper above four near-identical instructions. That is a valid way to isolate a framing change, but not a realistic representation of how four user experience levels actually prompt. The revised ladder authors each **complete prompt independently**: conversational partial recollection; a power-user working note; a source-typed engineer contract; and a task-time source drawer with explicit context selection, field precedence, exclusions, draft bounds and checks. Each condition still uses the same synthetic underlying scenario and the same isolated `minimax-oauth/MiniMax-M3` no-tool/no-session route. The information available *inside the prompt* differs. The last contrast is **not** a causal experiment because the entire prompt is re-authored.

The live technique sheet now has five authored sections: identity (definition, distinction, mechanism, non-example), application, when to use, limitations, and a demonstration briefing. All nine authored techniques (#001–#009) have distinct identity text; the remaining atlas entries remain held for editorial review.

## Adversarial read of current response digests

| Prompt style | Useful observed behavior | Blocking or qualifying error |
| --- | --- | --- |
| Casual | Proposes an inexpensive mix and names allergy questions. | Invents Friday availability for 12 tomato pastas, tentatively routes the allergy guest to unverified pasta, and suggests an unsafe draft can be sent. The partial input cannot support a source-freshness verdict. |
| Power user | Uses Thursday stock, a structured table and some allergy holds. | 18 rice + 6 chickpea already equals 24; adding a custom meal gives 25 while the response calls the first two lines a 23-meal subtotal. The customer draft repeats the incoherent count. |
| Agentic engineer | Holds sesame ingredients and cross-contact; declines a complete safe priced order. | Includes illustrative 24-meal mixes that cannot serve the allergic guest, asks unnecessary overlap questions, and hints the eventual total will fit the cap despite no safe meal price. |
| Engineer + DCA | Makes source selection, Thursday-versus-Monday precedence, menu-price retention, pasta exclusion and four decision slots explicit. Keeps 23 known meals at $253 and leaves the 24th meal/complete price unknown. | Still asks an unnecessary overlap question, and cannot solve missing sesame and handling evidence. Greater traceability does not complete the order. |

The single-run observations support a **narrow descriptive** statement: the technique-focused output in this fixture showed a clearer trail from source facts to a bounded subtotal than the other outputs. They do not prove that DCA generally improves outcome, that novice users perform worse, or that the customer reply is safe to use. The exact prompts, model texts, hashes, timestamps and no-tool event counts are in `src/data/dca-skill-ladder-v2-runs.json`. The seven-criterion qualitative matrix and response-digest-bound assessments are in `src/data/dca-skill-ladder-v2-analysis.yaml`. No cumulative quality score is computed.

## Human review seam

Decide whether the five-section identity helps orient each technique; whether each prompt realistically represents its labelled prompting style; whether input-coverage differences should be further normalized for a separate causal study; and whether the candid model failures are useful teaching counterexamples. Do not carry this example into a guaranteed-improvement claim or automatically apply the ladder to Batch 2. Source candidates remain unverified.
