/**
 * content.ts - Content DSL Projection Utilities
 *
 * Loads content from src/data/content.yaml and projects items
 * for specific views (hearth, code, balanced).
 *
 * Schema: 02-design-system/08-data/content-schema.yaml (hub canonical)
 */

import { contentData } from '../data/content';
import type { ContentItem as DataContentItem } from '../data/content';

// ============================================================================
// TYPES
// ============================================================================

export type View = 'hearth' | 'code' | 'balanced';
export type ContentType =
  | 'page' | 'card' | 'section' | 'callout' | 'reference'
  | 'quote' | 'list' | 'code' | 'metric' | 'timeline'
  | 'comparison' | 'embed';

export type { ContentItem as DataContentItem } from '../data/content';
export interface ContentItem extends DataContentItem {}

export type ContentSet = ContentItem[];

// ============================================================================
// CONTENT LOADING
// ============================================================================

const allContent = contentData;

export function getAllContent(): ContentSet {
  return allContent;
}

export function getContentById(id: string): ContentItem | undefined {
  return allContent.find((item) => item.id === id);
}

export function getContentByType(type: ContentType): ContentSet {
  return allContent.filter((item) => item.type === type);
}

export function getContentByCategory(category: string): ContentSet {
  return allContent.filter((item) => item.category === category);
}

export function getContentByTag(tag: string): ContentSet {
  return allContent.filter((item) => item.tags?.includes(tag));
}

// ============================================================================
// VIEW PROJECTION
// ============================================================================

/**
 * Project an item for a specific view.
 * - Returns the item with view-specific overrides applied
 * - Removes items that are explicitly excluded for the view
 */
export function projectItem<T extends ContentItem>(
  item: T,
  view: View
): T | null {
  // Check if item is explicitly excluded for this view
  const viewConfig = item.views as Record<View, unknown> | undefined;
  if (viewConfig && viewConfig[view] === null) {
    return null;
  }

  // Apply view-specific override
  const override = view === 'hearth'
    ? item.hearth_override
    : view === 'code'
      ? item.code_override
      : undefined;

  if (override) {
    return { ...item, ...override } as T;
  }

  return item;
}

/**
 * Get items projected for a view, with proper ordering.
 */
export function getContentForView(
  view: View,
  filter?: { type?: ContentType; category?: string; tag?: string }
): ContentSet {
  let items = allContent.filter((item) => {
    const projected = projectItem(item, view);
    return projected !== null;
  });

  if (filter?.type) {
    items = items.filter((item) => item.type === filter.type);
  }

  if (filter?.category) {
    items = items.filter((item) => item.category === filter.category);
  }

  if (filter?.tag) {
    items = items.filter((item) => item.tags?.includes(filter.tag!));
  }

  return items;
}

/**
 * Get items in view-specific order.
 * If section has view_orders in metadata, use that.
 * Otherwise return as-is.
 */
export function getItemsInOrder(
  section: ContentItem,
  view: View,
  itemIds: string[]
): ContentSet {
  const viewOrders = section.metadata?.view_orders as Record<View, string[]> | undefined;
  const order = viewOrders?.[view];

  if (!order) {
    // No specific order for this view, return as-is
    return itemIds
      .map((id) => getContentById(id))
      .filter((item): item is ContentItem => item !== undefined);
  }

  // Order items according to view_orders
  return order
    .map((id: string) => getContentById(id))
    .filter((item): item is ContentItem => item !== undefined);
}

// ============================================================================
// PATH UTILITIES
// ============================================================================

/**
 * Get "where to start" paths for a view.
 */
export function getStartPaths(view: View): ContentSet {
  return getContentForView(view, { category: 'path' });
}

/**
 * Get navigation cards for a view, in view-specific order.
 */
export function getNavigationCards(view: View): ContentSet {
  const guide = allContent.find((item) => item.id === 'section-navigation-guide');

  if (!guide) {
    return getContentForView(view, { category: 'navigation' });
  }

  const navIds = guide.children || [];
  return getItemsInOrder(guide, view, navIds);
}
