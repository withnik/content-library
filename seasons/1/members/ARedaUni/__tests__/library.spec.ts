// Integration tests for filtering feature via ViewModel
import { expect, test } from '@withnik/configs/playwright';
import content from '../../../data/content.json' with { type: 'json' };

test.use({ locale: 'en-US', timezoneId: 'America/Los_Angeles' });

test('filter dropdown shows all available types', async ({ mount }) => {
    const app = await mount('App/Default');

    const filterSelect = app.locator('select#type-filter');
    await expect(filterSelect).toBeVisible();

    // Check for "all" option
    await expect(filterSelect.locator('option[value="all"]')).toContainText('All types');

    // Check that types from data appear
    const options = filterSelect.locator('option');
    const optionTexts = await options.allTextContents();
    expect(optionTexts).toContain('All types');
    expect(optionTexts.length).toBeGreaterThan(1);
});

test('filtering by type shows only that type, newest first', async ({ mount }) => {
    const app = await mount('App/Default');

    const filterSelect = app.locator('select#type-filter');
    const firstType = content.items[0]?.type;
    if (!firstType) return;

    // Select first type
    await filterSelect.selectOption(firstType);

    // Wait for filtered list
    const listItems = app.getByRole('listitem');
    const visibleItems = await listItems.all();

    // Check: only selected type is shown
    for (const item of visibleItems) {
        await expect(item).toContainText(firstType);
    }

    // Check: newest-first order is preserved
    const dates = await listItems
        .locator('time')
        .evaluateAll((times) => times.map((t) => t.getAttribute('datetime')));
    expect(dates).toEqual([...dates].sort().reverse());
});

test('filter defaults to "all" on first load', async ({ mount, page }) => {
    // Clear localStorage to simulate first load
    await page.evaluate(() => {
        localStorage.clear();
    });

    const app = await mount('App/Default');

    const filterSelect = app.locator('select#type-filter');
    await expect(filterSelect).toHaveValue('all');

    // Verify all items are shown
    const listItems = app.getByRole('listitem');
    await expect(listItems).toHaveCount(content.items.length);
});

test('filter selection persists across reloads', async ({ mount, page }) => {
    const app = await mount('App/Default');
    const firstType = content.items[0]?.type;
    if (!firstType) return;

    // Select a type
    const filterSelect = app.locator('select#type-filter');
    await filterSelect.selectOption(firstType);
    await expect(filterSelect).toHaveValue(firstType);

    // Reload the page
    await page.reload();

    // Verify filter is still set (localStorage persisted)
    const reloadedSelect = app.locator('select#type-filter');
    await expect(reloadedSelect).toHaveValue(firstType);
});
