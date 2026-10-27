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

export type ContentFilter = {
    type: string | null;
};

export function presentContentLibrary(
    records: ContentRecord[],
    filter: ContentFilter = { type: null },
): ContentCard[] {
    const matchingRecords = records.filter(
        (record) => filter.type === null || record.type === filter.type,
    );

    return sortNewestFirst(matchingRecords).map(
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

export function listContentTypes(records: ContentRecord[]): string[] {
    const uniqueTypes = new Set(records.map((record) => record.type));

    return [...uniqueTypes].sort();
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
