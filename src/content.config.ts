import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const epistemicClass = z.enum([
  'source',
  'evidence',
  'inference',
  'hypothesis',
  'proposal',
  'projection',
  'receipt',
  'unknown',
]);

const journal = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/journal' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    labels: z.array(z.string().min(1)).min(1),
    sources: z.array(z.string()).min(1),
    status: z.literal('published'),
    pilot: z.boolean(),
    reviewGate: z.literal(true),
    slug: z.string(),
    description: z.string(),
    author: z.string().optional(),
    tags: z.array(z.string()).optional(),
    published_date: z.string().optional(),
    published_order: z.number().int().positive().optional(),
    publication_note: z.string().optional(),
    claim_map: z.array(z.object({ claim: z.string(), label: epistemicClass, source: z.string() })).optional(),
    reading_time_minutes: z.number().int().positive().optional(),
    featured_image: z.string().optional(),
    featured_image_alt: z.string().optional(),
  }),
});

export const collections = { journal };
