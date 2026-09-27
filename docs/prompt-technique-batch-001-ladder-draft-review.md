# Batch 1 · four-prompt draft review

Status: `prompt-draft-review-required`. This is an **authoring packet**, not provider output, an efficacy study, a replacement for the existing Methods cards, or approval to send 32 model turns. Machine-readable process: `src/data/prompt-technique-process.yaml`. The eight complete ladders are in `src/data/prompt-technique-batch-001-ladders.yaml`. Read them in catalogue order #002–#009, immediately after the Dynamic Context Assembly exemplar. The deterministic draft audit is `node scripts/audit-prompt-ladder-draft.mjs` (read-only; reports prompt digests and source-fact coverage).

## What changed from the earlier two-arm batch

Every item has four independently authored *whole prompts*: an informal request with partial facts; a practical power-user brief; an evidence-bound engineer instruction; and an end-to-end prompt applying the named mechanism through its relevant seams. The casual tier intentionally lacks some facts and cannot be graded on criteria it could not observe. The source facts are referenced from each existing public-safe fixture, not pasted verbatim into every prompt. This makes the ladder illustrative rather than a controlled efficacy comparison.

| # | Technique | Review the distinctive fourth prompt for | Source-coverage seam |
| --- | --- | --- | --- |
| 002 | Contrastive-Fork Instruction Hierarchy | Real route disqualifiers, published policy versus chat, separate draft/send/refund authority. | Casual lacks the published policy; cannot be expected to apply its 48-hour rule. |
| 003 | Emotion Prompting | A cue to the **model** about accurate, non-shaming writing without changed audience tone or invented urgency. | Casual knows event logistics but not the no-account-sharing and front-desk notes. |
| 004 | Staged Composition | Five stages with input/output/stop at permission seams; no inferred attendance-log database identity. | Casual lacks the database prohibition and trainer gap. |
| 005 | Outcome-First Contract | Proposed owner-reviewed result *before* methods, fixed query fixture and unrelated-query non-goals. | Casual has no rank snapshot or approved top-three target. |
| 006 | Receipt-Bound Achieved State | Excerpt-only checks, unrun accessibility tests, no changes, unknown page order and owner gate. | Casual lacks the brief and unrun-test note. |
| 007 | Bounded Receipt with Non-Effects | Exact synthetic log time, checks not reported, scoped non-effects, separate import authorization. | Casual has approximate diagnostics but not row locators or the curator rule. |
| 008 | Contrastive-Fork Non-Action | Two **different preparation routes**; web and email remain separately held; no invented scheduler. | Casual does not know the formal publication/email approval rule. |
| 009 | Provenance-Carrying Chunk | Per-source ID, locator, exact quote, authority, missing digest and transformation before synthesis. | Casual only recalls approximate hours; cannot establish source identity or exact quotation. |

## Owner review questions

1. Do these four *complete* prompts sound like the claimed prompting styles, or is a tier still too engineered/too sparse?
2. Does the fourth prompt implement its specific mechanism, rather than adding ritual formatting or the technique name?
3. Is each casual prompt missing an appropriate amount of information **without** setting up an unfair or unsafe strawman? Should any fact be added or removed?
4. Do the proposed rubrics distinguish `not_observable` from an output error when information was absent from a tier?
5. Would you revise the eight prompts before releasing the clean-Pi execution step, or approve this draft for provider-backed comparison?

## Held next stage

After your draft disposition, an explicitly authorized run would use `scripts/pi-clean-isolated.mjs` (fresh Pi home, no Hub/plugin mounts or APPEND_SYSTEM) for 4 turns per technique. Those 32 outputs would require independent adversarial and source-mechanism review bound to exact response hashes, then a browser review and another human disposition. No model response is fabricated in this packet; the older Batch 1 two-arm receipts remain historical, isolation-limited candidates rather than evidence for these new prompts.
