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

export type Criteria = { type?: string };

const matchesType = (item: ContentItem, { type }: Criteria) =>
    !type || item.type === type;

const filterItems = (items: ContentItem[], criteria: Criteria) =>
    items.filter((item) => matchesType(item, criteria));

const sortNewestFirst = (items: ContentItem[]) =>
    [...items].sort((a, b) =>
        b.publishedAt < a.publishedAt
            ? -1
            : b.publishedAt > a.publishedAt
              ? 1
              : 0,
    );

export function createContentLibraryViewModel(
    items: ContentItem[],
    locale: string,
    criteria: Criteria = {},
): ContentLibraryViewModel {
    const dateFormatter = new Intl.DateTimeFormat(locale, {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC',
    });

    return {
        title: 'Content Library',
        items: sortNewestFirst(filterItems(items, criteria)).map((item) => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            type: item.type,
            url: item.url,
            date: dateFormatter.format(new Date(item.publishedAt)),
        })),
    };
}
