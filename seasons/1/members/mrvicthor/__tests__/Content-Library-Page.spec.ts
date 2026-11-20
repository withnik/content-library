import { expect, test } from '@withnik/configs/playwright';
import { buildContent } from '../builders/buildContent';

const older = buildContent({
    title: 'Older lesson',
    type: 'lesson',
    publishedAt: '2025-01-01',
});
const newest = buildContent({
    title: 'Newest recording',
    type: 'recording',
    publishedAt: '2026-03-01',
});
const middle = buildContent({
    title: 'Middle gamework',
    type: 'gameworks',
    publishedAt: '2025-06-01',
});

const items = [older, newest, middle];

test.describe('Content Library Page', () => {
    test('renders one card per content item', async ({ mount }) => {
        const page = await mount('ContentLibraryPage/Default', {
            props: { items },
        });
        await expect(page.getByRole('listitem')).toHaveCount(3);
    });

    test('should return items that match search query', async ({ mount }) => {
        const page = await mount('ContentLibraryPage/Default', {
            props: { items },
        });
        await page.getByLabel(/search/i).fill('old');
        const results = page.getByRole('listitem');

        await expect(results).toHaveCount(1);
        await expect(results.filter({ hasText: older.title })).toBeVisible();

        await expect(page.getByText(newest.title)).toBeHidden();
    });
});
