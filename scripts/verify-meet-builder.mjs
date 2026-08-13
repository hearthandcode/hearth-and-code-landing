import { createHash } from 'node:crypto';
import { gzipSync } from 'node:zlib';
import { mkdir, readFile, readdir, stat } from 'node:fs/promises';
import { resolve, relative } from 'node:path';
import process from 'node:process';

const args = new Map();
for (let index = 2; index < process.argv.length; index += 1) {
  const key = process.argv[index];
  if (!key.startsWith('--')) continue;
  const value = process.argv[index + 1]?.startsWith('--') ? true : process.argv[++index] ?? true;
  args.set(key.slice(2), value);
}

const root = resolve(String(args.get('root') ?? process.cwd()));
const dist = resolve(root, String(args.get('dist') ?? 'dist'));
const baselineDist = args.has('baseline-dist') ? resolve(String(args.get('baseline-dist'))) : null;
const previewUrl = args.has('url') ? String(args.get('url')).replace(/\/$/, '') : null;
const chromiumExecutable = args.has('chromium-executable') ? String(args.get('chromium-executable')) : null;
const screenshotDir = args.has('screenshot-dir') ? resolve(String(args.get('screenshot-dir'))) : null;

const failures = [];
const observations = {};
const pass = (condition, message, detail = null) => {
  if (!condition) failures.push({ message, detail });
};

const expectedSourceHashes = {
  'src/data/meet-builder.ts': '31a794f8e386cb11020bc9ad2379253eac3e4e40da20b3f584bedc4d8e4de4de',
  'src/components/meet-builder/BuilderReturn.astro': 'ef551c35b765558ff2e649bde169fcaad3910ab2cc4fc1b67b81c39e2e9b2fc5',
  'src/components/meet-builder/CurrentSignal.astro': '314e8c883173a2f88bd570e729ee9161e953c0f36056a671c23075a30199a956',
  'src/components/meet-builder/KnowledgeAtlas.astro': 'ca10a189caad8e15dff44e8fd0b4f85e3822f4a3a4fbe953e30988c3c7a507ca',
  'src/components/meet-builder/KnowledgeLibrary.astro': 'f848e56d9210faf18e26d0c2495da1640788554549fa8803293225c22363733e',
  'src/components/meet-builder/PublicEvidence.astro': '1ff41918e135049dce37cf7c03d5c1601fa53ea054f4af0f92117f1cccf3fac0',
  'src/components/meet-builder/ResearchLab.astro': '8e9dd41e11d8361685d0619704f79cd4123d40c89801c122e81744e6528ebf3e',
  'src/components/meet-builder/ResearchLoop.astro': '976060913cf4b488cac5949cd36c71404b845a39f356da8feb9666dee5da1cb2',
  'src/components/meet-builder/ThresholdHero.astro': '95d8157910b59b7b57d137295490540e6b6facfc170809458ba82e34995392c5',
  'src/pages/review/index.astro': 'bcabea0404a471c8097885b7dffc1f59aa111f0caf15177cfd0253629634c403',
  'src/styles/meet-builder.css': '494e2cec4749bbab58a311b9602a14b62d08038eeb3926b6f088e0d3ae635c4f',
  'src/components/ReviewShell.astro': 'fed9909dfa2e21ad7ddccc14dce27323ac5de2501d49f2e102dfdcfb8229046d',
  'src/styles/review-site.css': 'c0095469c7105fcd70006cf4ae33a16f4f299a3dedbcd96a5d6690cbb5a5061a',
  'package.json': '083c9ac81dc10307a1bcd0755a569535825f0fc8cc21f0098cd27158192ea7b7',
  'astro.config.mjs': '4d45c541404368a73b0bb49ce7ac2f83a7c18f00389b54c72d85da17c2f1638d',
};

const moduleIds = [
  'orientation-signal',
  'practice-responsibility',
  'current-investigations',
  'tools-prototypes',
  'knowledge-library',
  'knowledge-atlas',
  'methods-evidence-maturity',
  'field-journal-builder-return',
];

const recordIds = [
  'practice-orientation',
  'workbench-pre-alpha',
  'context-forge-proof',
  'bounded-retrieval-proof',
  'knowledge-governance-pilot',
  'field-journal-system',
  'procedure-design-field-note',
  'landing-source-proof',
];

