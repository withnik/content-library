export type LibraryItem = {
    id: string;
    title: string;
    type: string;
    durationSeconds: number | null;
    url: string;
    publishedAt: string;
    excerpt: string;
};

// publishedAt is an ISO date (YYYY-MM-DD), so lexical order is date order.
export const sortByNewest = (items: LibraryItem[]): LibraryItem[] =>
    [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
