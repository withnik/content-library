import type { ContentItem } from './ContentLibraryPage';

// The exact shape the page renders for a single item — presentation fields
// only, already formatted. Raw concerns like `durationSeconds`, `media` and
// `thumbnailUrl` stay out until an iteration actually needs them.
export type ContentItemViewModel = {
    id: string;
    title: string;
    excerpt: string;
    type: string;
    url: string;
    date: string;
};

export type ContentLibraryViewModel = {
    title: string;
    items: ContentItemViewModel[];
};

const PAGE_TITLE = 'Content Library';

// Pinned locale + UTC so the formatted date is identical on every machine and
// in CI. Without `timeZone: 'UTC'` the ISO date (parsed as UTC midnight) would
// shift a day in behind-UTC timezones; the fixed locale keeps the wording
// stable and unit-testable.
const dateFormatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
});

// Turns the raw records into the page's ViewModel: newest first, display
// fields only, dates formatted. Pure — the caller's array is never touched.
export function createContentLibraryViewModel(
    items: ContentItem[],
): ContentLibraryViewModel {
    return {
        title: PAGE_TITLE,
        items: [...items].sort(byNewestThenId).map(toItemViewModel),
    };
}

// `publishedAt` is an ISO date, so a lexical compare is chronological;
// descending puts the newest first. `id` breaks ties so same-dated items have
// a stable, defined order rather than relying on source order.
function byNewestThenId(a: ContentItem, b: ContentItem): number {
    const byDate = b.publishedAt.localeCompare(a.publishedAt);
    return byDate !== 0 ? byDate : a.id.localeCompare(b.id);
}

function toItemViewModel(item: ContentItem): ContentItemViewModel {
    return {
        id: item.id,
        title: item.title,
        excerpt: item.excerpt,
        type: item.type,
        url: item.url,
        date: dateFormatter.format(new Date(item.publishedAt)),
    };
}
