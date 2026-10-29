import type { ContentItem } from '../types/content.types';

export const ALL_CONTENT_TYPE = 'all';

export type ContentFilters = {
  type?: string;
};

export function uniqueContentTypes(items: readonly ContentItem[]): string[] {
  return [...new Set(items.map((item) => item.type))].toSorted();
};

export function filterContent(
  items: readonly ContentItem[],
  filters: ContentFilters,
): ContentItem[] {
  if (!filters.type || filters.type === ALL_CONTENT_TYPE) {
    return [...items];
  }

  return items.filter((item) => item.type === filters.type);
};
