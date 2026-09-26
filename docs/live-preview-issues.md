# Live Preview Issues — Handover Doc

## What's broken
TaxonomyTree and DialogueTree components render blank (black void) on
http://localhost:4321/design-system/live/, despite:
- Correct DOM structure (all classes present: `kc-taxonomy-tree`, `kc-dialogue`, etc.)
- Correct CSS rules present in page <head> (51KB of `kc-*` rules)
- Build succeeds (0 errors, 54 pages)
- All other components (Button, CitationRef, ConfidenceBar, etc.) render correctly with proper styling

## What I tried (chronologically)
1. ✗ Replaced dynamic imports with static registry — fixed blank "Loading..." message
2. ✗ Added `<style>` tag in component return — useless due to Astro island shadow DOM scoping
3. ✗ Added IIFE that injects CSS at module load — Vite tree-shook the call
4. ✗ Moved CSS to `/public/ember-circuit-component.css` + `<link>` tag — CSS loads but isn't applied (Astro island scope still blocks it)
5. ✗ Switched to `<style is:inline>` in `<Fragment slot="head">` — fixed SecurityError but components still blank

## What I learned
- Astro 4+ uses **constructable stylesheets and shadow DOM scoping** for `client:load` islands
- CSS variables resolve at usage time, so load order shouldn't matter — but CSS *selectors* with `.kc-taxonomy-tree` etc. should work globally
- The DOM and CSS are both correct — something is hiding the rendered content visually
- I never successfully rendered the page in a real browser to see what's happening

## Likely causes (in order of probability)
1. **Astro island shadow DOM** — styles inside shadow roots don't bleed out, but my CSS is in document.head which should be global
2. **CSS specificity / data-astro-cid-* attribute scoping** — Astro adds scoped class attributes that may not match my CSS
3. **Hydration error wiping SSR content** — if the React island fails to hydrate, the SSR HTML might be removed
4. **Parent container with overflow:hidden or display:none** — something in the layout chain hides the content
5. **z-index issue** — the content is there but behind another layer

## Files involved
- `src/pages/design-system/live.astro` — page with LivePreview components
- `src/components/LivePreview.tsx` — wraps each component with controls
- `src/components/componentStyles.ts` — exports `EMBER_CIRCUIT_COMPONENT_CSS` (51KB string)
- `public/ember-circuit-component.css` — same content, generated for testing
- `src/ports/react/knowledge/composites/TaxonomyTree.tsx` — React port (renders tree with kc-* classes)
- `src/ports/react/knowledge/composites/DialogueTree.tsx` — React port (renders dialogue with kc-* classes)

## CSS load order in served HTML
1. `/ember-circuit-component.css` (was — now inlined)
2. `/_astro/global.DlBSfW3F.css` (defines --color-* tokens)
3. `/_astro/live.CG76zWWs.css` (page-scoped styles for ec-live-preview-* classes)

## How to debug (recommended approach)
```bash
# 1. Take a screenshot to see what's actually visible
google-chrome --headless --disable-gpu --no-sandbox \
  --window-size=1600,4000 \
  --screenshot=/tmp/page.png \
  http://localhost:4321/design-system/live/

# 2. Get the full DOM structure
google-chrome --headless --dump-dom http://localhost:4321/design-system/live/ \
  | grep -A 20 'kc-taxonomy-tree'

# 3. Check for JS console errors
google-chrome --headless --enable-logging --v=1 \
  --dump-dom http://localhost:4321/design-system/live/ \
  2>&1 | grep -i "error"

# 4. Check what CSS rules are actually applying
google-chrome --headless --dump-dom http://localhost:4321/design-system/live/ \
  | grep -i 'astro-island\|shadow\|c-id'

# 5. Run a JS query against the live page
google-chrome --headless --virtual-time-budget=5000 \
  --run-all-compositor-stages-before-draw \
  --dump-dom 'data:text/html,<script>
    setTimeout(() => {
      document.title = JSON.stringify({
        taxonomyBox: document.querySelector(".kc-taxonomy-tree")?.getBoundingClientRect(),
        taxonomyStyle: getComputedStyle(document.querySelector(".kc-taxonomy-tree") || document.body).cssText.slice(0, 200)
      });
    }, 1000);
  </script>' 2>&1
```

## Possible fixes to try
1. **Use `is:global` on the style tag** to prevent Astro's scoped CSS
2. **Render the components OUTSIDE astro-island** — use `client:only` instead of `client:load`, or wrap in a non-island container
3. **Use inline `style={...}` on each component** instead of CSS classes (less elegant but guaranteed to work)
4. **Move the components to a separate non-React page** (just Astro components) — proves it's a React island issue
5. **Strip the `client:load` directive** — render the components purely server-side without hydration (loses interactivity but proves the styling works)

## Branch
`feature/landing-redesign` on both remotes, latest commit `340194c`.
