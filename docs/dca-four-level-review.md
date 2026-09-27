# Dynamic Context Assembly · four-level prompting review

Status: **superseded first pass**, candidate evidence only; not an efficacy study or a ranking of people. Four isolated no-tool `minimax-oauth/MiniMax-M3` turns used the same synthetic catering source packet and system instruction. Prompt identities, response digests, timestamps and exact prompts/responses are preserved at `docs/evidence/prompt-technique/dca-ladder-v1/runs.json`; the original ladder, analysis, projection and runner are preserved beside it. The active fully authored prompt design is `src/data/dca-skill-ladder-v2.yaml` with its own new receipts and analysis.

## What the earlier baseline meant

The original two-arm baseline was already a capable instruction: it asked for a provisional plan from a full source packet under a tool-free system instruction. `candidate-needs-revision` referred to unsupported statements and editorial gaps in the **teaching sample**, not to a tested verdict that Dynamic Context Assembly has no effect. A well-behaved model can produce a strong answer even to a short prompt, and a detailed prompt can produce errors.

## Observed four-level briefing

- **Casual:** 18 rice-and-bean + 6 chickpea, $264, allergy meal held. Incorrectly dates the Tuesday email as Monday; does not call out cross-contact handling, and asks for unnecessary pasta checks.
- **Power user:** correct 18 + 6 and $264 with explicit dietary allocations. Sesame ingredient status remains open, but cross-contact is not considered; some 'held' language could be mistaken for reservation.
- **Agentic engineer:** correctly holds ingredient and cross-contact safety and the open slot, but calculates $360 − $264 as **$86** rather than **$96** in one line and adds speculative context. It does not build a compact field-reconciled brief.
- **Engineer + DCA:** uses four source-labeled context slots, explicitly supersedes older stock counts but retains menu prices, excludes unconfirmed pasta and does not assign the allergy meal. This is a more inspectable information path. Yet it prices **23 meals at $253** plus an unknown 24th and implies the complete cost is comfortably under $360; it also compares the unknown sesame-safe meal to spare chickpea capacity even though chickpea contains sesame. It does **not** solve the task safely.

The only relatively isolated mechanism contrast is **engineer vs engineer + DCA**: the latter begins with the engineer instruction unchanged and adds the source-selection/precedence/omission/working-brief operation. Across casual → power → engineer, prompt detail and user framing both change, so those runs cannot isolate one technique. All four have one model response each; no replication, confidence interval, independent dietary verification or cross-model trial exists.

## Editorial disposition

Keep the direct responses visible as observations, with the failing claims called out in the briefing and rubric. Do not use the customer reply, price or allergy plan operationally. The general technique disposition is now domain-neutral; the catering case is only its demonstration fixture. Further work could repeat the engineer pair under fixed facts and a stronger assertion check, then test a different domain before making any claim of portability or reliability. Human review decides whether this example is useful teaching material.
