/**
 * gen-sitemap.mjs — the apex sitemap, projected from the built site.
 *
 * Walks dist/ after `astro build` and emits dist/sitemap.xml plus
 * dist/sitemap-index.xml. The index lists this room's sitemap and the
 * sibling rooms' sitemaps at their CURRENT origins; at C4 the stitch
 * rewrites them to apex paths from one constant. Nothing here is
 * hand-kept: the build is the source of truth.
 */
import { readdirSync, statSync, writeFileSync, readFileSync } from 'node:fs'
import { join, relative } from 'node:path'

const DIST = new URL('../dist/', import.meta.url).pathname
const ORIGIN = 'https://hearthandcode.dev'
const rooms = [
  'https://sacred.hearthandcode.dev/sitemap.xml',
  'https://palimpsest.hearthandcode.dev/sitemap.xml',
]

const urls = []
function walk(dir) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) { walk(p); continue }
    if (!e.name.endsWith('.html')) continue
    const s = readFileSync(p, 'utf8')
    if (/name="robots" content="[^"]*noindex/.test(s)) continue
    const rel = relative(DIST, p)
    const url = rel.endsWith('index.html')
      ? '/' + rel.slice(0, -'index.html'.length)
      : '/' + rel
    if (url === '/404/' || url === '/404.html') continue
    urls.push(url === '/' ? '/' : url)
  }
}
walk(DIST)
urls.sort()

const today = new Date().toISOString().slice(0, 10)
const sm = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls.map((u) => `  <url><loc>${ORIGIN}${u}</loc><lastmod>${today}</lastmod></url>`),
  '</urlset>', ''].join('\n')
writeFileSync(join(DIST, 'sitemap.xml'), sm)

const idx = ['<?xml version="1.0" encoding="UTF-8"?>',
  '<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  `  <sitemap><loc>${ORIGIN}/sitemap.xml</loc><lastmod>${today}</lastmod></sitemap>`,
  // sibling rooms at their current origins; C4 rewrites these to apex paths
  ...rooms.map((r) => `  <sitemap><loc>${r}</loc></sitemap>`),
  '</sitemapindex>', ''].join('\n')
writeFileSync(join(DIST, 'sitemap-index.xml'), idx)
console.log(`[sitemap] ${urls.length} apex urls + index with ${rooms.length} sibling rooms`)
