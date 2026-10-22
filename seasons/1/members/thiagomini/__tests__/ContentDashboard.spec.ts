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
});
