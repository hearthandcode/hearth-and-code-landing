import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import test from 'node:test';
import { chromium } from 'playwright';

const origin = process.env.STUDIO_PREVIEW_ORIGIN ?? 'http://127.0.0.1:4321';

test('every generated page keeps large reading surfaces inside the Ember Circuit dark field', async () => {
  const files = (await readdir(new URL('../dist/', import.meta.url), { recursive: true }))
    .filter((file) => file === 'index.html' || file === '404.html' || file.endsWith('/index.html'));
  const routes = files.map((file) => file === 'index.html' ? '/' : file === '404.html' ? '/__missing__' : `/${file.slice(0, -'index.html'.length)}`);
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      const lightSurfaces = await page.evaluate(() => [...document.querySelectorAll('body, main, section, article, aside, footer')].flatMap((element) => {
        const rect = element.getBoundingClientRect();
        const color = getComputedStyle(element).backgroundColor;
        const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
        if (!match || rect.width * rect.height < 25_000) return [];
        const alpha = match[4] === undefined ? 1 : Number(match[4]);
        const luminance = (Number(match[1]) + Number(match[2]) + Number(match[3])) / 3;
        return alpha >= .9 && luminance > 170 ? [{ tag: element.tagName.toLowerCase(), className: String(element.className), color }] : [];
      }));
      assert.deepEqual(lightSurfaces, [], `${route} has no large opaque white or cream surface`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('the studio landing is usable at desktop and mobile widths', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      const externalRequests = [];
      page.on('request', (request) => {
        if (new URL(request.url()).origin !== origin) externalRequests.push(request.url());
      });
      await page.goto(origin, { waitUntil: 'networkidle' });

      assert.equal(await page.title(), 'Hearth & Code · Independent Research Studio');
      assert.equal(await page.locator('h1').innerText(), 'I build systems that can explain themselves—and leave a way back.');
      assert.equal(await page.locator('main').count(), 1);
      assert.equal(await page.locator('form').count(), 0);
      assert.equal(await page.locator('.studio-room').count(), 6);
      assert.equal(await page.locator('.studio-archetype li').count(), 8);
      assert.equal(await page.locator('.studio-archive__item').count(), 8);
      assert.equal(await page.locator('a[href="/portfolio/"]').count() >= 1, true);
      for (const selector of ['.studio-archetype', '.studio-index', '.studio-publications', '.studio-portfolio', '.studio-principles']) {
        assert.equal(
          await page.locator(selector).evaluate((element) => getComputedStyle(element).color),
          'rgb(241, 231, 210)',
          `${selector} keeps warm paper text on its charcoal surface`,
        );
      }
      for (const selector of ['.studio-threshold', '.studio-archive', '.studio-methods', '.studio-invitation']) {
        assert.equal(
          await page.locator(selector).evaluate((element) => getComputedStyle(element).color),
          'rgb(241, 231, 210)',
          `${selector} keeps parchment text on its dark surface`,
        );
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
      assert.deepEqual(externalRequests, []);

      if (viewport.width === 390) await page.screenshot({ path: '/tmp/hearth-code-studio-mobile.png', fullPage: true });
    }
  } finally {
    await browser.close();
  }
});

test('the portfolio route separates six bodies of work from eight product candidates', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      const externalRequests = [];
      page.on('request', (request) => {
        if (new URL(request.url()).origin !== origin) externalRequests.push(request.url());
      });
      await page.goto(`${origin}/portfolio/`, { waitUntil: 'networkidle' });

      assert.equal(await page.title(), 'Portfolio · Hearth & Code');
      assert.equal(await page.locator('.studio-room-work-grid article').count(), 6);
      assert.equal(await page.locator('.product-horizon li').count(), 8);
      assert.equal(await page.getByText('Review required · not active').count(), 8);
      assert.equal(await page.locator('a[href="/dossier/"]').count() >= 1, true);
      const horizonLayout = await page.locator('.product-horizon ol').evaluate((element) => {
        const style = getComputedStyle(element);
        return { display: style.display, columns: style.gridTemplateColumns.split(' ').length, listStyle: style.listStyleType };
      });
      assert.equal(horizonLayout.display, 'grid');
      assert.equal(horizonLayout.listStyle, 'none');
      assert.equal(horizonLayout.columns, viewport.width === 1440 ? 4 : 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
      assert.deepEqual(externalRequests, []);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('programs and workbench expose a usable technical reading surface', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of ['/programs/', '/workbench/']) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });

      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.locator('.studio-room-locator').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);

      if (route === '/programs/') assert.equal(await page.locator('.technical-report-shelf li').count(), 6);
      if (route === '/workbench/') assert.equal(await page.locator('.studio-room-runtime li').count(), 4);
    }
  } finally {
    await browser.close();
  }
});

