import { expect, test } from '@withnik/configs/playwright';
import { anItem } from './ContentItemBuilder';
import { describe } from 'node:test';

describe('ContentDashboard', () => {
    test('Displays each content item', async ({ mount }) => {
        // Given a content item
        const contentItem = anItem()
            .publishedAt('2026-04-13')
            .withLink('https://example.com/testing-content')
            .entitled('Testing content')
            .with({
                excerpt: 'Learn how to write reliable tests.',
                type: 'article',
            })
            .build();

        // When the dashboard is rendered
        const dashboard = await mount('ContentDashboard/Default', {
            props: { items: [contentItem], locale: 'en-US' },
        });
        const item = dashboard.getByRole('listitem');

        // Then the item details and links are displayed
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
        // Given no content items

        // When the dashboard is rendered
        const dashboard = await mount('ContentDashboard/Empty');

        // Then no content item is displayed
        await expect(dashboard.getByRole('listitem')).toHaveCount(0);
    });

    test('filters content by type and resets to all content', async ({
        mount,
    }) => {
        // Given content items with different types
        const recording = anItem()
            .entitled('A recording')
            .with({ type: 'recording' })
            .build();
        const lesson = anItem()
            .entitled('A lesson')
            .with({ type: 'lesson' })
            .build();

        // When the dashboard is rendered
        const dashboard = await mount('ContentDashboard/Default', {
            props: {
                items: [recording, lesson],
                locale: 'en-US',
            },
        });
        const filter = dashboard.getByLabel('Filter content by type');

        // Then all available types are shown
        await expect(filter.getByRole('option')).toHaveText([
            'All',
            'lesson',
            'recording',
        ]);

        // When recordings are selected
        await filter.selectOption('recording');

        // Then only recordings are displayed
        await expect(dashboard.getByRole('listitem')).toHaveCount(1);
        await expect(dashboard.getByRole('listitem')).toContainText(
            recording.title,
        );

        // When all content is selected
        await filter.selectOption('');

        // Then all content items are displayed
        await expect(dashboard.getByRole('listitem')).toHaveCount(2);
    });

    test('restores the selected type from provided storage', async ({
        mount,
    }) => {
        // Given content items and stored selected type
        const recording = anItem()
            .entitled('A recording')
            .with({ type: 'recording' })
            .build();
        const lesson = anItem()
            .entitled('A lesson')
            .with({ type: 'lesson' })
            .build();

        // When the dashboard is rendered
        const dashboard = await mount('ContentDashboard/Default', {
            props: {
                items: [recording, lesson],
                locale: 'en-US',
                storage: { 'content-library.selected-type': 'lesson' },
            },
        });

        // Then the stored type is selected and its content is displayed
        await expect(
            dashboard.getByLabel('Filter content by type'),
        ).toHaveValue('lesson');
        await expect(dashboard.getByRole('listitem')).toHaveCount(1);
        await expect(dashboard.getByRole('listitem')).toContainText(
            lesson.title,
        );
    });
});
