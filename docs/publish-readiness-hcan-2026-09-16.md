# HCAN journal + Ember Circuit product — publish-readiness brief

**date:** 2026-09-16
**revision:** 7 (implemented per 0002-hermes-react-goal-prompt-256.md: lib/hcan tokenizer port + five brief components + HCANPage shell, hydrated on both surfaces)
**effect:** authoring + local verification (publishing held)
**status:** held — `git add`, `git commit`, `git push`, and `wrangler pages deploy` are not in scope without an explicit effect-and-target release from Scott

---

## 1. Decision received

Scott resolved the three gates on landing the HCAN field-journal article on the Hearth & Code landing surface:

- **Gate 1 (source location):** A — the Hub article remains canonical, a public-safe projection is staged on the landing surface.
- **Gate 2 (Ember Circuit theme loading):** Full — HCAN ships as a new Ember Circuit product `HcanGrammarLibrary` (`K17` in the registry), with a dedicated `/hcan/` route and a journal post at `/journal/hcan-condensed-symbolic-language/`.
- **Gate 3 (live evaluation scope):** Local — `npm run dev` + `npm run build` only; no push, no Cloudflare Pages deploy.

## 2. What was authored

| File | Purpose | Type |
|---|---|---|
| `src/content/journal/hcan-condensed-symbolic-language.mdx` | Public-safe projection of the Hub canonical field-journal article; status: `published`; full claim_map; explicit projection frontmatter (source_canonical pointer, source_state, source_verified, source_review_status). | New |
| `src/components/ember-circuit/HcanGrammarLibrary.tsx` | Ember Circuit product `K17` — interactive grammar library with 4 views (Examples / Grammar / Protocols / Envelope). | New |
| `src/data/hcan-program-cards.ts` | Structured dataset for the 8 HCAN examples, 8 primitives, 2 protocols, portable envelope layers, evaluation methodology. | New |
| `src/data/hcan-highlight.ts` | Projection of the canonical `hcan-highlight.js` tokenizer with explicit source pointer; preserves all 8 token-class hooks. | New |
| `src/styles/ember-circuit-hcan.css` | Ember Circuit styles for the HcanGrammarLibrary surface. | New |
| `src/components/ember-circuit/registry.ts` | Registered `K17 HcanGrammarLibrary` in the K band. | Patch |
| `src/pages/hcan.astro` | New top-level page at `/hcan/` — accessible from the `Field Journal` top-right link by adding a clean `HearthNavigation` shell with the source-pointer note. | New |

## 3. What was verified (locally)

| Gate | Command | Outcome |
|---|---|---|
| Typecheck | `npm run check` | 0 errors, 0 warnings, 0 hints across 124 Astro files |
| Build | `npm run build` | 49 pages built in 1.98s; `dist/hcan/index.html` and `dist/journal/hcan-condensed-symbolic-language/index.html` both present; dist size 5.1 MB |
| Dev server | `npm run dev -- --host 127.0.0.1 --port 4357` | astro v7.3.1 ready in 1830 ms; content synced; no errors |
| Live HTTP | `curl -sI http://127.0.0.1:4357/hcan/` | `HTTP/1.1 200 OK`, `content-type: text/html` |
| Live HTTP | `curl -sI http://127.0.0.1:4357/journal/hcan-condensed-symbolic-language/` | `HTTP/1.1 200 OK` |
| Live HTTP | `curl -sI http://127.0.0.1:4357/journal/` | `HTTP/1.1 200 OK` |
| Surface presence (dev) | `curl -s http://127.0.0.1:4357/hcan/ \| grep "HCAN Grammar Library"` | matches |
| Surface presence (dev) | `curl -s http://127.0.0.1:4357/hcan/ \| grep "TypeScript Project Orientation"` | matches (example E01 in HTML) |
| Surface presence (dev) | `curl -s http://127.0.0.1:4357/journal/hcan-condensed-symbolic-language/ \| grep "HCAN: A Condensed Symbolic Language"` | matches |
| Surface presence (dev) | `curl -s http://127.0.0.1:4357/journal/ \| grep "hcan-condensed-symbolic-language"` | matches (index surfaces the new entry) |
| Canonical pointer | `grep "0047-hcan-communication-medium"` in both `dist/hcan/index.html` and `dist/journal/hcan-condensed-symbolic-language/index.html` | matches — projection explicitly names the Hub canonical |

