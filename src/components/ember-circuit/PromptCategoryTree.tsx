import { useMemo, useState } from 'react';
import { promptCatalogEntries, promptTemplateFile } from '../../data/vendored-data';
import type { CatalogEntry } from '../../data/vendored-data';
import { PromptCardSheet, PromptCardTile } from './PromptCard';

type CategoryNode = {
  document: string;
  category: string;
  entries: CatalogEntry[];
};

type DocumentNode = {
  document: string;
  categories: CategoryNode[];
};

function buildTree(entries: CatalogEntry[]): DocumentNode[] {
  const documents = new Map<string, Map<string, CatalogEntry[]>>();
  for (const entry of entries) {
    const categories = documents.get(entry.document) ?? new Map<string, CatalogEntry[]>();
    documents.set(entry.document, categories);
    const items = categories.get(entry.category) ?? [];
    items.push(entry);
    categories.set(entry.category, items);
  }
  return [...documents.entries()].map(([document, categories]) => ({
    document,
    categories: [...categories.entries()].map(([category, items]) => ({
      document,
      category,
      entries: [...items].sort((a, b) => a.number - b.number),
    })),
  }));
}

export default function PromptCategoryTree() {
  const tree = useMemo(() => buildTree(promptCatalogEntries), []);
  const firstCategory = tree[0]?.categories[0];
  const [selectedKey, setSelectedKey] = useState(() => `${firstCategory?.document}::${firstCategory?.category}`);
  const [selectedTechnique, setSelectedTechnique] = useState<CatalogEntry | null>(null);
  const templates = useMemo(() => new Map(promptTemplateFile.techniques.map((tech) => [tech.slug, tech])), []);

  const selected = tree.flatMap((document) => document.categories)
    .find((category) => `${category.document}::${category.category}` === selectedKey) ?? firstCategory;

  if (!selected) return null;

  return (
    <div className="ec-prompt-tree" data-ec-component="PromptCategoryTree">
      <aside className="ec-prompt-tree__navigator" aria-label="Prompt technique atlas tree">
        <header>
          <p>Atlas navigation</p>
          <strong>{tree.length} documents · {tree.reduce((total, document) => total + document.categories.length, 0)} categories</strong>
          <small>Select a category to load its bounded technique set.</small>
        </header>
        <div className="ec-prompt-tree__documents">
          {tree.map((document, index) => {
            const isCurrentDocument = document.document === selected.document;
            return (
              <details key={document.document} open={isCurrentDocument}>
                <summary>
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  <strong>{document.document}</strong>
                  <small>{document.categories.length} categories</small>
                </summary>
                <ol>
                  {document.categories.map((category) => {
                    const key = `${category.document}::${category.category}`;
                    const selectedCategory = key === selectedKey;
                    return (
                      <li key={key}>
                        <button
                          type="button"
                          aria-current={selectedCategory ? 'true' : undefined}
                          onClick={() => setSelectedKey(key)}
                        >
                          <span>{category.category}</span>
                          <b>{category.entries.length}</b>
                        </button>
                      </li>
                    );
                  })}
                </ol>
              </details>
            );
          })}
        </div>
      </aside>

      <section className="ec-prompt-tree__selection" aria-live="polite" aria-labelledby="prompt-category-title">
        <header className="ec-prompt-tree__selection-head">
          <p><span>{selected.document}</span><i aria-hidden="true">/</i>{selected.category}</p>
          <h3 id="prompt-category-title">{selected.category}</h3>
          <div>
            <span>{selected.entries.length} techniques in this category</span>
            <span>Each opens a four-section disposition.</span>
          </div>
        </header>
        <div className="ec-prompt-card-grid">
          {selected.entries.map((entry) => (
            <PromptCardTile key={entry.slug} entry={entry} onOpen={() => setSelectedTechnique(entry)} />
          ))}
        </div>
      </section>

      {selectedTechnique && (
        <PromptCardSheet
          entry={selectedTechnique}
          tech={templates.get(selectedTechnique.slug)}
          onClose={() => setSelectedTechnique(null)}
        />
      )}
    </div>
  );
}
