import { useMemo, useState } from 'react';
import type { PublicMethodCard } from '../../data/public-method-library';
import MethodFieldLibrary from './MethodFieldLibrary';
import { ArticleCard, CollectionView } from './presentation';
import { AnchorBar } from './wayfinding';

export interface LibraryArticle { code: string; format: string; title: string; dek: string; readTime: string; themes: string[]; href: string; }
interface Props { articles: LibraryArticle[]; methods: PublicMethodCard[]; }

const tabs = [
  { id: 'reading', label: 'Articles & essays' },
  { id: 'methods', label: 'Methods' },
] as const;

export default function LibraryWorkbench({ articles, methods }: Props) {
  const [active, setActive] = useState<(typeof tabs)[number]['id']>('reading');
  const [query, setQuery] = useState('');
  const [density, setDensity] = useState<'comfortable' | 'compact'>('compact');
  const normalized = query.trim().toLowerCase();
  const visibleArticles = useMemo(() => articles.filter((item) => !normalized || [item.title, item.dek, item.format, ...item.themes].join(' ').toLowerCase().includes(normalized)), [articles, normalized]);
  const visibleMethods = useMemo(() => methods.filter((item) => !normalized || [item.id, item.title, item.form, item.summary, item.purpose, item.influence].join(' ').toLowerCase().includes(normalized)), [methods, normalized]);

  return <div className={`ec-library-workbench ec-density--${density}`}>
    <div className="ec-library-tools">
      <label><span>Search the reading room</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="articles, essays, methods…" /></label>
      <fieldset><legend>Density</legend><button type="button" aria-pressed={density === 'comfortable'} onClick={() => setDensity('comfortable')}>Comfortable</button><button type="button" aria-pressed={density === 'compact'} onClick={() => setDensity('compact')}>Compact</button></fieldset>
    </div>
    <AnchorBar label="Library views" items={tabs.map((tab) => ({ ...tab }))} active={active} onSelect={(id) => setActive(id as typeof active)} />

    {active === 'reading' && <div className="ec-library-panel" role="tabpanel">
      <CollectionView eyebrow="Reading room" title="Articles, essays, and Field Journal entries" description="Browse the published record by title, theme, or concern. Each piece keeps its form and reading time visible.">
        <div className="ec-article-grid">{visibleArticles.map((article) => <ArticleCard key={article.href} {...article} />)}</div>
      </CollectionView>
    </div>}

    {active === 'methods' && <div className="ec-library-panel" role="tabpanel">
      <CollectionView eyebrow="Methods / Field Cards" title="Instruments for bounded research practice" description="Each card offers a distinctive prompt structure, an influence seam, and a limit to preserve when you adapt it.">
        <MethodFieldLibrary methods={visibleMethods} />
      </CollectionView>
    </div>}
  </div>;
}
