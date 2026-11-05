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

// ISO dates (YYYY-MM-DD) sort correctly as plain strings.
const byNewestFirst = (a: ContentItem, b: ContentItem): number =>
    b.publishedAt.localeCompare(a.publishedAt);

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

    const newestFirst = [...items].sort(byNewestFirst);

    const entries = newestFirst.map(
        ({ id, title, type, url, excerpt, publishedAt }) => ({
            id,
            title,
            type,
            url,
            excerpt,
            publishedAt,
            publishedOn: date.format(new Date(publishedAt)),
        }),
    );

    return entries;
};

export const filterByType = (
    items: ContentItem[],
    type: string,
): ContentItem[] => {
    const ofType = items.filter((item) => item.type === type);

    // filter() returned a new array, so sorting it in place leaves `items` alone.
    const newestFirst = ofType.sort(byNewestFirst);

    return newestFirst;
};
