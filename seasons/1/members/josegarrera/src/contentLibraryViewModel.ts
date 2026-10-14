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

function sortNewestFirst(records: ContentRecord[]): ContentRecord[] {
    return [...records].sort(
        (left, right) =>
            Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
    );
}

function formatPublishedAt(publishedAt: string): string {
    const publishedAtFormat = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    });

    return publishedAtFormat.format(parseCalendarDay(publishedAt));
}

function parseCalendarDay(isoDate: string): Date {
    return new Date(`${isoDate}T00:00:00`);
}
