# hearthandcode.dev — landing page

Pre-launch landing for [Hearth & Code](https://hearthandcode.dev): waitlist via Substack embed, build-in-public links, flame animation.

**Live site:** [hearthandcode.dev](https://hearthandcode.dev)  
**Build log:** [hearthandcode.substack.com](https://hearthandcode.substack.com)

## Stack

Static HTML/CSS/JS — no build step. Deploy anywhere; [Cloudflare Pages](https://pages.cloudflare.com) recommended.

## Local preview

```bash
python3 -m http.server 8765
# open http://localhost:8765
```

## Cloudflare Pages

| Setting | Value |
|---------|-------|
| Repository | `hearthandcode/hearth-and-code-landing` |
| Framework | None |
| Build command | *(blank)* |
| Output directory | `/` |
| Custom domain | `hearthandcode.dev` |

## Structure

```
index.html          # entire site
legal/              # privacy + terms (add before paid products)
og.png              # 1200×630 social preview (optional)
```

## Flame performance check

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

## Adding build log posts

In `index.html`, duplicate a `<li>` inside `.build-log-list` (newest at top). The subscribe form links to Substack directly — no iframe (iframes often appear empty in local preview).

Source of truth for copy and brand tokens: `xanastros-hub` (`business/landing-page-spec.md`, `brand/`).
