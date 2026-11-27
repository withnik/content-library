import { describe, expect, it } from 'vitest';
import { createContentLibraryViewModel } from '../src/ContentLibraryViewModelService.ts';
import type { ContentItem } from '../src/ContentLibraryPage.tsx';

describe('content library ViewModel', () => {
    it('returns empty model when source data is unavailable', () => {
        const items: ContentItem[] = [];
        const locale = 'en-US';

        const viewModel = createContentLibraryViewModel(items, locale);

        expect(viewModel.items).toEqual([]);
    });

    it('returns model with sorted items', () => {
        const items = [
            {
                id: '1',
                title: 'Title 1',
                type: 'lesson',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/1',
                publishedAt: '2026-05-19',
                excerpt: 'Description 1',
                thumbnailUrl: null,
            },
            {
                id: '2',
                title: 'Title 2',
                type: 'lesson',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/2',
                publishedAt: '2026-09-29',
                excerpt: 'Description 2',
                thumbnailUrl: null,
            },
            {
                id: '3',
                title: 'Title 3',
                type: 'lesson',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/3',
                publishedAt: '2026-06-24',
                excerpt: 'Description 3',
                thumbnailUrl: null,
            },
        ];
        const locale = 'en-US';

        const model = createContentLibraryViewModel(items, locale);

        expect(model.items).toEqual([
            {
                id: '2',
                title: 'Title 2',
                type: 'lesson',
                url: 'https://xy.z/2',
                date: 'September 29, 2026',
                excerpt: 'Description 2',
            },
            {
                id: '3',
                title: 'Title 3',
                type: 'lesson',
                url: 'https://xy.z/3',
                date: 'June 24, 2026',
                excerpt: 'Description 3',
            },
            {
                id: '1',
                title: 'Title 1',
                type: 'lesson',
                url: 'https://xy.z/1',
                date: 'May 19, 2026',
                excerpt: 'Description 1',
            },
        ]);
    });

    it('returns model with filtered items', () => {
        const items = [
            {
                id: '1',
                title: 'Title 1',
                type: 'lesson',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/1',
                publishedAt: '2026-05-19',
                excerpt: 'Description 1',
                thumbnailUrl: null,
            },
            {
                id: '2',
                title: 'Title 2',
                type: 'masterclass',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/2',
                publishedAt: '2026-09-29',
                excerpt: 'Description 2',
                thumbnailUrl: null,
            },
            {
                id: '3',
                title: 'Title 3',
                type: 'soft-skill',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/3',
                publishedAt: '2026-06-24',
                excerpt: 'Description 3',
                thumbnailUrl: null,
            },
        ] as const satisfies ContentItem[];

        const filterValue = 'lesson';
        const locale = 'en-US';

        const model = createContentLibraryViewModel(items, locale, filterValue);

        expect(model.items).toEqual([
            {
                id: '1',
                title: 'Title 1',
                type: 'lesson',
                url: 'https://xy.z/1',
                date: 'May 19, 2026',
                excerpt: 'Description 1',
            },
        ]);
        expect(model.filterOptions).toEqual([
            'lesson',
            'masterclass',
            'soft-skill',
        ]);
    });

    it('returns items whose title or excerpt matches the search value', () => {
        const items = [
            {
                id: '1',
                title: 'Leadership in Westeros',
                type: 'lesson',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/1',
                publishedAt: '2026-05-19',
                excerpt: 'Explores the principles of leadership.',
                thumbnailUrl: null,
            },
            {
                id: '2',
                title: 'Tactics from the Battle of the Five Kings',
                type: 'masterclass',
                media: 'video',
                durationSeconds: 1946,
                url: 'https://xy.z/2',
                publishedAt: '2026-09-29',
                excerpt: 'Description 2',
                thumbnailUrl: null,
            },
        ] as const satisfies ContentItem[];
        const locale = 'en-US';

        const titleMatches = createContentLibraryViewModel(
            items,
            locale,
            null,
            '  tACTics ',
        );

        expect(titleMatches.items).toEqual([
            {
                id: '2',
                title: 'Tactics from the Battle of the Five Kings',
                type: 'masterclass',
                url: 'https://xy.z/2',
                date: 'September 29, 2026',
                excerpt: 'Description 2',
            },
        ]);
        const excerptMatches = createContentLibraryViewModel(
            items,
            locale,
            null,
            'PRINCIPLES',
        );

        expect(excerptMatches.items.map((item) => item.id)).toEqual(['1']);
    });

    it('combines the type filter with the search value', () => {
        const items = [
            {
                id: '1',
                title: 'Tactics for leaders',
                type: 'lesson',
                media: 'article',
                durationSeconds: null,
                url: 'https://xy.z/1',
                publishedAt: '2026-05-19',
                excerpt: 'Description 1',
                thumbnailUrl: null,
            },
            {
                id: '2',
                title: 'Tactics from the Battle of the Five Kings',
                type: 'masterclass',
                media: 'video',
                durationSeconds: 1946,
                url: 'https://xy.z/2',
                publishedAt: '2026-09-29',
                excerpt: 'Description 2',
                thumbnailUrl: null,
            },
        ] as const satisfies ContentItem[];

        const model = createContentLibraryViewModel(
            items,
            'en-US',
            'lesson',
            'tactics',
        );

        expect(model.items.map((item) => item.id)).toEqual(['1']);
    });
});
