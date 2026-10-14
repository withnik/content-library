import { beforeAll, describe, expect, it } from 'vitest';
import { presentLibrary, type ContentItem } from '../src/library';

// West of UTC: a date-only ISO string parsed as UTC midnight is the previous
// day here, so a formatter that ignores that would fail these tests.
beforeAll(() => {
    process.env.TZ = 'America/Los_Angeles';
});

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

const inUS = { locale: 'en-US' };

describe('presentLibrary', () => {
    it('lists items newest first, whatever the input order', () => {
        const items = [
            item({ id: 'mid', publishedAt: '2026-02-10' }),
            item({ id: 'old', publishedAt: '2025-12-31' }),
            item({ id: 'new', publishedAt: '2026-03-01' }),
        ];

        expect(presentLibrary(items, inUS).map(({ id }) => id)).toEqual([
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

        presentLibrary(items, inUS);

        expect(items.map(({ id }) => id)).toEqual(['old', 'new']);
    });

    it('presents what the reader sees, with the publish date in their locale', () => {
        const [entry] = presentLibrary(
            [
                item({
                    id: 'c_0040',
                    title: 'Building real apps together',
                    type: 'blueprint',
                    url: 'https://better.withnik.com/c/building-real-apps-together',
                    publishedAt: '2026-09-25',
                    excerpt: 'Building applications collaboratively.',
                }),
            ],
            inUS,
        );

        expect(entry).toEqual({
            id: 'c_0040',
            title: 'Building real apps together',
            type: 'blueprint',
            url: 'https://better.withnik.com/c/building-real-apps-together',
            excerpt: 'Building applications collaboratively.',
            publishedAt: '2026-09-25',
            publishedOn: 'Sep 25, 2026',
        });
    });

    it('follows the reader locale', () => {
        const [entry] = presentLibrary([item({ publishedAt: '2026-09-25' })], {
            locale: 'en-GB',
        });

        expect(entry?.publishedOn).toBe('25 Sept 2026');
    });
});
