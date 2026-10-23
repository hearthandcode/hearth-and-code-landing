import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

import { studioBoundary, studioCatalog } from '../src/data/studio-catalog.mjs';
import { publicMethodPrompts, publicSigilClarification } from '../src/data/public-method-prompts.ts';
import { publicMethodCollections, publicMethods } from '../src/data/public-method-library.ts';
import { hearthsideArticles } from '../src/content/hearthside-articles.ts';
import { fieldJournalExpansions } from '../src/content/field-journal-expansions.ts';
import { componentBands, emberCircuitComponents, emberCircuitTokens } from '../src/components/ember-circuit/registry.ts';

test('the studio catalog exposes one honest action for every initial offer', () => {
  assert.deepEqual(
    studioCatalog.map((offer) => offer.id),
    [
      'starter-context-charter',
      'architecture-walkthrough',
      'governed-workflow-review',
      'workbench-preview',
    ],
  );

  const allowedStates = new Set(['review-candidate', 'inquiry-candidate', 'preview-only']);
  const allowedActions = new Set(['download', 'inquire', 'read']);

  for (const offer of studioCatalog) {
    assert.ok(allowedStates.has(offer.readiness), `${offer.id} has a bounded readiness state`);
    assert.ok(allowedActions.has(offer.action.kind), `${offer.id} has a bounded action`);
    assert.match(offer.action.href, /^\//, `${offer.id} uses a same-site action`);
    assert.ok(offer.boundary.length > 20, `${offer.id} explains its claim boundary`);
  }
});

test('the first slice has a no-account download and a correspondence-only inquiry', () => {
  const download = studioCatalog.find((offer) => offer.action.kind === 'download');
  assert.equal(download?.action.href, '/downloads/context-charter-starter-v0.1.md');

  const inquiries = studioCatalog.filter((offer) => offer.action.kind === 'inquire');
  assert.ok(inquiries.length >= 1);
  assert.ok(inquiries.every((offer) => offer.action.href === '/correspondence/'));
});

test('the static boundary retains no visitor, identity, or payment data', () => {
  assert.equal(studioBoundary.firstPartyDataCollection, false);
  assert.equal(studioBoundary.accountRequired, false);
  assert.equal(studioBoundary.checkoutEnabled, false);
  assert.equal(studioBoundary.publicApiEnabled, false);
  assert.match(studioBoundary.inquiryProvider, /Tally/);
});

test('the review surface stays no-index and outside public navigation', async () => {
  const [page, navigation, download] = await Promise.all([
    readFile(new URL('../src/components/StudioServicePlatform.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/HearthNavigation.astro', import.meta.url), 'utf8'),
    readFile(new URL('../public/downloads/context-charter-starter-v0.1.md', import.meta.url), 'utf8'),
  ]);

  assert.match(page, /name="robots" content="noindex,nofollow"/);
  assert.doesNotMatch(page, /<form\b/);
  assert.doesNotMatch(navigation, /\/review\/studio\//);
  assert.match(download, /status: review-candidate/);
  assert.match(download, /verified: false/);
});

test('the public landing orients Hearth and Code visitors to the studio', async () => {
  const [index, landing, navigation, portfolio, landingStyles] = await Promise.all([
    readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ResearchStudioLanding.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/HearthNavigation.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/portfolio/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/research-studio-landing.css', import.meta.url), 'utf8'),
  ]);

  assert.match(index, /ResearchStudioLanding/);
  assert.doesNotMatch(index, /ResearchLabSurface/);
  for (const route of ['/workbench/', '/research/', '/philosophy/ai-literacy/']) {
    assert.ok(landing.includes(route), `landing should link to ${route}`);
  }
  assert.match(landing, /For Agentic Engineers/);
  assert.match(landing, /For Agentic Researchers/);
  assert.match(landing, /AI Literacy & public reasoning/);
  assert.match(landing, /Choose a projection to change the emphasis/);
  assert.ok(navigation.includes("'portfolio'") && navigation.includes("'/portfolio/'"));
  assert.match(portfolio, /PortfolioApp/);
  assert.match(portfolio, /current="exocore"/);
  assert.match(landing, /\.studio\s*\{/);
  assert.match(landing, /\.studio-paths\s*\{/);
  assert.match(landing, /@media\s*\(max-width:\s*36rem\)/);
  assert.match(landingStyles, /--ec-bg-hearth:\s*#0e1114/);
});

test('the public subpages share one bounded Research Studio system', async () => {
  const [surface, workbench, content, styles, collections, dossier] = await Promise.all([
    readFile(new URL('../src/components/ResearchLabSurface.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/workbench/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/data/research-studio-content.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/studio-room-surfaces.css', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ResearchCollections.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ProgramDossier.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(surface, /studio-room-surfaces\.css/);
  assert.match(surface, /studio-room-threshold/);
  assert.match(surface, /studio-room-thought/);
  assert.match(surface, /ProductHorizon/);
  assert.match(surface, /TechnicalReportShelf/);
  assert.match(surface, /route === 'workbench'/);
  assert.match(workbench, /route="workbench"/);
  assert.doesNotMatch(surface, /ResearchRouteRail|PanelTabs/);
  assert.doesNotMatch(collections, /PanelTabs|role="tabpanel"/);
  assert.doesNotMatch(dossier, /data-program-tab|role="tab"|<script>/);
  assert.match(styles, /--room-graphite:\s*#0e1114/);
  assert.match(styles, /--room-paper:\s*#211d18/);
  assert.match(styles, /--room-fog:\s*#302a25/);
  assert.match(styles, /--room-ink:\s*#f1e7d2/);
  assert.match(styles, /\.studio-room-field--paper/);
  assert.match(styles, /\.studio-room-field--dark/);

  assert.equal((content.match(/id: 'P-\d{2}'/g) ?? []).length, 8);
  assert.equal((content.match(/code: 'TR-\d{2}'/g) ?? []).length, 6);
  assert.match(content, /review-required candidate/i);
  assert.match(surface, /Source only · not active/);
});

test('research project surfaces use the shared project frame', async () => {
  const [frame, hcan, emberCircuit, exocore] = await Promise.all([
    readFile(new URL('../src/components/ResearchProjectFrame.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/hcan.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/review/ember-circuit.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/review/exocore.astro', import.meta.url), 'utf8'),
  ]);

  for (const [name, page] of [['HCAN', hcan], ['Ember Circuit', emberCircuit], ['Exocore', exocore]]) {
    assert.match(page, /ResearchProjectFrame/, `${name} uses the shared project frame`);
    assert.match(page, /sections=\{/s, `${name} provides a local project map`);
  }
  assert.match(frame, /Project map/);
  assert.match(frame, /Return path/);
  assert.match(exocore, /private implementation work onto that shell/i);
  assert.match(exocore, /noindex, nofollow/);
});

test('the Hearthside voice and archive remain personal, broad, and bounded', async () => {
  const [content, landing, surface, library, archive] = await Promise.all([
    readFile(new URL('../src/data/research-studio-content.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ResearchStudioLanding.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ResearchLabSurface.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ember-circuit/LibraryWorkbench.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/StudioArchiveIndex.astro', import.meta.url), 'utf8'),
  ]);

  assert.equal((content.match(/number: '0[1-8]', title:/g) ?? []).length, 8);
  assert.equal((content.match(/code: 'IDX-0[1-8]'/g) ?? []).length, 8);
  assert.match(content, /Personal candidate · review before publication/);
  assert.match(content, /not a credential/i);
  assert.match(landing, /Independent research studio/i);
  assert.match(landing, /Hearthside Meta-Architect/);
  assert.match(surface, /route === 'programs'.*ResearchCollections/s);
  assert.match(surface, /route === 'notes'.*ResearchCollections/s);
  assert.match(surface, /Field Journal \/ local review candidates/);
  assert.match(surface, /preview does not approve or republish/i);
  assert.doesNotMatch(surface, /Published Works/);
  assert.match(library, /current local review status remain distinct/i);
  assert.doesNotMatch(library, /published record/i);
  assert.match(archive, /technical articles share the local Reading Room/i);
  assert.doesNotMatch(archive, /technical articles belong to Published Works/i);
});

test('conflicted Field Journal publication metadata stays unresolved across reading surfaces', async () => {
  const [schema, article, standalone, journalIndex, notesIndex] = await Promise.all([
    readFile(new URL('../src/content.config.ts', import.meta.url), 'utf8'),
    readFile(new URL('../src/content/journal/an-extended-mind-needs-a-grammar.mdx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/JournalArticleLayout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/journal/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/FieldJournalLatest.astro', import.meta.url), 'utf8'),
  ]);

  assert.match(schema, /publication_note: z\.string\(\)\.optional\(\)/);
  assert.match(article, /Publication status is unresolved/);
  assert.match(article, /current Hub canonical index classifies this article as draft/);
  assert.match(article, /no export or publication was authorized/);
  assert.match(standalone, /Conflicting records · unresolved/);
  assert.match(journalIndex, /Source status unresolved/);
  assert.match(notesIndex, /Source status unresolved/);
  assert.doesNotMatch(notesIndex, /Earlier public writing, under review/);
});

test('every page family is bound to the Ember surface framework', async () => {
  const [reviewShell, launchReview, methodsDirections, emberCircuit, studioReview, reviewStyles] = await Promise.all([
    readFile(new URL('../src/components/ReviewShell.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/LaunchReview.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/MethodsDirections.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/pages/review/ember-circuit.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/StudioServicePlatform.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/review-site.css', import.meta.url), 'utf8'),
  ]);

  for (const source of [reviewShell, launchReview, methodsDirections, emberCircuit, studioReview]) {
    assert.match(source, /ember-surface-framework\.css/);
    assert.match(source, /ember-surface/);
    assert.match(source, /HearthNavigation/);
  }

  assert.doesNotMatch(reviewStyles, /fonts\.googleapis\.com/);
  assert.match(reviewShell, /noindex, nofollow/);
  assert.match(launchReview, /noindex,nofollow/);
  assert.match(methodsDirections, /noindex,nofollow/);
  assert.match(emberCircuit, /noindex, nofollow/);
  assert.match(studioReview, /noindex,nofollow/);
});

test('both article families continue the Studio threshold and paper reading field', async () => {
  const [journalArticle, hearthsideArticle, articleStyles] = await Promise.all([
    readFile(new URL('../src/components/JournalArticleLayout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/HearthsideArticle.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/studio-room-surfaces.css', import.meta.url), 'utf8'),
  ]);

  for (const article of [journalArticle, hearthsideArticle]) {
    assert.match(article, /research-studio-landing\.css/);
    assert.match(article, /studio-room-surfaces\.css/);
    assert.match(article, /studio-article-body/);
    assert.match(article, /studio-article-reading-field/);
    assert.doesNotMatch(article, /ember-research-system\.css|research-lab\.css/);
  }
  assert.match(articleStyles, /Article surfaces continue the same dark threshold/);
});

test('the 35 method prompts are individually authored and use a public-safe four-part weave', () => {
  const prompts = Object.values(publicMethodPrompts);
  assert.equal(prompts.length, 35);
  assert.equal(new Set(prompts.map((entry) => entry.structure)).size, 35);
  assert.equal(new Set(prompts.map((entry) => entry.prompt)).size, 35);

  for (const [id, entry] of Object.entries(publicMethodPrompts)) {
    for (const framework of ['TCCP', 'EKRP', 'MINC', 'Sigil']) {
      assert.match(entry.prompt, new RegExp(`\\b${framework}\\b`, 'i'), `${id} names ${framework}`);
    }
    assert.match(entry.prompt, /\b(I|me|my)\b/i, `${id} uses a personal workbench voice`);
    assert.doesNotMatch(entry.prompt, /SIGIL-001|I,D,G,C,M,L,V,H|source-package path|operator bank/i, `${id} avoids internal program detail`);
    assert.match(entry.prompt, /structured|compile|encode|symbolic prose|semantic/i, `${id} treats Sigil as structured language`);
  }
  assert.match(publicSigilClarification.summary, /structured symbolic language/i);
  assert.match(publicSigilClarification.summary, /LLM/i);
  assert.match(publicSigilClarification.boundary, /human-readable gloss/i);
});

test('the 128 technique prompts are hash-pinned, practical, diverse, and do not name their technique or category', async () => {
  const [packetText, runResolver] = await Promise.all([
    readFile(new URL('../src/data/prompt-technique-generated-prompts.json', import.meta.url), 'utf8'),
    readFile(new URL('../src/data/prompt-technique-run-batches.ts', import.meta.url), 'utf8'),
  ]);
  const packet = JSON.parse(packetText);
  assert.equal(packet.records.length, 128);
  assert.deepEqual(packet.records.map((item) => item.technique_number).sort((a, b) => a - b), Array.from({ length: 128 }, (_, index) => index + 1));
  assert.equal(new Set(packet.records.map((item) => item.prompt)).size, 128, 'each technique has a distinct practical instruction');

  const groups = new Map();
  const domains = new Set();
  for (const item of packet.records) {
    const prompt = item.prompt;
    assert.ok(prompt.startsWith('Task: Fictional '), `technique ${item.technique_number} starts with a bounded work fixture`);
    assert.match(prompt, /Use this operating principle:/, `technique ${item.technique_number} applies a technique principle`);
    assert.doesNotMatch(prompt, new RegExp(item.technique_title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `technique ${item.technique_number} omits its title from the prompt`);
    assert.doesNotMatch(prompt, new RegExp(item.category.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), `technique ${item.technique_number} omits its category from the prompt`);
    assert.equal(createHash('sha256').update(prompt).digest('hex'), item.prompt_sha256, `technique ${item.technique_number} prompt digest matches`);

    const task = prompt.split('\n\n')[0];
    const domain = task.match(/^Task: Fictional ([^.]+)\./)?.[1];
    assert.ok(domain, `technique ${item.technique_number} has a domain label`);
    domains.add(domain);
    if (!groups.has(item.fixture_group)) groups.set(item.fixture_group, []);
    groups.get(item.fixture_group).push(task);

    if (item.previous_prompt_sha256) {
      assert.equal(item.execution_status, 'not-run', `revised technique ${item.technique_number} is not misreported as run`);
      assert.equal(item.response, '', `revised technique ${item.technique_number} has no stale response attached`);
      assert.equal(item.response_sha256, '', `revised technique ${item.technique_number} has no stale response digest`);
    }
    if (item.superseded_prompt_sha256s?.length) {
      assert.match(prompt, /Technique-specific check: Address this candidate failure in the supplied case:/, `technique ${item.technique_number} uses its source-defined distinguishing failure mode`);
      assert.ok(item.superseded_prompt_sha256s.includes(item.previous_prompt_sha256), `technique ${item.technique_number} retains its immediate predecessor hash`);
    }
  }

  assert.ok(domains.size >= 8, 'the packet spans at least eight fictional work domains');
  assert.equal(groups.size, 16, 'the packet preserves sixteen matched fixture groups');
  assert.match(runResolver, /currentPromptHashBySlug/);
  assert.match(runResolver, /record\.prompt_sha256 === currentPromptHashBySlug\.get\(record\.technique_slug\)/);
  assert.match(runResolver, /record\.status === 'validated'/);
  assert.match(runResolver, /runTime\(record\)\.localeCompare\(runTime\(current\)\)/);
  for (const [group, tasks] of groups) {
    assert.equal(tasks.length, 8, `fixture group ${group} contains eight matched prompts`);
    assert.equal(new Set(tasks).size, 1, `fixture group ${group} shares the same task facts`);
  }
});

test('the v5.3 runtime batch covers every current technique prompt with a response digest and honest review state', async () => {
  const [packetText, batchText] = await Promise.all([
    readFile(new URL('../src/data/prompt-technique-generated-prompts.json', import.meta.url), 'utf8'),
    readFile(new URL('../src/data/prompt-technique-runs/batch-003.json', import.meta.url), 'utf8'),
  ]);
  const packet = JSON.parse(packetText);
  const batch = JSON.parse(batchText);
  assert.equal(batch.records.length, 128);
  assert.deepEqual(batch.audit_summary, { validated: 113, invalid_hold: 15, missing: 0 });
  assert.equal(new Set(batch.records.map((record) => record.technique_slug)).size, 128);
  const current = new Map(packet.records.map((record) => [record.technique_slug, record]));
  for (const record of batch.records) {
    const prompt = current.get(record.technique_slug);
    assert.ok(prompt, `${record.technique_slug} maps to a current technique`);
    assert.equal(record.prompt_sha256, prompt.prompt_sha256, `${record.technique_slug} run matches current prompt`);
    assert.equal(createHash('sha256').update(record.response).digest('hex'), record.response_sha256, `${record.technique_slug} response digest matches`);
    assert.equal(record.runtime.kernel_version.includes('5.3'), true, `${record.technique_slug} carries its recorded kernel revision`);
    assert.equal(record.runtime.model, 'openai-codex/gpt-6-luna');
    assert.equal(record.runtime.reasoning_effort, 'high');
    assert.equal(record.receipt_sha256.length, 64);
    assert.ok(['validated', 'invalid_hold'].includes(record.status));
    assert.ok(record.semantic_review, `${record.technique_slug} carries its separate response review`);
    if (record.status === 'invalid_hold') assert.doesNotMatch(record.semantic_review, /^PASS/i);
  }
});

test('the Hearthside article families carry substantial personalized review layers', () => {
  assert.equal(hearthsideArticles.length, 8);
  for (const article of hearthsideArticles) {
    const text = article.sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(' ');
    const words = text.trim().split(/\s+/).length;
    assert.ok(article.sections.length >= 9, `${article.code} has at least nine distinct reading sections`);
    assert.ok(words >= 1600, `${article.code} has a substantial long-form treatment`);
    assert.match(text, /\bI\b|\bmy\b/i, `${article.code} uses a situated first-person voice`);
    assert.doesNotMatch(text, /\/home\/|api[_ -]?key|password|secret key|kubeconfig|private key/i, `${article.code} excludes operational and credential detail`);
  }

  assert.equal(Object.keys(fieldJournalExpansions).length, 9);
  for (const [slug, sections] of Object.entries(fieldJournalExpansions)) {
    const text = sections.flatMap((section) => [section.heading, ...section.paragraphs]).join(' ');
    assert.equal(sections.length, 3, `${slug} has three tailored expansion lenses`);
    assert.ok(text.trim().split(/\s+/).length >= 550, `${slug} has a substantive expansion`);
    assert.match(text, /\bI\b|\bmy\b/i, `${slug} is situated in first-person practice`);
    assert.doesNotMatch(text, /\/home\/|api[_ -]?key|password|secret key|kubeconfig|private key/i, `${slug} excludes operational and credential detail`);
  }
});

test('the Ember Circuit library preserves its 32-component core and one grammar extension', async () => {
  const [page, workbench, methodLibrary, wayfinding, systems, methods, theme, codification, navigation] = await Promise.all([
    readFile(new URL('../src/pages/library/index.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ember-circuit/LibraryWorkbench.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ember-circuit/MethodFieldLibrary.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ember-circuit/wayfinding.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ember-circuit/systems.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ResearchCollections.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/ember-circuit-library.css', import.meta.url), 'utf8'),
    readFile(new URL('../docs/ember-circuit-design-system.md', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/HearthNavigation.astro', import.meta.url), 'utf8'),
  ]);

  assert.equal(emberCircuitComponents.length, 33);
  assert.equal(new Set(emberCircuitComponents.map((item) => item.id)).size, 33);
  assert.equal(new Set(emberCircuitComponents.map((item) => item.name)).size, 33);
  for (const band of componentBands) {
    const expectedCount = band === 'knowledge' ? 9 : 8;
    assert.equal(emberCircuitComponents.filter((item) => item.band === band).length, expectedCount);
  }
  assert.equal(emberCircuitComponents.find((item) => item.name === 'ArticleCard')?.sourceName, 'WorkCard');
  assert.equal(emberCircuitComponents.find((item) => item.name === 'FieldCard')?.sourceName, 'PracticeCard');
  assert.equal(emberCircuitTokens.color.field950, '#0e1114');
  assert.equal(emberCircuitTokens.color.paper100, '#f1e7d2');
  assert.equal(publicMethods.length, 35);
  assert.equal(publicMethodCollections.length, 4);
  assert.ok(publicMethods.every((method) => method.prompt && method.exampleOutput && method.purpose && method.pros.length && method.cons.length && method.whenToUse.length));
  assert.equal(new Set(publicMethods.map((method) => method.exampleOutput)).size, 35);
  assert.ok(publicMethods.filter((method) => method.exampleRun.currentEvaluation).every((method) => method.exampleRun.verdict === 'pass' && method.exampleRun.score >= 8));
  assert.ok(publicMethods.every((method) => /Codex method-example harness/.test(method.exampleRun.runner)));
  assert.ok(publicMethods.every((method) => !/Hermes/i.test(method.exampleRun.runner)));
  const boundedReview = publicMethods.find((method) => method.id === 'M-33');
  const evidenceWorkflow = publicMethods.find((method) => method.id === 'M-34');
  const powerOfTwo = publicMethods.find((method) => method.id === 'M-35');
  assert.match(boundedReview?.prompt ?? '', /SIXTEEN CORE RESPONSE LENSES/i);
  for (const lens of ['D Default', 'I Innovative', 'C Creative', 'P Practical', 'M Extensible and Modular', 'N Novel', 'U Unique', 'X Strange', 'G Pragmatic', 'V Useful', 'E Evidence-first', 'H Human-centered', 'R Risk-bounded', 'Y Systemic', 'F Experimental', 'S Synthesis']) {
    assert.match(boundedReview?.prompt ?? '', new RegExp(lens.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
  }
  assert.match(boundedReview?.prompt ?? '', /QUESTION-SPECIFIC MUTATORS/i);
  assert.match(boundedReview?.exampleOutput ?? '', /## Question contract[\s\S]*## Sixteen response lenses[\s\S]*## Eight mutators[\s\S]*## Selection, recommendation, and return/i);
  assert.equal(boundedReview?.exampleRun.currentEvaluation, true);
  assert.equal(boundedReview?.exampleRun.verdict, 'pass');
  assert.equal(boundedReview?.exampleRun.score, 10);
  assert.match(boundedReview?.exampleOutput ?? '', /\*\*Sigil:\*\*[\s\S]*\*\*Human-readable gloss:\*\*/i);
  assert.match(evidenceWorkflow?.prompt ?? '', /six-stage pipeline/i);
  assert.match(evidenceWorkflow?.exampleOutput ?? '', /Rejected transition/i);
  assert.equal(evidenceWorkflow?.exampleRun.currentEvaluation, false);
  assert.match(evidenceWorkflow?.exampleRun.verdict ?? '', /reevaluation pending/i);
  assert.match(evidenceWorkflow?.exampleOutput ?? '', /Sigil transition clauses.*Human gloss/is);
  assert.match(powerOfTwo?.prompt ?? '', /2 → 4 → 8 → 16/);
  assert.match(powerOfTwo?.prompt ?? '', /Never invent or duplicate an idea merely to complete a power of two/i);
  assert.match(powerOfTwo?.prompt ?? '', /information-gain/i);
  assert.match(powerOfTwo?.exampleOutput ?? '', /stop ledger/i);
  assert.equal(powerOfTwo?.exampleRun.currentEvaluation, true);
  assert.equal(powerOfTwo?.exampleRun.verdict, 'pass');
  assert.ok((powerOfTwo?.exampleRun.score ?? 0) >= 8);

  assert.match(page, /LibraryWorkbench client:load/);
  assert.match(page, /articles=\{articles\}/);
  assert.match(page, /fieldcraft=\{fieldcraftLibrary\}/);
  assert.match(wayfinding, /from 'd3'/);
  assert.match(systems, /import\('mermaid'\)/);
  assert.match(workbench, /ArticleCard/);
  assert.match(workbench, /fieldcraft/);
  assert.match(workbench, /CollectionView/);
  assert.match(methodLibrary, /ec-method-sheet__prompt/);
  assert.match(methodLibrary, /ec-method-sheet__output/);
  assert.match(methodLibrary, /A worked model response/);
  assert.match(methodLibrary, /Harness evaluation/);
  assert.match(methodLibrary, /What it makes possible/);
  assert.match(methodLibrary, /Costs and cautions/);
  assert.doesNotMatch(workbench, /BoundaryMap|EvidenceMatrix|SystemContext|Mermaid|React grammar/);
  assert.match(methods, /<MethodFieldLibrary client:load/);
  assert.match(methods, /research-sigil-clarification/);
  assert.match(methods, /publicSigilClarification/);
  assert.ok(navigation.includes("library: 'portfolio'"));
  assert.match(theme, /--ec-bg-parchment:var\(--ec-field-800\)/);
  assert.match(theme, /--room-paper:var\(--ec-field-800\)/);
  assert.match(codification, /32 components in four groups of eight/);
});

test('reading routes stay concise and method summaries own separated tile surfaces', async () => {
  const [surface, landing, journalArticle, hearthsideArticle, library, theme] = await Promise.all([
    readFile(new URL('../src/components/ResearchLabSurface.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ResearchStudioLanding.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/JournalArticleLayout.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/HearthsideArticle.astro', import.meta.url), 'utf8'),
    readFile(new URL('../src/components/ember-circuit/LibraryWorkbench.tsx', import.meta.url), 'utf8'),
    readFile(new URL('../src/styles/ember-circuit-library.css', import.meta.url), 'utf8'),
  ]);

  assert.doesNotMatch(surface, /Continue reading/);
  assert.doesNotMatch(landing, /surface-panel-field-cards/);
  assert.equal((journalArticle.match(/class="journal-article__return"[\s\S]*?<\/nav>/)?.[0].match(/<a\b/g) ?? []).length, 1);
  assert.equal((hearthsideArticle.match(/class="reading-article__footer"[\s\S]*?<\/footer>/)?.[0].match(/<a\b/g) ?? []).length, 1);
  assert.match(library, /Articles & essays/);
  assert.doesNotMatch(library, /Atlas|EvidenceMatrix|SystemContext|design system|React grammar/);
  assert.match(theme, /\.ec-method-summary-grid\{[^}]*gap:clamp\(/);
  assert.match(theme, /\.ec-method-summary>button\{[^}]*border:1px solid var\(--ec-line-500\)/);
  assert.match(theme, /\.ec-method-sheet\{[^}]*background:var\(--ec-field-950\)/);
});
