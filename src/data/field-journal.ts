export interface FieldJournalItem {
  id: string;
  title: string;
  description: string;
  publishedDate: string;
  readingTimeMinutes: number | null;
  tags: string[];
  articleUrl: string;
}

export interface FieldJournalFeed {
  source: 'live-feed' | 'source-snapshot';
  homeUrl: string;
  rssUrl: string;
  items: FieldJournalItem[];
}

const journalOrigin = 'https://blog.hearthandcode.dev';
const defaultFeedUrl = `${journalOrigin}/journal-feed.json`;

// This snapshot mirrors the published-only journal source at the named source revision.
// It keeps local candidate builds reviewable until the source-owned feed has been released.
const sourceSnapshot: FieldJournalFeed = {
  source: 'source-snapshot',
  homeUrl: `${journalOrigin}/`,
  rssUrl: `${journalOrigin}/rss.xml`,
  items: [
    {
      id: 'a-hub-that-can-explain-itself',
      title: 'A Hub That Can Explain Itself',
      description: 'An eight-stage practical journey for building a small provenance-aware layer around AI-assisted knowledge work.',
      publishedDate: '2026-09-04',
      readingTimeMinutes: 12,
      tags: ['knowledge-hub', 'provenance', 'agents'],
      articleUrl: `${journalOrigin}/posts/a-hub-that-can-explain-itself/`,
    },
    {
      id: 'the-hearthside-meta-architect',
      title: 'The Hearthside Meta-Architect',
      description: 'A personal field guide to a humane, governed workbench for creative and technical practice.',
      publishedDate: '2026-08-31',
      readingTimeMinutes: 9,
      tags: ['archetype', 'practice', 'governance'],
      articleUrl: `${journalOrigin}/posts/the-hearthside-meta-architect/`,
    },
    {
      id: 'specification-driven-prompting',
      title: 'When a Prompt Becomes a Small Charter',
      description: 'A field note on turning a prompt into a reviewable agreement about purpose, boundaries, and return.',
      publishedDate: '2026-08-28',
      readingTimeMinutes: 8,
      tags: ['prompting', 'specification', 'methods'],
      articleUrl: `${journalOrigin}/posts/specification-driven-prompting/`,
    },
    {
      id: 'every-claim-needs-a-return-route',
      title: 'Every Claim Needs a Trail Back Home',
      description: 'A public note on designing claims, sources, and correction paths so a reader can ask better questions.',
      publishedDate: '2026-08-13',
      readingTimeMinutes: 10,
      tags: ['provenance', 'evidence', 'correction'],
      articleUrl: `${journalOrigin}/posts/every-claim-needs-a-return-route/`,
    },
  ],
};

function isJournalArticleUrl(value: unknown): value is string {
  if (typeof value !== 'string') return false;
  try {
    const url = new URL(value);
    return url.origin === journalOrigin && /^\/posts\/[^/]+\/$/.test(url.pathname);
  } catch {
    return false;
  }
}

function parseFeed(value: unknown): FieldJournalFeed | null {
  if (!value || typeof value !== 'object') return null;
  const record = value as Record<string, unknown>;
  if (record.schema_version !== 'hearthandcode-field-journal-feed/v1') return null;
  if (!record.publication || typeof record.publication !== 'object' || !Array.isArray(record.items)) return null;

  const publication = record.publication as Record<string, unknown>;
  const items: FieldJournalItem[] = [];
  for (const rawItem of record.items) {
    if (!rawItem || typeof rawItem !== 'object') return null;
    const item = rawItem as Record<string, unknown>;
    if (
      typeof item.id !== 'string' ||
      typeof item.title !== 'string' ||
      typeof item.description !== 'string' ||
      typeof item.published_date !== 'string' ||
      !isJournalArticleUrl(item.article_url) ||
      !Array.isArray(item.tags) ||
      !item.tags.every((tag) => typeof tag === 'string')
    ) return null;

    items.push({
      id: item.id,
      title: item.title,
      description: item.description,
      publishedDate: item.published_date,
      readingTimeMinutes: typeof item.reading_time_minutes === 'number' ? item.reading_time_minutes : null,
      tags: item.tags,
      articleUrl: item.article_url,
    });
  }

  if (typeof publication.home_url !== 'string' || typeof publication.rss_url !== 'string') return null;
  return {
    source: 'live-feed',
    homeUrl: publication.home_url,
    rssUrl: publication.rss_url,
    items,
  };
}

export async function getFieldJournalFeed(): Promise<FieldJournalFeed> {
  const feedUrl = import.meta.env.FIELD_JOURNAL_FEED_URL ?? defaultFeedUrl;
  try {
    const response = await fetch(feedUrl, {
      headers: { Accept: 'application/json' },
      signal: AbortSignal.timeout(1500),
    });
    if (!response.ok) return sourceSnapshot;
    return parseFeed(await response.json()) ?? sourceSnapshot;
  } catch {
    return sourceSnapshot;
  }
}
