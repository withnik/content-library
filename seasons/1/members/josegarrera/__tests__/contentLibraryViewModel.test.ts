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

        const { cards } = presentContentLibrary([record]);

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

        const { cards } = presentContentLibrary([older, newer]);

        expect(cards).toEqual([
            expect.objectContaining({ id: 'c_0002' }),
            expect.objectContaining({ id: 'c_0001' }),
        ]);
    });

    describe('type filter', () => {
        it('selects all types and lists every card when no type is chosen', () => {
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

            const view = presentContentLibrary([lesson, recording], {
                type: null,
            });

            expect(view).toEqual({
                cards: [
                    expect.objectContaining({ id: 'c_0001' }),
                    expect.objectContaining({ id: 'c_0002' }),
                ],
                typeOptions: [
                    { label: 'All types', type: null, selected: true },
                    { label: 'lesson', type: 'lesson', selected: false },
                    { label: 'recording', type: 'recording', selected: false },
                ],
            });
        });

        it('narrows the cards to the selected type, newest first', () => {
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

            const view = presentContentLibrary(
                [olderRecording, lesson, newerRecording],
                { type: 'recording' },
            );

            expect(view).toEqual({
                cards: [
                    expect.objectContaining({ id: 'c_0003' }),
                    expect.objectContaining({ id: 'c_0001' }),
                ],
                typeOptions: [
                    { label: 'All types', type: null, selected: false },
                    { label: 'lesson', type: 'lesson', selected: false },
                    { label: 'recording', type: 'recording', selected: true },
                ],
            });
        });
        it('selects all types and lists every card when the chosen type is not in the content', () => {
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

            const view = presentContentLibrary([lesson, recording], {
                type: 'gameworks',
            });

            expect(view).toEqual({
                cards: [
                    expect.objectContaining({ id: 'c_0001' }),
                    expect.objectContaining({ id: 'c_0002' }),
                ],
                typeOptions: [
                    { label: 'All types', type: null, selected: true },
                    { label: 'lesson', type: 'lesson', selected: false },
                    { label: 'recording', type: 'recording', selected: false },
                ],
            });
        });
    });

    describe('type filter options', () => {
        it('offers all types first, then each type in the content once, alphabetically', () => {
            const records = [
                aContentRecord({ id: 'c_0001', type: 'recording' }),
                aContentRecord({ id: 'c_0002', type: 'lesson' }),
                aContentRecord({ id: 'c_0003', type: 'recording' }),
                aContentRecord({ id: 'c_0004', type: 'blueprint' }),
            ];

            const { typeOptions } = presentContentLibrary(records);

            expect(typeOptions).toEqual([
                expect.objectContaining({ label: 'All types', type: null }),
                expect.objectContaining({
                    label: 'blueprint',
                    type: 'blueprint',
                }),
                expect.objectContaining({ label: 'lesson', type: 'lesson' }),
                expect.objectContaining({
                    label: 'recording',
                    type: 'recording',
                }),
            ]);
        });
    });

    describe('published date', () => {
        afterEach(() => {
            vi.unstubAllEnvs();
        });

        it('keeps the calendar day west of Greenwich', () => {
            vi.stubEnv('TZ', 'Pacific/Honolulu');

            const { cards } = presentContentLibrary([
                aContentRecord({ publishedAt: '2026-04-02' }),
            ]);

            expect(cards).toEqual([
                expect.objectContaining({ publishedDate: 'Apr 2, 2026' }),
            ]);
        });

        it('keeps the calendar day east of Greenwich', () => {
            vi.stubEnv('TZ', 'Asia/Tokyo');

            const { cards } = presentContentLibrary([
                aContentRecord({ publishedAt: '2026-04-02' }),
            ]);

            expect(cards).toEqual([
                expect.objectContaining({ publishedDate: 'Apr 2, 2026' }),
            ]);
        });
    });
});
