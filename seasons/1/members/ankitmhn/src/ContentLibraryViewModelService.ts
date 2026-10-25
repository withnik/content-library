import type { ContentItem } from './ContentLibraryPage';

type ContentLibraryViewModel = {
    title: string;
    items: {
        id: string;
        title: string;
        excerpt: string;
        type: string;
        url: string;
        date: string;
    }[];
};

export function createContentLibraryViewModel(
    items: ContentItem[],
    locale: string,
): ContentLibraryViewModel {
    const dateFormatter = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });

    return {
        title: 'Content Library',
        items: [...items]
            .sort((a, b) =>
                b.publishedAt < a.publishedAt
                    ? -1
                    : b.publishedAt > a.publishedAt
                      ? 1
                      : 0,
            )
            .map((item) => ({
                id: item.id,
                title: item.title,
                excerpt: item.excerpt,
                type: item.type,
                url: item.url,
                date: dateFormatter.format(new Date(item.publishedAt)),
            })),
    };
}
