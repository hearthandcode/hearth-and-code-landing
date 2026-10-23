import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import test from 'node:test';
import { chromium } from 'playwright';

const origin = process.env.STUDIO_PREVIEW_ORIGIN ?? 'http://127.0.0.1:4321';
const distDirectory = process.env.STUDIO_DIST_DIR ?? new URL('../dist/', import.meta.url);

test('every generated page keeps large reading surfaces inside the Ember Circuit dark field', async () => {
  const files = (await readdir(distDirectory, { recursive: true }))
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

test('the Hearth and Code landing serves its audience paths without responsive overflow', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [
      { width: 1440, height: 900 },
      { width: 390, height: 844 },
      { width: 320, height: 740 },
    ]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      const externalRequests = [];
      page.on('request', (request) => {
        if (new URL(request.url()).origin !== origin) externalRequests.push(request.url());
      });
      await page.goto(origin, { waitUntil: 'networkidle' });

      assert.equal(await page.title(), 'Hearth & Code — Independent Research Studio');
      assert.equal(await page.locator('h1').innerText(), 'Answerable systems for consequential work.');
      assert.equal(await page.locator('main').count(), 1);
      assert.equal(await page.locator('form').count(), 0);
      for (const [href, name] of [
        ['/workbench/', 'For Agentic Engineers'],
        ['/research/', 'For Agentic Researchers'],
        ['/philosophy/ai-literacy/', 'AI Literacy & public reasoning'],
      ]) {
        assert.ok(await page.locator(`a[href="${href}"]`).getByText(name).count() >= 1, `${name} route is visible`);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${viewport.width}px landing has no horizontal overflow`);
      const headingBounds = await page.locator('h1').evaluate((element) => {
        const rect = element.getBoundingClientRect();
        return { left: rect.left, right: rect.right, scrollWidth: element.scrollWidth, clientWidth: element.clientWidth };
      });
      assert.ok(headingBounds.left >= 0 && headingBounds.right <= viewport.width, `${viewport.width}px hero heading stays in viewport`);
      assert.ok(headingBounds.scrollWidth <= headingBounds.clientWidth + 1, `${viewport.width}px hero heading does not overflow its box`);
      assert.deepEqual(externalRequests, []);

      if (viewport.width === 320 || viewport.width === 390) {
        await page.screenshot({ path: `/tmp/hearth-code-landing-${viewport.width}.png`, fullPage: true });
      }

      const hearth = page.getByRole('button', { name: /Hearth/ });
      const code = page.getByRole('button', { name: /Code/ });
      const both = page.getByRole('button', { name: /Both/ });
      await hearth.click();
      assert.equal(await hearth.getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-studio-root]').getAttribute('data-studio-view'), 'hearth');
      assert.equal(await page.locator('#view-panel-title').innerText(), 'Hearthside Meta-Architect: a working name.');
      assert.deepEqual(await page.locator('#nav-grid .studio-map__item:visible h3').allInnerTexts(), ['Philosophy', 'Dossier', 'Contact']);
      assert.equal(await page.locator('#orientation-route-1').getAttribute('href'), '/philosophy/');
      await code.click();
      assert.equal(await code.getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-studio-root]').getAttribute('data-studio-view'), 'code');
      assert.equal(await page.locator('#view-panel-title').innerText(), 'Methods and systems first.');
      assert.deepEqual(await page.locator('#nav-grid .studio-map__item:visible h3').allInnerTexts(), ['Methods', 'Research', 'Questions', 'Field Journal']);
      assert.equal(await page.locator('#orientation-route-1').getAttribute('href'), '/methods/');
      await both.click();
      assert.equal(await both.getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('[data-studio-root]').getAttribute('data-studio-view'), 'balanced');
      assert.equal(await page.locator('#nav-grid .studio-map__item:visible').count(), 8);
      await page.reload({ waitUntil: 'networkidle' });
      assert.equal(await page.getByRole('button', { name: /Both/ }).getAttribute('aria-pressed'), 'true', 'saved selection returns with synchronized button state');
      assert.equal(await page.locator('#view-panel-title').innerText(), 'The full studio, in one view.');
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('the main audience journeys expose coherent landmarks, headings, IDs, and named controls', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of [
      '/', '/methods/', '/research/', '/workbench/', '/philosophy/ai-literacy/', '/philosophy/',
      '/hcan/',
      '/journal/', '/portfolio/', '/dossier/', '/questions/', '/correspondence/',
      '/programs/', '/notes/', '/evidence/', '/gallery/',
    ]) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      const audit = await page.evaluate(() => {
        const visible = (element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== 'none' && style.visibility !== 'hidden' && rect.width > 0 && rect.height > 0;
        };
        const duplicateIds = [...document.querySelectorAll('[id]')].map((element) => element.id)
          .filter((id, index, all) => all.indexOf(id) !== index);
        const brokenAriaReferences = [...document.querySelectorAll('[aria-labelledby],[aria-describedby]')]
          .flatMap((element) => ['aria-labelledby', 'aria-describedby'].flatMap((attribute) => {
            const value = element.getAttribute(attribute);
            if (!value) return [];
            return value.trim().split(/\s+/).filter((id) => !document.getElementById(id))
              .map((id) => `${element.tagName.toLowerCase()}[${attribute}=${value}] -> #${id}`);
          }));
        const unnamed = [...document.querySelectorAll('a, button, input, select, textarea')]
          .filter(visible)
          .filter((element) => {
            if (element.matches('input[type="hidden"]')) return false;
            const name = element.getAttribute('aria-label') || element.getAttribute('aria-labelledby') ||
              element.getAttribute('title') || element.textContent || element.getAttribute('alt') || '';
            if (name.trim()) return false;
            if (element.matches('input,select,textarea') && (element.closest('label') || (element.id && document.querySelector(`label[for="${CSS.escape(element.id)}"]`)))) return false;
            return true;
          })
          .map((element) => `${element.tagName.toLowerCase()}.${String(element.className).replaceAll(' ', '.')}`);
        const imagesWithoutAlt = [...document.images].filter((image) => !image.hasAttribute('alt')).map((image) => image.currentSrc || image.src);
        const headingLevels = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(visible).map((heading) => Number(heading.tagName[1]));
        const skippedLevels = headingLevels.slice(1).flatMap((level, index) => level > headingLevels[index] + 1 ? [`${headingLevels[index]} to ${level}`] : []);
        return {
          mains: document.querySelectorAll('main').length,
          h1s: [...document.querySelectorAll('h1')].filter(visible).length,
          duplicateIds,
          brokenAriaReferences,
          unnamed,
          imagesWithoutAlt,
          skippedLevels,
          skipLinks: [...document.querySelectorAll('a[href^="#"]')].filter((link) => /skip/i.test(link.innerText)).map((link) => ({ href: link.getAttribute('href'), resolves: Boolean(document.querySelector(link.getAttribute('href'))) })),
        };
      });
      assert.equal(audit.mains, 1, `${route} has one main landmark`);
      assert.equal(audit.h1s, 1, `${route} has one visible primary heading`);
      assert.deepEqual(audit.duplicateIds, [], `${route} has unique IDs`);
      assert.deepEqual(audit.brokenAriaReferences, [], `${route} has valid labelled-by and described-by references`);
      assert.deepEqual(audit.unnamed, [], `${route} has no unnamed visible controls`);
      assert.deepEqual(audit.imagesWithoutAlt, [], `${route} images declare alt text or empty alt`);
      assert.deepEqual(audit.skippedLevels, [], `${route} has no skipped heading levels`);
      assert.ok(audit.skipLinks.length > 0 && audit.skipLinks.every((link) => link.resolves), `${route} skip link reaches a real target`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('mobile navigation exposes its expanded state and completes a reader route', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/methods/`, { waitUntil: 'networkidle' });
    const menuButton = page.getByRole('button', { name: /Menu/ });
    const primaryNav = page.getByRole('navigation', { name: 'Hearth and Code primary navigation' });
    assert.equal(await menuButton.getAttribute('aria-expanded'), 'false');
    assert.equal(await primaryNav.isVisible(), false, 'collapsed navigation is not exposed visually');

    await menuButton.click();
    assert.equal(await menuButton.getAttribute('aria-expanded'), 'true');
    assert.equal(await primaryNav.isVisible(), true, 'expanded navigation exposes its route links');
    await menuButton.focus();
    await page.keyboard.press('Tab');
    assert.equal(await page.evaluate(() => (document.activeElement?.textContent ?? '').includes('Studio')), true, 'keyboard proceeds from the menu disclosure into the navigation links');

    await primaryNav.locator('a[href="/research/"]').click();
    await page.waitForURL('**/research/');
    assert.equal(await page.getByRole('heading', { name: 'Research', exact: true }).count(), 1);
    assert.equal(await page.locator('.studio-nav__menu-button').getAttribute('aria-expanded'), 'false', 'new route begins with its menu collapsed');
    await page.close();
  } finally {
    await browser.close();
  }
});

test('Hearth and Code selection follows browser Back and Forward history', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await page.addInitScript(() => localStorage.removeItem('hearth-code-view'));
    await page.goto(origin, { waitUntil: 'networkidle' });
    assert.equal(await page.getByRole('button', { name: /Both/ }).getAttribute('aria-pressed'), 'true');

    await page.getByRole('button', { name: /Hearth/ }).click();
    assert.equal(await page.locator('[data-studio-root]').getAttribute('data-studio-view'), 'hearth');
    await page.goBack();
    await page.waitForFunction(() => document.querySelector('[data-studio-root]')?.getAttribute('data-studio-view') === 'balanced');
    assert.equal(await page.getByRole('button', { name: /Both/ }).getAttribute('aria-pressed'), 'true');

    await page.goForward();
    await page.waitForFunction(() => document.querySelector('[data-studio-root]')?.getAttribute('data-studio-view') === 'hearth');
    assert.equal(await page.getByRole('button', { name: /Hearth/ }).getAttribute('aria-pressed'), 'true');
    await page.close();
  } finally {
    await browser.close();
  }
});

test('primary visitor routes reflow at 640 px and 320 px without horizontal clipping', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const routes = [
      '/',
      '/methods/',
      '/research/',
      '/workbench/',
      '/philosophy/ai-literacy/',
      '/journal/',
      '/journal/prompting-became-procedure-design/',
    ];
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      for (const width of [640, 320]) {
        await page.setViewportSize({ width, height: 900 });
        await page.evaluate(() => new Promise((resolve) => requestAnimationFrame(() => requestAnimationFrame(resolve))));
        const dimensions = await page.evaluate(() => {
          const main = document.querySelector('main');
          const heading = main?.querySelector('h1');
          const headingRect = heading?.getBoundingClientRect();
          return {
            viewport: window.innerWidth,
            document: document.documentElement.scrollWidth,
            body: document.body.scrollWidth,
            main: main?.clientWidth,
            mainContent: main?.scrollWidth,
            headingLeft: headingRect?.left,
            headingRight: headingRect?.right,
          };
        });
        assert.ok(dimensions.document <= width, `${route} document reflows at ${width}px: ${JSON.stringify(dimensions)}`);
        assert.ok(dimensions.body <= width, `${route} body reflows at ${width}px: ${JSON.stringify(dimensions)}`);
        assert.ok(dimensions.mainContent <= dimensions.main + 1, `${route} main content reflows at ${width}px: ${JSON.stringify(dimensions)}`);
        assert.ok(dimensions.headingLeft >= 0 && dimensions.headingRight <= width, `${route} heading stays in the ${width}px viewport`);
        if (route === '/philosophy/ai-literacy/' && width === 320) {
          const metadataColumns = await page.locator('.ec-meta').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length);
          assert.equal(metadataColumns, 1, 'AI Literacy metadata stacks into separate readable rows on narrow screens');
        }
      }
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('engineer, researcher, and public-governance reader tasks complete from the landing page', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });

    // Engineer: choose Code, enter the Workbench, then follow the method route to a worked case.
    await page.goto(origin, { waitUntil: 'networkidle' });
    const entryPathLink = page.getByRole('link', { name: /Find your path into the studio/ });
    assert.equal(await entryPathLink.getAttribute('href'), '#start-title');
    await entryPathLink.click();
    await page.getByRole('heading', { name: 'Three useful ways into the studio.' }).waitFor();
    assert.ok(await page.locator('a[href="/workbench/"]').filter({ hasText: 'For Agentic Engineers' }).isVisible());
    assert.ok(await page.locator('a[href="/research/"]').filter({ hasText: 'For Agentic Researchers' }).isVisible());
    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.getByRole('button', { name: /Code/ }).click();
    assert.equal(await page.getByRole('button', { name: /Code/ }).getAttribute('aria-pressed'), 'true');
    await page.locator('a[href="/workbench/"]').filter({ hasText: 'For Agentic Engineers' }).click();
    await page.getByRole('heading', { name: /inspectable work/i }).waitFor();
    assert.match(await page.locator('#runtime-map').innerText(), /Source only · not active/i);
    await page.locator('a[href="/methods/"]').first().click();
    await page.getByRole('tab', { name: 'Case Studies', exact: true }).click();
    const workedExamples = page.locator('.methods-workbench__report');
    assert.equal(await workedExamples.count(), 4);
    for (let index = 0; index < 4; index += 1) {
      await page.locator('.methods-workbench__case-tabs button').nth(index).click();
      const example = workedExamples.nth(index);
      assert.ok(await example.isVisible());
      for (const label of ['Task', 'Approach', 'Illustrative input', 'Possible return', 'Limits and review']) {
        assert.equal(await example.getByRole('heading', { name: label, exact: true }).count(), 1);
      }
    }
    assert.match(await workedExamples.nth(0).innerText(), /Note A \[S1\][\s\S]*Claim: completion time was lower[\s\S]*do not show the change was caused/i);
    assert.match(await workedExamples.nth(1).innerText(), /Read-only:[\s\S]*do not edit files[\s\S]*No defect or successful review is implied/i);
    assert.match(await workedExamples.nth(2).innerText(), /pilot with two teams[\s\S]*Open question: retain original IDs[\s\S]*No deadline or decision outcome beyond the quoted brief is inferred/i);
    assert.match(await workedExamples.nth(3).innerText(), /AI Literacy guidance without inventing a test[\s\S]*no specific individual literacy level[\s\S]*opening summary still says[\s\S]*ensure a sufficient level[\s\S]*not legal advice/i);
    assert.equal(await workedExamples.nth(3).locator('footer ul a').count(), 5);
    await page.locator('.studio-nav__brand').click();
    await page.waitForURL(`${origin}/`);
    assert.equal(await page.getByRole('button', { name: /Code/ }).getAttribute('aria-pressed'), 'true', 'Code emphasis is restored after returning from the Workbench and Methods');
    assert.equal(await page.locator('[data-studio-root]').getAttribute('data-studio-view'), 'code');
    assert.equal(await page.locator('#view-panel-title').innerText(), 'Methods and systems first.');
    await page.getByRole('button', { name: /Both/ }).click();

    // Researcher: enter the research map and follow its methods cross-reference.
    await page.locator('a[href="/research/"]').first().click();
    await page.getByRole('heading', { name: 'Research', exact: true }).waitFor();
    assert.equal(await page.getByRole('heading', { name: 'Research programs and systems' }).count(), 1);
    assert.match(await page.locator('#hcan').innerText(), /do not grant permission or prove the described workflow worked/i);
    const methodFamilies = page.locator('.ec-method-item');
    assert.equal(await methodFamilies.count(), 4);
    assert.deepEqual(await methodFamilies.locator('h3').allInnerTexts(), [
      'Typed Context & Control Protocol (TCCP)',
      'Knowledge Representation Profile (EKRP)',
      'Methodological Intelligence Compact (MINC)',
      'Sigil'
    ]);
    assert.equal(await methodFamilies.locator('a[href="/journal/typed-context-for-real-work/"]').count(), 1);
    assert.equal(await methodFamilies.locator('a[href="/journal/knowledge-representation-without-a-black-box/"]').count(), 1);
    assert.equal(await methodFamilies.locator('a[href="/journal/ess-the-thread-between-thought-and-action/"]').count(), 2);
    assert.match(await page.locator('.ec-section').filter({ has: page.getByRole('heading', { name: 'Method families' }) }).innerText(), /not complete specifications or evidence of effectiveness/i);
    await page.locator('.ec-cross-refs a[href="/methods/"]').click();
    await page.getByRole('tab', { name: 'Prompt Catalog', exact: true }).click();
    await page.locator('.methods-workbench__records summary').first().click();
    assert.equal(new URL(page.url()).pathname, '/methods/');
    assert.equal(await page.locator('#methods-panel-2 .methods-workbench__records article').count(), 4);

    // Public-governance reader: reach the current local AI Literacy revision and its source boundary.
    await page.goto(origin, { waitUntil: 'networkidle' });
    await page.locator('a[href="/philosophy/ai-literacy/"]').filter({ hasText: /AI Literacy & public reasoning/i }).click();
    await page.getByRole('heading', { name: 'AI Literacy as a Developing Practice' }).waitFor();
    const literacy = page.locator('.ec-policy-page');
    assert.match(await literacy.innerText(), /Local revision candidate · not republished/i);
    assert.equal(await literacy.locator('.ec-meta dt').filter({ hasText: /^Status$/i }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta dd').filter({ hasText: /Local revision candidate · not republished/i }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta dt').filter({ hasText: /^Revision date$/i }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta dt').filter({ hasText: /^Reading time$/i }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length), 3);
    for (const href of [
      'https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html',
      'https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers',
      'https://eur-lex.europa.eu/eli/reg/2026/1744/oj',
      'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02024R1689-20260727',
      'https://www.unesco.org/en/legal-affairs/recommendation-ethics-artificial-intelligence',
    ]) assert.equal(await literacy.locator(`a[href="${href}"]`).count() >= 1, true, `AI Literacy source is linked: ${href}`);
    assert.equal(await literacy.locator('.ec-meta dt').filter({ hasText: 'Status' }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta dd').filter({ hasText: 'Local revision candidate · not republished' }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta dt').filter({ hasText: 'Revision date' }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta dt').filter({ hasText: 'Reading time' }).count(), 1);
    assert.equal(await literacy.locator('.ec-meta').evaluate((element) => getComputedStyle(element).gridTemplateColumns.split(' ').length), 3);
    assert.match(await literacy.innerText(), /These are Hearth & Code’s practical recommendations, not a statement that every law or professional standard imposes the same steps/i);
    assert.match(await literacy.innerText(), /no specific.*level is mandated for any individual/i);
    assert.match(await literacy.innerText(), /opening summary still says.*sufficient level/i);
    assert.match(await literacy.innerText(), /no specific—or “sufficient”—level is mandated for any individual/i);
    assert.match(await literacy.innerText(), /does not require measuring each person’s knowledge or issuing a certificate/i);
    assert.match(await literacy.innerText(), /duties concerning staff training for human oversight remain for high-risk AI systems/i);
    assert.match(await literacy.innerText(), /not a validated assessment/i);

    await page.close();
  } finally {
    await browser.close();
  }
});

test('keyboard traversal reaches each visible stop with a visible focus indicator', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of [
      '/', '/methods/', '/research/', '/workbench/', '/philosophy/ai-literacy/', '/philosophy/',
      '/journal/', '/journal/prompting-became-procedure-design/', '/portfolio/', '/dossier/',
      '/questions/', '/correspondence/', '/programs/', '/notes/', '/evidence/', '/gallery/',
    ]) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      await page.mouse.move(1250, 880);
      const tabStops = await page.evaluate(() => {
        const candidates = [...document.querySelectorAll('a[href],button,input:not([type="hidden"]),select,textarea,summary,[tabindex]:not([tabindex="-1"])')]
          .filter((element) => {
            if (element.disabled || element.tabIndex < 0 || element.closest('[hidden],[inert],[aria-hidden="true"],dialog:not([open])')) return false;
            if (element.matches('input[type="radio"][name]')) {
              const group = [...document.querySelectorAll(`input[type="radio"][name="${CSS.escape(element.name)}"]`)];
              const tabEntry = group.find((radio) => radio.checked) || group[0];
              if (tabEntry !== element) return false;
            }
            const closedDetails = element.closest('details:not([open])');
            if (closedDetails && !(element.tagName === 'SUMMARY' && element.parentElement === closedDetails)) return false;
            const visual = element.matches('.ec-checkbox__input,.ec-radio__input') ? element.nextElementSibling : element;
            if (!visual) return false;
            const rect = visual.getBoundingClientRect();
            const style = getComputedStyle(visual);
            return rect.width > 0 && rect.height > 0 && style.visibility !== 'hidden' && style.display !== 'none';
          });
        return candidates.map((element, index) => {
          element.setAttribute('data-keyboard-audit', String(index));
          const visual = element.matches('.ec-checkbox__input,.ec-radio__input') ? element.nextElementSibling : element;
          const style = getComputedStyle(visual);
          return { index, base: { background: style.backgroundColor, border: style.borderColor, shadow: style.boxShadow, textDecoration: style.textDecorationLine } };
        });
      });
      const reached = new Set();
      const failures = [];
      let untrackedFocus = null;
      for (let attempt = 0; attempt <= tabStops.length; attempt += 1) {
        await page.keyboard.press('Tab');
        const active = await page.evaluate(() => {
          const element = document.activeElement;
          if (!element || element === document.body) return null;
          const visual = element.matches('.ec-checkbox__input,.ec-radio__input') ? element.nextElementSibling : element;
          const rect = visual.getBoundingClientRect();
          const style = getComputedStyle(visual);
          return {
            index: element.getAttribute('data-keyboard-audit'),
            tag: element.tagName.toLowerCase(),
            className: String(element.className),
            text: element.textContent?.trim().slice(0, 80) || '',
            focusVisible: element.matches(':focus-visible'),
            visible: rect.width > 0 && rect.height > 0 && getComputedStyle(visual).visibility !== 'hidden' && getComputedStyle(visual).display !== 'none',
            style: {
              background: style.backgroundColor,
              border: style.borderColor,
              shadow: style.boxShadow,
              textDecoration: style.textDecorationLine,
              outline: style.outlineStyle,
              outlineWidth: Number.parseFloat(style.outlineWidth),
            },
          };
        });
        if (!active) break;
        if (active.index === null) { untrackedFocus = active; break; }
        const index = Number(active.index);
        if (reached.has(index)) break;
        reached.add(index);
        const before = tabStops[index].base;
        const hasOutline = active.style.outline !== 'none' && active.style.outlineWidth > 0;
        const changedSurface = before.background !== active.style.background || before.border !== active.style.border || before.shadow !== active.style.shadow || before.textDecoration !== active.style.textDecoration;
        if (!active.visible || !active.focusVisible || (!hasOutline && !changedSurface)) failures.push({ index, tag: active.tag, className: active.className, text: active.text, base: before, focused: active.style });
      }
      await page.evaluate(() => document.querySelectorAll('[data-keyboard-audit]').forEach((element) => element.removeAttribute('data-keyboard-audit')));
      assert.equal(untrackedFocus, null, `${route} has no unexplained Tab target`);
      assert.equal(reached.size, tabStops.length, `${route} reaches every visible keyboard stop in order`);
      assert.deepEqual(failures, [], `${route} gives every focused control a visible non-color focus indicator`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('primary visitor routes honor the reduced-motion preference', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of ['/', '/methods/', '/research/', '/workbench/', '/philosophy/ai-literacy/', '/journal/']) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      const motion = await page.evaluate(() => ({
        preference: matchMedia('(prefers-reduced-motion: reduce)').matches,
        scrollBehavior: getComputedStyle(document.documentElement).scrollBehavior,
        animated: [...document.querySelectorAll('*')].filter((element) => {
          const style = getComputedStyle(element);
          return style.animationName !== 'none' && style.animationDuration !== '0s' && style.animationDuration !== '0ms';
        }).map((element) => ({
          name: getComputedStyle(element).animationName,
          duration: getComputedStyle(element).animationDuration,
          iterations: getComputedStyle(element).animationIterationCount,
        })),
        longTransitions: [...document.querySelectorAll('*')].filter((element) =>
          getComputedStyle(element).transitionDuration.split(',').some((duration) => Number.parseFloat(duration) > 0.001),
        ).length,
      }));
      assert.equal(motion.preference, true, `${route} receives the requested motion preference`);
      assert.equal(motion.scrollBehavior, 'auto', `${route} disables smooth scrolling`);
      assert.ok(motion.animated.every((animation) => animation.iterations !== 'infinite'), `${route} has no repeating animation under reduced motion: ${JSON.stringify(motion.animated)}`);
      assert.equal(motion.longTransitions, 0, `${route} has no transition longer than 1 ms under reduced motion`);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('the portfolio route separates eight surfaces, two processes, and sixteen reference briefs', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
      const page = await browser.newPage({ viewport, reducedMotion: 'reduce' });
      const externalRequests = [];
      page.on('request', (request) => {
        if (new URL(request.url()).origin !== origin) externalRequests.push(request.url());
      });
      await page.goto(`${origin}/portfolio/`, { waitUntil: 'networkidle' });

      assert.equal(await page.title(), 'Portfolio — Hearth & Code');
      assert.equal(await page.locator('.poc-card').count(), 8);
      assert.equal(await page.locator('.pic-card').count(), 2);
      assert.equal(await page.locator('.prb-card').count(), 16);
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
      assert.equal(await page.locator(route === '/programs/' ? '.research-project-frame__map' : '.studio-room-locator').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);

      if (route === '/programs/') { await page.locator('#report-shelf summary').click(); assert.equal(await page.locator('.technical-report-shelf li').count(), 6); }
      if (route === '/workbench/') assert.equal(await page.locator('.studio-room-runtime li').count(), 4);
    }
  } finally {
    await browser.close();
  }
});

test('every primary Research Studio subpage keeps its heading and mobile boundary', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const routes = ['/questions/', '/programs/', '/notes/', '/evidence/', '/dossier/', '/correspondence/', '/workbench/'];
    for (const route of routes) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      assert.equal(await page.locator('h1').count(), 1, `${route} has one primary heading`);
      if (['/questions/', '/programs/', '/dossier/'].includes(route)) {
        assert.equal(await page.locator('.studio-nav').count(), 1, `${route} uses shared Studio navigation`);
        assert.equal(await page.locator('main#page-main').count(), 1, `${route} has a reachable main surface`);
        const component = route === '/questions/' ? '.question-workbench' : route === '/dossier/' ? '.character-sheet' : '.research-project-frame';
        assert.equal(await page.locator(component).count(), 1);
      } else {
        assert.equal(await page.locator('.studio-room-body').count(), 1);
        assert.equal(await page.locator('.studio-room-threshold').count(), 1);
        assert.equal(await page.locator('.studio-room-locator').count(), 1);
        assert.equal(await page.locator('.studio-room-footer').count(), 1);
      }
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `${route} does not overflow`);
      await page.close();
    }

  } finally {
    await browser.close();
  }
});

test('the Research overview uses readable current-theme surfaces on mobile', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/research/`, { waitUntil: 'domcontentloaded' });
    const surfaces = await page.evaluate(() => {
      const heading = document.querySelector('.ec-page-header h1');
      const method = document.querySelector('.ec-method-item');
      const style = (element) => ({
        color: getComputedStyle(element).color,
        background: getComputedStyle(element).backgroundColor,
      });
      return { heading: heading && style(heading), method: method && style(method) };
    });
    assert.deepEqual(surfaces.heading, { color: 'rgb(241, 231, 210)', background: 'rgba(0, 0, 0, 0)' });
    assert.deepEqual(surfaces.method, { color: 'rgb(241, 231, 210)', background: 'rgb(33, 29, 24)' });
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    assert.equal(await page.locator('a[href="/methods/"]').getByText('Methods').count() > 0, true);
    await page.close();
  } finally {
    await browser.close();
  }
});

