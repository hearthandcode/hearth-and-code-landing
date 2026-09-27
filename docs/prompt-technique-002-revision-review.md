# Technique #002 successor — contrastive-fork instruction hierarchy

Status: candidate-needs-revision; owner disposition pending. This is one synthetic customer-support scenario and one MiniMax-M3 response per prompt. The existing three baseline prompts/responses and the original technique run remain immutable in Batch 1. The successor reruns **only** the engineer-using-technique condition via the isolated Pi route (fresh home, no Hub/plugin/APPEND_SYSTEM, no tools, no saved session). No refund, transfer, message or manager approval occurred.

## Comparison design

The task-oriented engineer asks for a policy-grounded draft, unsupported-claim audit and decision handoff. The successor technique prompt has a separately authored workbench: named source records, explicit policy/chat/lead precedence, two branches that differ in authority and effect, per-route genuine disqualifiers, a review-only customer draft and source-to-claim checks. It preserves the engineer's task and evidence competence rather than substituting technique terminology for it. Neither prompt copied the other's text. The customer, policy, chat and lead facts are unchanged.

Eight dimensions and the 0/1/2/not-observable anchors were frozen with the successor prompt before the provider call. They cover policy/request fidelity, source precedence, authority/effect gate, materially different routes, route-specific disqualifiers, fee/seat/exception uncertainty, usable customer reply and reviewer handoff. Each score has an evidence explanation in `src/data/prompt-technique-002-revision-analysis.yaml` and the Methods sheet. A score of `not_observable` means the prompt omitted essential facts; it is **not** a failure by the model. Two dimensions reward fork structure, so the sum is not a style-neutral task-quality score. Different information supplied to the casual prompt further prevents a four-way user-ability or causal comparison.

| Dimension (0–2) | Casual | Power | Engineer | Engineer + revised technique |
| --- | ---: | ---: | ---: | ---: |
| Policy and request fidelity | N/O | 1 | 2 | 2 |
| Source roles and precedence | 1 | 1 | 2 | 2 |
| Draft, send and exception boundaries | 1 | 1 | 2 | 1 |
| Materially different routes | N/O | 1 | 1 | 2 |
| Route-specific disconfirmers | N/O | 0 | 0 | 2 |
| Fee, seat and exception uncertainty | 1 | 1 | 1 | 1 |
| Usable customer reply | 1 | 1 | 1 | 2 |
| Check and decision handoff | 1 | 1 | 2 | 1 |
| **Observed points / available points** | **5/10** (5/8 assessable) | **7/16** | **11/16** | **13/16** |

The successor yields a clearer transfer-versus-manager-exception comparison and genuine route disqualifiers. Its customer reply conditionally offers to check a future session and ask a manager; it does not claim to have refunded, booked or sent anything. But its analysis says the lead can offer Route A without a manager decision, despite only express permission to *draft* in the supplied role note. It also turns a **written manager request and decision** into an apparent mandatory gate, though no procedure was supplied. The task-only engineer has a different overclaim: its draft brackets “Standard transfer terms apply” without a source establishing such terms, even while flagging that phrase for verification/removal. The power-user response invents dissatisfaction and suggests an internal chat may have reached the customer. The casual response cannot be evaluated for the absent policy or routes.

The difference between 11/16 and 13/16 is not evidence that the technique generally improves performance. In this task, three relative points come from worked routes and disqualifiers, one from the reply, while two are lost on authority/gate and handoff. The score depends on this predeclared rubric, particular model response and richer prompt; there are no repeats, blind graders, matched-length controls or outcome measurements.

## Evidence and release boundary

- Frozen baseline: `src/data/prompt-technique-batch-001-ladders.yaml` and `src/data/prompt-technique-batch-001-ladder-runs.json`; original technique response is preserved, not relabelled or overwritten.
- Successor prompt and rubric: `src/data/prompt-technique-002-revision.yaml`; receipt: `src/data/prompt-technique-002-revision-run.json`; scored audit: `src/data/prompt-technique-002-revision-analysis.yaml`.
- The receipt is bound to the prompt file digest; the audit names the baseline and successor response digests; `scripts/sync-prompt-technique-002-revision.mjs` verifies those bindings and computes totals from dimension scores. `scripts/sync-prompt-batch-001-review.mjs` projects the successor into **section 05 of the existing #002 Methods sheet**; the other seven cards retain their prior Batch 1 evidence.
- Before using this customer reply, a human must check send authority, transfer availability/fees, and whether an actual manager exception procedure exists. The current analysis is a candidate counterexample and a review aid, not an approved instruction or claim of prompt efficacy. Batch 2 remains paused.
