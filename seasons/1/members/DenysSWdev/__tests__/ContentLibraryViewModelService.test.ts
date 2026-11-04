import { describe, expect, it } from 'vitest';
import {
    createContentLibraryViewModel,
    type Criteria,
} from '../src/ContentLibraryViewModelService.ts';
import { buildContentItem } from './builders/buildContentItem.ts';

const locale = 'en-US';

describe('content library ViewModel', () => {
    it('returns empty model when source data is unavailable', () => {
        const viewModel = createContentLibraryViewModel([], locale);

        // Assert: nothing to show
        expect(viewModel.items).toEqual([]);
    });

    it('returns model with items sorted newest first', () => {
        const items = [
            buildContentItem({ id: '1', publishedAt: '2026-05-19' }),
            buildContentItem({ id: '2', publishedAt: '2026-09-29' }),
            buildContentItem({ id: '3', publishedAt: '2026-06-24' }),
        ];

        const model = createContentLibraryViewModel(items, locale);

        // Assert: cards carry the display fields and a formatted date
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
        const items = [
            buildContentItem({
                id: '1',
                type: 'lesson',
                publishedAt: '2026-05-19',
            }),
            buildContentItem({
                id: '2',
                type: 'masterclass',
                publishedAt: '2026-09-29',
            }),
            buildContentItem({
                id: '3',
                type: 'lesson',
                publishedAt: '2026-06-24',
            }),
        ];
        const criteria: Criteria = { type: 'lesson' };

        const model = createContentLibraryViewModel(items, locale, criteria);

        // Assert: only lessons remain, newest first
        expect(model.items.map((item) => item.id)).toEqual(['3', '1']);
    });

    it('returns every item newest first when no type is selected', () => {
        const items = [
            buildContentItem({
                id: '1',
                type: 'lesson',
                publishedAt: '2026-05-19',
            }),
            buildContentItem({
                id: '2',
                type: 'masterclass',
                publishedAt: '2026-09-29',
            }),
            buildContentItem({
                id: '3',
                type: 'lesson',
                publishedAt: '2026-06-24',
            }),
        ];
        const criteria: Criteria = { type: '' };

        const model = createContentLibraryViewModel(items, locale, criteria);

        // Assert: no filtering, newest first
        expect(model.items.map((item) => item.id)).toEqual(['2', '3', '1']);
    });

    it('returns all-types option followed by distinct sorted types of all items', () => {
        const items = [
            buildContentItem({ id: '1', type: 'masterclass' }),
            buildContentItem({ id: '2', type: 'lesson' }),
            buildContentItem({ id: '3', type: 'lesson' }),
            buildContentItem({ id: '4', type: 'recording' }),
        ];
        const criteria: Criteria = { type: 'lesson' };

        const model = createContentLibraryViewModel(items, locale, criteria);

        // Assert: options come from all items, not only the filtered ones
        expect(model.types).toEqual(['', 'lesson', 'masterclass', 'recording']);
    });
});
