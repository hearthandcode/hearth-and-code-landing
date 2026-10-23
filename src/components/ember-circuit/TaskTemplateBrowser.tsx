import { useMemo, useState } from 'react';
import type { KeyboardEvent } from 'react';

// Data is supplied by the caller after its own disclosure/release decision.
// This component neither reads the internal catalog nor invokes a model.
export interface TaskTemplateRecord {
  id: string;
  title: string;
  category: string;
  categoryId: string;
  family: string;
  review: string;
  prompt: string;
  inputs: { id: string; label: string; type: string; required: boolean }[];
  source: string;
  sourceSha256: string;
  promptSha256: string;
}

export default function TaskTemplateBrowser({ records = [] }: { records?: TaskTemplateRecord[] }) {
  const [query, setQuery] = useState('');
  const [family, setFamily] = useState('all');
  const [selectedId, setSelectedId] = useState(records[0]?.id ?? '');
  const [section, setSection] = useState(0);
  const [values, setValues] = useState<Record<string, string>>({});
  const [preview, setPreview] = useState('');
  const [notice, setNotice] = useState('');
  const families = useMemo(() => [...new Set(records.map(r => r.family))].sort(), [records]);
  const visible = useMemo(() => records.filter(r => (family === 'all' || r.family === family) && `${r.title} ${r.id} ${r.category}`.toLowerCase().includes(query.toLowerCase())), [records, family, query]);
  const record = visible.find(r => r.id === selectedId) ?? visible[0];
  const sections = ['Overview', 'Input contract', 'Prompt', 'Provenance'];
  const select = (id: string) => { setSelectedId(id); setValues({}); setPreview(''); setNotice(''); setSection(0); };
  function keySection(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    const next = event.key === 'ArrowRight' ? (index + 1) % 4 : event.key === 'ArrowLeft' ? (index + 3) % 4 : event.key === 'Home' ? 0 : event.key === 'End' ? 3 : null;
    if (next === null) return;
    event.preventDefault(); setSection(next); document.getElementById(`template-section-tab-${next}`)?.focus();
  }
  if (!records.length) return <section className="task-template-browser" aria-labelledby="task-template-title">
    <h3 id="task-template-title">Separate task-template catalog</h3>
    <p>Template bodies remain private pending the exact catalog-release decision. No internal template data is loaded by this component.</p>
  </section>;
  return <section className="task-template-browser" aria-labelledby="task-template-title">
    <header><h3 id="task-template-title">Choose a task. Inspect its contract.</h3><p>Candidate templates retain their own review state. Composing a local preview does not run a model or authorize an effect.</p></header>
    <div className="task-template-browser__filters">
      <label>Find a task template<input type="search" value={query} onChange={e => setQuery(e.target.value)} /></label>
      <label>Template family<select value={family} onChange={e => setFamily(e.target.value)}><option value="all">All families</option>{families.map(f => <option key={f}>{f}</option>)}</select></label>
    </div>
    <div className="methods-workbench__prompt-browser">
      <nav aria-label="Task templates"><p aria-live="polite">{visible.length} matching templates</p>{visible.map(r => <button key={r.id} type="button" aria-current={record?.id === r.id ? 'true' : undefined} onClick={() => select(r.id)}><small>{r.category} / {r.family}</small><strong>{r.title}</strong></button>)}</nav>
      {record ? <article><header><p>{record.id} / candidate / {record.review}</p><h3>{record.title}</h3></header>
        <div role="tablist" aria-label="Template sections" className="methods-workbench__tabs">{sections.map((label, index) => <button key={label} type="button" id={`template-section-tab-${index}`} role="tab" aria-controls={`template-section-panel-${index}`} aria-selected={section === index} tabIndex={section === index ? 0 : -1} onClick={() => setSection(index)} onKeyDown={event => keySection(event, index)}>{label}</button>)}</div>
        <section role="tabpanel" id="template-section-panel-0" aria-labelledby="template-section-tab-0" hidden={section !== 0} tabIndex={0}><h4>Task orientation</h4><p>{record.category} / {record.family}</p><p>{record.title}</p><p>{record.inputs.length} declared inputs. Candidate status does not establish effectiveness, runtime availability, or standards adoption.</p></section>
        <section role="tabpanel" id="template-section-panel-1" aria-labelledby="template-section-tab-1" hidden={section !== 1} tabIndex={0}><h4>Declared input contract</h4><dl>{record.inputs.map(input => <div key={input.id}><dt>{input.label}</dt><dd><code>{input.id}</code> · {input.type} · {input.required ? 'required' : 'optional'}</dd></div>)}</dl></section>
        <section role="tabpanel" id="template-section-panel-2" aria-labelledby="template-section-tab-2" hidden={section !== 2} tabIndex={0}><h4>Source prompt</h4><pre>{record.prompt}</pre><details><summary>Compose a local prompt preview</summary>
          <form onSubmit={event => { event.preventDefault(); const missing=record.inputs.filter(i=>i.required&&!values[i.id]?.trim()).map(i=>i.label); if(missing.length){setNotice(`Hold: supply ${missing.join(', ')}.`);setPreview('');return;}let result=record.prompt;for(const input of record.inputs)result=result.replaceAll(`{{${input.id}}}`,values[input.id]??'');setPreview(result);setNotice('Local preview composed. No model call or external effect.'); }}>
            {record.inputs.map(input => <label key={input.id}>{input.label} ({input.type})<textarea value={values[input.id] ?? ''} onChange={e=>setValues({...values,[input.id]:e.target.value})} /></label>)}
            <button type="submit">Compose preview</button>
          </form><p role="status">{notice}</p>{preview && <pre aria-label="Composed prompt preview">{preview}</pre>}
        </details></section>
        <section role="tabpanel" id="template-section-panel-3" aria-labelledby="template-section-tab-3" hidden={section !== 3} tabIndex={0}><h4>Source identity and review</h4><p>{record.source}</p><p>Candidate / {record.review}. Verified status is not asserted.</p><small className="methods-workbench__digest">Source SHA-256: {record.sourceSha256}</small><small className="methods-workbench__digest">Prompt SHA-256: {record.promptSha256}</small></section>
      </article> : <article><h3>No matching task templates</h3><p>Change the search or family selection.</p></article>}
    </div>
  </section>;
}
