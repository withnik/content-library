import { describe, expect, it } from 'vitest';

import {
    type ContentRecord,
    presentContentLibrary,
} from '../src/contentLibraryViewModel';

function aContentRecord(overrides: Partial<ContentRecord>): ContentRecord {
    return {
        id: 'c_0001',
        title: 'The need of Repository Layer',
        type: 'lesson',
        excerpt: 'Why a repository layer keeps data access out of the UI.',
        url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
        publishedAt: '2025-12-04',
        ...overrides,
    };
}

describe('The content library', () => {
    it('presents each record as a card with a readable published date', () => {
        const record = {
            ...aContentRecord({}),
            author: 'Stefano',
            space: 'React / Nextjs',
            durationSeconds: null,
            thumbnailUrl: null,
        };

        const cards = presentContentLibrary([record]);

        expect(cards).toEqual([
            {
                id: 'c_0001',
                title: 'The need of Repository Layer',
                type: 'lesson',
                excerpt:
                    'Why a repository layer keeps data access out of the UI.',
                url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
                publishedDate: 'Dec 4, 2025',
            },
        ]);
    });
});
