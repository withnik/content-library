export type ContentItem = {
    id: string;
    title: string;
    type: string;
    url: string;
    publishedAt: string;
    excerpt: string;
    durationSeconds: number | null;
    thumbnailUrl: string | null;
};

// What the reader sees for one item. Only fields the page renders today.
export type LibraryEntry = {
    id: string;
    title: string;
    type: string;
    url: string;
    excerpt: string;
    publishedAt: string;
    publishedOn: string;
};

export const presentLibrary = (
    items: readonly ContentItem[],
    { locale }: { locale: string },
): LibraryEntry[] => {
    // publishedAt is a date-only ISO string, which Date parses as UTC
    // midnight. Formatting in UTC keeps the calendar day in every timezone.
    const date = new Intl.DateTimeFormat(locale, {
        dateStyle: 'medium',
        timeZone: 'UTC',
    });

    // ISO dates (YYYY-MM-DD) sort correctly as plain strings.
    return [...items]
        .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
        .map(({ id, title, type, url, excerpt, publishedAt }) => ({
            id,
            title,
            type,
            url,
            excerpt,
            publishedAt,
            publishedOn: date.format(new Date(publishedAt)),
        }));
};
