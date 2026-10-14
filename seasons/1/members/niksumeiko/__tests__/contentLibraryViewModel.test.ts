// Unit tests for the Content Library ViewModel — the pure function that turns
// raw `ContentItem[]` records into the exact object the page renders. These
// pin the business rules (ordering, field selection, date formatting) without
// touching React, so they stay fast and deterministic.
import { describe, expect, it } from 'vitest';
import { createContentLibraryViewModel } from '../src/contentLibraryViewModel';
import type { ContentItem } from '../src/ContentLibraryPage';

// Minimal fixture factory: a test states only the fields it cares about and
// lets everything else fall back to a valid default.
function makeItem(overrides: Partial<ContentItem> = {}): ContentItem {
    return {
        id: 'c_0001',
        title: 'The need of a ViewModel',
        type: 'lesson',
        media: 'article',
        durationSeconds: null,
        url: 'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-a-viewmodel',
        publishedAt: '2025-12-06',
        excerpt: 'Why a ViewModel keeps presentation logic out of components.',
        thumbnailUrl: null,
        ...overrides,
    };
}

describe('createContentLibraryViewModel', () => {
    it('exposes the page title', () => {
        const viewModel = createContentLibraryViewModel([]);

        expect(viewModel.title).toBe('Content Library');
    });

    it('returns one view item per source item, dropping nothing', () => {
        const items = [
            makeItem({ id: 'c_0001', publishedAt: '2025-12-06' }),
            makeItem({ id: 'c_0002', publishedAt: '2026-04-02' }),
            makeItem({ id: 'c_0003', publishedAt: '2026-01-15' }),
        ];

        const viewModel = createContentLibraryViewModel(items);

        expect(viewModel.items).toHaveLength(items.length);
    });

    it('orders items newest first by publishedAt, ignoring source order', () => {
        const items = [
            makeItem({ id: 'older', publishedAt: '2025-12-06' }),
            makeItem({ id: 'newest', publishedAt: '2026-04-02' }),
            makeItem({ id: 'middle', publishedAt: '2026-01-15' }),
        ];

        const viewModel = createContentLibraryViewModel(items);

        expect(viewModel.items.map((item) => item.id)).toEqual([
            'newest',
            'middle',
            'older',
        ]);
    });

    it('breaks ties between equal dates deterministically by id', () => {
        const items = [
            makeItem({ id: 'c_0003', publishedAt: '2026-01-15' }),
            makeItem({ id: 'c_0001', publishedAt: '2026-01-15' }),
            makeItem({ id: 'c_0002', publishedAt: '2026-01-15' }),
        ];

        const viewModel = createContentLibraryViewModel(items);

        expect(viewModel.items.map((item) => item.id)).toEqual([
            'c_0001',
            'c_0002',
            'c_0003',
        ]);
    });

    it('maps the display fields verbatim and exposes nothing else', () => {
        const item = makeItem({
            id: 'c_0142',
            title: 'Building an effective testing strategy',
            type: 'masterclass',
            url: 'https://better.withnik.com/c/challenges/testing-strategy',
            excerpt: 'Learn unit and integration testing for a React app.',
            publishedAt: '2026-04-02',
            durationSeconds: 1946,
        });

        const [viewItem] = createContentLibraryViewModel([item]).items;

        expect(viewItem).toEqual({
            id: 'c_0142',
            title: 'Building an effective testing strategy',
            type: 'masterclass',
            url: 'https://better.withnik.com/c/challenges/testing-strategy',
            excerpt: 'Learn unit and integration testing for a React app.',
            date: '2 April 2026',
        });
    });

    it('formats publishedAt as a consistent, human-readable date', () => {
        const viewModel = createContentLibraryViewModel([
            makeItem({ publishedAt: '2025-12-06' }),
        ]);

        expect(viewModel.items[0]!.date).toBe('6 December 2025');
    });

    it('does not mutate the caller’s array', () => {
        const items = [
            makeItem({ id: 'older', publishedAt: '2025-12-06' }),
            makeItem({ id: 'newest', publishedAt: '2026-04-02' }),
        ];
        const snapshot = [...items];

        createContentLibraryViewModel(items);

        expect(items).toEqual(snapshot);
    });

    it('returns no items for an empty source', () => {
        const viewModel = createContentLibraryViewModel([]);

        expect(viewModel.items).toEqual([]);
    });
});
