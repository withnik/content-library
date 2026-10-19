import { expect, test } from '@withnik/configs/playwright';

import { formatPublishedAt } from '../src/lib/format-published-at';

test('content library user journey', async ({ mount }) => {
  const app = await mount('App/WithStubItems');

  await expect(
    app.getByRole('heading', { name: 'Content Library' }),
  ).toBeVisible();

  const cards = app.locator('[data-component="Card"]');
  await expect(cards).toHaveCount(2);

  const first = cards.nth(0);
  const second = cards.nth(1);

  await expect(first.getByRole('heading', { name: 'Newer item' })).toBeVisible();
  await expect(first.getByText('Newer excerpt')).toBeVisible();
  await expect(
    first.getByText(`recording · ${formatPublishedAt('2026-09-25')}`),
  ).toBeVisible();
  await expect(first.getByRole('link', { name: 'Newer item' })).toHaveAttribute(
    'href',
    'https://example.com/new',
  );
  await expect(first.getByRole('link', { name: 'Open' })).toHaveAttribute(
    'href',
    'https://example.com/new',
  );

  await expect(second.getByRole('heading', { name: 'Older item' })).toBeVisible();
});