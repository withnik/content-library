export type Content = {
    id: string;
    title: string;
    type: string;
    author: string;
    durationSeconds: number | null;
    url: string;
    publishedAt: string;
    excerpt: string;
    thumbnailUrl: string | null;
    space: string;
};

export const FILTER_OPTIONS = [
    'all',
    'lesson',
    'post',
    'recording',
    'thread',
] as const;

export type FilterBy = 'recording' | 'post' | 'lesson' | 'thread' | 'all';
