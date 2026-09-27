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
      const comparison = dialog.locator('[data-ec-component="PromptBatchSkillLadder"]');
      const summary = await comparison.evaluate((el) => ({ slug: el.getAttribute('data-slug'), levels: el.querySelectorAll('.ec-skill-ladder__level').length, criteria: el.querySelectorAll('.ec-skill-ladder__matrix tbody tr').length }));
      if (summary.slug !== source.slug || summary.levels !== 4 || summary.criteria !== (position === 2 ? 8 : 4)) throw new Error(`position ${position}: missing integrated batch comparison ${JSON.stringify(summary)}`);
      if (position === 2) {
        const review = await comparison.evaluate((el) => ({ scores: [...el.querySelectorAll('.ec-skill-ladder__level summary small')].map((item) => item.textContent), evidence: [...el.querySelectorAll('.ec-batch-score-evidence ol')].map((item) => item.children.length), warning: el.querySelector('.is-caution')?.textContent }));
        if (review.scores?.join('|') !== ['5/10 observed points · 5/8 criteria assessable', '7/16 observed points · 8/8 criteria assessable', '11/16 observed points · 8/8 criteria assessable', '13/16 observed points · 8/8 criteria assessable'].join('|') || review.evidence?.join(',') !== '8,8,8,8' || !review.warning?.includes('manager-process hypotheses')) throw new Error(`position 2: missing eight-dimensional score, evidence or counterweight ${JSON.stringify(review)}`);
      }
      await dialog.getByRole('button', { name: /05 · Demonstration/ }).click();
      for (let tier = 0; tier < 4; tier++) {
        const level = comparison.locator('.ec-skill-ladder__level').nth(tier);
        await level.locator('summary').click();
        const pair = await level.evaluate((el) => ({ prompt: el.querySelector('pre')?.textContent?.length, response: el.querySelector('.ec-skill-ladder__response')?.textContent?.length }));
        if (!pair.prompt || pair.prompt < 180 || !pair.response || pair.response < 100) throw new Error(`position ${position}/tier ${tier}: response or prompt missing`);
        await level.locator('summary').click();
      }
      if (position === 7 && await comparison.locator('.ec-batch-output-hold').count() !== 1) {
        await comparison.locator('.ec-skill-ladder__level').first().locator('summary').click();
        if (await comparison.locator('.ec-batch-output-hold').count() !== 1) throw new Error('museum pseudo-tool output warning missing');
      }
      await comparison.locator('.ec-skill-ladder__boundary').scrollIntoViewIfNeeded();
      if (!(await comparison.locator('.ec-skill-ladder__boundary').isVisible())) throw new Error(`position ${position}: final boundary unreachable`);
      if ((position === 3 && width === 1600) || (position === 9 && width === 390)) await page.screenshot({ path: `/tmp/prompt-batch-001-integrated-${position}-${width}.png` });
      await page.keyboard.press('Escape');
      if (!(await card.evaluate((el) => document.activeElement === el))) throw new Error(`position ${position}: focus not returned`);
    }
    if (await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)) throw new Error(`${width}: horizontal overflow`);
    if (errors.length) throw new Error(`${width}: ${errors.join('; ')}`);
    console.log(`${width}px: eight Methods cards with 32 full prompts/responses, four-tier audits, focus return, no overflow or page errors`);
    await page.close();
  }
} finally { await browser.close(); }