test('Methods distinguishes the Source Atlas, public technique explorer, and unresolved task-template drafts', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/methods/`, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: 'Prompt Catalog', exact: true }).click();
    await page.locator('#methods-panel-2 .methods-workbench__records summary').click();
    const layers = page.locator('#methods-panel-2 .methods-workbench__records article');
    assert.equal(await layers.count(), 4);
    assert.match(await layers.nth(0).innerText(), /Source Atlas[\s\S]*512 candidate records · 64 categories · 16 documents/i);
    assert.match(await layers.nth(1).innerText(), /Public technique explorer[\s\S]*128 technique entries · 16 documents · 64 categories/i);
    assert.match(await layers.nth(1).innerText(), /card opens an editorial exemplar or an explicit review hold/i);
    assert.match(await layers.nth(1).innerText(), /does not expose prompt patterns as fillable forms/i);
    assert.match(await layers.nth(2).innerText(), /Technique-linked prompt patterns[\s\S]*128 records · one matched to each selected technique/i);
    assert.match(await layers.nth(2).innerText(), /does not expose them as a form editor or model runner/i);
    const templateLayer = await layers.nth(3).innerText();
    assert.match(templateLayer, /Plan: 256 · expanded drafts: 512/i);
    assert.match(templateLayer, /DIRECT, STRUCTURED, DELIBERATE, GOVERNED/i);
    assert.match(templateLayer, /RECURSIVE, GRAPH, EVALUATIVE, COMPOSITIONAL/i);
    assert.match(templateLayer, /README and planning contract still describe four families and 256 templates/i);
    assert.match(templateLayer, /all 64 expanded category files and the current validator define eight families and 512 templates/i);
    assert.match(templateLayer, /review-required, verified:false/i);
    assert.match(templateLayer, /not browsable here/i);
    await page.getByRole('tab', { name: 'Case Studies', exact: true }).click();
    assert.equal(await page.locator('.methods-workbench__report').count(), 4);
    const atlasLinks = page.locator('.methods-workbench__report footer>a');
    assert.equal(await atlasLinks.count(), 4);
    for (const [slug, title, id] of [
      ['33-provenance-carrying-chunk', 'Provenance-Carrying Chunk', 'PTA-005-001'],
      ['30-contrastive-fork-constraint-and-non-action-contracts', 'Contrastive-Fork Constraint and Non-Action Contracts', 'PTA-004-006'],
      ['17-outcome-first-contract', 'Outcome-First Contract', 'PTA-003-001'],
      ['41-evidence-per-claim', 'Evidence-per-Claim', 'PTA-006-001'],
    ]) {
      const link = page.locator(`.methods-workbench__report footer>a[href*="technique=${slug}"]`);
      assert.equal(await link.count(), 1, `${title} is linked from its worked example`);
      assert.match(await link.innerText(), new RegExp(title));
      const detailPage = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
      await detailPage.goto(`${origin}/methods/?technique=${slug}#prompt-techniques`, { waitUntil: 'networkidle' });
      const sheet = detailPage.getByRole('dialog');
      await sheet.getByRole('heading', { level: 2, name: title }).waitFor();
      const sheetText = await sheet.innerText();
      assert.match(sheetText, /candidate|review pending|not evaluated/i);
      await detailPage.close();
    }
    const heldRunPage = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await heldRunPage.goto(`${origin}/methods/?technique=48-staged-composition-claim-evidence-binding#prompt-techniques`, { waitUntil: 'networkidle' });
    const heldRunSheet = heldRunPage.getByRole('dialog');
    await heldRunSheet.getByRole('heading', { level: 2, name: 'Staged-Composition Claim-Evidence Binding' }).waitFor();
    const heldRunText = await heldRunSheet.innerText();
    assert.match(heldRunText, /Review hold · not validated/i);
    assert.match(heldRunText, /Review note:/i);
    assert.match(heldRunText, /Runtime receipt: Pi–Ember kernel 5\.3/i);
    assert.match(heldRunText, /Receipt SHA-256:/i);
    assert.match(heldRunText, /Response SHA-256:/i);
    await heldRunPage.close();
    const literacyExample = page.locator('.methods-workbench__report').filter({ hasText: 'AI Literacy guidance without inventing a test' });
    assert.equal(await literacyExample.locator('footer ul a[href="https://eur-lex.europa.eu/eli/reg/2026/1744/oj"]').count(), 1);
    assert.equal(await literacyExample.locator('footer ul a[href="https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A02024R1689-20260727"]').count(), 1);
    assert.equal(await literacyExample.locator('footer ul a[href="https://digital-strategy.ec.europa.eu/en/faqs/ai-literacy-questions-answers"]').count(), 1);
    assert.equal(await literacyExample.locator('footer ul a[href="https://www.oecd.org/en/publications/empowering-learners-for-the-age-of-ai_65cd27d4-en.html"]').count(), 1);
    assert.equal(await literacyExample.locator('footer ul a[href="/philosophy/ai-literacy/"]').count(), 1);
    await page.getByRole('tab', { name: 'Techniques', exact: true }).click();
    assert.match(await page.locator('.ec-prompt-tree__navigator header strong').innerText(), /16 documents · 64 categories/i);
    assert.equal(await page.locator('#prompt-techniques').count(), 1);
    await page.close();

    const mobile = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    await mobile.goto(`${origin}/methods/`, { waitUntil: 'networkidle' });
    assert.equal(await mobile.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
    await mobile.getByRole('tab', { name: 'Case Studies', exact: true }).click();
    await mobile.locator('.methods-workbench__case-tabs button').nth(3).click();
    const mobileLiteracyExample = mobile.locator('.methods-workbench__report').filter({ hasText: 'AI Literacy guidance without inventing a test' });
    assert.equal(await mobileLiteracyExample.locator('footer ul a').count(), 5);
    assert.equal(await mobileLiteracyExample.locator('footer ul a').first().isVisible(), true);
    await mobile.close();
  } finally {
    await browser.close();
  }
});

