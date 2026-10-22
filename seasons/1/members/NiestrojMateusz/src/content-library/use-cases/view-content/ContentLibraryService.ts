import type { LibraryItem } from '../../domain/ContentService';

export type ContentRowViewModel = {
    id: string;
    title: string;
    excerpt: string;
    type: string;
    publishedAt: string;
    url: string;
};

// publishedAt is a date without a time. Formatting in UTC keeps it on the
// same calendar day whatever timezone the browser is in.
const formatPublishedAt = (publishedAt: string, locale?: string) =>
    new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeZone: 'UTC',
    }).format(new Date(publishedAt));

export const createContentLibraryViewModel = (
    items: LibraryItem[],
    locale?: string,
): ContentRowViewModel[] =>
    items.map((item) => ({
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        type: item.type,
        publishedAt: formatPublishedAt(item.publishedAt, locale),
        url: item.url,
    }));
