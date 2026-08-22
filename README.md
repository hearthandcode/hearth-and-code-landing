# hearthandcode.dev — landing page

Static Astro site for [Hearth & Code](https://hearthandcode.dev), Scott Rallya's independent practice in software, AI, and knowledge systems.

**Launch candidate branch:** `codex/hearth-code-orientation-layer`
**Public route set:** Orientation, Builder, Exocore, Workbench, Library, Atlas, Methods, and Return.

## Stack

Static-output [Astro](https://astro.build) with CSS-only interaction and no data, analytics, or external capability layer.

## Local preview

```bash
npm install --include=dev
npm run dev
# Astro prints the local URL, normally http://localhost:4321
```

### Full local review site

With the dev server running, open `/review/` on the local URL, normally:

```
http://localhost:4321/review/
```

This is the complete, no-index review console over the eight visitor routes. Additional `/review/*` pages preserve historical design proofs and comparison surfaces; they are not part of public navigation.

For a production-shaped local check:

```bash
npm run check
npm run build
npm run preview
```

## Cloudflare Pages

| Setting | Value |
|---------|-------|
| Repository | `hearthandcode/hearth-and-code-landing` |
| Framework | Astro static output |
| Build command | `npm run build` |
| Output directory | `dist` |
| Custom domain | `hearthandcode.dev` |

The established production project uses Git integration. A reviewed change reaches production through the configured production branch; do not mix that project with a new Direct Upload workflow.

## Structure

```
src/pages/index.astro       # public orientation route
src/components/HearthNavigation.astro # shared eight-room navigation
src/styles/tokens.css       # copied from the Hub-owned token source
src/styles/orientation-landing.css # shared Ember Circuit composition
astro.config.mjs            # static output configuration
wrangler.jsonc              # local Cloudflare asset configuration
```

## Legacy flame performance check

### In browser (no Playwright)

Open `index.html?profile=1` and watch the browser console for ~2s rolling logs:

```
[hearth flame] ~60 fps ~1.2 ms work/frame | 55 flames 22 embers 2 sparks | wind 0.31 | canvas 1280×336
```

Target: **≥55 fps**, **&lt;2.5 ms work/frame** (JS time per frame, not display refresh interval). Animation pauses when the tab is hidden. `prefers-reduced-motion` disables the canvas and keeps a static glow.

### Headless (Playwright) — Ubuntu 26.04

Playwright does not recognize Ubuntu 26 yet. Use the 24.04 binary override:

```bash
export PLAYWRIGHT_HOST_PLATFORM_OVERRIDE=ubuntu24.04-x64
npm run playwright:install
npm run profile:flame
```

Add the `export` line to `~/.zshrc` so installs keep working. Official support is tracked in [Playwright #40117](https://github.com/microsoft/playwright/issues/40117).

**Alternative (no Playwright):** `sudo apt install chromium` and use `?profile=1` in Firefox/Chromium manually.

## Content and source boundary

- The canonical visual token source is maintained in the private Hearth & Code Hub. This consumer copy has visual meaning only.
- Field Journal drafts remain in their separate repository and do not become public through this branch until their own publication gate is released.
- Historical Research, AI and Ethics, Lab, and Dossier proofs remain no-index under `/review/*`; their retired top-level routes are not part of the public route set.
- Do not add analytics, a newsletter funnel, a contact form, private Hub paths, runtime state, secrets, or raw session material to this repository.
