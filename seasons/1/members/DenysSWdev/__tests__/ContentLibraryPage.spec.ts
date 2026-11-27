import { expect, test } from '@withnik/configs/playwright';
import { buildContentItem } from './builders/buildContentItem.ts';

test('see content library with item linking to their original source', async ({
    mount,
    context,
}) => {
    const items = [
        buildContentItem({
            id: 'c_0001',
            title: 'Leadership in Westeros',
            publishedAt: '2025-12-06',
        }),
        buildContentItem({
            id: 'c_0142',
            title: 'Tactics from the Battle of the Five Kings',
            url: 'https://xy.z/battle-tactics',
            publishedAt: '2026-04-02',
        }),
    ];

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

test('filter content library by type', async ({ mount }) => {
    const items = [
        buildContentItem({ id: 'c_0001', type: 'lesson' }),
        buildContentItem({ id: 'c_0142', type: 'masterclass' }),
    ];
    const page = await mount('ContentLibraryPage/Default', {
        props: { items, stored: { type: 'masterclass' } },
    });
    const cards = page.getByRole('listitem');

    // Assert: the stored type drives the cards
    await expect(cards).toHaveCount(1);

    await page
        .getByRole('button', { name: 'masterclass', exact: true })
        .click();

    // Assert: every type is offered
    await expect(page.getByRole('menuitemradio')).toHaveText([
        'All types',
        'lesson',
        'masterclass',
    ]);

    await page
        .getByRole('menuitemradio', { name: 'All types', exact: true })
        .click();

    // Assert: "All types" brings every item back
    await expect(cards).toHaveCount(2);
});

test('search library content by title and excerpt', async ({ mount }) => {
    const items = [
        buildContentItem({
            id: 'c_0001',
            title: 'Practical React patterns',
            publishedAt: '2026-01-10',
        }),
        buildContentItem({
            id: 'c_0002',
            title: 'Shipping faster',
            excerpt: 'An action plan for teams.',
            publishedAt: '2026-03-15',
        }),
        buildContentItem({
            id: 'c_0003',
            title: 'Testing basics',
            excerpt: 'Unit tests from scratch.',
            publishedAt: '2026-02-20',
        }),
    ];
    const page = await mount('ContentLibraryPage/Default', {
        props: { items, stored: { search: 'act' } },
    });
    const searchInput = page.getByRole('searchbox', { name: 'Search content' });
    const cardTitles = page.getByRole('listitem').getByRole('heading');

    // Assert: the stored query is restored and matches title or excerpt, newest first
    await expect(searchInput).toHaveValue('act');
    await expect(cardTitles).toHaveText([
        'Shipping faster',
        'Practical React patterns',
    ]);

    await searchInput.fill('kubernetes');

    // Assert: nothing matches, so the empty state replaces the list
    await expect(page.getByRole('listitem')).toHaveCount(0);
    await expect(
        page.getByRole('heading', { name: 'No matching content' }),
    ).toBeVisible();
    await expect(
        page.getByText('Try a different search term, or clear filters.'),
    ).toBeVisible();

    await searchInput.clear();

    // Assert: clearing the query brings every item back, newest first
    await expect(cardTitles).toHaveText([
        'Shipping faster',
        'Testing basics',
        'Practical React patterns',
    ]);
});