const renderedRecordIds = [
  'practice-orientation',
  'workbench-pre-alpha',
  'context-forge-proof',
  'bounded-retrieval-proof',
  'knowledge-governance-pilot',
  'procedure-design-field-note',
  'field-journal-system',
  'landing-source-proof',
];

const relationIds = [
  'rel-journal-contains-procedure-note',
  'rel-workbench-supports-practice',
  'rel-context-forge-supports-practice',
  'rel-retrieval-supports-practice',
  'rel-governance-informs-retrieval',
  'rel-field-note-documents-practice',
  'rel-landing-links-workbench',
];

const routes = [
  '/', '/research/', '/exocore/', '/ethics/', '/lab/', '/method/', '/dossier/', '/dossier-demo/',
  '/review/', '/review/research/', '/review/exocore/', '/review/ethics/', '/review/lab/',
  '/review/method/', '/review/dossier/', '/review/ai-policy/', '/review/ember-circuit/',
];

function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

async function read(relativePath, base = root) {
  return readFile(resolve(base, relativePath));
}

function text(bytes) {
  return bytes.toString('utf8');
}

function matches(source, expression) {
  return [...source.matchAll(expression)].map((match) => match[1]);
}

function decodeHtml(value) {
  return value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/\s+/g, ' ')
    .trim();
}

function contrast(hexA, hexB) {
  const luminance = (hex) => {
    const channels = [1, 3, 5].map((offset) => Number.parseInt(hex.slice(offset, offset + 2), 16) / 255);
    const linear = channels.map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
    return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
  };
  const [light, dark] = [luminance(hexA), luminance(hexB)].sort((a, b) => b - a);
  return (light + 0.05) / (dark + 0.05);
}

async function listFiles(directory) {
  const output = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const target = resolve(directory, entry.name);
    if (entry.isDirectory()) output.push(...await listFiles(target));
    else output.push(target);
  }
  return output;
}

