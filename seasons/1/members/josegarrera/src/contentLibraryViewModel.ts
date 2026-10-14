import { formatPublishedAt, sortNewestFirst } from './contentItem';

export type ContentRecord = {
    id: string;
    title: string;
    type: string;
    excerpt: string;
    url: string;
    publishedAt: string;
};

export type ContentCard = {
    id: string;
    title: string;
    type: string;
    excerpt: string;
    url: string;
    publishedDate: string;
};

export function presentContentLibrary(records: ContentRecord[]): ContentCard[] {
    return sortNewestFirst(records).map(
        ({ id, title, type, excerpt, url, publishedAt }) => ({
            id,
            title,
            type,
            excerpt,
            url,
            publishedDate: formatPublishedAt(publishedAt),
        }),
    );
}
