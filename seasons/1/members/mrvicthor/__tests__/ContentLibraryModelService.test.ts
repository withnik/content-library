import { describe, expect, it } from 'vitest';
import { createContentLibraryPageModel } from '../content/useCases/viewContents/ContentLibraryPageModelService';
import { buildContents } from '../helpers/buildContents';
import { buildContent } from '../builders/buildContent';

const lessons = buildContents(2, { type: 'lesson' });
const items = [
    ...lessons,
    ...buildContents(3, { type: 'recording' }),
    buildContent({ type: 'gameworks' }),
];

describe('content library page model', () => {
    it('returns empty data when source data is not available', () => {
        const result = createContentLibraryPageModel([], 'all', '');
        expect(result).toEqual({
            title: 'Content Library',
            items: [],
            filterOptions: [''],
        });
    });

    it('filters items based on the selected filter', () => {
        const result = createContentLibraryPageModel(items, 'lesson', '');
        expect(result.items.map((item) => item.id)).toEqual(
            lessons.map((lesson) => lesson.id),
        );

        expect(result.items.every((item) => item.type === 'lesson')).toBe(true);
    });

    it('returns an empty array if no item matches filter', () => {
        const result = createContentLibraryPageModel(items, 'thread', '');
        expect(result.items.every((item) => item.type === 'thread')).toBe(
            false,
        );
    });

    it('When a type filter and a search term are both active, both apply.', () => {
        const result = createContentLibraryPageModel(
            items,
            'lesson',
            'title 2',
        );
        expect(result.items.map((item) => item.title.toLowerCase())).toContain(
            'title 2',
        );
    });
});
