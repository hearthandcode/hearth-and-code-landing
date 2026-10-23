import { useEffect, useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';
import { publicMethodCollections } from '../../data/public-method-library';
import packet from '../../data/prompt-technique-generated-prompts.json';
import MethodFieldLibrary from './MethodFieldLibrary';
import PromptCategoryTree from './PromptCategoryTree';
import TaskTemplateBrowser, { type TaskTemplateRecord } from './TaskTemplateBrowser';

interface Station { number: string; title: string; phrase: string; moves: { label: string; detail: string }[]; }
interface CaseStudy { name: string; task: string; method: string; input: string; return: string; limit: string; atlas_technique: { slug: string; title: string; id: string }; sources?: { href: string; title: string }[]; }
interface SourceLayer { name: string; count: string; detail: string; notes?: { label: string; detail: string }[]; }
interface HistoricalTrace { title: string; task: string; design: string; observation: string; limit: string; source_title: string; source_href: string; }
interface Props { taskTemplates?: TaskTemplateRecord[]; stations: Station[]; cases: CaseStudy[]; sourceLayers: SourceLayer[]; batchNote: string; historicalTrace: HistoricalTrace; relatedArticles: { title: string; href: string; detail: string }[]; }
const views = ['Practice', 'Techniques', 'Prompt Catalog', 'Case Studies'];
const keys = ['practice', 'techniques', 'prompts', 'cases'];
function arrowTab(event: KeyboardEvent<HTMLButtonElement>, index: number, count: number, choose: (next: number) => void) {
  const next = event.key === 'ArrowRight' ? (index + 1) % count : event.key === 'ArrowLeft' ? (index + count - 1) % count : event.key === 'Home' ? 0 : event.key === 'End' ? count - 1 : -1;
  if (next < 0) return;
  event.preventDefault(); choose(next);
  (event.currentTarget.parentElement?.querySelectorAll('button')[next] as HTMLButtonElement)?.focus();
}
export default function MethodsWorkbench({ taskTemplates = [], stations, cases, sourceLayers, batchNote, historicalTrace, relatedArticles }: Props) {
  const [catalogLayer, setCatalogLayer] = useState(0);
  const [view, setView] = useState(0), [family, setFamily] = useState(0), [caseIndex, setCaseIndex] = useState(0);
  const [query, setQuery] = useState(''), [slug, setSlug] = useState(packet.records[0].technique_slug), [copied, setCopied] = useState('Copy prompt');
  useEffect(() => {
    const read = () => {
      const p = new URLSearchParams(window.location.search), hash = window.location.hash.slice(1);
      const legacy = hash === 'prompt-techniques' || hash === 'prompt-lab' ? 'techniques' : hash === 'worked-examples-title' ? 'cases' : hash === 'catalog-model-title' ? 'prompts' : 'practice';
      const i = keys.indexOf(p.has('technique') ? 'techniques' : p.get('view') ?? legacy); setView(i < 0 ? 0 : i);
      const f = publicMethodCollections.findIndex(c => c.entries.some(m => m.id.toLowerCase() === hash)); if (f >= 0) setFamily(f);
    };
    read(); window.addEventListener('popstate', read); window.addEventListener('hashchange', read); return () => { window.removeEventListener('popstate', read); window.removeEventListener('hashchange', read); };
  }, []);
  const choose = (index: number) => { setView(index); const url = new URL(window.location.href); url.searchParams.set('view', keys[index]); url.searchParams.delete('technique'); window.history.replaceState(null, '', url); };
  const records = useMemo(() => packet.records.filter(r => `${r.technique_title} ${r.category} ${r.prompt}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const prompt = packet.records.find(r => r.technique_slug === slug) ?? packet.records[0];
  const collection = publicMethodCollections[family];
  return <div className="methods-workbench" id="methods-workbench">
    <div className="methods-workbench__tabs" role="tablist" aria-label="Methods layers">{views.map((name, index) => <button key={name} type="button" role="tab" id={`methods-tab-${index}`} aria-controls={`methods-panel-${index}`} aria-selected={view === index} tabIndex={view === index ? 0 : -1} onClick={() => choose(index)} onKeyDown={e => arrowTab(e, index, views.length, choose)}>{name}</button>)}</div>
    <section role="tabpanel" id="methods-panel-0" aria-labelledby="methods-tab-0" hidden={view !== 0} tabIndex={0}>
      <header><p>Core practice</p><h2>Choose one useful instrument.</h2><p>Frame the work, hold its boundary, make a checkable artifact, and leave a way back.</p></header>
      <div className="methods-workbench__stations">{stations.map(s => <details key={s.number}><summary>{s.number} · {s.title}</summary><p>{s.phrase}</p><dl>{s.moves.map(m => <div key={m.label}><dt>{m.label}</dt><dd>{m.detail}</dd></div>)}</dl></details>)}</div>
      <label className="methods-workbench__selector">Practice family<select value={family} onChange={e => setFamily(Number(e.target.value))}>{publicMethodCollections.map((c, index) => <option key={c.id} value={index}>{c.title}</option>)}</select></label>
      <div id="field-library"><h3 id="method-family-title">{collection.title}</h3><p>{collection.framing}</p><MethodFieldLibrary methods={collection.entries} labelledBy="method-family-title" /></div>
    </section>
    <section role="tabpanel" id="methods-panel-1" aria-labelledby="methods-tab-1" hidden={view !== 1} tabIndex={0}>
      <header id="prompt-techniques"><p>Technique explorer</p><h2>Find a technique. Inspect its use.</h2><p>Choose a category, then open a four-section sheet with a practical prompt and its recorded response.</p></header><PromptCategoryTree />
    </section>
    <section role="tabpanel" id="methods-panel-2" aria-labelledby="methods-tab-2" hidden={view !== 2} tabIndex={0}>
      <header><p>Applied prompt collection</p><h2>Inspect an instruction before adapting it.</h2><p>These fixed teaching prompts accompany the technique selection. The separate task-template drafts retain their own source and review state.</p></header>
      <div className="methods-workbench__tabs" role="tablist" aria-label="Prompt collections">{['Applied prompts', 'Task templates'].map((name, index) => <button type="button" role="tab" key={name} id={`catalog-tab-${index}`} aria-controls={`catalog-panel-${index}`} aria-selected={catalogLayer === index} tabIndex={catalogLayer === index ? 0 : -1} onClick={() => setCatalogLayer(index)} onKeyDown={e => arrowTab(e, index, 2, setCatalogLayer)}>{name}</button>)}</div>
      <section role="tabpanel" id="catalog-panel-0" aria-labelledby="catalog-tab-0" hidden={catalogLayer !== 0}>
      <label className="methods-workbench__selector">Find a task or technique<input type="search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Research, code review, knowledge engineering…" /></label>
      <div className="methods-workbench__prompt-browser"><nav aria-label="Applied prompts"><p aria-live="polite">{records.length} prompts</p>{records.map(r => <button type="button" key={r.technique_slug} aria-current={slug === r.technique_slug ? 'true' : undefined} onClick={() => { setSlug(r.technique_slug); setCopied('Copy prompt'); }}><small>{r.category}</small><strong>{r.technique_title}</strong></button>)}</nav><article><p>Fictional task · {prompt.source_id}</p><h3>{prompt.technique_title}</h3><pre>{prompt.prompt}</pre><div className="methods-workbench__actions"><button type="button" onClick={async () => { try { await navigator.clipboard.writeText(prompt.prompt); setCopied('Copied'); } catch { setCopied('Select the prompt to copy'); } }}>{copied}</button><a href={`/methods/?technique=${prompt.technique_slug}#methods-workbench`}>Inspect its response →</a></div><small className="methods-workbench__digest">Prompt SHA-256: {prompt.prompt_sha256}</small></article></div>
      </section>
      <section role="tabpanel" id="catalog-panel-1" aria-labelledby="catalog-tab-1" hidden={catalogLayer !== 1}>{taskTemplates.length > 0 && <p>Private local review: 512 candidate templates across 64 categories. The earlier 256-template plan and expanded 512-template source remain distinct. This dataset is excluded from the public build.</p>}<TaskTemplateBrowser records={taskTemplates} /></section>
      <details className="methods-workbench__records"><summary>Source catalog and run records</summary><p>{batchNote}</p>{sourceLayers.map(s => <article key={s.name}><h3>{s.name}</h3><strong>{s.count}</strong><p>{s.detail}</p>{s.notes?.map(n => <p key={n.label}><strong>{n.label}: </strong>{n.detail}</p>)}</article>)}</details>
    </section>
    <section role="tabpanel" id="methods-panel-3" aria-labelledby="methods-tab-3" hidden={view !== 3} tabIndex={0}>
      <header id="worked-examples-title"><p>Four independent case-study reports</p><h2>See a technique at work.</h2><p>Fictional teaching cases make the procedure inspectable. Inputs and possible returns remain distinct from executed evaluations.</p></header>
      <div className="methods-workbench__case-tabs" role="tablist" aria-label="Case-study reports">{cases.map((c, index) => <button key={c.name} role="tab" id={`case-tab-${index}`} aria-controls={`case-report-${index}`} aria-selected={caseIndex === index} tabIndex={caseIndex === index ? 0 : -1} onClick={() => setCaseIndex(index)} onKeyDown={e => arrowTab(e, index, cases.length, setCaseIndex)}><span>0{index + 1}</span>{c.name}</button>)}</div>
      {cases.map((c, index) => <article key={c.name} className="methods-workbench__report" role="tabpanel" id={`case-report-${index}`} aria-labelledby={`case-tab-${index}`} hidden={caseIndex !== index} tabIndex={0}>
        <header><p>Case report 0{index + 1} · fictional teaching example</p><h3>{c.name}</h3></header>
        <nav aria-label="Report sections">{['Task', 'Approach', 'Input', 'Return', 'Limits'].map((label, section) => <a key={label} href={`#case-section-${index}-${section}`}>{label}</a>)}</nav>
        {[['Task', c.task], ['Approach', c.method], ['Illustrative input', c.input], ['Possible return', c.return], ['Limits and review', c.limit]].map(([title, text], section) => <section id={`case-section-${index}-${section}`} key={title}><h4>{title}</h4><p>{text}</p></section>)}
        <footer><a href={`/methods/?technique=${c.atlas_technique.slug}#methods-workbench`}>Inspect {c.atlas_technique.title} →</a>{c.sources?.length ? <ul>{c.sources.map(s => <li key={s.href}><a href={s.href}>{s.title}</a></li>)}</ul> : null}</footer>
      </article>)}
      <details className="methods-workbench__records"><summary>Historical model-call report and further reading</summary><article className="methods-system-trace"><h3>{historicalTrace.title}</h3><p>{historicalTrace.task}</p><p>{historicalTrace.design}</p><p>{historicalTrace.observation}</p><p>{historicalTrace.limit}</p><a href={historicalTrace.source_href}>{historicalTrace.source_title} →</a></article>{relatedArticles.map(a=><article key={a.href}><h3><a href={a.href}>{a.title}</a></h3><p>{a.detail}</p></article>)}</details>
    </section>
  </div>;
}
