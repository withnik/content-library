import type { ContentItem } from '../types/content.types';

/** Newest `publishedAt` first. Does not mutate the input. */
export function sortByPublishedAtDesc(
    items: readonly ContentItem[],
): ContentItem[] {
    return [...items].sort((a, b) =>
        b.publishedAt.localeCompare(a.publishedAt),
    );
}
