import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    type ContentRecord,
    listContentTypes,
    presentContentLibrary,
    resolveSelectedType,
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

    describe('type filter', () => {
        it('narrows the cards to the selected type', () => {
            const lesson = aContentRecord({ id: 'c_0001', type: 'lesson' });
            const recording = aContentRecord({
                id: 'c_0002',
                type: 'recording',
            });

            const cards = presentContentLibrary([lesson, recording], {
                type: 'recording',
            });

            expect(cards).toEqual([
                expect.objectContaining({ id: 'c_0002' }),
            ]);
        });

        it('keeps the latest published item of the selected type first', () => {
            const olderRecording = aContentRecord({
                id: 'c_0001',
                type: 'recording',
                publishedAt: '2025-12-04',
            });
            const lesson = aContentRecord({
                id: 'c_0002',
                type: 'lesson',
                publishedAt: '2026-03-01',
            });
            const newerRecording = aContentRecord({
                id: 'c_0003',
                type: 'recording',
                publishedAt: '2026-09-25',
            });

            const cards = presentContentLibrary(
                [olderRecording, lesson, newerRecording],
                { type: 'recording' },
            );

            expect(cards).toEqual([
                expect.objectContaining({ id: 'c_0003' }),
                expect.objectContaining({ id: 'c_0001' }),
            ]);
        });

        it('keeps every type when no type is selected', () => {
            const lesson = aContentRecord({
                id: 'c_0001',
                type: 'lesson',
                publishedAt: '2026-01-02',
            });
            const recording = aContentRecord({
                id: 'c_0002',
                type: 'recording',
                publishedAt: '2026-01-01',
            });

            const cards = presentContentLibrary([lesson, recording], {
                type: null,
            });

            expect(cards).toEqual([
                expect.objectContaining({ id: 'c_0001' }),
                expect.objectContaining({ id: 'c_0002' }),
            ]);
        });
    });

    describe('type filter options', () => {
        it('offers each type present in the content once, alphabetically', () => {
            const records = [
                aContentRecord({ id: 'c_0001', type: 'recording' }),
                aContentRecord({ id: 'c_0002', type: 'lesson' }),
                aContentRecord({ id: 'c_0003', type: 'recording' }),
                aContentRecord({ id: 'c_0004', type: 'blueprint' }),
            ];

            const contentTypes = listContentTypes(records);

            expect(contentTypes).toEqual(['blueprint', 'lesson', 'recording']);
        });
    });

    describe('selected type', () => {
        it('restores a remembered type that is still in the content', () => {
            const contentTypes = ['lesson', 'recording'];

            const selectedType = resolveSelectedType('recording', contentTypes);

            expect(selectedType).toBe('recording');
        });

        it('shows all types when the remembered type is no longer in the content', () => {
            const contentTypes = ['lesson', 'recording'];

            const selectedType = resolveSelectedType('gameworks', contentTypes);

            expect(selectedType).toBeNull();
        });
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
