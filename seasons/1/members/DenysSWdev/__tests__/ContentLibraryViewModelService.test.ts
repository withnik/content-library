import { describe, expect, it } from 'vitest';
import {
    createContentLibraryViewModel,
    type ContentItem,
    type Criteria,
} from '../src/ContentLibraryViewModelService.ts';

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

    it('returns model filtered by selected type preserving newest first sorting', () => {
        const items: ContentItem[] = [
            {
                id: '1',
                title: 'Title 1',
                type: 'lesson',
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
                durationSeconds: null,
                url: 'https://xy.z/3',
                publishedAt: '2026-06-24',
                excerpt: 'Description 3',
                thumbnailUrl: null,
            },
        ];
        const locale = 'en-US';
        const criteria: Criteria = { type: 'lesson' };

        const model = createContentLibraryViewModel(items, locale, criteria);

        // Assert: only lessons remain, newest first
        expect(model.items.map((item) => item.id)).toEqual(['3', '1']);
    });

    it('returns all-types option followed by distinct sorted types of all items', () => {
        const items: ContentItem[] = [
            {
                id: '1',
                title: 'Title 1',
                type: 'masterclass',
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
                durationSeconds: null,
                url: 'https://xy.z/3',
                publishedAt: '2026-06-24',
                excerpt: 'Description 3',
                thumbnailUrl: null,
            },
            {
                id: '4',
                title: 'Title 4',
                type: 'recording',
                durationSeconds: null,
                url: 'https://xy.z/4',
                publishedAt: '2026-01-15',
                excerpt: 'Description 4',
                thumbnailUrl: null,
            },
        ];
        const locale = 'en-US';
        const criteria: Criteria = { type: 'lesson' };

        const model = createContentLibraryViewModel(items, locale, criteria);

        // Assert: options come from all items, not only the filtered ones
        expect(model.types).toEqual(['', 'lesson', 'masterclass', 'recording']);
    });
});
