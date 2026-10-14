// Content library acceptance criteria — Playwright mounts the story next door.
import { expect, test } from '@withnik/configs/playwright';

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { sortByPublishedAtDesc } from '../src/lib/sort-by-published-at';
import type { ContentItem } from '../src/types/content.types';

const dataPath = fileURLToPath(
    new URL('../../../data/content.json', import.meta.url),
);
const items = (
    JSON.parse(readFileSync(dataPath, 'utf8')) as { items: ContentItem[] }
).items;
const sorted = sortByPublishedAtDesc(items);

test.describe('content library page', () => {
    test('renders every item from the data source', async ({ mount }) => {
        const app = await mount('App/Default');
        const cards = app.locator('[data-component="Card"]');

        await expect(cards).toHaveCount(items.length);
        expect(items.length).toBeGreaterThanOrEqual(30);
    });

    test('shows title, excerpt, type, and publishedAt for each item', async ({
        mount,
    }) => {
        const app = await mount('App/Default');
        const cards = app.locator('[data-component="Card"]');

        for (let i = 0; i < sorted.length; i++) {
            const item = sorted[i]!;
            const card = cards.nth(i);

            await expect(
                card.getByRole('heading', { name: item.title }),
            ).toBeVisible();
            await expect(card.getByText(item.excerpt)).toBeVisible();
            // type + publishedAt share Metadata; format is consistent across items.
            await expect(
                card.getByText(`${item.type} · ${item.publishedAt}`),
            ).toBeVisible();
        }
    });

    test('title and Open button link to the item url', async ({ mount }) => {
        const app = await mount('App/Default');
        const cards = app.locator('[data-component="Card"]');

        for (let i = 0; i < sorted.length; i++) {
            const item = sorted[i]!;
            const card = cards.nth(i);

            await expect(
                card.getByRole('link', { name: item.title }),
            ).toHaveAttribute('href', item.url);
            await expect(
                card.getByRole('link', { name: 'Open' }),
            ).toHaveAttribute('href', item.url);
        }
    });

    test('orders items newest first by publishedAt', async ({ mount }) => {
        const app = await mount('App/Default');
        const cards = app.locator('[data-component="Card"]');

        // File order is oldest-first; the UI must not rely on that.
        expect(items[0]?.title).not.toBe(sorted[0]?.title);

        for (let i = 0; i < sorted.length; i++) {
            await expect(
                cards.nth(i).getByRole('heading', { name: sorted[i]!.title }),
            ).toBeVisible();
        }

        await expect(
            cards.first().getByRole('heading', { name: sorted[0]!.title }),
        ).toBeVisible();
        await expect(
            cards.last().getByRole('heading', {
                name: sorted[sorted.length - 1]!.title,
            }),
        ).toBeVisible();
    });
});
