import { expect, test } from '@withnik/configs/playwright';
import { buildContent } from '../builders/buildContent';

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

test.describe('Content Library', () => {
    test('renders one card per content item', async ({ mount }) => {
        const page = await mount('ContentLibrary/Default', {
            props: { items },
        });
        await expect(page.getByRole('listitem')).toHaveCount(3);
    });

    test('each card links to its content', async ({ mount }) => {
        const page = await mount('ContentLibrary/Default', {
            props: { items },
        });
        const first = items[0];
        const firstCard = page.getByRole('listitem').first();

        await expect(
            firstCard.getByRole('link', { name: first?.title }),
        ).toHaveAttribute('href', String(first?.url));
        await expect(
            firstCard.getByRole('link', { name: 'Open' }),
        ).toHaveAttribute('href', String(first?.url));
    });
});
