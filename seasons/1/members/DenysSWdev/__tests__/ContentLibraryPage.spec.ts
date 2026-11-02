import { expect, test } from '@withnik/configs/playwright';
import type { ContentItem } from '../src/ContentLibraryViewModelService';

test('see content library with item linking to their original source', async ({
    mount,
    context,
}) => {
    const items: ContentItem[] = [
        {
            id: 'c_0001',
            title: 'Leadership in Westeros',
            type: 'lesson',
            media: 'article',
            durationSeconds: null,
            url: 'https://xy.z/leadership',
            publishedAt: '2025-12-06',
            excerpt:
                'Explores the principles of leadership in the Seven Kingdoms.',
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
    const items: ContentItem[] = [
        {
            id: 'c_0001',
            title: 'Leadership in Westeros',
            type: 'lesson',
            durationSeconds: null,
            url: 'https://xy.z/leadership',
            publishedAt: '2025-12-06',
            excerpt:
                'Explores the principles of leadership in the Seven Kingdoms.',
            thumbnailUrl: null,
        },
        {
            id: 'c_0142',
            title: 'Tactics from the Battle of the Five Kings',
            type: 'masterclass',
            durationSeconds: null,
            url: 'https://xy.z/battle-tactics',
            publishedAt: '2026-04-02',
            excerpt: 'Learn military strategy and tactics from Westeros.',
            thumbnailUrl: null,
        },
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
    await expect(
        page.getByRole('menuitemradio', { name: 'All types', exact: true }),
    ).toBeChecked();
    expect(urlSearch()).toBe('');

    await page
        .getByRole('menuitemradio', { name: 'masterclass', exact: true })
        .click();
    // Assert: the chosen type is stored in the URL and drives the cards
    await expect.poll(urlSearch).toBe('?type=masterclass');
    await expect(page.getByRole('heading', { level: 3 })).toHaveText([
        'Tactics from the Battle of the Five Kings',
    ]);

    const reloaded = await mount('ContentLibraryPage/Default', {
        path: `/${urlSearch()}`,
        props: { items },
    });
    // Assert: after reload the type is still in the URL and selected
    expect(urlSearch()).toBe('?type=masterclass');
    await expect(
        reloaded.getByRole('button', { name: 'masterclass', exact: true }),
    ).toBeVisible();

    await reloaded
        .getByRole('button', { name: 'masterclass', exact: true })
        .click();
    await reloaded
        .getByRole('menuitemradio', { name: 'All types', exact: true })
        .click();
    // Assert: choosing "All types" clears the URL and selects it
    await expect.poll(urlSearch).toBe('');
    await expect(
        reloaded.getByRole('button', { name: 'All types', exact: true }),
    ).toBeVisible();
});
