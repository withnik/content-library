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

// ISO dates (YYYY-MM-DD) sort correctly as plain strings.
export const newestFirst = (items: readonly ContentItem[]): ContentItem[] =>
    [...items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
