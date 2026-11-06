import { expect, test } from '@withnik/configs/playwright';
import { type Page } from '@playwright/test';
import { buildContent } from '../builders/buildContent';
import { buildContents } from '../helpers/buildContents';

const openDropdown = (page: Page) =>
    page
        .getByRole('button', { name: /all types|lesson|recording|gameworks/i })
        .click();

const option = (page: Page, name: RegExp) =>
    page.getByRole('menuitemradio', { name, exact: true });

const items = [
    ...buildContents(2, { type: 'lesson' }),
    ...buildContents(3, { type: 'recording' }),
    buildContent({ type: 'gameworks' }),
];

const STORY = 'ContentLibraryPage/Default';

test.describe('Filter Dropdown', () => {
    test('renders all items by default', async ({ mount, page }) => {
        const app = await mount('App/Default');
        const cards = app.getByRole('listitem');
        await expect(page).not.toHaveURL(/filter/);
        await expect(cards).not.toHaveCount(0);
    });

    test('filters items by type', async ({ mount, page }) => {
        const app = await mount(STORY, { props: { items } });
        const cards = app.getByRole('listitem');

        await expect(cards).toHaveCount(6);

        await openDropdown(page);
        await option(page, /lesson/i).click();
        await expect(page).toHaveURL(/filter=lesson/);
        await expect(cards).toHaveCount(2);

        await openDropdown(page);
        await option(page, /recording/i).click();
        await expect(page).toHaveURL(/filter=recording/);
        await expect(cards).toHaveCount(3);

        await openDropdown(page);
        await option(page, /gameworks/i).click();
        await expect(page).toHaveURL(/filter=gameworks/);
        await expect(cards).toHaveCount(1);

        await openDropdown(page);
        await option(page, /all types/i).click();
        await expect(page).not.toHaveURL(/filter/);
        await expect(cards).toHaveCount(6);
    });

    test('keeps the filter after a reload', async ({ mount, page }) => {
        const app = await mount(STORY, { props: { items } });
        const cards = app.getByRole('listitem');

        await expect(cards).toHaveCount(6);

        await openDropdown(page);
        await option(page, /lesson/i).click();
        await expect(page).toHaveURL(/filter=lesson/);
        await expect(cards).toHaveCount(2);

        const search = new URL(page.url()).search;
        const reloaded = await mount(STORY, {
            path: `/${search}`,
            props: { items },
        });

        await expect(page).toHaveURL(/filter=lesson/);
        await expect(
            reloaded.getByRole('button', { name: /lesson/i, exact: true }),
        ).toBeVisible();
        await expect(reloaded.getByRole('listitem')).toHaveCount(2);
    });
});
