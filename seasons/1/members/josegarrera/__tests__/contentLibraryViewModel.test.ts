import { afterEach, describe, expect, it, vi } from 'vitest';

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

    it('lists the latest published item first', () => {
        const older = aContentRecord({
            id: 'c_0001',
            publishedAt: '2025-12-04',
        });
        const newer = aContentRecord({
            id: 'c_0002',
            publishedAt: '2026-09-25',
        });

        const cards = presentContentLibrary([older, newer]);

        expect(cards).toEqual([
            expect.objectContaining({ id: 'c_0002' }),
            expect.objectContaining({ id: 'c_0001' }),
        ]);
    });

    describe('published date', () => {
        afterEach(() => {
            vi.unstubAllEnvs();
        });

        it('keeps the calendar day west of Greenwich', () => {
            vi.stubEnv('TZ', 'Pacific/Honolulu');

            const cards = presentContentLibrary([
                aContentRecord({ publishedAt: '2026-04-02' }),
            ]);

            expect(cards).toEqual([
                expect.objectContaining({ publishedDate: 'Apr 2, 2026' }),
            ]);
        });

        it('keeps the calendar day east of Greenwich', () => {
            vi.stubEnv('TZ', 'Asia/Tokyo');

            const cards = presentContentLibrary([
                aContentRecord({ publishedAt: '2026-04-02' }),
            ]);

            expect(cards).toEqual([
                expect.objectContaining({ publishedDate: 'Apr 2, 2026' }),
            ]);
        });
    });
});