test('the historical model-call account stays attributed and its source gap remains visible', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/methods/`, { waitUntil: 'networkidle' });
    await page.getByRole('tab', { name: 'Case Studies', exact: true }).click();
    await page.locator('#methods-panel-3>.methods-workbench__records summary').click();
    const trace = page.locator('.methods-system-trace');
    assert.equal(await trace.getByRole('heading', { name: 'A typed request crosses a guarded model boundary.' }).count(), 1);
    assert.match(await trace.innerText(), /The linked 2026-09-23 article reports one local canary/i);
    assert.match(await trace.innerText(), /could not reopen the cited private implementation or receipt/i);
    assert.match(await trace.innerText(), /not independently rechecked evidence or a statement about current runtime behavior/i);
    await page.close();
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

      const tabs = page.getByRole('tab');
      assert.deepEqual(await tabs.allInnerTexts(), ['Inquiry ledger', 'Working tensions', 'Question guide']);
      for (let index=0; index<3; index++) {
        await tabs.nth(index).click();
        const panel=page.locator(`#question-panel-${index}`);
        assert.ok(await panel.isVisible());
        assert.equal(await tabs.nth(index).getAttribute('aria-selected'), 'true');
      }
      assert.equal(await page.locator('#question-panel-2 .question-workbench__cards article').count(),4);
      await page.locator('#question-panel-2 summary').click();
      assert.ok(await page.locator('#question-panel-2 blockquote').isVisible());
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('deep collections remain reachable through their modular layers', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const expected = new Map([
      ['/methods/', 35],
      ['/programs/', 32],
      ['/notes/', 12],
      ['/evidence/', 16],
    ]);
    for (const [route, count] of expected) {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'domcontentloaded' });
      if (route === '/methods/') {
        const selector=page.getByRole('combobox', { name: 'Practice family' });
        let total=0;
        for (let index=0;index<4;index++) { await selector.selectOption(String(index)); total+=await page.locator('.ec-method-summary').count(); }
        assert.equal(total,count,'all 35 methods remain reachable by practice family');
      } else {
        if (route === '/programs/') await page.locator('#program-modules summary').click();
        assert.equal(await page.locator('.research-collection-grid > li').count(),count);
      }
      if (route === '/notes/') {
        assert.match(await page.locator('.studio-room-threshold').innerText(), /Field Journal \/ local review candidates[\s\S]*preview does not approve or republish/i);
        assert.doesNotMatch(await page.locator('.studio-room-threshold').innerText(), /Published Works/i);
      }
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
    for (const route of ['/journal/the-hearthside-meta-architect/', '/journal/hcan-condensed-symbolic-language/', '/journal/specification-driven-prompting/', '/journal/prompting-became-procedure-design/', '/journal/every-claim-needs-a-return-route/', '/journal/when-the-language-can-call-a-model/', '/journal/a-hub-that-can-explain-itself/', '/journal/designing-a-genre-as-a-system/', '/journal/an-extended-mind-needs-a-grammar/', '/journal/ess-the-thread-between-thought-and-action/', '/journal/a-public-journal-begins-with-a-boundary/', '/journal/what-i-mean-by-a-cognitive-workbench/', '/notes/prompting-as-interface-design/']) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: route.includes('hcan-condensed') ? 'networkidle' : 'domcontentloaded' });
      assert.equal(await page.locator('h1').count(), 1, `${route} has one primary heading`);
      assert.equal(await page.locator('.studio-article-body').count(), 1, `${route} uses the article body`);
      assert.equal(await page.locator('.studio-article-reading-field').count(), 1, `${route} uses the paper reading field`);
      if (route.startsWith('/journal/')) {
        const headerText = await page.locator('.journal-article__header').innerText();
        if (route.includes('an-extended-mind-needs-a-grammar')) {
          assert.match(headerText, /Publication status is unresolved[\s\S]*canonical index classifies this article as draft[\s\S]*no export or publication was authorized[\s\S]*Conflicting records · unresolved/i);
          assert.equal(await page.locator('.journal-article__meta time').count(), 0, 'the disputed date is not presented as a publication date');
        } else {
          assert.match(headerText, /local revision candidate[\s\S]*has not been approved or republished[\s\S]*earlier publication date[\s\S]*Local candidate · review required/i, `${route} distinguishes its historical publication from the current local revision`);
        }
        assert.equal(await page.locator('.journal-article__review-notice[role="note"]').count(), 1, `${route} exposes the review gate in the reading surface`);
      }
      if (route.includes('a-public-journal-begins-with-a-boundary') || route.includes('what-i-mean-by-a-cognitive-workbench')) {
        const heroImage = page.locator('.journal-article__hero img');
        assert.equal(await heroImage.count(), 1, `${route} exposes its featured image`);
        assert.ok(await heroImage.evaluate((image) => image.complete && image.naturalWidth > 0), `${route} featured image loads successfully`);
      }
      if (route.includes('when-the-language-can-call-a-model')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /Current review note · 2026-10-01/i);
        assert.doesNotMatch(articleText, /Current review note · 2026-10-02/i);
        assert.match(articleText, /current syntax contract also lists counterfactual and branch/i);
        assert.match(articleText, /records remain candidate and review-required/i);
        assert.match(articleText, /did not independently run the compiler against those verbs/i);
        assert.doesNotMatch(articleText, /do not read a roadmap example as an implemented branch or counterfactual command/i);
      }
      if (route.includes('specification-driven-prompting')) {
        const sourceLinks = page.locator('.journal-article__sources a[rel="external noopener noreferrer"]');
        assert.equal(await sourceLinks.count(), 4, 'all four public technical precedents have direct source links');
        assert.deepEqual(await sourceLinks.allTextContents(), ['Open source', 'Open source', 'Open source', 'Open source']);
        assert.deepEqual(await sourceLinks.evaluateAll((links) => links.map((link) => new URL(link.href).protocol)), ['https:', 'https:', 'https:', 'https:']);
        assert.deepEqual(await sourceLinks.evaluateAll((links) => links.map((link) => link.getAttribute('aria-label'))), [
          'Open source: DSPy official repository',
          'Open source: LMQL documentation',
          'Open source: OpenAI Structured Outputs',
          'Open source: Wu, Yang, and Murali (2026), Imprompt: A Language Framework for Prompt Programming',
        ]);
      }
      const articleHeadingLevels = await page.locator('.studio-article h1, .studio-article h2, .studio-article h3, .studio-article h4, .studio-article h5, .studio-article h6').evaluateAll((headings) => headings.map((heading) => Number(heading.tagName.slice(1))));
      const skippedArticleLevels = articleHeadingLevels.slice(1).flatMap((level, index) => level > articleHeadingLevels[index] + 1 ? [`${articleHeadingLevels[index]} to ${level}`] : []);
      assert.deepEqual(skippedArticleLevels, [], `${route} has a sequential heading outline: ${articleHeadingLevels.join(' → ')}`);
      if (route.includes('designing-a-genre-as-a-system')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /In my experience, some early AI-assisted drafts felt rootless/i);
        assert.match(articleText, /not a claim about AI-generated music in general/i);
        assert.match(articleText, /Structure can help me hold coherence across tracks/i);
        assert.match(articleText, /not independent proof that the design works for other people/i);
        assert.match(articleText, /exact historical review receipt is absent/i);
        assert.match(articleText, /not independently verified execution or enforcement/i);
        assert.doesNotMatch(articleText, /Most AI-generated music has recognizable failure modes/i);
        assert.match(articleText, /does not document a verified deployed fleet/i);
        assert.match(articleText, /creative image/i);
        assert.match(articleText, /Platform note \(August 2026 snapshot\)/i);
        assert.match(articleText, /official v6 release notes/i);
        assert.match(articleText, /not current product guidance/i);
      }
      if (route.includes('an-extended-mind-needs-a-grammar')) {
        const articleText = await page.locator('.studio-article-reading-field').innerText();
        const workedExample = page.locator('.studio-article-reading-field details').filter({ hasText: 'A fictional example: prepare a research note for return' });
        const readingLayerClaim = page.locator('.eipo-callout-inference').filter({ hasText: 'A provisional rule for the reading layer' });
        assert.equal(await workedExample.count(), 1, 'the practical agentic-research example is explicitly expandable');
        await workedExample.evaluate((element) => { element.open = true; });
        const exampleText = await workedExample.innerText();
        assert.match(exampleText, /two permitted source documents/i);
        assert.match(exampleText, /excludes private notes/i);
        assert.match(exampleText, /prepared for human review/i);
        assert.match(exampleText, /not a record of a real study or a validated workflow/i);
        assert.match(articleText, /three synthetic reader-task pilots/i);
        assert.match(articleText, /individual pilot reviews are Scott-sealed/i);
        assert.match(articleText, /later synthesis is draft and unreviewed/i);
        assert.match(articleText, /not representative usability research/i);
        assert.equal(await readingLayerClaim.count(), 1, 'the reading-layer design rule is labeled as an inference');
        assert.match(await readingLayerClaim.innerText(), /interpretation of three synthetic reader-task exercises/i);
        assert.match(await readingLayerClaim.innerText(), /not representative usability research or product validation/i);
        assert.match(await readingLayerClaim.innerText(), /test that rule with more readers and tasks/i);
        assert.doesNotMatch(articleText, /Reviewed internal research artifact: bounded reader-task presentation-pilot synthesis/i);
        assert.match(articleText, /Interaction Block Protocol v0, revision 4: amended source, reviewer not recorded, verified:false/i);
        assert.match(articleText, /Cortex and Exocore boundary proposal, revision 2: draft, re-review required/i);
        assert.match(articleText, /Research and Evidence Framework.*draft, reviewer not recorded, verified:false/i);
        assert.match(articleText, /Research Direction: Governed AI-Augmented Knowledge Work.*draft, no review recorded, verified:false/i);
        assert.doesNotMatch(articleText, /Reviewed internal research artifact/i);
      }
      if (route.includes('ess-the-thread-between-thought-and-action')) {
        const articleText = await page.locator('.studio-article-reading-field').innerText();
        const statusNote = page.getByRole('complementary', { name: 'ESS design direction since this essay' });
        assert.equal(await statusNote.count(), 1, 'the ESS update is a named, distinct reading region');
        assert.equal(await statusNote.getByRole('heading', { name: 'ESS design direction since this essay' }).count(), 1);
        const statusNoteBounds = await statusNote.evaluate((element) => {
          const rect = element.getBoundingClientRect();
          return { left: rect.left, right: rect.right };
        });
        assert.ok(statusNoteBounds.left >= 0 && statusNoteBounds.right <= 390, 'the ESS update fits the narrow reading surface');
        assert.match(articleText, /current consolidated charter is candidate, unreviewed, and verified:false/i);
        assert.match(articleText, /adoption not requested/i);
        assert.match(articleText, /ESS design direction since this essay/i);
        assert.match(articleText, /2026-09-27/i);
        assert.match(articleText, /Meta-Cell kernel, seven purpose families/i);
        assert.match(articleText, /Intent & Interaction; Process & Protocol; Knowledge & Meaning/i);
        assert.match(articleText, /records remain candidate, review-required, and verified:false/i);
        assert.match(articleText, /does not adopt ESS, establish implementation or conformance, or demonstrate effectiveness/i);
        assert.match(articleText, /remain lineage and migration inputs/i);
        assert.match(articleText, /not a product announcement, an adopted standard/i);
        assert.match(articleText, /“must” and “requires” name proposed design obligations; they do not mean that current software enforces them/i);
        assert.match(articleText, /Whether ESS improves usefulness, fidelity, transfer, cost, accessibility, or governance remains untested/i);
      }
      if (route.includes('a-public-journal-begins-with-a-boundary')) {
        const articleText = await page.locator('.studio-article-reading-field').innerText();
        assert.match(articleText, /Scott-approved Hub article/i);
        assert.match(articleText, /separate source-boundary and claim-label verification remains pending/i);
        assert.match(articleText, /Scott-approved first-person Hub article; source-boundary and claim-label verification remains pending/i);
        assert.match(articleText, /That boundary is an editorial aim, not a guarantee that every post already meets it/i);
        assert.match(articleText, /This post(?:'|’)s source-boundary and claim-label review is still pending/i);
        assert.doesNotMatch(articleText, /They can expect claim labels, reviewed public-safe sources/i);
        assert.doesNotMatch(articleText, /Human-reviewed Hub editorial source/i);
      }
      if (route.includes('what-i-mean-by-a-cognitive-workbench')) {
        const articleText = await page.locator('.studio-article-reading-field').innerText();
        assert.match(articleText, /Scott-approved Hub article/i);
        assert.match(articleText, /separate source-boundary and claim-label verification remains pending/i);
        assert.doesNotMatch(articleText, /Human-reviewed Hub editorial source/i);
      }
      if (route.includes('the-hearthside-meta-architect')) {
        const articleText = await page.locator('.studio-article-reading-field').innerText();
        assert.match(articleText, /Scott-reviewed public Field Journal reflection/i);
        assert.match(articleText, /private author brief whose details are not reproduced/i);
        assert.match(articleText, /candidate working-practice records; not evidence of released features or general outcomes/i);
        assert.match(articleText, /working name, not a credential/i);
        assert.doesNotMatch(articleText, /\/home\/cosmatrexis/);
      }
      if (route.includes('when-the-language-can-call-a-model')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /four reference forms with different jobs/i);
        assert.match(articleText, /only source-bound form/i);
        assert.match(articleText, /let-bound variable that is in scope/i);
        assert.match(articleText, /it shows the first three forms/i);
        assert.match(articleText, /checked S-expression language for programming agentic systems/i);
        assert.match(articleText, /evolving sample library/i);
        assert.match(articleText, /not independently reverified here/i);
        assert.match(articleText, /does not establish current runtime behavior/i);
        assert.match(articleText, /original account reported/i);
        assert.match(articleText, /test records were not re-audited/i);
      }
      if (route.includes('a-hub-that-can-explain-itself')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /set of candidates for prototyping a governed knowledge hub/i);
        assert.match(articleText, /does not itself produce or validate a working system/i);
        assert.match(articleText, /Fictional miniature[\s\S]*Seven of the ten records[\s\S]*inspect the three records that failed/i);
        assert.match(articleText, /counts and records here are invented for teaching/i);
        assert.match(articleText, /not a recommendation to create four agents/i);
        assert.match(articleText, /Eidos, the semantic-systems architect/i);
        assert.match(articleText, /candidate\.16 profile YAML records retain those same transformation identifiers/i);
        assert.match(articleText, /does not show that a profile is accepted, installed, loaded, or useful in a task/i);
        assert.match(articleText, /host compatibility, installation, and runtime testing pending/i);
        assert.match(articleText, /SOUL\.md-shaped file may be prepared as a host-specific runtime projection/i);
        assert.match(articleText, /label does not mean a host has loaded it/i);
        assert.match(articleText, /cannot by itself demonstrate that the system improves outcomes/i);
        assert.doesNotMatch(articleText, /Hub source tree now also contains candidate\.16/i);
      }
      if (route.includes('hcan-condensed')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /detailed v3 analytical matrix.*14\/16/i);
        assert.match(articleText, /separate rendering brief reports a v4\.2 summary.*15\/16/i);
        assert.match(articleText, /52 model calls and one human disposition session/i);
        assert.match(articleText, /do not establish representative user outcomes/i);
        assert.match(articleText, /reported in a project evaluation/i);
        assert.match(articleText, /small, project-specific evaluations/i);
        assert.match(articleText, /human evaluator also found the generated card output difficult to read/i);
        assert.match(articleText, /return-shape markers and optional epistemic labels/i);
        assert.match(articleText, /does not establish arbitrary model compatibility or execution/i);
        assert.doesNotMatch(articleText, /Every HCAN line requests a specific return shape/i);
        assert.doesNotMatch(articleText, /model-agnostic, skill-agnostic distribution format/i);
        assert.doesNotMatch(articleText, /any agent with no tooling installed/i);
        assert.doesNotMatch(articleText, /any LLM agent can read/i);
      }
      if (route.includes('specification-driven-prompting')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /supported schemas and models/i);
        assert.match(articleText, /refusal signaling and incomplete responses/i);
        assert.match(articleText, /cannot make a claim true/i);
        assert.match(articleText, /A small research example/i);
        assert.match(articleText, /Use only the named paper revision and the quoted passage/i);
        assert.match(articleText, /illustrative task shape, not a tested result/i);
        assert.match(articleText, /A shorter request is better whenever these details are already clear/i);
        assert.match(articleText, /work at different layers/i);
        assert.match(articleText, /correspondence between type checking and constrained decoding/i);
        assert.match(articleText, /do not evaluate this article's five-part task contract/i);
      }
      if (route.includes('prompting-became-procedure-design')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /first-person account/i);
        assert.match(articleText, /itemized list is not included/i);
        assert.match(articleText, /count and execution status as unverified/i);
        assert.match(articleText, /organized into wings/i);
        assert.match(articleText, /A fictional example/i);
        assert.match(articleText, /Compare the two supplied drafts on that one reader question/i);
        assert.match(articleText, /not a prompt run or an evaluated result/i);
        assert.doesNotMatch(articleText, /my Hub has thirteen wings/i);
      }
      if (route.includes('every-claim-needs-a-return-route')) {
        const articleText = await page.locator('.studio-article-body').innerText();
        assert.match(articleText, /version 0\.0\.26 at the time/i);
        assert.match(articleText, /does not establish current runtime status/i);
        assert.match(articleText, /synthetic disposable vault/i);
        assert.match(articleText, /reviewed v0\.0\.26 design/i);
        assert.match(articleText, /documented v0\.0\.26 boundaries/i);
        assert.doesNotMatch(articleText, /The Governance Lab currently takes|The current Studio can validate/i);
      }
      const readingColors = await page.locator('.studio-article-reading-field').evaluate((element) => {
        const body = element.querySelector('.journal-article__body, .reading-article__body, .hcan-reading-body');
        const paragraph = body?.querySelector(body?.classList.contains('journal-article__body') ? ':scope > p' : 'p:last-of-type');
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

    const indexPage = await browser.newPage({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
    await indexPage.goto(`${origin}/journal/`, { waitUntil: 'domcontentloaded' });
    const unresolvedEntry = indexPage.locator('.journal-index li').filter({ hasText: 'An Extended Mind Needs a Grammar' });
    assert.match(await unresolvedEntry.innerText(), /Source status unresolved/i);
    assert.equal(await unresolvedEntry.locator('time').count(), 0, 'the disputed publication date is suppressed in the Journal index');
    assert.match(await indexPage.locator('.journal-index > header').innerText(), /conflicting records are marked unresolved/i);
    await indexPage.close();
  } finally {
    await browser.close();
  }
});

test('gallery and design-system scroll regions are keyboard accessible', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const gallery = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await gallery.goto(`${origin}/gallery/`, { waitUntil: 'networkidle' });
    const tableRegion = gallery.locator('.gallery-table-scroll');
    assert.equal(await tableRegion.getAttribute('tabindex'), '0');
    assert.equal(await tableRegion.getAttribute('aria-label'), 'Scrollable component inventory data');
    await tableRegion.focus();
    assert.equal(await tableRegion.evaluate((element) => element.matches(':focus-visible')), true);
    await gallery.close();

    const showcase = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await showcase.goto(`${origin}/design-system/`, { waitUntil: 'networkidle' });
    const stepper = showcase.getByRole('list', { name: 'Progress steps' }).first();
    assert.equal(await stepper.getAttribute('tabindex'), '0');
    await stepper.focus();
    assert.equal(await stepper.evaluate((element) => element.matches(':focus-visible')), true);
    const codeOutput = showcase.locator('.kc-code-playground__output').first();
    assert.equal(await codeOutput.getAttribute('tabindex'), '0');
    assert.match(await codeOutput.getAttribute('aria-label'), /^Output for /);
    await codeOutput.focus();
    assert.equal(await codeOutput.evaluate((element) => element.matches(':focus-visible')), true);
    const auditTrail = showcase.locator('.kc-audit-trail__events').first();
    assert.equal(await auditTrail.getAttribute('tabindex'), '0');
    assert.equal(await auditTrail.getAttribute('aria-label'), 'Scrollable audit event history');
    await auditTrail.focus();
    assert.equal(await auditTrail.evaluate((element) => element.matches(':focus-visible')), true);
    const major = showcase.locator('.kc-release-notes__type--major').first();
    assert.equal(await major.isVisible(), true);
    await showcase.close();
  } finally {
    await browser.close();
  }
});

