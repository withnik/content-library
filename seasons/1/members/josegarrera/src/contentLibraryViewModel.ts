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

export type TypeOption = {
    label: string;
    type: string | null;
    selected: boolean;
};

export type ContentLibraryView = {
    cards: ContentCard[];
    typeOptions: TypeOption[];
};

export function presentContentLibrary(
    records: ContentRecord[],
    filter: ContentFilter = { type: null },
): ContentLibraryView {
    const matchingRecords = records.filter(
        (record) => filter.type === null || record.type === filter.type,
    );

    return {
        cards: sortNewestFirst(matchingRecords).map(presentCard),
        typeOptions: presentTypeOptions(records, filter.type),
    };
}

function presentTypeOptions(
    records: ContentRecord[],
    selectedType: string | null,
): TypeOption[] {
    const allTypes = { label: 'All types', type: null };
    const eachType = listContentTypes(records).map((type) => ({
        label: type,
        type,
    }));

    return [allTypes, ...eachType].map((option) => ({
        ...option,
        selected: option.type === selectedType,
    }));
}

function presentCard({
    id,
    title,
    type,
    excerpt,
    url,
    publishedAt,
}: ContentRecord): ContentCard {
    return {
        id,
        title,
        type,
        excerpt,
        url,
        publishedDate: formatPublishedAt(publishedAt),
    };
}

export function listContentTypes(records: ContentRecord[]): string[] {
    const uniqueTypes = new Set(records.map((record) => record.type));

    return [...uniqueTypes].sort();
}

export function resolveSelectedType(
    storedType: string | null,
    contentTypes: string[],
): string | null {
    const isStillInContent =
        storedType !== null && contentTypes.includes(storedType);

    return isStillInContent ? storedType : null;
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
