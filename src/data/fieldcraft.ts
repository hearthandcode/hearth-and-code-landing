import fieldcraftPublication from './vendored/fieldcraft-publication.json';
import type { LibraryArticle } from '../components/ember-circuit/LibraryWorkbench';

interface FieldcraftArticle {
  id: string;
  slug: string;
  title: string;
  subject: string;
  category: string;
  description: string;
  reading_minutes: number;
  status: string;
  verified: boolean;
  deck: string;
  source_refs: (string | { title: string; url: string })[];
}

const articles = (fieldcraftPublication.articles as unknown as FieldcraftArticle[]) || [];

function refLabel(ref: string | { title: string; url: string }): string {
  if (typeof ref === 'string') return ref;
  return ref.title;
}

export const fieldcraftLibrary: LibraryArticle[] = articles.map((a) => ({
  code: a.id,
  format: 'Fieldcraft',
  title: a.title,
  dek: a.deck,
  readTime: `${a.reading_minutes} min read`,
  themes: [a.subject, a.category],
  href: `https://hearthandcode.github.io/${a.slug}.html`,
}));

export const fieldcraftByCategory = (category: string) => articles.filter((a) => a.category === category);

export const fieldcraftSubjectIndex = () => {
  const counts = new Map<string, number>();
  articles.forEach((a) => counts.set(a.subject, (counts.get(a.subject) || 0) + 1));
  return Array.from(counts.entries()).sort((x, y) => y[1] - x[1]);
};

export { articles as fieldcraftArticles };
export { refLabel };