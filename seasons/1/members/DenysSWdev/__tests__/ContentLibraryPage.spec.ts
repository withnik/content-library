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

const catalogue: ContentItem[] = [
    {
        id: 'c_0200',
        title: 'Dragon Riding Basics',
        type: 'lesson',
        durationSeconds: null,
        url: 'https://xy.z/dragon-riding',
        publishedAt: '2026-06-10',
        excerpt: 'First steps in mounting and steering a dragon.',
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
    {
        id: 'c_0300',
        title: 'Small Council Q&A',
        type: 'recording',
        durationSeconds: null,
        url: 'https://xy.z/small-council',
        publishedAt: '2026-01-15',
        excerpt: 'Recorded questions and answers with the small council.',
        thumbnailUrl: null,
    },
    {
        id: 'c_0001',
        title: 'Leadership in Westeros',
        type: 'lesson',
        durationSeconds: null,
        url: 'https://xy.z/leadership',
        publishedAt: '2025-12-06',
        excerpt: 'Explores the principles of leadership in the Seven Kingdoms.',
        thumbnailUrl: null,
    },
];

test('filter content by one type at a time and reset to all', async ({
    mount,
}) => {
    const page = await mount('ContentLibraryPage/Default', {
        props: { items: catalogue },
    });
    const titles = page.getByRole('heading', { level: 3 });

    // Assert: "All" is the state on first load
    const allTypes = page.getByRole('button', {
        name: 'All types',
        exact: true,
    });
    await expect(allTypes).toBeVisible();
    await expect(titles).toHaveCount(4);

    await allTypes.click();
    // Assert: every type in the data, plus an option meaning "all"
    await expect(page.getByRole('menuitemradio')).toHaveText([
        'All types',
        'lesson',
        'masterclass',
        'recording',
    ]);
    await expect(
        page.getByRole('menuitemradio', { name: 'All types', exact: true }),
    ).toBeChecked();

    await page
        .getByRole('menuitemradio', { name: 'lesson', exact: true })
        .click();
    // Assert: only items of that type show
    await expect(
        page.getByRole('button', { name: 'lesson', exact: true }),
    ).toBeVisible();
    await expect(titles).toHaveText([
        'Dragon Riding Basics',
        'Leadership in Westeros',
    ]);
    await expect
        .poll(() => new URL(page.page().url()).search)
        .toBe('?type=lesson');

    await page.getByRole('button', { name: 'lesson', exact: true }).click();
    await page
        .getByRole('menuitemradio', { name: 'masterclass', exact: true })
        .click();
    // Assert: only one type is active at a time
    await expect(titles).toHaveText([
        'Tactics from the Battle of the Five Kings',
    ]);

    await page
        .getByRole('button', { name: 'masterclass', exact: true })
        .click();
    await page
        .getByRole('menuitemradio', { name: 'All types', exact: true })
        .click();
    // Assert: there is a way back to showing all content
    await expect(titles).toHaveCount(4);
    await expect(
        page.getByRole('button', { name: 'All types', exact: true }),
    ).toBeVisible();
    await expect.poll(() => new URL(page.page().url()).search).toBe('');
});

test('restore the type filter from the URL on load', async ({ mount }) => {
    const page = await mount('ContentLibraryPage/Default', {
        path: '/?type=masterclass',
        props: { items: catalogue },
    });

    // Assert: the selection is restored
    await expect(
        page.getByRole('button', { name: 'masterclass', exact: true }),
    ).toBeVisible();
    await expect(page.getByRole('heading', { level: 3 })).toHaveText([
        'Tactics from the Battle of the Five Kings',
    ]);
});
