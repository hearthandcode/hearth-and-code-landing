# Batch 1 four-tier execution: adversarial and alignment review

**Disposition:** candidate-needs-revision, owner decision pending. Scope: atlas entries #002–#009, 32 distinct full prompts and 32 observed `minimax-oauth/MiniMax-M3` responses. The underlying prompt source, provider receipt and qualitative matrix are `src/data/prompt-technique-batch-001-ladders.yaml`, `src/data/prompt-technique-batch-001-ladder-runs.json`, and `src/data/prompt-technique-batch-001-ladder-analysis.yaml`. The no-index browser view is `/review/prompt-batch-001/`. It is review-only, not access-controlled. No live Methods card was replaced.

## Evidence and execution audit

- All 32 turns were invoked through `scripts/pi-clean-isolated.mjs`: fresh Pi config per turn, no Hub or plugin mount, absent AGENTS and APPEND_SYSTEM, disabled tools, discovery extensions, skills, templates, and session saving. Pi JSON reported `minimax-oauth/MiniMax-M3` and zero tool events for each turn. This confirms the captured route and event posture, not independent attestation of provider request serialization.
- `node scripts/audit-prompt-ladder-runs.mjs` binds all 32 prompts/responses to hashes and the frozen draft digest. It detects **#007 casual** emitting a tool-call-shaped string as *final text*. No Pi tool call occurred. This is an output failure and must not be read as an executed shell command or completed handoff.
- `node scripts/audit-prompt-ladder-analysis.mjs` checks eight ordered technique/source identities, four findings per entry, rubric coverage, owner-pending status, and the exact response hashes the findings assess. These are structural checks; the item judgments were separately authored from direct response reading.
- The first three tiers intentionally differ in input coverage. `not_observable` is used when a tier did not receive a required fact. None of the tier results is a controlled causal efficacy experiment or a test of a human's ability.

## Adversarial findings by technique

| Entry | Mechanism surfaced in technique tier | Material counterexample / hold |
| --- | --- | --- |
| **#002 Contrastive-Fork Instruction Hierarchy** | Two real routes with policy versus chat authority and rejection conditions. | Applied response invents manager exception criteria and says the lead cannot trigger a manager request, which the source does not establish. Power response misstates the customer's reason as dissatisfaction. |
| **#003 Emotion Prompting** | Model-directed salience cue, not merely emotional copy. | Applied invitation invents a **ten-minute** stay option despite no short-stay policy. Engineer baseline is at least as factually sound; no technique gain shown. |
| **#004 Staged Composition** | Five stage contracts with inputs, outputs and stops. | Applied response reverses the actor for visitor greeting and blocks all book sorting solely on an unresolved lifting trainer, although sorting need not involve lifting. Strong form, wrong task semantics. |
| **#005 Outcome-First Contract** | Proposed owner-approved outcome and neighbor-query guardrails before implementation. | **Blocking logic defect:** applied output says reject the top-three target if the baseline doesn't already satisfy it for at least one query. The supplied baseline ranks 9/11/7; failing baseline is the reason to consider a change, not a reason to reject the target. Do not teach this example as correct. |
| **#006 Receipt-Bound Achieved State** | Excerpt observation, checks not run, unknown ordering and owner gate travel together. | Minor source-fidelity issue: applied receipt calls an excerpt quote verbatim while adding punctuation absent from the provided cancellation string. Casual/power suggestions about fees are hypothetical only. |
| **#007 Bounded Receipt with Non-Effects** | Applied response explicitly distinguishes supplied log from a parser run and records no import, repair, or release. | Casual response emitted pseudo `<tool_call>` syntax in final text; structural tool events remained zero. Power response invented parser staging/import behavior. |
| **#008 Contrastive-Fork Non-Action** | Private draft versus inert approval packet; website/email remain separate held effects. | Applied output assumes no scheduler exists simply because none was established, and asserts an overnight approval interval is impossible without timing evidence. Both are hypotheses, not route disqualifiers. |
| **#009 Provenance-Carrying Chunk** | Per-unit ID, locator, date, authority, digest-unavailable and transformation are visible. | Baseline engineer already reconciled hours; no accuracy gain proven. Applied guide labels shortened hour fragments as exact quotations rather than paraphrases or verbatim complete source sentences. |

## Additional review suites

1. **Completeness:** Each authored prompt is non-empty and distinct; each final answer is over the minimum response threshold. Review page exposes all 32 prompt/response pairs without hiding the model's failure text. The pseudo-tool response is prominently held.
2. **Source/authority:** Critiques above distinguish source statements from generated business rules, approvals, scheduling assumptions, copy changes and invented facts. The Hub source technique records remain unreviewed candidates; this public exercise does not upgrade their verification state.
3. **Arithmetic and factual precision:** Search acceptance logic (#005), volunteer-role reversal (#004), no-fee or exception assumptions (#002), short-stay promise (#003), and attribution/quotation fidelity (#009) are distinct errors. No aggregate score would capture their different consequences.
4. **Privacy/security/non-effect:** No credential or private file was sent in task prompts. The model-generated pseudo-tool output (#007) is escaped and shown as text only; no tool event or file read happened. Output language about refund, import, or publication is a candidate, not an action.
5. **Comparative validity:** Different source coverage per tier makes casual-to-engineer differences unfit for causal ranking; even the fourth tier is a wholly re-authored prompt. Highlight observed mechanism and counterexamples together.
6. **Browser:** At 1600px and 390px, `/methods/` links to the no-index review page; it renders eight techniques, 32 disclosure pairs, 32 rubric rows, and the #007 tool-text warning with no browser page error or horizontal overflow. This is not full accessibility conformance.

## Required disposition before public replacement

Revise #005's applied demonstration or hold that example; correct the #004 actor and #003 short-stay issue in their teaching narratives without silently altering raw model output; preserve #007 as a negative example or rerun the casual condition after prompt review; distinguish hypotheses from established constraints in #002/#008 and quote from paraphrase in #009. Then rebind any new findings to new response digests and repeat both adversarial and source-alignment passes. **Batch 2 and a full catalog rewrite remain held.**
