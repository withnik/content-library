import { describe, expect, it } from 'vitest';
import { newestFirst, type ContentItem } from '../src/content';

const item = (overrides: Partial<ContentItem>): ContentItem => ({
    id: 'c_0001',
    title: 'A title',
    type: 'lesson',
    url: 'https://better.withnik.com/c/a-title',
    publishedAt: '2026-01-01',
    excerpt: 'An excerpt.',
    durationSeconds: null,
    thumbnailUrl: null,
    ...overrides,
});

describe('newestFirst', () => {
    it('orders items by publish date, newest first, whatever the input order', () => {
        const items = [
            item({ id: 'mid', publishedAt: '2026-02-10' }),
            item({ id: 'old', publishedAt: '2025-12-31' }),
            item({ id: 'new', publishedAt: '2026-03-01' }),
        ];

        expect(newestFirst(items).map(({ id }) => id)).toEqual([
            'new',
            'mid',
            'old',
        ]);
    });

    it('leaves the original list untouched', () => {
        const items = [
            item({ id: 'old', publishedAt: '2025-12-31' }),
            item({ id: 'new', publishedAt: '2026-03-01' }),
        ];

        newestFirst(items);

        expect(items.map(({ id }) => id)).toEqual(['old', 'new']);
    });
});
