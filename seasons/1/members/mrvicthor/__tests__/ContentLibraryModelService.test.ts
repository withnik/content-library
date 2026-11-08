import { describe, expect, it } from 'vitest';
import { createContentLibraryPageModel } from '../content/useCases/viewContents/ContentLibraryPageModelService';
import { buildContents } from '../helpers/buildContents';
import { buildContent } from '../builders/buildContent';

const items = [
    ...buildContents(2, { type: 'lesson' }),
    ...buildContents(3, { type: 'recording' }),
    buildContent({ type: 'gameworks' }),
];

describe('content library page model', () => {
    it('returns empty data when source data is not available', () => {
        const result = createContentLibraryPageModel([], 'all');
        expect(result).toEqual({
            title: 'Content Library',
            items: [],
        });
    });

    it('filters items based on the selected filter', () => {
        const result = createContentLibraryPageModel(items, 'lesson');
        expect(result).toEqual({
            title: 'Content Library',
            items: [...buildContents(2, { type: 'lesson' })],
        });
    });

    it('returns an empty array if no item matches filter', () => {
        const result = createContentLibraryPageModel(items, 'thread');
        expect(result).toEqual({
            title: 'Content Library',
            items: [],
        });
    });
});
