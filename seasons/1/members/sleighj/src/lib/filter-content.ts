import type { ContentItem } from '../types/content.types';

export const ALL_CONTENT_TYPE = 'all';

export type ContentFilters = {
    type?: string;
};

export function uniqueContentTypes(items: readonly ContentItem[]): string[] {
    return [...new Set(items.map((item) => item.type))].toSorted();
}

/** Options for the type filter control: "all" plus every type in the data. */
export function typeFilterOptions(items: readonly ContentItem[]): string[] {
    return [ALL_CONTENT_TYPE, ...uniqueContentTypes(items)];
}

export function filterContent(
    items: readonly ContentItem[],
    filters: ContentFilters,
): ContentItem[] {
    if (!filters.type || filters.type === ALL_CONTENT_TYPE) {
        return [...items];
    }

    return items.filter((item) => item.type === filters.type);
}
