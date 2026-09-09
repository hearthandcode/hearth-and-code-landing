import { useEffect, useMemo, useState } from 'react';
import { promptCatalogEntries, promptTemplateFile } from '../../data/vendored-data';
import type { CatalogEntry, TemplateTech, TemplateDomain } from '../../data/vendored-data';

const entries = promptCatalogEntries;
const tpl = promptTemplateFile;
const techBySlug = new Map((tpl.techniques || []).map((t) => [t.slug, t]));
const domains = (tpl.domains || []) as TemplateDomain[];

const TYPE_LABELS: Record<string, string> = {
  core: 'Core', contrastive: 'Contrastive', staged: 'Staged', receipt: 'Receipt',
  boundary: 'Boundary', schema: 'Schema', position: 'Position', query: 'Query',
  falsifier: 'Falsifier', adaptive: 'Adaptive',
};

function typeLabel(t: string) { return TYPE_LABELS[t] || t.charAt(0).toUpperCase() + t.slice(1); }

function fillTemplate(template: string | undefined, fields: { key: string; label: string; sample?: string }[], values: Record<string, string>): string {
  if (!template) return '';
  const dom = domains[0];
  const getVal = (k: string) => values[k]?.trim() || fields.find((f) => f.key === k)?.sample || (dom?.samples?.[k] || `{${k}}`);
  return template.replace(/\{\{\s*([\w_.-]+)\s*\}\}/g, (_, key) => getVal(key));
}

export default function PromptCatalogWorkbench() {
  const [type, setType] = useState<string>('all');
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<CatalogEntry | null>(null);
  const [openLab, setOpenLab] = useState<CatalogEntry | null>(null);
  const [domain, setDomain] = useState<string>(domains[0]?.id || '');
  const [values, setValues] = useState<Record<string, string>>({});

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return entries.filter((e) => (type === 'all' || e.type === type) && (!q || [e.title, e.type, ...e.sections.map((s) => s.title)].join(' ').toLowerCase().includes(q)));
  }, [type, query]);

  const sortedTypes = useMemo(() => Array.from(new Set(entries.map((e) => e.type))).sort(), []);
  const tech = openLab ? techBySlug.get(openLab.slug) : undefined;
  const activeDomain = domains.find((d) => d.id === domain) || domains[0];

  useEffect(() => {
    if (openLab && tech?.fields?.length) {
      const next: Record<string, string> = {};
      tech.fields.forEach((f) => { next[f.key] = activeDomain?.samples?.[f.key] || f.sample || ''; });
      setValues(next);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openLab, domain]);

  const generated = tech ? fillTemplate(tech.template, tech.fields || [], values) : '';

  return <div className="ec-catalog-workbench" data-ec-component="PromptCatalogWorkbench">
    <div className="ec-catalog-tools">
      <label><span>Search the catalog</span><input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="technique, type, section…" /></label>
      <div className="ec-catalog-filters" role="group" aria-label="Filter by technique type">
        <button className={type === 'all' ? 'is-active' : ''} onClick={() => setType('all')}>All</button>
        {sortedTypes.map((t) => <button key={t} className={type === t ? 'is-active' : ''} onClick={() => setType(t)}>{typeLabel(t)}</button>)}
      </div>
      <span className="ec-catalog-count">{visible.length} / {entries.length} techniques</span>
    </div>

    <div className="ec-catalog-grid">
      {visible.map((entry) => (
        <button key={entry.slug} className="ec-catalog-card" type="button" onClick={() => setSelected(entry)}>
          <span className="ec-catalog-card__type">{typeLabel(entry.type)}</span>
          <strong>{entry.title}</strong>
          <small>#{entry.number} · open card</small>
        </button>
      ))}
    </div>

    {selected && <dialog className="ec-method-sheet ec-catalog-dialog" open onClose={() => setSelected(null)} onCancel={() => setSelected(null)}>
      <article>
        <header className="ec-method-sheet__masthead">
          <div><p><span>{typeLabel(selected.type)}</span>#{selected.number}</p><h2>{selected.title}</h2></div>
          <div className="ec-method-sheet__masthead-actions">
            <button type="button" onClick={() => { const e = selected; setSelected(null); setOpenLab(e); }}>Open in Prompt Lab ↗</button>
            <button type="button" onClick={() => setSelected(null)} aria-label="Close">×</button>
          </div>
        </header>
        <div className="ec-catalog-dialog__sections">
          {selected.sections.map((s) => (
            <section key={s.title}><h3>{s.title}</h3>{s.body_html ? <div dangerouslySetInnerHTML={{ __html: s.body_html }} /> : <p>{s.body}</p>}</section>
          ))}
        </div>
      </article>
    </dialog>}

    {openLab && tech && <dialog className="ec-method-sheet ec-catalog-lab-dialog" open onClose={() => setOpenLab(null)} onCancel={() => setOpenLab(null)}>
      <article>
        <header className="ec-method-sheet__masthead">
          <div><p><span>{typeLabel(tech.type)}</span>· PROMPT LAB</p><h2>{tech.title}</h2></div>
          <button type="button" onClick={() => setOpenLab(null)} aria-label="Close">×</button>
        </header>
        <div className="ec-catalog-lab">
          <div className="ec-catalog-lab__domain">
            <label>Practice domain</label>
            <select value={domain} onChange={(e) => setDomain(e.target.value)}>
              {domains.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
            </select>
            {activeDomain?.note && <p>{activeDomain.note}</p>}
          </div>
          {tech.fields?.length ? <div className="ec-catalog-lab__fields">
            {tech.fields.map((f) => (
              <label key={f.key}><span>{f.label}</span>
                {f.kind === 'textarea' ? <textarea value={values[f.key] || ''} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} rows={3} /> : <input value={values[f.key] || ''} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} />}
              </label>
            ))}
          </div> : <p className="ec-catalog-lab__nofields">This technique has a template pattern with no dynamic fields; copy it directly.</p>}
          {generated && <div className="ec-catalog-lab__output">
            <label>Generated prompt</label>
            <pre>{generated}</pre>
            <button type="button" onClick={() => navigator.clipboard.writeText(generated)}>Copy prompt</button>
          </div>}
        </div>
      </article>
    </dialog>}
  </div>;
}