import { describe, expect, it } from 'vitest';
import { sortByNewest, type LibraryItem } from './ContentService';

const item = (id: string, publishedAt: string): LibraryItem => ({
    id,
    title: `Title ${id}`,
    type: 'lesson',
    durationSeconds: null,
    url: `https://example.com/${id}`,
    publishedAt,
    excerpt: `Excerpt ${id}`,
});

describe('sortByNewest', () => {
    it('orders items by publishedAt, newest first', () => {
        const items = [
            item('b', '2026-03-14'),
            item('c', '2026-04-02'),
            item('a', '2025-12-04'),
        ];

        expect(sortByNewest(items).map((i) => i.id)).toEqual(['c', 'b', 'a']);
    });

    it('does not mutate the input list', () => {
        const items = [item('a', '2025-12-04'), item('b', '2026-03-14')];

        sortByNewest(items);

        expect(items.map((i) => i.id)).toEqual(['a', 'b']);
    });
});
