import { describe, expect, it } from 'vitest';
import {
    createContentDashboardViewModel,
    type ContentItem,
} from '../src/ContentDashboardService';

describe('createContentDashboardViewModel', () => {
    it('sorts content newest first and formats publication dates', () => {
        const items = [
            {
                id: 'middle',
                title: 'Middle content',
                type: 'lesson',
                url: 'https://example.com/middle',
                publishedAt: '2026-03-15',
                excerpt: 'Published in the middle.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'oldest',
                title: 'Oldest content',
                type: 'lesson',
                url: 'https://example.com/oldest',
                publishedAt: '2026-01-01',
                excerpt: 'Published first.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'newest',
                title: 'Newest content',
                type: 'lesson',
                url: 'https://example.com/newest',
                publishedAt: '2026-06-30',
                excerpt: 'Published last.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
        ] satisfies readonly ContentItem[];

        expect(
            createContentDashboardViewModel(items, { locale: 'en-US' }),
        ).toStrictEqual([
            {
                id: 'newest',
                title: 'Newest content',
                type: 'lesson',
                url: 'https://example.com/newest',
                publishedAtFormatted: 'Jun 30, 2026',
                excerpt: 'Published last.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'middle',
                title: 'Middle content',
                type: 'lesson',
                url: 'https://example.com/middle',
                publishedAtFormatted: 'Mar 15, 2026',
                excerpt: 'Published in the middle.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'oldest',
                title: 'Oldest content',
                type: 'lesson',
                url: 'https://example.com/oldest',
                publishedAtFormatted: 'Jan 1, 2026',
                excerpt: 'Published first.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
        ]);
    });
});