test('every primary Research Studio subpage keeps its heading and mobile boundary', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const routes = ['/questions/', '/portfolio/', '/programs/', '/methods/', '/notes/', '/evidence/', '/dossier/', '/correspondence/', '/workbench/'];
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.locator('h1').count(), 1, `${route} has one primary heading`);
      assert.equal(await page.locator('.studio-room-body').count(), 1, `${route} uses the Studio body`);
      assert.equal(await page.locator('.studio-room-threshold').count(), 1, `${route} has its Studio threshold`);
      assert.equal(await page.locator('.studio-room-locator').count(), 1, `${route} has its room index`);
      assert.equal(await page.locator('.studio-room-footer').count(), 1, `${route} has its Studio footer`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${route} does not overflow`);
      await page.close();
    }

    const notFound = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await notFound.goto(`${origin}/a-route-that-does-not-exist/`, { waitUntil: 'domcontentloaded' });
    assert.equal(await notFound.locator('h1').innerText(), 'This route has gone cold.');
    assert.equal(await notFound.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  } finally {
    await browser.close();
  }
});

test('every Questions room-index fragment resolves to visible content', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      await page.goto(`${origin}/questions/`, { waitUntil: 'domcontentloaded' });

      const fragments = await page.locator('.studio-room-locator a[href^="#"]').evaluateAll((links) =>
        links.map((link) => link.getAttribute('href')),
      );
      assert.deepEqual(fragments, ['#question-ledger', '#tension-title', '#question-anatomy']);
      for (const fragment of fragments) {
        assert.equal(await page.locator(fragment).count(), 1, `${fragment} resolves to one destination`);
      }
      assert.equal(await page.locator('.studio-room-question-guide li').count(), 4);
      assert.equal(await page.locator('.studio-room-question-example').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('all deep collections are visible in document order', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const expected = new Map([
      ['/methods/', 34],
      ['/programs/', 32],
      ['/notes/', 12],
      ['/evidence/', 16],
    ]);
    for (const [route, count] of expected) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      const collectionItems = route === '/methods/' ? page.locator('.ec-method-summary') : page.locator('.research-collection-grid > li');
      assert.equal(await collectionItems.count(), count, `${route} exposes its complete collection`);
      assert.equal(await page.locator('.research-collection-set[hidden]').count(), 0, `${route} has no hidden collection`);
      await page.close();
    }

    const programs = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await programs.goto(`${origin}/programs/`, { waitUntil: 'domcontentloaded' });
    assert.equal(await programs.locator('.program-dossier__panel').count(), 3);
    assert.equal(await programs.locator('.program-dossier__panel[hidden]').count(), 0);
  } finally {
    await browser.close();
  }
});

test('both long-form article families use the Ember Circuit reading surface', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of ['/journal/the-hearthside-meta-architect/', '/notes/prompting-as-interface-design/']) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.locator('h1').count(), 1, `${route} has one primary heading`);
      assert.equal(await page.locator('.studio-article-body').count(), 1, `${route} uses the article body`);
      assert.equal(await page.locator('.studio-article-reading-field').count(), 1, `${route} uses the paper reading field`);
      const readingColors = await page.locator('.studio-article-reading-field').evaluate((element) => {
        const body = element.querySelector('.journal-article__body, .reading-article__body');
        const paragraph = body?.querySelector('p:last-of-type');
        return {
          background: getComputedStyle(element).backgroundColor,
          heading: body?.querySelector('h2') ? getComputedStyle(body.querySelector('h2')).color : '',
          paragraph: paragraph ? getComputedStyle(paragraph).color : '',
        };
      });
      assert.equal(readingColors.background, 'rgb(33, 29, 24)', `${route} uses a charcoal reading field`);
      assert.equal(readingColors.heading, 'rgb(241, 231, 210)', `${route} uses warm high-contrast headings`);
      assert.ok(['rgb(207, 193, 171)', 'rgb(241, 231, 210)'].includes(readingColors.paragraph), `${route} uses readable body text`);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${route} does not overflow`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('representative React method summaries open distinct full method sheets', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const examples = ['m-01', 'm-10', 'm-19', 'm-28', 'm-33', 'm-34'];
    const promptBodies = [];
    for (const id of examples) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}/methods/#${id}`, { waitUntil: 'networkidle' });
      const card = page.locator(`#${id}.ec-method-summary`);
      assert.equal(await card.count(), 1);
      const tile = await card.locator('button').evaluate((element) => {
        const style = getComputedStyle(element);
        const grid = element.closest('.ec-method-summary-grid');
        return { border: style.borderTopWidth, radius: style.borderRadius, gap: grid ? getComputedStyle(grid).columnGap : '0px' };
      });
      assert.notEqual(tile.border, '0px');
      assert.notEqual(tile.radius, '0px');
      assert.ok(Number.parseFloat(tile.gap) >= 12);
      await card.locator('button').click();
      const sheet = page.locator('.ec-method-sheet[open]');
      assert.equal(await sheet.count(), 1);
      assert.equal(await sheet.getByRole('heading', { name: /When I use it/i }).count(), 1);
      assert.equal(await sheet.getByRole('heading', { name: /What it makes possible/i }).count(), 1);
      assert.equal(await sheet.getByRole('heading', { name: /Costs and cautions/i }).count(), 1);
      assert.equal(await sheet.getByRole('heading', { name: /A worked model response/i }).count(), 1);
      assert.equal((await sheet.locator('.ec-method-sheet__output pre').innerText()).trim().length > 180, true);
      assert.equal(await sheet.getByLabel('Harness evaluation').count(), 1);
      const evaluationText = await sheet.getByLabel('Harness evaluation').innerText();
      if (id === 'm-34') {
        assert.match(evaluationText, /clarified[\s\S]*reevaluation pending[\s\S]*pending/i);
      } else {
        assert.match(evaluationText, /pass[\s\S]*(8|9|10)\/10/i);
      }
      const prompt = await sheet.locator('.ec-method-sheet__prompt pre').innerText();
      promptBodies.push(prompt);
      for (const framework of ['TCCP', 'EKRP', 'MINC', 'Sigil']) {
        assert.match(prompt, new RegExp(`\\b${framework}\\b`, 'i'));
      }
      await page.close();
    }
    assert.equal(new Set(promptBodies).size, examples.length);
    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await mobile.goto(`${origin}/methods/#m-01`, { waitUntil: 'networkidle' });
    const columns = await mobile.locator('.ec-method-summary-grid').first().evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
    assert.equal(columns, 1);
    assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await mobile.close();
  } finally {
    await browser.close();
  }
});

