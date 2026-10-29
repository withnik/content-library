import { expect, test } from '@withnik/configs/playwright';

import { formatPublishedAt } from '../src/lib/format-published-at';

test('content library user journey', async ({ mount }) => {
    const app = await mount('App/WithStubItems');

    await expect(
        app.getByRole('heading', { name: 'Content Library' }),
    ).toBeVisible();

    const cards = app.locator('[data-component="Card"]');
    await expect(cards).toHaveCount(3);

    const first = cards.nth(0);
    const last = cards.nth(2);

    await expect(
        first.getByRole('heading', { name: 'Newer item' }),
    ).toBeVisible();
    await expect(first.getByText('Newer excerpt')).toBeVisible();
    await expect(
        first.getByText(`recording · ${formatPublishedAt('2026-09-25')}`),
    ).toBeVisible();
    await expect(
        first.getByRole('link', { name: 'Newer item' }),
    ).toHaveAttribute('href', 'https://example.com/new');
    await expect(first.getByRole('link', { name: 'Open' })).toHaveAttribute(
        'href',
        'https://example.com/new',
    );

    await expect(
        last.getByRole('heading', { name: 'Older item' }),
    ).toBeVisible();
});

test('filters by type and All restores the list', async ({ mount }) => {
    const app = await mount('App/WithStubItems');
    const cards = app.locator('[data-component="Card"]');
    const typeFilter = app.getByRole('combobox', { name: 'Type' });

    await expect(cards).toHaveCount(3);
    await expect(typeFilter).toHaveValue('all');

    await typeFilter.selectOption('lesson');

    await expect(cards).toHaveCount(2);
    await expect(
        cards.nth(0).getByRole('heading', { name: 'Middle lesson' }),
    ).toBeVisible();
    await expect(
        cards.nth(1).getByRole('heading', { name: 'Older item' }),
    ).toBeVisible();
    await expect(app.getByRole('heading', { name: 'Newer item' })).toHaveCount(
        0,
    );

    await typeFilter.selectOption('all');

    await expect(cards).toHaveCount(3);
    await expect(
        cards.nth(0).getByRole('heading', { name: 'Newer item' }),
    ).toBeVisible();
});
