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

export interface ContentDashboardViewModel
    extends Omit<ContentItem, 'publishedAt'> {
    publishedAtFormatted: string;
}

export interface ContentDashboardViewModelOptions {
    locale?: string;
}

export const contentItems: readonly ContentItem[] = content.items;

export function createContentDashboardViewModel(
    items: readonly ContentItem[],
    options?: ContentDashboardViewModelOptions,
): ContentDashboardViewModel[] {
    const dateFormatter = new Intl.DateTimeFormat(options?.locale, {
        dateStyle: 'medium',
    });

    return [...items]
        .sort((firstItem, secondItem) =>
            secondItem.publishedAt.localeCompare(firstItem.publishedAt),
        )
        .map(({ publishedAt, ...item }) => ({
            ...item,
            publishedAtFormatted: dateFormatter.format(
                new Date(`${publishedAt}T00:00:00`),
            ),
        }));
}