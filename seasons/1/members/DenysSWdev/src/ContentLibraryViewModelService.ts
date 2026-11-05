export type ContentItem = {
    id: string;
    title: string;
    type: string;
    media?: string;
    durationSeconds: number | null;
    url: string;
    publishedAt: string;
    excerpt: string;
    thumbnailUrl: string | null;
};

/** No type filter. Matches how storage reads an absent key: as ''. */
export const ALL_TYPES = '';

const ALL_TYPES_LABEL = 'All types';

export type TypeOption = { value: string; label: string };

export type ContentLibraryViewModel = {
    title: string;
    types: TypeOption[];
    selectedTypeLabel: string;
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

const getTypeOptions = (items: ContentItem[]): TypeOption[] => [
    { value: ALL_TYPES, label: ALL_TYPES_LABEL },
    ...[...new Set(items.map((item) => item.type))]
        .sort()
        .map((type) => ({ value: type, label: type })),
];

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
        types: getTypeOptions(items),
        selectedTypeLabel: criteria.type || ALL_TYPES_LABEL,
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
