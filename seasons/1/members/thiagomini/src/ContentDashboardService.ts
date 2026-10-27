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
}

export const contentItems: readonly ContentItem[] = content.items;

export function createContentDashboardViewModel(
    items: readonly ContentItem[],
    options: ContentDashboardViewModelOptions,
): ContentDashboardViewModel {
    const dateFormatter = new Intl.DateTimeFormat(options?.locale, {
        dateStyle: 'medium',
    });
    const types = [...new Set(items.map((item) => item.type))].toSorted();
    const selectedType = types.includes(options.selectedType ?? '')
        ? options.selectedType!
        : null;

    return {
        selectedType,
        types,
        items: items
            .filter(
                (item) =>
                    selectedType === null || item.type === selectedType,
            )
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
