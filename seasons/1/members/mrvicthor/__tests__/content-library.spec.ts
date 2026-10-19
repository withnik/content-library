import { expect, test } from '@withnik/configs/playwright';
import data from '../../../data/content.json' with { type: 'json' };

const newestFirst = [...data.items].sort((a, b) =>
    b.publishedAt.localeCompare(a.publishedAt),
);

test.describe('Content Library', () => {
    test.beforeEach(async ({ mount }) => {
        const app = await mount('App/Default');
        const heading = app.getByRole('heading', { name: 'Content Library' });
        await expect(heading).toBeVisible();
    });

    test('renders one card per content item', async ({ mount }) => {
        const app = await mount('App/Default');
        const cards = app.getByRole('listitem');
        await expect(cards).toHaveCount(data.items.length);
    });

    test('orders items by publishedAt, newest first', async ({ mount }) => {
        const app = await mount('App/Default');
        await expect(app.getByRole('listitem')).toContainText(
            newestFirst.map((c) => c.title),
        );
    });

    test('each card links to its content', async ({ mount }) => {
        const app = await mount('App/Default');
        const first = newestFirst[0];
        const firstCard = app.getByRole('listitem').first();

        await expect(
            firstCard.getByRole('link', { name: first?.title }),
        ).toHaveAttribute('href', String(first?.url));
        await expect(
            firstCard.getByRole('link', { name: 'Open' }),
        ).toHaveAttribute('href', String(first?.url));
    });
});
