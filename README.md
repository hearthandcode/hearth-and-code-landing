# hearthandcode.dev — landing page

Branch-local Astro redesign proof for [Hearth & Code](https://hearthandcode.dev). It is a local review surface, not a deployment or publication release.

**Redesign branch:** `feat/public-web-ecosystem-redesign`
**Production boundary:** the deployed site remains unchanged until a separate reviewed release decision.

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

This is the complete, review-only Hearth & Code site composition. It includes the Hearth, Research, Exocore, Field Journal doorway, AI & Ethics, Lab, Method, and Evidence Dossier routes. The Dossier uses a person-led field-file treatment with selected public artifacts, while retaining the separate source, privacy, and exact-copy review gates.

The review site is not an approved production route or release authorization and must not be deployed until those gates are released.

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

## Structure

```
src/pages/index.astro       # local redesign proof
src/styles/tokens.css       # copied from the Hub-owned token source
src/styles/global.css       # landing-specific composition and grid treatment
astro.config.mjs            # static output configuration
wrangler.jsonc              # future static asset directory: dist/
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
- AI Philosophy and Ethics, Lab, and Dossier copy must come from reviewed public-evidence records. The local proof uses explicit availability states rather than unpublished claims.
- Do not add analytics, a newsletter funnel, a contact form, private Hub paths, runtime state, secrets, or raw session material to this repository.
