import { expect, test } from '@withnik/configs/playwright';
import type { ContentItem } from '../src/ContentLibraryPage';

const items: ContentItem[] = [
    {
        id: 'c_0001',
        title: 'Leadership in Westeros',
        type: 'lesson',
        media: 'article',
        durationSeconds: null,
        url: 'https://xy.z/leadership',
        publishedAt: '2025-12-06',
        excerpt: 'Explores the principles of leadership in the Seven Kingdoms.',
        thumbnailUrl: null,
    },
    {
        id: 'c_0142',
        title: 'Tactics from the Battle of the Five Kings',
        type: 'masterclass',
        media: 'video',
        durationSeconds: 1946,
        url: 'https://xy.z/battle-tactics',
        publishedAt: '2026-04-02',
        excerpt: 'Learn military strategy and tactics from Westeros.',
        thumbnailUrl: 'https://xy.z/thumbs/c_0142.jpg',
    },
];

test('see content library with item linking to their original source', async ({
    mount,
    context,
}) => {
    await context.route('https://xy.z/battle-tactics', async (route) => {
        await route.fulfill({
            contentType: 'text/html',
            body: '<html><body>Origin page</body></html>',
        });
    });

    const page = await mount('ContentLibraryPage/Default', {
        props: { items },
    });

    const pageTitle = page.getByRole('heading', { name: 'Content Library' });
    await expect(pageTitle).toBeVisible();

    const cards = page.getByRole('listitem');
    await expect(cards).toHaveCount(2);

    const firstCard = cards.first();
    const firstCardTitle = firstCard.getByRole('heading', {
        name: 'Tactics from the Battle of the Five Kings',
    });
    await expect(firstCardTitle).toBeVisible();

    const [tabFromTitleClick] = await Promise.all([
        context.waitForEvent('page'),
        firstCardTitle.getByRole('link').click(),
    ]);
    await expect(tabFromTitleClick).toHaveURL('https://xy.z/battle-tactics');
    await tabFromTitleClick.close();

    await firstCard.getByRole('button').click();
    const [tabFromButtonClick] = await Promise.all([
        context.waitForEvent('page'),
        firstCard.getByRole('button').click(),
    ]);
    await expect(tabFromButtonClick).toHaveURL('https://xy.z/battle-tactics');
    await tabFromButtonClick.close();
});
