#!/usr/bin/env node
/**
 * debug-live-preview.cjs
 *
 * Uses Playwright to actually RENDER the page and inspect why
 * TaxonomyTree and DialogueTree render as blank black voids.
 */
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu'],
  });
  const ctx = await browser.newContext({ viewport: { width: 1600, height: 4000 } });
  const page = await ctx.newPage();

  // Capture console errors
  const consoleErrors = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  page.on('pageerror', (err) => {
    consoleErrors.push('PAGE ERROR: ' + err.message);
  });

  console.log('=== Loading http://localhost:4321/design-system/live/ ===');
  await page.goto('http://localhost:4321/design-system/live/', { waitUntil: 'networkidle' });

  // Wait a bit for any async rendering
  await page.waitForTimeout(2000);

  // 1. Take a screenshot
  console.log('\n=== 1. Screenshot saved to /tmp/live-preview-debug.png ===');
  await page.screenshot({ path: '/tmp/live-preview-debug.png', fullPage: true });

  // 2. Find all kc-taxonomy-tree elements and inspect
  console.log('\n=== 2. TaxonomyTree inspection ===');
  const taxoInfo = await page.evaluate(() => {
    const trees = document.querySelectorAll('.kc-taxonomy-tree');
    if (trees.length === 0) return { found: false };
    const first = trees[0];
    const rect = first.getBoundingClientRect();
    const style = getComputedStyle(first);
    return {
      found: true,
      count: trees.length,
      first: {
        tag: first.tagName,
        classes: first.className,
        rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
        backgroundColor: style.backgroundColor,
        color: style.color,
        display: style.display,
        visibility: style.visibility,
        opacity: style.opacity,
        overflow: style.overflow,
        position: style.position,
        // Check parent context
        parentTag: first.parentElement?.tagName,
        parentClass: first.parentElement?.className,
        // Are the children visible?
        childCount: first.children.length,
        firstChildRect: first.children[0]?.getBoundingClientRect(),
      },
      // Check if it's inside a shadow root
      isInShadowRoot: !!first.getRootNode() && first.getRootNode() !== document,
      rootNodeName: first.getRootNode()?.constructor?.name,
    };
  });
  console.log(JSON.stringify(taxoInfo, null, 2));

  // 3. Check all kc-taxonomy-tree labels
  console.log('\n=== 3. TaxonomyTree labels found ===');
  const labels = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('.kc-taxonomy-tree__label')).map(el => ({
      text: el.textContent,
      visible: el.getBoundingClientRect().width > 0 && el.getBoundingClientRect().height > 0,
      rect: el.getBoundingClientRect(),
      color: getComputedStyle(el).color,
    }));
  });
  console.log(JSON.stringify(labels, null, 2));

  // 4. Check for shadow DOM
  console.log('\n=== 4. Shadow DOM check ===');
  const shadowCheck = await page.evaluate(() => {
    const tree = document.querySelector('.kc-taxonomy-tree');
    if (!tree) return { found: false };
    const root = tree.getRootNode();
    return {
      rootType: root.constructor.name,
      isDocument: root === document,
      hasShadowRoot: !!root.host,
      hostTag: root.host?.tagName,
      hostClass: root.host?.className,
    };
  });
  console.log(JSON.stringify(shadowCheck, null, 2));

  // 5. Check the parent astro-island styles
  console.log('\n=== 5. Astro island containing TaxonomyTree ===');
  const islandInfo = await page.evaluate(() => {
    const tree = document.querySelector('.kc-taxonomy-tree');
    if (!tree) return null;
    const island = tree.closest('astro-island');
    if (!island) return null;
    const rect = island.getBoundingClientRect();
    const style = getComputedStyle(island);
    return {
      uid: island.getAttribute('uid'),
      rect: { x: rect.x, y: rect.y, w: rect.width, h: rect.height },
      display: style.display,
      overflow: style.overflow,
      styleAttr: island.getAttribute('style'),
      hasShadowRoot: !!island.shadowRoot,
      childCount: island.children.length,
    };
  });
  console.log(JSON.stringify(islandInfo, null, 2));

  // 6. Check ALL loaded stylesheets
  console.log('\n=== 6. Loaded stylesheets ===');
  const sheets = await page.evaluate(() => {
    return Array.from(document.styleSheets).map(sheet => ({
      href: sheet.href || '(inline)',
      ruleCount: (() => {
        try { return sheet.cssRules.length; } catch (e) { return 'CORS'; }
      })(),
      // Check if our rules are in this sheet
      hasKcTaxonomy: (() => {
        try {
          return Array.from(sheet.cssRules).some(r => r.cssText?.includes('.kc-taxonomy-tree'));
        } catch (e) { return false; }
      })(),
    }));
  });
  console.log(JSON.stringify(sheets, null, 2));

  // 7. Console errors
  console.log('\n=== 7. Console errors ===');
  if (consoleErrors.length === 0) {
    console.log('  (none)');
  } else {
    consoleErrors.forEach((e, i) => console.log(`  ${i+1}. ${e}`));
  }

  await browser.close();
})();