## 4. What is held

- **No `git add`.** No `git commit`. No `git push` to either remote (`gh/main` or `origin/main`).
- **No `wrangler pages deploy`.**
- **No `verified: true` flip** — the canonical Hub article remains `verified: false` per AGENTS root §25.07; the projection copy is `status: published` for the public surface, with `projection.source_verified: false` recorded in frontmatter.
- **No Hub-side changes** outside what Scott specifically requested (the canonical article itself was not touched — projection is the landing repo).
- **No Keystudio / Exocore / Hermes-CLI effects.** No provider calls. No external spend. No Git mutation.

## 5. What still wants a release to run

| Effect | Target | Why a release |
|---|---|---|
| `git commit` on `landing/hcan-journal-2026-09-16` | 7 modified/created files in `open-source/hearth-and-code-landing/.worktrees/hcan-journal-2026-09-16/` | AGENTS root §02 / §13 |
| `git push` to `origin/main` and `gh/main` | `open-source/hearth-and-code-landing` | AGENTS root §02 / §13; AGENTS v3 §09 |
| `wrangler pages deploy` against Cloudflare Pages | `dist/` produced by `npm run build` | External-publication effect |

## 6. Rollback paths

If Scott gives the `commit` + `push` release and then decides this projection should not be the surface:

- **Worktree preserved.** Branch `landing/hcan-journal-2026-09-16` is the only side-effect location; nothing is on `main`.
- **Revert the branch locally:** `git checkout main && git branch -D landing/hcan-journal-2026-09-16 && git worktree remove .worktrees/hcan-journal-2026-09-16 --force` (clean within the repo).
- **Revert the commit on `main` (after push):** `git revert <commit-sha> && git push origin HEAD:main && git push gh HEAD:main` — both remotes accept the revert.
- **Remove the projection only (canonical unchanged):** delete `src/content/journal/hcan-condensed-symbolic-language.mdx`, `src/pages/hcan.astro`, `src/components/ember-circuit/HcanGrammarLibrary.tsx`, `src/data/hcan-program-cards.ts`, `src/data/hcan-highlight.ts`, `src/styles/ember-circuit-hcan.css`, and unregister `K17` from `registry.ts`. The Hub canonical is unaffected by any of these.

## 7. Why "projection, not promotion"

The Hub article is `status: candidate, review-required, verified: false`. AGENTS root §02 + §25 require Scott's seal for any `verified: true`. The projection carries:

- `projection.source_canonical` — the file in the Hub
- `projection.source_state` — `candidate`
- `projection.source_verified` — `false`
- `projection.source_review_status` — `review-required`
- `projection.projection_method` — `Authored by hand from canonical Hub article; Hub remains source-of-truth; projection revisable without affecting canonical.`

If Scott signs the canonical `verified: true`, the projection stays a faithful copy; if Scott revises the canonical, the projection can be re-authored without write-back to the canonical.

## 8. File IDs for review

The MDX's claim_map frontmatter carries the eight claim labels (evidence | inference | proposal | open-question) per the Hub bounded vocabulary and the journal schema. The grammar library's `K17` slot is added to the Ember Circuit component registry (8 bands closed: P × 8, W × 8, K × 8 now 9 — `K17` is an additive amendment to the 32-component band; the registry was already at `S08` before, `K09-K16` were the K bound, `K17` extends that slot. Total now is **33 components**; this is named in this document so the registry count drift is visible.)

## 9. Hand-off

Three messages I am waiting on from Scott:

1. **Effect 1 — commit.** "commit on `landing/hcan-journal-2026-09-16` for scope=7 files in `open-source/hearth-and-code-landing/.worktrees/hcan-journal-2026-09-16/` as of 2026-09-16T07:00:00Z."
2. **Effect 2 — push.** "push `landing/hcan-journal-2026-09-16` to `origin/main` and `gh/main` after effect 1."
3. **Effect 3 — deploy.** "deploy `dist/` to Cloudflare Pages after effect 2."

Until effect 1 lands, the work lives on the `landing/hcan-journal-2026-09-16` branch in the worktree, with the dev server still running on `127.0.0.1:4357`. The dev server can be stopped at any time: `kill 2226625`.

If Scott wants any of: a Hub-side touch on the canonical article, a tweak to the journal post's `projection` block, or a tweak to the Ember Circuit component's tab structure — those are separate scopes and individual effects under the same AGENTS root gates.
