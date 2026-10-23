---
artifact_class: source
status: owner-review-pending
revision: 1.0
date: 2026-10-23
repo: hearth-and-code-landing
purpose: unify the two design systems; document tokens, typography, color, spacing, components; create the migration path
---

# Hearth & Code — Unified Design System

## The Problem (Current State)

Two design systems coexist in this repository:

| | System A (Root HTML) | System B (Astro Pages) |
|---|---|---|
| **Files** | `site.css` (734 lines) | `src/styles/tokens.css` (108) + `src/styles/global.css` (538) + per-surface CSS |
| **Serves** | Homepage, About, Building, Mission, Council, Legal | Library, Portfolio, Dossier, Research, Philosophy, Programs, Journal, Notes |
| **Token prefix** | `--bg`, `--cream`, `--ember` | `--color-surface-primary`, `--color-text-primary`, `--color-accent-ember` |
| **Same fonts** | ✅ Fraunces / Inter / JetBrains Mono | ✅ Fraunces / Inter / JetBrains Mono |
| **Different names** | ✅ Every variable is named differently | ✅ Every variable is named differently |

**Root cause:** the root HTML pages and the Astro app were built by different sessions with different naming conventions, sharing fonts and aesthetic but not token names.

## The Unified Token System (Canonical)

All future work uses **System B naming** (more descriptive, already used by the larger codebase). The canonical tokens:

### Colors — Surface
| Token | Value | Usage |
|---|---|---|
| `--color-surface-primary` | `#161411` | page background |
| `--color-surface-raised` | `#211d18` | cards, panels |
| `--color-surface-recessed` | `#0e1114` | wells, code blocks |
| `--color-surface-rule` | `#4b4237` | hairlines |
| `--color-surface-rule-strong` | `#6e5d4b` | emphasis borders |

### Colors — Text
| Token | Value | Usage |
|---|---|---|
| `--color-text-primary` | `#f1e7d2` | body text (cream) |
| `--color-text-secondary` | `#cfc1ab` | muted text |
| `--color-text-display` | `#f1e7d2` | headings (same as primary) |

### Colors — Accent
| Token | Value | Usage |
|---|---|---|
| `--color-accent-ember` | `#E85B4E` | primary CTA, brand emphasis |
| `--color-accent-gold` | `#F4B860` | secondary emphasis, gold text |
| `--color-accent-forge` | `#C25A3A` | deep accent |
| `--color-accent-violet` | `#9B5DE5` | rare; research signals |
| `--color-accent-plasma` | `#3FE0D0` | focus rings, success |
| `--color-state-success` | `#8FA395` | confirmations |
| `--color-state-caution` | `#E8923C` | warnings |
| `--color-state-error` | `#C25A2A` | errors |

### Typography
| Token | Value |
|---|---|
| `--font-display` | `"Fraunces", Georgia, serif` — headings, brand |
| `--font-body` | `"Inter", system-ui, sans-serif` — body text |
| `--font-mono` | `"JetBrains Mono", ui-monospace, monospace` — code |
| `--font-size-body` | `1rem` |
| `--font-size-small` | `0.875rem` |
| `--line-height-body` | `1.6` |
| `--line-height-reading` | `1.75` |

### Spacing
| Token | Value |
|---|---|
| `--space-1` | `0.25rem` |
| `--space-2` | `0.5rem` |
| `--space-3` | `0.75rem` |
| `--space-4` | `1rem` |
| `--space-5` | `1.5rem` |
| `--space-6` | `2rem` |
| `--space-7` | `3rem` |

### Gradients & Shadows
| Token | Value |
|---|---|
| `--gradient-signal-travel` | ember → caution → gold → plasma (hero underline) |
| `--gradient-firelight` | ember → caution → gold (panels, accents) |
| `--shadow-glow-ember` | `0 0 16px rgba(232,91,78,.35)` |
| `--shadow-glow-plasma` | `0 0 14px rgba(63,224,208,.40)` |

## Migration Path (Root HTML → Unified)

### Strategy: alias + incremental
Add System B tokens as CSS custom properties in `site.css`, aliased to the old System A names. This makes both systems work simultaneously during migration:

```css
/* Bridge aliases — temporary, remove after full migration */
:root {
  --bg: var(--color-surface-primary);
  --cream: var(--color-text-primary);
  --muted: var(--color-text-secondary);
  --ember: var(--color-accent-ember);
  --gold: var(--color-accent-gold);
  --plasma: var(--color-accent-plasma);
  /* ... */
}
```

### Phases
1. **Phase 1 (this session):** Add the bridge aliases to `site.css`; redesign `/library/` with unified tokens; document the system
2. **Phase 2 (next session):** Migrate remaining root HTML pages (about, building, mission, council, legal) to Astro pages with unified tokens
3. **Phase 3:** Remove bridge aliases; `site.css` becomes thin or is replaced by a shared `hearth-code.css`
4. **Phase 4:** Component library extraction (buttons, cards, panels, typography scale) as reusable Astro/React components

## Design Principles
1. **Warmth you can verify** — the aesthetic IS the methodology: ember tones, readable serif headings, monospace for receipts
2. **Two speeds** — display font (Fraunces) for warmth; body font (Inter) for clarity; mono (JetBrains) for evidence
3. **Dark surface as default** — the hearth is lit in the dark; dark mode IS the design
4. **Ember accent as primary action** — CTAs are warm, not cold; the brand color is the fire color
5. **Gold for secondary emphasis** — the sacred register; used sparingly
6. **Plasma for focus/interactive states** — the "code" complement to the "hearth" warmth

## Component Conventions
- **Cards/panels:** `--color-surface-raised` background, `--color-surface-rule` border, `--space-5` padding, 12–14px radius
- **Buttons primary:** `--color-accent-ember` background, `--color-text-primary` text
- **Buttons secondary:** transparent, `--color-surface-rule-strong` border
- **Code blocks:** `--color-surface-recessed` background, `--font-mono`, `--font-size-small`
- **Headings:** `--font-display`, weight 500–700, `--color-text-display`
- **Body:** `--font-body`, `--font-size-body`, `--line-height-body` (reading surfaces use `--line-height-reading`)
