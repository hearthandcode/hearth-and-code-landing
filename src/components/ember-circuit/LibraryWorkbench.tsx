import { useMemo, useState } from 'react';
import { ArticleCard, CollectionView } from './presentation';
import { AnchorBar } from './wayfinding';

export interface LibraryArticle { code: string; format: string; title: string; dek: string; readTime: string; themes: string[]; href: string; }
interface Props { articles: LibraryArticle[]; fieldcraft?: LibraryArticle[]; }

const tabs = [
  { id: 'reading', label: 'Articles & essays' },
  { id: 'fieldcraft', label: 'Fieldcraft' },
] as const;

export default function LibraryWorkbench({ articles, fieldcraft = [] }: Props) {
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('reading');
  const [query, setQuery] = useState('');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('compact');
  const normalized = query.trim().toLowerCase();
  const visibleArticles = useMemo(() => articles.filter((item) => !normalized || [item.title, item.dek, item.format, ...item.themes].join(' ').toLowerCase().includes(normalized)), [articles, normalized]);
  const visibleFieldcraft = useMemo(() => fieldcraft.filter((item) => !normalized || [item.title, item.dek, item.format, ...item.themes].join(' ').toLowerCase().includes(normalized)), [fieldcraft, normalized]);

  return <div className={`ec-library-workbench ec-density--${density}`}>
    <div className="ec-library-tools">
      <label><span>Search the reading room</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="articles, essays, methods…" /></label>
      <fieldset><legend>Density</legend><button type="button" aria-pressed={density === 'comfortable'} onClick={() => setDensity('comfortable')}>Comfortable</button><button type="button" aria-pressed={density === 'compact'} onClick={() => setDensity('compact')}>Compact</button></fieldset>
    </div>
    <AnchorBar label="Library views" items={tabs.map((tab) => ({ ...tab }))} active={active} onSelect={(id) => setActive(id as typeof active)} />

    {active === 'reading' && <div className="ec-library-panel" role="tabpanel">
      <CollectionView eyebrow="Reading room" title="Articles, essays, and Field Journal entries" description="Browse these reading projections by title, theme, or concern. Earlier publication and current local review status remain distinct; revised copy has not been republished.">
        <div className="ec-article-grid">{visibleArticles.map((article) => <ArticleCard key={article.href} {...article} />)}</div>
      </CollectionView>
    </div>}

    {active === 'fieldcraft' && <div className="ec-library-panel" role="tabpanel">
      <CollectionView eyebrow="Fieldcraft" title="32 mathematical design dispositions" description="Review-candidate notes derived from the available index metadata. Each frames a formalization, its proposed evidence and limits, and illustrative TypeScript witnesses; those fixtures do not validate a general law, and the Lean-style shells have not been checked by Lean.">
        <div className="ec-article-grid">{visibleFieldcraft.map((article) => <ArticleCard key={article.href} {...article} />)}</div>
      </CollectionView>
    </div>}
  </div>;
}
