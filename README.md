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

Source of truth for copy and brand tokens: `xanastros-hub` (`business/landing-page-spec.md`, `brand/`).
