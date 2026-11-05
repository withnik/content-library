// Integration tests for the type filter. Everything is found the way a user
// finds it: by role and accessible name, never by tag or CSS selector.
import { expect, test } from '@withnik/configs/playwright';
import content from '../../../data/content.json' with { type: 'json' };

test.use({ locale: 'en-US', timezoneId: 'America/Los_Angeles' });

const types = [...new Set(content.items.map((item) => item.type))];
const type = types[0]!;
const ofType = content.items.filter((item) => item.type === type);

test('lists every type in the data, plus "All types"', async ({ mount }) => {
    const app = await mount('App/Default');

    const filter = app.getByRole('combobox', { name: 'Type' });

    await expect(filter.getByRole('option')).toHaveText([
        'All types',
        ...types,
    ]);
});

test('shows only the chosen type, newest first', async ({ mount }) => {
    const app = await mount('App/Default');

    await app.getByRole('combobox', { name: 'Type' }).selectOption(type);

    const listed = app.getByRole('listitem');
    await expect(listed).toHaveCount(ofType.length);
    await expect(listed.getByText(type, { exact: true })).toHaveCount(
        ofType.length,
    );
    const dates = await listed
        .locator('time')
        .evaluateAll((times) => times.map((t) => t.getAttribute('datetime')));
    expect(dates).toEqual([...dates].sort().reverse());
});

test('goes back to everything when "All types" is chosen', async ({
    mount,
}) => {
    const app = await mount('App/Default');
    const filter = app.getByRole('combobox', { name: 'Type' });

    await filter.selectOption(type);
    await filter.selectOption('All types');

    await expect(app.getByRole('listitem')).toHaveCount(content.items.length);
});

test('starts on "All types"', async ({ mount, page }) => {
    // The context is reused between tests, so an earlier choice may linger.
    await mount('App/Default');
    await page.evaluate(() => localStorage.clear());

    const app = await mount('App/Default');

    await expect(app.getByRole('combobox', { name: 'Type' })).toHaveValue(
        'all',
    );
    await expect(app.getByRole('listitem')).toHaveCount(content.items.length);
});

test('remembers the choice when the page is opened again', async ({
    mount,
}) => {
    const first = await mount('App/Default');
    await first.getByRole('combobox', { name: 'Type' }).selectOption(type);
    await first.unmount();

    const again = await mount('App/Default');

    await expect(again.getByRole('combobox', { name: 'Type' })).toHaveValue(
        type,
    );
    await expect(again.getByRole('listitem')).toHaveCount(ofType.length);
});