async function verifySource() {
  for (const [path, expected] of Object.entries(expectedSourceHashes)) {
    const bytes = await read(path);
    pass(sha256(bytes) === expected, `Source digest drift: ${path}`, { expected, actual: sha256(bytes) });
  }

  const governedPaths = Object.keys(expectedSourceHashes).filter((path) => path.startsWith('src/'));
  const sources = await Promise.all(governedPaths.map(async (path) => [path, text(await read(path))]));
  const clientSources = sources.filter(([path]) => path !== 'src/data/meet-builder.ts');
  const combinedClient = clientSources.map(([, source]) => source).join('\n');
  const dataSource = text(await read('src/data/meet-builder.ts'));
  const pageSource = text(await read('src/pages/review/index.astro'));
  const meetCss = text(await read('src/styles/meet-builder.css'));
  const sharedCss = text(await read('src/styles/review-site.css'));
  const publicRecordSource = dataSource.slice(
    dataSource.indexOf('export const publicRecords'),
    dataSource.indexOf('export const relationRecords'),
  );
  const relationRecordSource = dataSource.slice(
    dataSource.indexOf('export const relationRecords'),
    dataSource.indexOf('const publicIdPattern'),
  );

  pass((dataSource.match(/publicTarget:\s*null/g) ?? []).length === 8, 'All eight publicTarget values must remain null');
  pass(!/publicTarget:\s*['"`]/.test(dataSource), 'No publicTarget may contain a destination');
  pass((publicRecordSource.match(/releaseState:\s*'candidate-only'/g) ?? []).length === 8, 'All eight records must remain candidate-only');
  pass((relationRecordSource.match(/releaseState:\s*'candidate-only'/g) ?? []).length === 7, 'All seven relations must remain candidate-only');
  pass((dataSource.match(/maturity:\s*'current'/g) ?? []).length === 2, 'Current maturity count must remain 2');
  pass((dataSource.match(/maturity:\s*'experimental'/g) ?? []).length === 4, 'Experimental maturity count must remain 4');
  pass((dataSource.match(/maturity:\s*'proposed'/g) ?? []).length === 1, 'Proposed maturity count must remain 1');
  pass((dataSource.match(/maturity:\s*'unknown'/g) ?? []).length === 1, 'Unknown maturity count must remain 1');
  pass(!/client:\w+|<script\b|astro-island/i.test(combinedClient), 'Homepage source must contain no client hydration or script output');
  pass(!/@import|url\s*\(/i.test(meetCss), 'Page-scoped CSS must add no import or URL request');
  pass((sharedCss.match(/@import\s+url\("https:\/\/fonts\.googleapis\.com/g) ?? []).length === 1, 'Shared CSS baseline font import changed unexpectedly');
  pass(!/https?:\/\//.test(pageSource), 'Homepage composition must add no remote URL');
  pass(pageSource.indexOf('<ThresholdHero />') < pageSource.indexOf('class="meet-contents"'), 'Orientation must precede local contents navigation');
  pass(pageSource.includes('data-ec-system="editorial-circuit"'), 'Editorial-circuit system binding missing');
  pass((combinedClient.match(/class="meet-circuit-rail"/g) ?? []).length === 8, 'Expected one decorative circuit rail per module');
  pass((combinedClient.match(/aria-hidden="true"/g) ?? []).length >= 8, 'Circuit rails must remain hidden from the accessibility tree');
  pass((combinedClient.match(/data-ec-module="0[1-8]"/g) ?? []).length === 8, 'Expected exact module hooks 01 through 08');
  for (const movement of ['orient', 'inspect', 'connect', 'return']) {
    pass((combinedClient.match(new RegExp(`data-ec-movement="${movement}"`, 'g')) ?? []).length === 2, `Expected two ${movement} module hooks`);
  }
  pass(dataSource.includes('emberCircuitModules') && dataSource.includes("'binary-editorial'" ) === false, 'Ember Circuit module registry missing');
  pass(meetCss.includes('--meet-space-8') && meetCss.includes('repeat(8, minmax(0, 1fr))'), 'Binary/editorial spacing or eight-column component scaffold missing');
  pass(meetCss.includes('border-radius: var(--meet-radius)'), 'Workshop-radius action geometry missing');

  const forbiddenClient = [
    '/home/cosmatrexis', '04-workspace--scriptorium', 'hub-intelligence', 'private_source',
    'EC-EV-', 'evidenceRef', 'publicTarget', 'BEGIN PRIVATE KEY', 'api_key',
  ];
  for (const term of forbiddenClient) pass(!combinedClient.includes(term), `Forbidden client-source term: ${term}`);
  pass(!/\bsk-[A-Za-z0-9_-]{12,}\b/.test(combinedClient), 'Credential-shaped sk- token found in client source');
  pass(!/\b(?:I|my|mine)\b/.test(combinedClient), 'Exact first-person wording requires separate authorship review');

  const expectedModuleOrder = moduleIds.map((id) => `'${id}'`);
  let cursor = -1;
  for (const token of expectedModuleOrder) {
    const position = dataSource.indexOf(token, cursor + 1);
    pass(position > cursor, `Module fragment missing or out of order: ${token}`);
    cursor = position;
  }

  const secretPattern = /(?:BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY|(?:api[_-]?key|secret|token)\s*[:=]\s*['"][^'"]{12,})/i;
  for (const [path, source] of sources) pass(!secretPattern.test(source), `Potential secret pattern in ${path}`);

  pass(contrast('#f2e7d5', '#1c1714') >= 4.5, 'Meet-builder text contrast below 4.5:1');
  pass(contrast('#b8a892', '#2a2320') >= 4.5, 'Meet-builder muted text contrast below 4.5:1');
  pass(contrast('#3fe0d0', '#1c1714') >= 3, 'Shared focus color contrast below 3:1');
  pass(contrast('#8f6d52', '#27201d') >= 3, 'Meaningful structural boundary contrast below 3:1');
}

function routeFile(route, base = dist) {
  return resolve(base, route === '/' ? 'index.html' : `${route.replace(/^\//, '')}index.html`);
}

async function verifyBuiltHtml() {
  const routeObservations = {};
  for (const route of routes) {
    const html = text(await readFile(routeFile(route)));
    const ids = matches(html, /\sid="([^"]+)"/g);
    const localTargets = matches(html, /href="#([^"]+)"/g);
    pass(new Set(ids).size === ids.length, `Duplicate ID in ${route}`);
    pass(localTargets.every((target) => ids.includes(target)), `Unresolved local fragment in ${route}`, localTargets.filter((target) => !ids.includes(target)));
    pass((html.match(/<main\b/g) ?? []).length === 1, `Expected one main in ${route}`);
    pass((html.match(/<h1\b/g) ?? []).length === 1, `Expected one h1 in ${route}`);
    routeObservations[route] = { bytes: Buffer.byteLength(html), gzip: gzipSync(html).byteLength, ids: ids.length };
  }

  for (const route of ['/', '/review/']) {
    const html = text(await readFile(routeFile(route)));
    const headingIds = matches(html, /<h2\s+id="([^"]+)"/g);
    pass(JSON.stringify(headingIds) === JSON.stringify(moduleIds), `Eight module h2s are missing or out of order in ${route}`, headingIds);
    pass((html.match(/<script\b/g) ?? []).length === 0, `Client script found in ${route}`);
    pass(html.indexOf('<h1') < html.indexOf('class="meet-contents"'), `Orientation h1 must precede contents navigation in ${route}`);

    const ids = matches(html, /\sid="([^"]+)"/g);
    for (const id of recordIds.map((value) => `record-${value}`)) pass(ids.includes(id), `Missing public record fragment ${id} in ${route}`);
    for (const id of relationIds.map((value) => `relation-${value.slice(4)}`)) pass(ids.includes(id), `Missing relation fragment ${id} in ${route}`);

    let recordCursor = -1;
    for (const id of renderedRecordIds) {
      const position = html.indexOf(`id="record-${id}"`, recordCursor + 1);
      pass(position > recordCursor, `Record h3 order mismatch for ${id} in ${route}`);
      recordCursor = position;
    }
    let relationCursor = -1;
    for (const id of relationIds) {
      const fragment = `relation-${id.slice(4)}`;
      const position = html.indexOf(`id="${fragment}"`, relationCursor + 1);
      pass(position > relationCursor, `Relation h3 order mismatch for ${id} in ${route}`);
      relationCursor = position;
    }

    const forbiddenOutput = ['/home/cosmatrexis', '04-workspace--scriptorium', 'EC-EV-', 'evidenceRef', 'publicTarget'];
    for (const term of forbiddenOutput) pass(!html.includes(term), `Forbidden built-output term in ${route}: ${term}`);
    pass(html.includes('Limitation') && html.includes('Does not establish') && html.includes('Contribution'), `Qualification fields missing in ${route}`);
    pass(html.includes('Source link held for review') && !html.includes('Inspect Workbench source</a>'), `Held actions must remain non-link status in ${route}`);
    pass(html.includes('Literal relationships among the same Library records.'), `Literal Atlas relation surface missing in ${route}`);
  }

  const publicHtml = text(await readFile(routeFile('/')));
  const reviewHtml = text(await readFile(routeFile('/review/')));
  pass(publicHtml.includes('<code>/method/#corrections</code>'), 'Public correction route prefix mismatch');
  pass(reviewHtml.includes('<code>/review/method/#corrections</code>'), 'Review correction route prefix mismatch');
  pass(publicHtml.includes('href="/dossier/"'), 'Public Dossier route mismatch');
  pass(reviewHtml.includes('href="/review/dossier/"'), 'Review Dossier route mismatch');
  observations.routes = routeObservations;
}

async function byteTotals(base) {
  const files = await listFiles(base);
  const totals = { html: 0, css: 0, font: 0, gzipHtml: 0, gzipCss: 0 };
  for (const file of files) {
    const bytes = await readFile(file);
    if (file.endsWith('.html')) { totals.html += bytes.length; totals.gzipHtml += gzipSync(bytes).length; }
    if (file.endsWith('.css')) { totals.css += bytes.length; totals.gzipCss += gzipSync(bytes).length; }
    if (/\.(?:woff2?|ttf|otf)$/i.test(file)) totals.font += bytes.length;
  }
  return totals;
}

async function verifyPerformanceDeltas() {
  const candidate = await byteTotals(dist);
  observations.bytes = { candidate };
  if (baselineDist) {
    const baseline = await byteTotals(baselineDist);
    observations.bytes.baseline = baseline;
    observations.bytes.delta = Object.fromEntries(Object.keys(candidate).map((key) => [key, candidate[key] - baseline[key]]));
  }
}

async function verifyBrowser() {
  if (!previewUrl) return;
  const { chromium } = await import('playwright');
  const browser = await chromium.launch({ headless: true, ...(chromiumExecutable ? { executablePath: chromiumExecutable } : {}) });
  const widths = [320, 390, 768, 1280, 1600];
  const browserRows = [];
  const consoleErrors = [];
  const origins = new Set();
  const blockedExternalRequests = [];
  let localRequestCount = 0;
  let blockedRequestCount = 0;
  const previewOrigin = new URL(previewUrl).origin;
  const routeOffline = async (routeRequest) => {
    const requestUrl = new URL(routeRequest.request().url());
    origins.add(requestUrl.origin);
    if (requestUrl.origin !== previewOrigin) {
      blockedRequestCount += 1;
      blockedExternalRequests.push(requestUrl.href);
      await routeRequest.abort('blockedbyclient');
    } else {
      localRequestCount += 1;
      await routeRequest.continue();
    }
  };
  if (screenshotDir) await mkdir(screenshotDir, { recursive: true });

  for (const route of ['/', '/review/']) {
    for (const width of widths) {
      const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      page.on('console', (message) => { if (message.type() === 'error') consoleErrors.push(`${route} ${width}: ${message.text()}`); });
      await page.route('**/*', routeOffline);
      await page.goto(`${previewUrl}${route}`, { waitUntil: 'networkidle' });
      const row = await page.evaluate(() => {
        const ids = [...document.querySelectorAll('[id]')].map((node) => node.id);
        const localTargets = [...document.querySelectorAll('a[href^="#"]')].map((node) => node.getAttribute('href').slice(1));
        const nav = [...document.querySelectorAll('.review-navigation a')];
        const primary = [...document.querySelectorAll('.meet-primary-actions a, .review-button.is-primary')];
        const interactive = [...document.querySelectorAll('a[href],button,input,select,textarea,summary,[tabindex]:not([tabindex="-1"])')];
        const panel = document.querySelector('.meet-practice-grid article');
        const parseRgb = (value) => value.match(/[\d.]+/g).slice(0, 3).map(Number);
        const luminance = (value) => {
          const channels = parseRgb(value).map((channel) => channel / 255).map((channel) => channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
          return 0.2126 * channels[0] + 0.7152 * channels[1] + 0.0722 * channels[2];
        };
        const ratio = (a, b) => {
          const [light, dark] = [luminance(a), luminance(b)].sort((left, right) => right - left);
          return (light + 0.05) / (dark + 0.05);
        };
        return {
          main: document.querySelectorAll('main').length,
          h1: document.querySelectorAll('h1').length,
          h2: document.querySelectorAll('.meet-builder h2').length,
          duplicateIds: ids.length - new Set(ids).size,
          unresolved: localTargets.filter((target) => !document.getElementById(target)).length,
          overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
          scripts: document.querySelectorAll('script').length,
          navTargetMin: nav.length ? Math.min(...nav.map((node) => Math.min(node.getBoundingClientRect().width, node.getBoundingClientRect().height))) : null,
          primaryTargetMin: primary.length ? Math.min(...primary.map((node) => Math.min(node.getBoundingClientRect().width, node.getBoundingClientRect().height))) : null,
          allTargetMin: interactive.length ? Math.min(...interactive.map((node) => Math.min(node.getBoundingClientRect().width, node.getBoundingClientRect().height))) : null,
          structuralContrast: panel ? ratio(getComputedStyle(panel).borderTopColor, getComputedStyle(panel).backgroundColor) : null,
          meaningfulFirstPaint: Boolean(document.querySelector('h1')?.getBoundingClientRect().height && document.querySelector('.meet-lead')?.getBoundingClientRect().height),
        };
      });
      pass(row.main === 1 && row.h1 === 1 && row.h2 === 8, `Browser landmark/heading mismatch ${route} ${width}`, row);
      pass(row.duplicateIds === 0 && row.unresolved === 0, `Browser fragment mismatch ${route} ${width}`, row);
      pass(row.overflow <= 0 && row.scripts === 0, `Browser overflow/script mismatch ${route} ${width}`, row);
      pass(row.navTargetMin === null || row.navTargetMin >= 24, `Navigation target below 24px ${route} ${width}`, row);
      pass(row.primaryTargetMin === null || row.primaryTargetMin >= 44, `Primary target below 44px ${route} ${width}`, row);
      pass(row.allTargetMin === null || row.allTargetMin >= 24, `Interactive target below 24px ${route} ${width}`, row);
      pass(row.structuralContrast === null || row.structuralContrast >= 3, `Computed structural boundary contrast below 3:1 ${route} ${width}`, row);
      pass(row.meaningfulFirstPaint, `Meaningful first paint missing ${route} ${width}`, row);
      browserRows.push({ route, width, ...row });
      if (screenshotDir && route === '/review/') await page.screenshot({ path: resolve(screenshotDir, `review-${width}.png`), fullPage: true });
      await page.close();
    }
  }

  const modes = ['text200', 'reflow400', 'spacing', 'long-token', 'no-image', 'fallback-font', 'forced'];
  for (const mode of modes) {
    const page = await browser.newPage({ javaScriptEnabled: false, viewport: { width: mode === 'reflow400' ? 1280 : 320, height: 900 }, forcedColors: mode === 'forced' ? 'active' : 'none', reducedMotion: 'reduce' });
    await page.route('**/*', routeOffline);
    await page.goto(`${previewUrl}/review/`, { waitUntil: 'networkidle' });
    if (mode === 'text200') await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    if (mode === 'reflow400') await page.evaluate(() => { document.documentElement.style.zoom = '4'; });
    if (mode === 'spacing') await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = '*{line-height:1.5!important;letter-spacing:.12em!important;word-spacing:.16em!important}p{margin-bottom:2em!important}';
      document.head.append(style);
    });
    if (mode === 'long-token') await page.evaluate(() => { document.querySelector('.meet-lead').append(` ${'long-token-'.repeat(20)}`); });
    if (mode === 'no-image') await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = '*{background-image:none!important}img,svg,picture{visibility:hidden!important}';
      document.head.append(style);
    });
    if (mode === 'fallback-font') await page.evaluate(() => {
      const style = document.createElement('style');
      style.textContent = '*{font-family:Georgia,serif!important}code,dt,.meet-kicker{font-family:monospace!important}';
      document.head.append(style);
    });
    const row = await page.evaluate(() => {
      const decorative = [
        ['.meet-module', '::after'], ['.meet-circuit-rail', null], ['.meet-practice-grid article', '::before'],
        ['.meet-practice-grid article', '::after'], ['.meet-card-grid article', '::before'], ['.meet-card-grid article', '::after'],
        ['.meet-return-grid > section', '::before'], ['.meet-return-grid > section', '::after'], ['.meet-record', '::before'],
        ['.meet-record', '::after'], ['.meet-summary-list', '::before'], ['.meet-summary-list > li', '::before'],
        ['.meet-relation-list', '::before'], ['.meet-relation-list > li', '::before'], ['.meet-method-loop li', '::after'],
      ];
      return {
        overflow: document.documentElement.scrollWidth - document.documentElement.clientWidth,
        ambient: getComputedStyle(document.querySelector('.review-ambient')).display,
        forcedDecorationsVisible: decorative.filter(([selector, pseudo]) => [...document.querySelectorAll(selector)].some((node) => getComputedStyle(node, pseudo).display !== 'none')).map(([selector, pseudo]) => `${selector}${pseudo ?? ''}`),
        animated: [...document.querySelectorAll('*')].filter((node) => getComputedStyle(node).animationName !== 'none' || Number.parseFloat(getComputedStyle(node).transitionDuration) > 0).length,
      };
    });
    pass(row.overflow <= 0, `${mode} overflow`, row);
    pass(row.animated === 0, `${mode} motion remains`, row);
    if (mode === 'forced') {
      pass(row.ambient === 'none', 'Forced colors must remove ambient decoration', row);
      pass(row.forcedDecorationsVisible.length === 0, 'Forced colors must remove every decorative circuit element', row);
    }
    browserRows.push({ route: '/review/', mode, ...row });
    await page.close();
  }

  const keyboard = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 390, height: 900 } });
  await keyboard.route('**/*', routeOffline);
  await keyboard.goto(`${previewUrl}/review/`, { waitUntil: 'networkidle' });
  const focusRows = [];
  for (let count = 0; count < 12; count += 1) {
    await keyboard.keyboard.press('Tab');
    focusRows.push(await keyboard.evaluate(() => ({
      text: document.activeElement.textContent.trim().replace(/\s+/g, ' ').slice(0, 60),
      href: document.activeElement.getAttribute('href'),
      outline: getComputedStyle(document.activeElement).outlineStyle,
    })));
  }
  pass(focusRows[0]?.href === '#main-content', 'Skip link must be first keyboard target', focusRows[0]);
  pass(focusRows.every((row) => row.outline !== 'none'), 'Keyboard focus indicator missing', focusRows);
  for (let count = 0; count < 4; count += 1) await keyboard.keyboard.press('Shift+Tab');
  const reverse = await keyboard.evaluate(() => ({ text: document.activeElement.textContent.trim(), outline: getComputedStyle(document.activeElement).outlineStyle }));
  pass(reverse.outline !== 'none', 'Reverse keyboard focus indicator missing', reverse);
  await keyboard.close();

  const accessibilityPage = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
  await accessibilityPage.route('**/*', routeOffline);
  await accessibilityPage.goto(`${previewUrl}/review/`, { waitUntil: 'networkidle' });
  const accessibilityTree = await accessibilityPage.locator('body').ariaSnapshot();
  pass(accessibilityTree.includes('heading "Exploring a candidate') && accessibilityTree.includes('link "Explore current research"'), 'Accessibility tree is missing the primary heading or reading path');
  pass(!accessibilityTree.includes('return-loop"'), 'Decorative circuit labels leaked into the accessibility tree');
  pass(!accessibilityTree.includes('Questions → Proofs') && !accessibilityTree.includes('Proofs → Records'), 'Decorative method-loop connector leaked into the accessibility tree');
  observations.accessibilityTree = accessibilityTree;
  await accessibilityPage.close();

  const performancePage = await browser.newPage({ javaScriptEnabled: true, viewport: { width: 1280, height: 900 } });
  await performancePage.addInitScript(() => {
    window.__lrMetrics = { cls: 0, lcp: null };
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__lrMetrics.cls += entry.value;
      }
    }).observe({ type: 'layout-shift', buffered: true });
    new PerformanceObserver((list) => {
      window.__lrMetrics.lcp = list.getEntries().at(-1)?.startTime ?? window.__lrMetrics.lcp;
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  });
  await performancePage.route('**/*', routeOffline);
  await performancePage.goto(`${previewUrl}/review/`, { waitUntil: 'networkidle' });
  await performancePage.waitForLoadState('networkidle');
  const performanceObservation = await performancePage.evaluate(() => {
    const paints = Object.fromEntries(window.performance.getEntriesByType('paint').map((entry) => [entry.name, entry.startTime]));
    return {
      cls: window.__lrMetrics.cls,
      lcp: window.__lrMetrics.lcp,
      paints,
      navigation: window.performance.getEntriesByType('navigation')[0]?.duration ?? null,
    };
  });
  pass(performanceObservation.cls <= 0.1, 'Observed local CLS exceeds 0.1', performanceObservation);
  pass(performanceObservation.lcp !== null && performanceObservation.paints['first-contentful-paint'] !== undefined, 'Local LCP/FCP measurement missing', performanceObservation);
  await performancePage.close();
  await browser.close();

  observations.browser = browserRows;
  observations.keyboard = { forward: focusRows, reverse };
  observations.networkOrigins = [...origins].sort();
  observations.blockedExternalRequests = [...new Set(blockedExternalRequests)].sort();
  observations.requestCounts = { local: localRequestCount, blocked: blockedRequestCount, total: localRequestCount + blockedRequestCount };
  const expectedBlockedRequestDiagnostics = consoleErrors.filter((message) => message.includes('ERR_BLOCKED_BY_CLIENT'));
  const unexpectedConsoleErrors = consoleErrors.filter((message) => !message.includes('ERR_BLOCKED_BY_CLIENT'));
  observations.consoleErrors = unexpectedConsoleErrors;
  observations.expectedBlockedRequestDiagnostics = expectedBlockedRequestDiagnostics;
  observations.performance = performanceObservation;
  pass(unexpectedConsoleErrors.length === 0, 'Unexpected browser console errors observed', unexpectedConsoleErrors);
  const unexpectedBlocked = observations.blockedExternalRequests.filter((url) => !url.startsWith('https://fonts.googleapis.com/') && !url.startsWith('https://fonts.gstatic.com/'));
  pass(unexpectedBlocked.length === 0, 'Unexpected external request attempted', unexpectedBlocked);
}

await verifySource();
await verifyBuiltHtml();
await verifyPerformanceDeltas();
await verifyBrowser();

const result = {
  status: failures.length === 0 ? 'pass' : 'fail',
  root,
  dist,
  baselineDist,
  previewUrl,
  assertionsFailed: failures.length,
  failures,
  observations,
};

process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
process.exitCode = failures.length === 0 ? 0 : 1;
