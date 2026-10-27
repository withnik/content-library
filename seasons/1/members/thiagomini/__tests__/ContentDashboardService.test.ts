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
        ).toStrictEqual({
            selectedType: null,
            types: ['lesson'],
            items: [
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
            ],
        });
    });

    it('derives types and filters the selected type before sorting', () => {
        const items = [
            {
                id: 'old-recording',
                title: 'Old recording',
                type: 'recording',
                url: 'https://example.com/old-recording',
                publishedAt: '2026-01-01',
                excerpt: 'An older recording.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'lesson',
                title: 'A lesson',
                type: 'lesson',
                url: 'https://example.com/lesson',
                publishedAt: '2026-06-30',
                excerpt: 'A lesson.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'new-recording',
                title: 'New recording',
                type: 'recording',
                url: 'https://example.com/new-recording',
                publishedAt: '2026-03-15',
                excerpt: 'A newer recording.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
        ] satisfies readonly ContentItem[];

        expect(
            createContentDashboardViewModel(items, {
                locale: 'en-US',
                selectedType: 'recording',
            }),
        ).toMatchObject({
            selectedType: 'recording',
            types: ['lesson', 'recording'],
            items: [
                { id: 'new-recording', type: 'recording' },
                { id: 'old-recording', type: 'recording' },
            ],
        });
    });

    it('keeps newest-first ordering after filtering', () => {
        const items = [
            {
                id: 'old-recording',
                title: 'Old recording',
                type: 'recording',
                url: 'https://example.com/old-recording',
                publishedAt: '2026-01-01',
                excerpt: 'An older recording.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'lesson',
                title: 'A lesson',
                type: 'lesson',
                url: 'https://example.com/lesson',
                publishedAt: '2026-06-30',
                excerpt: 'A lesson.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
            {
                id: 'new-recording',
                title: 'New recording',
                type: 'recording',
                url: 'https://example.com/new-recording',
                publishedAt: '2026-03-15',
                excerpt: 'A newer recording.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
        ] satisfies readonly ContentItem[];

        expect(
            createContentDashboardViewModel(items, {
                locale: 'en-US',
                selectedType: 'recording',
            }).items.map((item) => item.id),
        ).toStrictEqual(['new-recording', 'old-recording']);
    });

    it('resets an unavailable selected type to all content', () => {
        const items = [
            {
                id: 'lesson',
                title: 'A lesson',
                type: 'lesson',
                url: 'https://example.com/lesson',
                publishedAt: '2026-06-30',
                excerpt: 'A lesson.',
                durationSeconds: null,
                thumbnailUrl: null,
            },
        ] satisfies readonly ContentItem[];

        expect(
            createContentDashboardViewModel(items, {
                locale: 'en-US',
                selectedType: 'removed-type',
            }),
        ).toMatchObject({
            selectedType: null,
            items: [{ id: 'lesson' }],
        });
    });
});
