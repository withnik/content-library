import { expect, test } from '@withnik/configs/playwright';
import { buildContent } from '../builders/buildContent';
import type { Page } from '@playwright/test';

const openDropdown = (page: Page) =>
    page
        .getByRole('button', { name: /all types|lesson|recording|gameworks/i })
        .click();

const option = (page: Page, name: RegExp) =>
    page.getByRole('menuitemradio', { name, exact: true });

const older = buildContent({
    title: 'Older lesson',
    type: 'lesson',
    publishedAt: '2025-01-01',
});
const newest = buildContent({
    title: 'Newest recording',
    type: 'recording',
    publishedAt: '2026-03-01',
});
const middle = buildContent({
    title: 'Middle gamework',
    type: 'gameworks',
    publishedAt: '2025-06-01',
});

const items = [older, newest, middle];

const reactLesson = buildContent({
    title: 'React hooks lesson',
    type: 'lesson',
});
const reactRecording = buildContent({
    title: 'React hooks recording',
    type: 'recording',
});
const cssLesson = buildContent({ title: 'CSS grid lesson', type: 'lesson' });

const mixedItems = [reactLesson, reactRecording, cssLesson];

const STORY = 'ContentLibraryPage/Default';

test.describe('Content Library Page', () => {
    test('renders all items by default', async ({ mount, page }) => {
        const app = await mount('App/Default');
        const cards = app.getByRole('listitem');
        await expect(page).not.toHaveURL(/filter/);
        await expect(cards).not.toHaveCount(0);
    });
    test('renders one card per content item', async ({ mount }) => {
        const page = await mount(STORY, {
            props: { items },
        });
        await expect(page.getByRole('listitem')).toHaveCount(3);
    });

    test('should return items that match search query', async ({ mount }) => {
        const page = await mount('ContentLibraryPage/Default', {
            props: { items },
        });
        await page.getByLabel(/search/i).fill('old');
        const results = page.getByRole('listitem');

        await expect(results).toHaveCount(1);
        await expect(results.filter({ hasText: older.title })).toBeVisible();

        await expect(page.getByText(newest.title)).toBeHidden();
    });

    test('When a type filter and a search term are both active, both apply.', async ({
        mount,
        page,
    }) => {
        const app = await mount(STORY, { props: { items: mixedItems } });
        const cards = app.getByRole('listitem');

        await expect(cards).toHaveCount(3);

        await openDropdown(page);
        await option(page, /lesson/i).click();
        await expect(page).toHaveURL(/filter=lesson/);
        await expect(cards).toHaveCount(2);

        await app.getByLabel(/search/i).fill('react');
        await expect(page).toHaveURL(/filter=lesson/);
        await expect(page).toHaveURL(/search=react/);

        await expect(
            cards.filter({ hasText: reactLesson.title }),
        ).toBeVisible();
    });

    test('return a message when no matching content', async ({ mount }) => {
        const page = await mount('ContentLibraryPage/Default', {
            props: { items },
        });
        await page.getByLabel(/search/i).fill('godzilla');
        await expect(
            page.getByText(/try a different search term, or clear filters./i),
        ).toBeVisible();
    });

    test('Changing the type filter does not clear the search term, and vice versa.', async ({
        mount,
        page,
    }) => {
        const app = await mount(STORY, { props: { items: mixedItems } });
        const cards = app.getByRole('listitem');

        await expect(cards).toHaveCount(3);

        await openDropdown(page);
        await option(page, /lesson/i).click();
        await expect(page).toHaveURL(/filter=lesson/);
        await expect(cards).toHaveCount(2);

        await app.getByLabel(/search/i).fill('react');
        await expect(page).toHaveURL(/filter=lesson/);
        await expect(page).toHaveURL(/search=react/);

        await openDropdown(page);
        await option(page, /recording/i).click();
        await expect(page).toHaveURL(/filter=recording/);

        await expect(page.getByLabel(/search/i)).toHaveValue('react');
    });

    test('Store the search query across reloads.', async ({ mount, page }) => {
        await mount(STORY, { props: { items } });

        await page.getByLabel(/search/i).fill('old');
        const search = new URL(page.url()).search;
        const reloaded = await mount(STORY, {
            path: `/${search}`,
            props: { items },
        });

        await expect(page).toHaveURL(/search=old/);
        await expect(reloaded.getByRole('listitem')).toHaveCount(1);
    });
});
