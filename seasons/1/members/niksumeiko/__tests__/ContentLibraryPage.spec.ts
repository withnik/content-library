// High-level integration test: the user opens the Content Library page,
// sees its title, sees every item accounted for, and can open an item's
// original source in a new tab via its title or "Open" action.
//
// This captures the full user journey the feature is meant to deliver.
// `ContentLibraryPage` doesn't render the whole list yet (the current
// iteration composes one item with Primer, not a loop), so this test is
// expected to stay red for now — that's intentional, TDD-style.
import { expect, test } from '@withnik/configs/playwright';
import type { ContentItem } from '../src/ContentLibraryPage';

const items: ContentItem[] = [
    {
        id: 'c_0001',
        title: 'The need of a ViewModel',
        type: 'lesson',
        media: 'article',
        durationSeconds: null,
        url: 'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-a-viewmodel',
        publishedAt: '2025-12-06',
        excerpt:
            'Explores why a ViewModel keeps presentation logic out of components in a clean React architecture.',
        thumbnailUrl: null,
    },
    {
        id: 'c_0142',
        title: 'Building an effective testing strategy for the React app',
        type: 'masterclass',
        media: 'video',
        durationSeconds: 1946,
        url: 'https://better.withnik.com/c/challenges/building-an-effective-testing-strategy',
        publishedAt: '2026-04-02',
        excerpt:
            'Learn unit and integration testing and master the testing pyramid for a React app.',
        thumbnailUrl: 'https://cdn.withnik.com/thumbs/c_0142.jpg',
    },
    {
        id: 'c_0210',
        title: 'Office hours: dependency inversion in practice',
        type: 'office-hours',
        media: 'video',
        durationSeconds: 2700,
        url: 'https://better.withnik.com/c/office-hours/dependency-inversion-in-practice',
        publishedAt: '2026-01-15',
        excerpt:
            'A live walkthrough of applying dependency inversion to decouple a feature from its data source.',
        thumbnailUrl: null,
    },
];

test('renders the content library page title, every item, and one item linking to its source in a new tab', async ({
    mount,
}) => {
    const page = await mount('ContentLibraryPage/Default', { props: { items } });

    await expect(
        page.getByRole('heading', { name: 'Content Library' }),
    ).toBeVisible();

    // Every item is present — nothing paginated, truncated, or lazily
    // loaded. Each item's title is a level-3 heading, so counting those
    // (an accessible selector) proves the full list rendered without
    // asserting on every item's details individually.
    await expect(page.getByRole('heading', { level: 3 })).toHaveCount(
        items.length,
    );

    // Full detail check on a single item (the first fake record above) is
    // enough to prove the shape is right; the count assertion above
    // already covers "every item". Asserted by its own static text/url
    // rather than through the `items` array, so the expectation reads as
    // what the user actually sees.
    await expect(
        page.getByRole('heading', {
            level: 3,
            name: 'The need of a ViewModel',
        }),
    ).toBeVisible();
    await expect(
        page.getByText(
            'Explores why a ViewModel keeps presentation logic out of components in a clean React architecture.',
        ),
    ).toBeVisible();
    await expect(page.getByText('lesson', { exact: false })).toBeVisible();

    // The title and the "Open" action both link back to the original,
    // opening it in a new tab rather than navigating away.
    const titleLink = page.getByRole('link', {
        name: 'The need of a ViewModel',
    });
    await expect(titleLink).toHaveAttribute(
        'href',
        'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-a-viewmodel',
    );
    await expect(titleLink).toHaveAttribute('target', '_blank');
    await expect(titleLink).toHaveAttribute('rel', /noopener/);

    const openLink = page
        .getByTestId('content-item-c_0001')
        .getByRole('link', { name: 'Open' });
    await expect(openLink).toHaveAttribute(
        'href',
        'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-a-viewmodel',
    );
    await expect(openLink).toHaveAttribute('target', '_blank');
    await expect(openLink).toHaveAttribute('rel', /noopener/);
});
