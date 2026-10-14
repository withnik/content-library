// Smoke test for the integration layer (Playwright, real Chromium). It
// mounts the story next door — no Testing Library anywhere. Replace freely.
import { expect, test } from '@withnik/configs/playwright';
import content from '../../../data/content.json' with { type: 'json' };

// Pinned so date text is deterministic. West of UTC on purpose: a date-only
// ISO string parsed as UTC midnight would render as the previous day here.
test.use({ locale: 'en-US', timezoneId: 'America/Los_Angeles' });

test('renders the page heading with Primer styles', async ({ mount }) => {
    const app = await mount('App/Default');

    const heading = app.getByRole('heading', { name: 'Content Library' });
    await expect(heading).toBeVisible();
    // Proves the Primer theme is live: the fg token resolves to a real colour.
    await expect(heading).toHaveCSS('color', 'rgb(31, 35, 40)');
    // ...and that Tailwind's layout utilities are applied too.
    await expect(app.locator('main')).toHaveCSS('gap', '16px');
});

test('lists every content item, newest first', async ({ mount }) => {
    const app = await mount('App/Default');

    const listed = app.getByRole('listitem');
    await expect(listed).toHaveCount(content.items.length);

    const dates = await listed
        .locator('time')
        .evaluateAll((times) => times.map((t) => t.getAttribute('datetime')));
    expect(dates).toEqual([...dates].sort().reverse());
    await expect(listed.first()).toContainText('Building real apps together');
});

test('shows an item and links it to the original', async ({ mount }) => {
    const app = await mount('App/Default');
    const url =
        'https://better.withnik.com/c/general-discussions/building-real-apps-together';

    const item = app
        .getByRole('listitem')
        .filter({ hasText: 'Building real apps together' });

    await expect(
        item.getByRole('link', {
            name: 'Building real apps together',
            exact: true,
        }),
    ).toHaveAttribute('href', url);
    await expect(
        item.getByRole('link', {
            name: 'Open Building real apps together',
            exact: true,
        }),
    ).toHaveAttribute('href', url);
    await expect(item).toContainText('blueprint');
    await expect(item).toContainText(
        "Nik introduces the community's initiative to build real applications collaboratively",
    );
    await expect(item.locator('time')).toHaveText('Sep 25, 2026');
});
