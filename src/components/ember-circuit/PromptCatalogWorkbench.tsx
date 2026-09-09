import { useEffect, useMemo, useState } from 'react';
import { promptCatalogEntries, promptTemplateFile } from '../../data/vendored-data';
import type { CatalogEntry, TemplateDomain } from '../../data/vendored-data';
import { PromptCardTile, PromptCardSheet } from './PromptCard';

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

const TYPE_TINTS: Record<string, string> = {
  core: 'rgba(244,184,96,0.10)',
  contrastive: 'rgba(185,148,237,0.12)',
  staged: 'rgba(63,224,208,0.12)',
  receipt: 'rgba(255,196,108,0.10)',
  boundary: 'rgba(194,90,58,0.14)',
  schema: 'rgba(63,224,208,0.10)',
  position: 'rgba(185,148,237,0.10)',
  query: 'rgba(255,196,108,0.10)',
  falsifier: 'rgba(194,90,58,0.10)',
  adaptive: 'rgba(63,224,208,0.10)',
};

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
  }, [openLab, domain, tech, activeDomain]);

  const generated = tech ? fillTemplate(tech.template, tech.fields || [], values) : '';

  return (
    <div className="ec-catalog-workbench" data-ec-component="PromptCatalogWorkbench">
      <div className="ec-catalog-tools">
        <label className="ec-catalog-search">
          <span>Search the catalog</span>
          <input type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="technique, type, section…" />
        </label>
        <div className="ec-catalog-filters" role="group" aria-label="Filter by technique type">
          {sortedTypes.map((t) => (
            <button
              key={t}
              type="button"
              className={type === t ? 'is-active' : ''}
              onClick={() => setType(t)}
              style={{ ['--btn-tint' as any]: TYPE_TINTS[t] || 'transparent' }}
            >
              {typeLabel(t)}
            </button>
          ))}
          <button
            type="button"
            className={`ec-catalog-filter-clear ${type === 'all' ? 'is-active' : ''}`}
            onClick={() => setType('all')}
          >All</button>
        </div>
        <span className="ec-catalog-count">{visible.length} / {entries.length} techniques</span>
      </div>

      <div className="ec-prompt-card-grid">
        {visible.map((entry) => (
          <PromptCardTile key={entry.slug} entry={entry} onOpen={() => setSelected(entry)} />
        ))}
      </div>

      {selected && (
        <PromptCardSheet
          entry={selected}
          tech={techBySlug.get(selected.slug)}
          onClose={() => setSelected(null)}
          onOpenLab={() => { const e = selected; setSelected(null); setOpenLab(e); }}
        />
      )}

      {openLab && tech && (
        <div className="ec-sheet-backdrop" onClick={() => setOpenLab(null)} role="presentation">
          <article className="ec-prompt-sheet ec-prompt-sheet--lab" onClick={(e) => e.stopPropagation()} aria-labelledby={`lab-${tech.slug}`}>
            <header className="ec-prompt-sheet__masthead">
              <div className="ec-prompt-sheet__meta">
                <span className="ec-prompt-sheet__type">{typeLabel(tech.type)}</span>
                <span className="ec-prompt-sheet__num">PROMPT LAB</span>
              </div>
              <h2 id={`lab-${tech.slug}`} className="ec-prompt-sheet__title">{tech.title}</h2>
              <div className="ec-prompt-sheet__actions">
                <button type="button" className="ec-prompt-sheet__close" onClick={() => setOpenLab(null)} aria-label="Close lab">×</button>
              </div>
            </header>
            <div className="ec-prompt-lab">
              <div className="ec-prompt-lab__row">
                <label className="ec-prompt-lab__domain">
                  <span>Practice domain</span>
                  <select value={domain} onChange={(e) => setDomain(e.target.value)}>
                    {domains.map((d) => <option key={d.id} value={d.id}>{d.label}</option>)}
                  </select>
                </label>
                {activeDomain?.note && <p className="ec-prompt-lab__note">{activeDomain.note}</p>}
              </div>
              {tech.fields?.length ? (
                <div className="ec-prompt-lab__fields">
                  {tech.fields.map((f) => (
                    <label key={f.key} className="ec-prompt-lab__field">
                      <span>{f.label}</span>
                      {f.kind === 'textarea' ? (
                        <textarea value={values[f.key] || ''} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} rows={3} />
                      ) : (
                        <input value={values[f.key] || ''} onChange={(e) => setValues((v) => ({ ...v, [f.key]: e.target.value }))} />
                      )}
                    </label>
                  ))}
                </div>
              ) : (
                <p className="ec-prompt-lab__nofields">This technique has a template pattern with no dynamic fields; copy it directly.</p>
              )}
              {generated && (
                <div className="ec-prompt-lab__output">
                  <label>Generated prompt</label>
                  <pre>{generated}</pre>
                  <button
                    type="button"
                    onClick={() => navigator.clipboard.writeText(generated)}
                  >Copy prompt</button>
                </div>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  );
}
