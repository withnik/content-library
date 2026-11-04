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

test('filter content library by type and keep the choice after reload', async ({
    mount,
}) => {
    const items = [
        buildContentItem({
            id: 'c_0001',
            title: 'Leadership in Westeros',
            type: 'lesson',
        }),
        buildContentItem({
            id: 'c_0142',
            title: 'Tactics from the Battle of the Five Kings',
            type: 'masterclass',
        }),
    ];
    const page = await mount('ContentLibraryPage/Default', {
        props: { items },
    });
    const urlSearch = () => new URL(page.page().url()).search;

    await page.getByRole('button', { name: 'All types', exact: true }).click();
    // Assert: first load has every type to pick from, and "All types" is checked with no type in the URL
    await expect(page.getByRole('menuitemradio')).toHaveText([
        'All types',
        'lesson',
        'masterclass',
    ]);
    const cards = page.getByRole('listitem');
    await expect(cards).toHaveCount(2);

    await page
        .getByRole('menuitemradio', { name: 'masterclass', exact: true })
        .click();
    // Assert: the chosen type is stored in the URL and drives the cards
    await expect(cards).toHaveCount(1);

    const reloaded = await mount('ContentLibraryPage/Default', {
        path: `/${urlSearch()}`,
        props: { items },
    });
    // Assert: after reload the type is still in the URL and selected
    expect(urlSearch()).toBe('?type=masterclass');
    await reloaded
        .getByRole('button', { name: 'masterclass', exact: true })
        .click();
    await reloaded
        .getByRole('menuitemradio', { name: 'All types', exact: true })
        .click();
    // Assert: choosing "All types" clears the URL and selects it
    await expect.poll(urlSearch).toBe('');
    await expect(cards).toHaveCount(2);
});
