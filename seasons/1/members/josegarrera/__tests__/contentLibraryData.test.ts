import { describe, expect, it } from 'vitest';

import { toContentItems } from '../src/contentLibraryData';

describe('The data source', () => {
    it('keeps only the fields the page uses from each record', () => {
        const record = {
            id: 'c_0001',
            title: 'The need of Repository Layer',
            type: 'lesson',
            url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
            publishedAt: '2025-12-04',
            author: 'Stefano',
            space: 'React / Nextjs',
            excerpt: 'Why a repository layer keeps data access out of the UI.',
            durationSeconds: null,
            thumbnailUrl: null,
        };

        const items = toContentItems([record]);

        expect(items).toEqual([
            {
                id: 'c_0001',
                title: 'The need of Repository Layer',
                type: 'lesson',
                excerpt:
                    'Why a repository layer keeps data access out of the UI.',
                url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
                publishedAt: '2025-12-04',
            },
        ]);
    });
});
