import { expect, test } from '@withnik/configs/playwright';
import { anItem } from './ContentItemBuilder';
import { describe } from 'node:test';

describe('ContentDashboard', () => {
    test('Displays each content item', async ({ mount }) => {
        const contentItem = anItem()
            .publishedAt('2026-04-13')
            .withLink('https://example.com/testing-content')
            .entitled('Testing content')
            .with({
                excerpt: 'Learn how to write reliable tests.',
                type: 'article',
            })
            .build();
        const dashboard = await mount('ContentDashboard/Default', {
            props: { items: [contentItem], locale: 'en-US' },
        });
        const item = dashboard.getByRole('listitem');

        await expect(item).toHaveCount(1);
        await expect(
            item.getByRole('link', { name: contentItem.title }),
        ).toHaveAttribute('href', contentItem.url);
        await expect(item).toContainText(contentItem.excerpt);
        await expect(item).toContainText(contentItem.type);
        await expect(item).toContainText('Apr 13, 2026');
        await expect(
            item.getByRole('link', { name: 'View content' }),
        ).toHaveAttribute('href', contentItem.url);
    });

    test('renders no content items when empty', async ({ mount }) => {
        const dashboard = await mount('ContentDashboard/Empty');

        await expect(dashboard.getByRole('listitem')).toHaveCount(0);
    });

    test('filters content by type and resets to all content', async ({
        mount,
    }) => {
        const recording = anItem()
            .entitled('A recording')
            .with({ type: 'recording' })
            .build();
        const lesson = anItem()
            .entitled('A lesson')
            .with({ type: 'lesson' })
            .build();
        const dashboard = await mount('ContentDashboard/Default', {
            props: {
                items: [recording, lesson],
                locale: 'en-US',
            },
        });
        const filter = dashboard.getByLabel('Filter content by type');

        await expect(filter.getByRole('option')).toHaveText([
            'All',
            'lesson',
            'recording',
        ]);
        await filter.selectOption('recording');
        await expect(dashboard.getByRole('listitem')).toHaveCount(1);
        await expect(dashboard.getByRole('listitem')).toContainText(
            recording.title,
        );

        await filter.selectOption('');
        await expect(dashboard.getByRole('listitem')).toHaveCount(2);
    });

    test('restores the selected type from provided storage', async ({
        mount,
    }) => {
        const recording = anItem()
            .entitled('A recording')
            .with({ type: 'recording' })
            .build();
        const lesson = anItem()
            .entitled('A lesson')
            .with({ type: 'lesson' })
            .build();
        const dashboard = await mount('ContentDashboard/Default', {
            props: {
                items: [recording, lesson],
                locale: 'en-US',
                storage: { 'content-library.selected-type': 'lesson' },
            },
        });

        await expect(
            dashboard.getByLabel('Filter content by type'),
        ).toHaveValue('lesson');
        await expect(dashboard.getByRole('listitem')).toHaveCount(1);
        await expect(dashboard.getByRole('listitem')).toContainText(
            lesson.title,
        );
    });
});
