import type { ContentItem } from '../../src/ContentLibraryViewModelService.ts';

// Only what a test sets matters; the rest is derived from the id.
export const buildContentItem = ({
    id = '1',
    ...overrides
}: Partial<ContentItem> = {}): ContentItem => ({
    id,
    title: `Title ${id}`,
    type: 'lesson',
    durationSeconds: null,
    url: `https://xy.z/${id}`,
    publishedAt: '2026-01-01',
    excerpt: `Description ${id}`,
    thumbnailUrl: null,
    ...overrides,
});