test('restored expert-article aliases show their local review state and practical bridge', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const route of ['/journal/typed-context-for-real-work/', '/journal/knowledge-representation-without-a-black-box/']) {
      const page = await browser.newPage({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}${route}`, { waitUntil: 'networkidle' });
      assert.match(await page.locator('.research-eyebrow').first().innerText(), /local review projection/i);
      const boundary = page.locator('.reading-article__boundary');
      assert.equal(await boundary.count(), 1);
      assert.match(await boundary.innerText(), /editorial proposals awaiting author review/i);
      assert.match(await boundary.innerText(), /do not revise or republish/i);
      assert.equal(await page.getByRole('heading', { name: 'An expert practice for agentic work' }).count(), 1);
      assert.equal(await page.locator('h1').count(), 1);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('representative React method summaries open distinct full method sheets', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const examples = ['m-01', 'm-10', 'm-19', 'm-28', 'm-33', 'm-34', 'm-35'];
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
      if (id === 'm-01') {
        await card.locator('button').focus();
        await card.locator('button').press('Enter');
      } else {
        await card.locator('button').click();
      }
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
      if (id === 'm-01') {
        await page.keyboard.press('Escape');
        assert.equal(await page.locator('.ec-method-sheet[open]').count(), 0, 'Escape closes the keyboard-opened method sheet');
        assert.equal(await card.locator('button').evaluate((button) => document.activeElement === button), true, 'focus returns to the launching method button');
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

test('design-system D3 charts render marks after numeric-domain normalization', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
    await page.goto(`${origin}/design-system/`, { waitUntil: 'networkidle' });
    const marks = {
      groupedBars: await page.locator('[data-chart-id^="kc-gbar-"] svg rect').count(),
      stackedBars: await page.locator('[data-chart-id^="kc-sbar-"] svg rect').count(),
      linePaths: await page.locator('[data-chart-id^="kc-line-"] svg path').count(),
      areaPaths: await page.locator('[data-chart-id^="kc-area-"] svg path').count(),
      stackedAreaPaths: await page.locator('[data-chart-id^="kc-sarea-"] svg path').count(),
      scatterPoints: await page.locator('[data-chart-id^="kc-scatter-"] svg circle').count(),
      bubblePoints: await page.locator('[data-chart-id^="kc-bubble-"] svg circle').count(),
      graphNodes: await page.locator('.kc-graph-view__node[data-node-id]').count(),
    };
    assert.ok(marks.groupedBars >= 6, 'grouped-bar values produce SVG rectangles');
    assert.ok(marks.stackedBars >= 6, 'stacked-bar values produce SVG rectangles');
    assert.ok(marks.linePaths >= 1, 'line-series data produces an SVG path');
    assert.ok(marks.areaPaths >= 1, 'area data produces an SVG path');
    assert.ok(marks.stackedAreaPaths >= 2, 'stacked-area series produce separate SVG paths');
    assert.ok(marks.scatterPoints >= 4, 'scatter coordinates produce SVG circles');
    assert.ok(marks.bubblePoints >= 4, 'bubble coordinates produce SVG circles');
    assert.equal(marks.graphNodes, 4, 'the static knowledge graph retains its four named nodes');
    await page.close();
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

      await page.getByRole('tab', { name: /Fieldcraft/ }).click();
      assert.equal(await page.locator('.ec-library-panel:not([hidden]) .ec-article-card').count(), 32);
      await page.getByRole('searchbox').fill('prompt');
      assert.equal(await page.locator('.ec-library-panel:not([hidden]) .ec-article-card').count() >= 1, true);
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
    for (const selector of ['.character-sheet h1','.character-sheet__identity dd','.character-sheet__projection','.character-sheet__stats p']) {
      const color=await page.locator(selector).first().evaluate(e=>getComputedStyle(e).color);
      const channels=color.match(/[\d.]+/g).slice(0,3).map(Number);
      assert.ok(channels.reduce((a,b)=>a+b,0)/3>130,`${selector} retains light foreground on its dark field`);
    }
    await page.getByRole('tab',{name:'Dispositions',exact:true}).click();
    assert.equal(await page.locator('#sheet-panel-dispositions article').count(),4);
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
    await journal.goto(`${origin}/notes/#field-journal`, { waitUntil: 'networkidle' });
    await journal.locator('.field-journal-latest__list [data-journal-open]').first().click();
    const articleDialog = journal.locator('dialog[open]');
    assert.match(await articleDialog.innerText(), /local revision candidate[\s\S]*has not been approved or republished[\s\S]*earlier publication date[\s\S]*Local candidate · review required/i);
    assert.equal(await articleDialog.locator('.journal-article__review-notice[role="note"]').count(), 1);
    await articleDialog.locator('.field-journal-dialog__close').click();
    const conflictedEntry = journal.locator('.field-journal-archive__scroll [data-journal-open="an-extended-mind-needs-a-grammar"]');
    await conflictedEntry.click();
    const conflictedDialog = journal.locator('dialog[open]');
    assert.match(await conflictedDialog.innerText(), /Publication status is unresolved[\s\S]*canonical index classifies this article as draft[\s\S]*no export or publication was authorized[\s\S]*Conflicting records · unresolved/i);
    assert.equal(await conflictedDialog.locator('.journal-article__meta time').count(), 0, 'the local Notes dialog suppresses the disputed publication date');
    await conflictedDialog.locator('.field-journal-dialog__close').click();
    await journal.goto(`${origin}/journal/the-hearthside-meta-architect/`, { waitUntil: 'networkidle' });
    assert.equal(await journal.locator('.hearthside-field-expansion').count(), 0, 'the released dossier does not surface the removed expansion candidate');
    assert.equal(await journal.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);

    const studioArticle = await browser.newPage({ viewport: { width: 1280, height: 800 }, reducedMotion: 'reduce' });
    await studioArticle.goto(`${origin}/notes/prompting-as-interface-design/`, { waitUntil: 'networkidle' });
    assert.ok(await studioArticle.locator('.reading-article__body > section').count() >= 9);
    assert.equal(await studioArticle.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true);
  } finally {
    await browser.close();
  }
});
