import { describe, expect, it } from 'vitest';

import { sortByPublishedAtDesc } from '../src/lib/sort-by-published-at';
import type { ContentItem } from '../src/types/content.types';

function item(
    overrides: Pick<ContentItem, 'id' | 'title' | 'publishedAt'>,
): ContentItem {
    return {
        type: 'lesson',
        url: 'https://example.com',
        author: 'Test',
        space: 'Test',
        excerpt: 'Excerpt',
        durationSeconds: null,
        thumbnailUrl: null,
        ...overrides,
    };
}

describe('sortByPublishedAtDesc', () => {
    it('orders newest publishedAt first regardless of input order', () => {
        const shuffled = [
            item({ id: '1', title: 'Middle', publishedAt: '2026-03-15' }),
            item({ id: '2', title: 'Oldest', publishedAt: '2025-12-04' }),
            item({ id: '3', title: 'Newest', publishedAt: '2026-09-25' }),
        ];

        expect(sortByPublishedAtDesc(shuffled).map((i) => i.title)).toEqual([
            'Newest',
            'Middle',
            'Oldest',
        ]);
    });

    it('does not mutate the input array', () => {
        const input = [
            item({ id: '1', title: 'A', publishedAt: '2025-01-01' }),
            item({ id: '2', title: 'B', publishedAt: '2026-01-01' }),
        ];
        const before = [...input];

        sortByPublishedAtDesc(input);

        expect(input).toEqual(before);
    });
});
