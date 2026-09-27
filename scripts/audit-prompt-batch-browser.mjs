// Browser gate for a built Astro preview; structural checks do not replace semantic review.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';
const atlas = JSON.parse(readFileSync('src/data/vendored/prompt-catalog.json', 'utf8'));
const url = process.argv[2] || 'http://localhost:4321/methods/';
const browser = await chromium.launch({ executablePath: '/usr/bin/google-chrome', args: ['--no-sandbox'] });
try {
  for (const width of [1600, 390]) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto(url, { waitUntil: 'networkidle' });
    const nav = page.locator('#prompt-lab .ec-prompt-tree__navigator');
    for (let position = 2; position <= 9; position++) {
      const source = atlas[position - 1];
      const doc = position === 9 ? 1 : 0;
      const category = position === 9 ? 0 : Math.floor((position - 1) / 2);
      const cardIndex = position === 9 ? 0 : (position - 1) % 2;
      if (doc === 1) await nav.locator('details').nth(1).locator('summary').click();
      await nav.locator('details').nth(doc).locator('button').nth(category).click();
      const card = page.locator('#prompt-lab .ec-prompt-card').nth(cardIndex);
      await card.click();
      const dialog = page.locator('.ec-prompt-sheet');
      const data = await dialog.evaluate((element) => ({
        title: element.querySelector('h2')?.textContent?.trim(),
        sections: element.querySelectorAll('.ec-prompt-sheet__section').length,
        identity: element.querySelectorAll('#tech-section-1 .ec-prompt-sheet__identity-grid p').length,
        details: ['2', '3', '4'].map((n) => [...element.querySelectorAll(`#tech-section-${n} .ec-prompt-sheet__steps p,#tech-section-${n} .ec-prompt-sheet__limits p`)].map((p) => p.textContent?.length ?? 0)),
        role: element.getAttribute('role'),
      }));
      if (data.title !== source.title || data.sections !== 5 || data.identity !== 4 || data.role !== 'dialog' || data.details.flat().some((n) => n < 35)) throw new Error(`position ${position}: ${JSON.stringify(data)}`);
      await dialog.getByRole('tab', { name: 'Technique response' }).click();
      const response = dialog.locator('.ec-prompt-sheet__rendered-response');
      const scroll = await response.evaluate((el) => ({ height: el.clientHeight, scroll: el.scrollHeight }));
      if (scroll.height !== scroll.scroll) throw new Error(`position ${position}: response has hidden nested scroll`);
      await dialog.locator('.ec-prompt-sheet__comparison-receipt').scrollIntoViewIfNeeded();
      if (!(await dialog.locator('.ec-prompt-sheet__comparison-receipt').isVisible())) throw new Error(`position ${position}: receipt unreachable`);
      if ((position === 3 && width === 1600) || (position === 9 && width === 390)) await page.screenshot({ path: `/tmp/prompt-batch-001-repaired-${position}-${width}.png` });
      await page.keyboard.press('Escape');
      if (!(await card.evaluate((el) => document.activeElement === el))) throw new Error(`position ${position}: focus not returned`);
    }
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`${width}: horizontal overflow`);
    if (errors.length) throw new Error(`${width}: ${errors.join('; ')}`);
    console.log(`${width}px: eight ordered cards, full responses, reachable receipts, focus return, no overflow or page errors`);
    await page.close();
  }
} finally { await browser.close(); }
