import { expect, test } from '@withnik/configs/playwright';

import contentSource from '../../../data/content.json' with { type: 'json' };

test.describe('The Content Library page', () => {
    test('lists every content item newest first, each linking to its original', async ({
        mount,
    }) => {
        const app = await mount('App/Default');

        const cards = app.getByRole('listitem');
        const newestCard = cards.first();
        const newestTitle = newestCard.getByRole('link', {
            name: 'Building real apps together',
        });
        const newestOpenButton = newestCard.getByRole('link', { name: 'Open' });
        const newestUrl =
            'https://better.withnik.com/c/general-discussions/building-real-apps-together';

        await expect(
            app.getByRole('heading', { name: 'Content Library' }),
        ).toBeVisible();
        await expect(cards).toHaveCount(contentSource.items.length);
        await expect(newestCard).toContainText('blueprint');
        await expect(newestCard).toContainText('Sep 25, 2026');
        await expect(newestCard).toContainText(
            "Nik introduces the community's initiative to build real applications collaboratively",
        );
        await expect(newestTitle).toHaveAttribute('href', newestUrl);
        await expect(newestTitle).toHaveAttribute('target', '_blank');
        await expect(newestOpenButton).toHaveAttribute('href', newestUrl);
        await expect(newestOpenButton).toHaveAttribute('target', '_blank');
    });
});
