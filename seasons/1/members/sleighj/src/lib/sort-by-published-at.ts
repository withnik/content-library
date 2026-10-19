import type { ContentItem } from '../types/content.types';

export function sortByPublishedAtDesc(
  items: readonly ContentItem[],
): ContentItem[] {
  const sorted = [...items].toSorted((a, b) => {
    if (a.publishedAt > b.publishedAt) return -1;
    if (a.publishedAt < b.publishedAt) return 1;
    return 0;
  });
  return sorted;
};
