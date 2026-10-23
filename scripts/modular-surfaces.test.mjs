import { test } from 'node:test';
import assert from 'node:assert/strict';
import { chromium } from 'playwright';
const origin = process.env.STUDIO_ORIGIN ?? 'http://127.0.0.1:4321';
test('modular research, methods, questions, dossier, and articles work at three widths', async () => {
 const browser = await chromium.launch({headless:true});
 try {
  for (const width of [1440,390,320]) {
   const page = await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'});
   const runtimeErrors=[];page.on('pageerror',error=>runtimeErrors.push(error.message));
   const clean = async () => assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`${page.url()} overflows at ${width}`);
   for (const slug of ['typed-context-for-real-work','knowledge-representation-without-a-black-box']) {
    await page.goto(`${origin}/journal/${slug}/`,{waitUntil:'networkidle'});
    const body=await page.locator('.reading-article__body').evaluate(e=>{const r=e.getBoundingClientRect();return {x:r.x,width:r.width,columns:getComputedStyle(e).columnCount};});
    assert.equal(body.columns,'1');assert.ok(Math.abs(body.x+body.width/2-width/2)<2);assert.ok(body.width>=Math.min(width-40,700));await clean();
    await page.locator('.reading-article__contents summary').click();assert.ok(await page.locator('.reading-article__contents a').first().isVisible());
   }
   await page.goto(`${origin}/methods/`,{waitUntil:'networkidle'});
   assert.equal(await page.getByRole('tab',{name:'Practice',exact:true}).getAttribute('aria-selected'),'true');
   await page.getByRole('tab',{name:'Techniques',exact:true}).click();assert.ok(await page.locator('.ec-prompt-tree').isVisible());
   await page.getByRole('tab',{name:'Prompt Catalog',exact:true}).click();await page.getByRole('searchbox').fill('knowledge-engineering');assert.ok(await page.locator('.methods-workbench__prompt-browser nav button').count()>0);
   await page.getByRole('tab',{name:'Case Studies',exact:true}).click();
   for(let i=0;i<4;i++){await page.locator('.methods-workbench__case-tabs button').nth(i).click();assert.ok(await page.locator(`#case-report-${i}`).isVisible());assert.equal(await page.locator(`#case-report-${i}>section`).count(),5);}
   await page.locator('.methods-workbench__case-tabs button').last().focus();await page.keyboard.press('Home');assert.ok(await page.locator('#case-report-0').isVisible());await page.keyboard.press('ArrowRight');assert.ok(await page.locator('#case-report-1').isVisible());
   await page.getByRole('tab',{name:'Practice',exact:true}).focus();await page.keyboard.press('ArrowRight');assert.equal(await page.getByRole('tab',{name:'Techniques',exact:true}).getAttribute('aria-selected'),'true');await clean();
   await page.goto(`${origin}/questions/`,{waitUntil:'networkidle'});assert.equal(await page.locator('.question-workbench__ledger nav button').count(),8);
   await page.locator('.question-workbench__ledger nav button').nth(7).click();assert.ok((await page.locator('.question-workbench__ledger article').innerText()).includes('Q-08'));
   await page.getByRole('tab',{name:'Working tensions'}).click();assert.equal(await page.locator('#question-panel-1 article').count(),4);
   assert.ok(await page.locator('#question-panel-1 article p').evaluateAll(es=>es.every(e=>parseFloat(getComputedStyle(e).fontSize)<=18)));
   await page.getByRole('tab',{name:'Question guide'}).click();await page.locator('#question-panel-2 summary').click();assert.ok(await page.locator('#question-panel-2 blockquote').isVisible());await clean();
   await page.getByRole('tab',{name:'Question guide'}).focus();await page.keyboard.press('Home');assert.ok(await page.locator('#question-panel-0').isVisible());await page.keyboard.press('End');assert.ok(await page.locator('#question-panel-2').isVisible());
   await page.goto(`${origin}/dossier/`,{waitUntil:'networkidle'});assert.equal(await page.locator('.character-sheet meter').count(),8);
   assert.ok((await page.locator('.character-sheet__projection').innerText()).includes('hypothetical'));
   await page.getByRole('tab',{name:'Feats & talents'}).click();assert.equal(await page.locator('#sheet-panel-abilities article').count(),6);
   await page.getByRole('tab',{name:'Dispositions',exact:true}).click();
   for(let i=0;i<4;i++){await page.locator('.character-sheet__schools button').nth(i).click();assert.equal(await page.locator('#sheet-panel-dispositions article').count(),4);}
   await page.getByRole('tab',{name:'Loadout',exact:true}).click();assert.equal(await page.locator('.character-sheet__quests a').count(),4);await clean();
   await page.getByRole('tab',{name:'Loadout',exact:true}).focus();await page.keyboard.press('ArrowLeft');assert.ok(await page.locator('#sheet-panel-dispositions').isVisible());await page.keyboard.press('Home');assert.ok(await page.locator('#sheet-panel-attributes').isVisible());
   await page.goto(`${origin}/programs/`,{waitUntil:'networkidle'});assert.equal(await page.locator('.program-directory-grid>a').count(),7);await clean();
   await page.locator('#program-modules summary').click();assert.equal(await page.locator('.research-collection-grid>li').count(),32);
   for(const route of ['/programs/tccp/','/programs/ekrp/','/programs/core32/','/programs/ess/','/hcan/','/review/exocore/','/review/ember-circuit/']) {
    const response=await page.goto(`${origin}${route}`,{waitUntil:'networkidle'});assert.equal(response.status(),200);assert.equal(await page.locator('.research-project-frame').count(),1);
    const unresolved=await page.locator('.research-project-frame__map a').evaluateAll(as=>as.map(a=>a.getAttribute('href')).filter(h=>!document.getElementById(h.slice(1))));assert.deepEqual(unresolved,[]);await clean();
   }
   await page.goto(`${origin}/questions/#tension-title`,{waitUntil:'networkidle'});assert.ok(await page.locator('#question-panel-1').isVisible());
   await page.goto(`${origin}/programs/#technical-reports`,{waitUntil:'networkidle'});assert.equal(await page.locator('#report-shelf').getAttribute('open'),'');
   await page.goto(`${origin}/review/`,{waitUntil:'networkidle'});assert.equal(await page.locator('.program-directory-grid>a').count(),15);await clean();
   assert.deepEqual(runtimeErrors,[],`no client runtime errors at ${width}px`);
   await page.close();
  }
 } finally {await browser.close();}
});
