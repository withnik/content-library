import { describe, expect, it } from 'vitest';
import { anItem } from './ContentItemBuilder';
import { createContentDashboardViewModel } from '../src/ContentDashboardService';

describe('createContentDashboardViewModel', () => {
    it('sorts content newest first and formats publication dates', () => {
        const items = [
            anItem().with({ id: 'middle' }).publishedAt('2026-03-15').build(),
            anItem().with({ id: 'oldest' }).publishedAt('2026-01-01').build(),
            anItem().with({ id: 'newest' }).publishedAt('2026-06-30').build(),
        ];

        const viewModel = createContentDashboardViewModel(items, {
            locale: 'en-US',
        });

        expect(
            viewModel.items.map(({ id, publishedAtFormatted }) => ({
                id,
                publishedAtFormatted,
            })),
        ).toStrictEqual([
            { id: 'newest', publishedAtFormatted: 'Jun 30, 2026' },
            { id: 'middle', publishedAtFormatted: 'Mar 15, 2026' },
            { id: 'oldest', publishedAtFormatted: 'Jan 1, 2026' },
        ]);
    });

    it('derives types and filters the selected type before sorting', () => {
        const items = [
            anItem()
                .with({ id: 'old-recording' })
                .withType('recording')
                .build(),
            anItem().build(),
            anItem()
                .with({ id: 'new-recording' })
                .withType('recording')
                .publishedAt('2026-03-15')
                .build(),
        ];

        expect(
            createContentDashboardViewModel(items, {
                locale: 'en-US',
                selectedType: 'recording',
            }),
        ).toMatchObject({
            selectedType: 'recording',
            types: ['lesson', 'recording'],
            items: [
                { id: 'new-recording', type: 'recording' },
                { id: 'old-recording', type: 'recording' },
            ],
        });
    });

    it('keeps newest-first ordering after filtering', () => {
        const items = [
            anItem()
                .with({ id: 'old-recording' })
                .withType('recording')
                .build(),
            anItem().withType('lesson').build(),
            anItem()
                .with({ id: 'new-recording' })
                .withType('recording')
                .publishedAt('2026-03-15')
                .build(),
        ];

        expect(
            createContentDashboardViewModel(items, {
                locale: 'en-US',
                selectedType: 'recording',
            }).items.map((item) => item.id),
        ).toStrictEqual(['new-recording', 'old-recording']);
    });

    it('resets an unavailable selected type to all content', () => {
        const items = [
            anItem().withType('lesson').with({ id: 'lesson' }).build(),
        ];

        expect(
            createContentDashboardViewModel(items, {
                locale: 'en-US',
                selectedType: 'removed-type',
            }),
        ).toMatchObject({
            selectedType: null,
            items: [{ id: 'lesson' }],
        });
    });
});
