import content from '../../../data/content.json';

export interface ContentItem {
    id: string;
    title: string;
    type: string;
    url: string;
    publishedAt: string;
    excerpt: string;
    durationSeconds: number | null;
    thumbnailUrl: string | null;
}

export interface ContentDashboardItemViewModel extends Omit<
    ContentItem,
    'publishedAt'
> {
    publishedAtFormatted: string;
}

export interface ContentDashboardViewModel {
    selectedType: string | null;
    types: string[];
    items: ContentDashboardItemViewModel[];
}

export interface ContentDashboardViewModelOptions {
    locale?: string;
    selectedType?: string | null;
    searchQuery?: string | null;
}

export const contentItems: readonly ContentItem[] = content.items;

export function createContentDashboardViewModel(
    items: readonly ContentItem[],
    options: ContentDashboardViewModelOptions,
): ContentDashboardViewModel {
    const dateFormatter = new Intl.DateTimeFormat(options?.locale, {
        dateStyle: 'medium',
    });
    const types = new Set(items.map((item) => item.type));
    const selectedType = types.has(options.selectedType ?? '')
        ? (options.selectedType as string)
        : null;

    const typesAsSortedArray = [...types].toSorted();
    const searchQuery = (options.searchQuery ?? '').trim().toLowerCase();

    const itemsMatchingFilters = (item: ContentItem) =>
        (selectedType === null || item.type === selectedType) &&
        (item.title.trim().toLowerCase().includes(searchQuery) ||
            item.excerpt.trim().toLowerCase().includes(searchQuery));

    return {
        selectedType,
        types: typesAsSortedArray,
        items: items
            .filter(itemsMatchingFilters)
            .toSorted((firstItem, secondItem) =>
                secondItem.publishedAt.localeCompare(firstItem.publishedAt),
            )
            .map(({ publishedAt, ...item }) => ({
                ...item,
                publishedAtFormatted: dateFormatter.format(
                    new Date(`${publishedAt}T00:00:00`),
                ),
            })),
    };
}
