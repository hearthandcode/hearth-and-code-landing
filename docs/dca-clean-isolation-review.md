# DCA provider-context isolation audit and clean four-prompt rerun

Status: review-required, candidate evidence. This is not a claim about the model's hidden reasoning or a demonstration of general prompt efficacy.

## Why the old power-user output had internal labels

The older `pi-container` wrapper always passed an explicit SearXNG extension and launched `pi-runtime` from a mounted Hub working directory with a shared Pi agent home. Its command-line flags included `--no-context-files`, `--no-extensions`, `--no-tools`, and a custom `--system-prompt`. Source inspection of `packages/coding-agent/src/core/resource-loader.ts` shows that `--no-context-files` suppresses AGENTS/CLAUDE files but does **not** suppress `APPEND_SYSTEM.md` discovery from the Pi agent directory. `core/system-prompt.ts` appends that file **after** a custom system prompt. The shared Pi home contained a Cognitectus APPEND_SYSTEM projection (SHA-256 prefix `9e5250c18a3d226e`) directing material claims to use exactly the `source`, `evidence`, `inference`, `hypothesis`, `proposal`, `projection`, `receipt`, and `unknown` labels. That is a concrete contamination path and closely matches the unexpected power-user output.

`--no-extensions` suppresses discovered extensions but an explicit CLI extension still loads; the wrapper added SearXNG. No evidence shows that the Core33 extension was explicitly loaded in those no-discovery runs. The exact serialized request received by MiniMax is not independently recorded, so the causal attribution is to the launch context with high confidence, not a proof about a particular sampled token.

## Clean route and diagnostic

`scripts/pi-clean-isolated.mjs` uses the pi-ember-exocore Pi image through a one-shot `pi-auth` Compose service. That service has **no Hub or plugin mount**. For each turn it creates a fresh writable Pi agent directory containing only the committed `minimax-oauth/MiniMax-M3` model overlay, checks that AGENTS and APPEND_SYSTEM are absent, uses an explicit minimal system instruction, disables tools, discovered extensions, skills, templates, context files and session persistence, and verifies provider/model/stop status from the Pi JSON event. Pi's built-in extensions are part of the binary but have no enabled tools; Pi still appends a working-directory line. These limits are recorded rather than claiming a literally empty system prompt.

A clean diagnostic of the existing power-user prompt returned a normal catering plan **without the bounded-vocabulary label list**. We then re-ran all four fully authored v2 prompts through that same clean route. Current public receipts are `src/data/dca-skill-ladder-v2-runs.json`; the shared-home predecessor is preserved separately at `docs/evidence/prompt-technique/dca-ladder-v2-shared-home/`. Different system/extension/home contexts mean the old and new response sets must not be treated as a model-only A/B test.

## Adversarial pass on the clean response digests

- **Casual:** arithmetic for 18 rice plus 6 chickpea is correct, but the response calls chickpea *vegan* (the prompt says only vegetarian) and tentatively assigns unverified rice to the severe-allergy guest. It suggests a draft can be sent as-is.
- **Power user:** no internal label list; Thursday stock precedence and $264 arithmetic are correct. The draft says a rice bowl is tentatively **reserved** for the allergy guest despite no safety confirmation or reservation, and asks unnecessary additional allergy/dairy questions.
- **Agentic engineer:** refuses a complete safe order and names ingredient/cross-contact gates. An illustrative 22-meal mix is followed by a claim that two ordinary meals would be unpriceable despite spare chickpea capacity; it suggests a tahini-free substitution without evidence that it controls cross-contact.
- **Engineer + DCA:** selects and reconciles the decisive facts, keeps menu prices while retiring stale stock, excludes unconfirmed pasta, correctly prices 23 known meals at $253, and leaves the 24th meal and complete-order price unknown. It incorrectly infers that dietary categories are disjoint from the phrase “no person needs more than one special meal,” and incorrectly says pasta could not serve vegetarian guests when its *Friday stock and allergen profile* are the unknowns.

The seven-criterion briefing is in `src/data/dca-skill-ladder-v2-analysis.yaml`, with findings bound to each current response SHA-256. The difference observed is improved **source selection and bounded pricing in this one response**, not proven technique effectiveness. Four prompts also differ in facts supplied and system framing; causal attribution to experience or technique is unavailable. No response is operational allergy advice or ready to send.

## Batch rule

Do not admit new Batch 1 comparison receipts from the shared-home Pi wrapper. The eight existing historical pairs remain visibly isolation-limited until rerun via the clean route and reassessed against their exact new response digests. Do not progress to Batch 2 or a full catalog rewrite on the strength of a clean container alone; source alignment, adversarial review, accessibility and owner disposition remain separate gates.
