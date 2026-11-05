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

test('filter content library by type starting from the stored choice', async ({
    mount,
}) => {
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

    // Assert: every type is offered and the stored one is selected
    await expect(page.getByRole('menuitemradio')).toHaveText([
        'All types',
        'lesson',
        'masterclass',
    ]);
    await expect(
        page.getByRole('menuitemradio', { name: 'masterclass', exact: true }),
    ).toBeChecked();

    await page
        .getByRole('menuitemradio', { name: 'All types', exact: true })
        .click();

    // Assert: "All types" brings every item back
    await expect(cards).toHaveCount(2);

    await page.getByRole('button', { name: 'All types', exact: true }).click();
    await page
        .getByRole('menuitemradio', { name: 'lesson', exact: true })
        .click();

    // Assert: only the chosen type remains
    await expect(cards).toHaveCount(1);
});
