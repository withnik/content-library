import { expect, test } from '@withnik/configs/playwright';

test('shows every item the adapter provides', async ({ mount }) => {
    const page = await mount('ContentLibraryPage/Five');

    await expect(page.getByRole('listitem')).toHaveCount(5);
});

test('shows title, excerpt, type and date, and links to the original', async ({
    mount,
}) => {
    const page = await mount('ContentLibraryPage/Single');
    const row = page.getByRole('listitem');
    const url = 'https://better.withnik.com/c/challenges/testing-async';

    await expect(
        row.getByRole('link', { name: 'Testing async React components' }),
    ).toHaveAttribute('href', url);
    await expect(
        row.getByRole('link', { name: 'Open original' }),
    ).toHaveAttribute('href', url);
    await expect(
        row.getByText('Live refactor of a flaky test suite.'),
    ).toBeVisible();
    await expect(row.getByText('masterclass')).toBeVisible();
    await expect(row.getByText('Apr 2, 2026')).toBeVisible();
});