test('the Research Library stays focused on articles, essays, and Methods', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      const externalRequests = [];
      page.on('request', (request) => { if (new URL(request.url()).origin !== origin) externalRequests.push(request.url()); });
      await page.goto(`${origin}/library/`, { waitUntil: 'networkidle' });
      assert.equal(await page.title(), 'Research Library · Hearth & Code');
      assert.equal(await page.locator('[role="tab"]').count(), 2);
      assert.equal(await page.getByRole('tab', { name: /Articles & essays/ }).count(), 1);
      assert.equal(await page.locator('.ec-library-threshold aside').count(), 0);
      assert.doesNotMatch(await page.locator('main').innerText(), /React primitives|diagram engines|design system|Atlas \/ Typed relations|Evidence \/ Claim grammar|Systems \/ Workflow/i);

      await page.getByRole('tab', { name: /Methods/ }).click();
      assert.equal(await page.locator('.ec-library-panel:not([hidden]) .ec-method-summary').count(), 34);
      await page.getByRole('searchbox').fill('literal');
      assert.equal(await page.locator('.ec-library-panel:not([hidden]) .ec-method-summary').count() >= 1, true);
      await page.getByRole('searchbox').fill('');
      assert.equal(await page.getByRole('tab', { name: /Atlas|Evidence|Systems/ }).count(), 0);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
      assert.deepEqual(externalRequests, []);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('the Hearthside Meta-Architect dossier keeps readable ink on every surface', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/dossier/`, { waitUntil: 'networkidle' });
    const expected = new Map([
      ['.dossier-sheet__masthead h2', 'rgb(241, 231, 210)'],
      ['.dossier-sheet__masthead > div > p:last-child', 'rgb(207, 193, 171)'],
      ['.dossier-sheet__masthead aside strong', 'rgb(241, 231, 210)'],
      ['.dossier-identity strong', 'rgb(241, 231, 210)'],
      ['.dossier-identity span', 'rgb(207, 193, 171)'],
      ['.dossier-sheet__guide h3', 'rgb(241, 231, 210)'],
      ['.dossier-chapter h4', 'rgb(241, 231, 210)'],
      ['.dossier-chapter li > p', 'rgb(207, 193, 171)'],
    ]);
    for (const [selector, color] of expected) {
      assert.equal(await page.locator(selector).first().evaluate((element) => getComputedStyle(element).color), color, `${selector} has the intended readable foreground`);
    }
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  } finally {
    await browser.close();
  }
});

test('the Notes ledger and expanded reading surfaces retain readable Ember Circuit contrast', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      await page.goto(`${origin}/notes/#field-journal`, { waitUntil: 'networkidle' });
      const expected = new Map([
        ['.field-journal-latest__header > div:last-child > p', 'rgb(207, 193, 171)'],
        ['.field-journal-latest__actions button', 'rgb(196, 181, 253)'],
        ['.field-journal-latest__meta', 'rgb(207, 193, 171)'],
        ['.field-journal-latest ul li', 'rgb(212, 171, 99)'],
        ['.field-journal-archive h3', 'rgb(241, 231, 210)'],
        ['.field-journal-archive header > p:last-child', 'rgb(207, 193, 171)'],
        ['.field-journal-archive__scroll button', 'rgb(241, 231, 210)'],
      ]);
      for (const [selector, color] of expected) {
        assert.equal(await page.locator(selector).first().evaluate((element) => getComputedStyle(element).color), color, `${selector} has its readable foreground`);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
      await page.close();
    }

    const journal = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    await journal.goto(`${origin}/journal/the-hearthside-meta-architect/`, { waitUntil: 'networkidle' });
    assert.equal(await journal.locator('.hearthside-field-expansion').count(), 1);
    assert.equal(await journal.locator('.hearthside-field-expansion > section').count(), 3);
    assert.match(await journal.locator('.hearthside-field-expansion').innerText(), /private-to-public projection/i);
    assert.equal(await journal.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);

    const studioArticle = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    await studioArticle.goto(`${origin}/notes/prompting-as-interface-design/`, { waitUntil: 'networkidle' });
    assert.ok(await studioArticle.locator('.reading-article__body > section').count() >= 9);
    assert.equal(await studioArticle.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  } finally {
    await browser.close();
  }
});
