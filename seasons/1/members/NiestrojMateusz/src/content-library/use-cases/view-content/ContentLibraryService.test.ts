import { describe, expect, it } from 'vitest';
import type { LibraryItem } from '../../domain/ContentService';
import { createContentLibraryViewModel } from './ContentLibraryService';

const item = (overrides: Partial<LibraryItem> = {}): LibraryItem => ({
    id: 'c_0142',
    title: 'Building an effective testing strategy',
    type: 'masterclass',
    durationSeconds: 1946,
    url: 'https://better.withnik.com/c/challenges/testing',
    publishedAt: '2026-04-02',
    excerpt: 'Learn unit and integration testing',
    ...overrides,
});

describe('createContentLibraryViewModel', () => {
    it('exposes the fields the page shows for each item', () => {
        const [row] = createContentLibraryViewModel([item()], 'en-US');

        expect(row).toEqual({
            id: 'c_0142',
            title: 'Building an effective testing strategy',
            excerpt: 'Learn unit and integration testing',
            type: 'masterclass',
            publishedAt: 'Apr 2, 2026',
            url: 'https://better.withnik.com/c/challenges/testing',
        });
    });

    it('formats the date in UTC so the day never shifts with the timezone', () => {
        const rows = createContentLibraryViewModel(
            [item({ publishedAt: '2026-01-01' })],
            'en-US',
        );

        expect(rows[0]?.publishedAt).toBe('Jan 1, 2026');
    });

    it('keeps the order of the items it is given', () => {
        const rows = createContentLibraryViewModel(
            [item({ id: 'b' }), item({ id: 'a' })],
            'en-US',
        );

        expect(rows.map((r) => r.id)).toEqual(['b', 'a']);
    });
});
