import assert from 'node:assert/strict';
import test from 'node:test';
import { chromium } from 'playwright';

const origin = process.env.STUDIO_PREVIEW_ORIGIN ?? 'http://127.0.0.1:4321';

test('HCAN journal uses one heading, a styled island, and mobile-contained examples', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    for (const width of [1440, 390]) {
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: 'reduce' });
      await page.goto(`${origin}/journal/hcan-condensed-symbolic-language/`, { waitUntil: 'networkidle' });
      assert.equal(await page.locator('h1').count(), 1);
      assert.match(await page.locator('.hcanp').evaluate((node) => getComputedStyle(node).fontFamily), /Inter/);
      assert.equal(await page.locator('.hcanp-examples__rail-btn').count(), 8);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true);
      await page.locator('.hcanp-examples__rail-btn').nth(1).click();
      assert.equal(await page.locator('.hcanp-examples__rail-btn').nth(1).getAttribute('aria-pressed'), 'true');
      assert.equal(await page.locator('.hcanx-example').count(), 1);
      await page.close();
    }
  } finally {
    await browser.close();
  }
});

test('Sigil and HCAN article programs have syntax-colored tokens without a runtime highlighter', async () => {
  const browser = await chromium.launch({ headless: true });
  try {
    const page = await browser.newPage();
    await page.goto(`${origin}/journal/when-the-language-can-call-a-model/`, { waitUntil: 'networkidle' });
    assert.equal(await page.locator('[data-program-language="hcan"]').count(), 4);
    assert.equal(await page.locator('[data-program-language="sigil"]').count(), 3);
    for (const language of ['hcan', 'sigil']) {
      const colors = await page.locator(`[data-program-language="${language}"] span[style]`).evaluateAll((nodes) => new Set(nodes.map((node) => getComputedStyle(node).color)).size);
      assert.ok(colors >= 3, `${language} has distinct syntax colors`);
    }
    await page.close();
  } finally {
    await browser.close();
  }
});
