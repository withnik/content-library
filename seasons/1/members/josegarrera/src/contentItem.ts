export type ContentItem = {
    id: string;
    title: string;
    type: string;
    excerpt: string;
    url: string;
    publishedAt: string;
};

export function sortNewestFirst(items: ContentItem[]): ContentItem[] {
    return [...items].sort(
        (left, right) =>
            Date.parse(right.publishedAt) - Date.parse(left.publishedAt),
    );
}

export function formatPublishedAt(publishedAt: string): string {
    const publishedAtFormat = new Intl.DateTimeFormat('en-US', {
        dateStyle: 'medium',
    });

    return publishedAtFormat.format(parseCalendarDay(publishedAt));
}

function parseCalendarDay(isoDate: string): Date {
    return new Date(`${isoDate}T00:00:00`);
}
