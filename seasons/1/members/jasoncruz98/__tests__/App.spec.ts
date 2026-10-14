// Smoke test for the integration layer (Playwright, real Chromium). It
// mounts the story next door — no Testing Library anywhere. Replace freely.
import { expect, test } from '@withnik/configs/playwright';

test('renders the page heading with Primer styles', async ({ mount }) => {
    const app = await mount('App/Default');

    const heading = app.getByRole('heading', { name: 'Content Library' });
    await expect(heading).toBeVisible();
    // Proves the Primer theme is live: the fg token resolves to a real colour.
    await expect(heading).toHaveCSS('color', 'rgb(31, 35, 40)');
    // ...and that Tailwind's layout utilities are applied too.
    await expect(app.locator('main')).toHaveCSS('gap', '16px');
});

const stub = [
    {
        id: 'c_0001',
        title: 'The need of Repository Layer',
        type: 'lesson',
        url: 'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-repository-layer',
        publishedAt: '2025-12-04',
        author: 'Stefano',
        space: 'React / Nextjs',
        excerpt: 'Explores why a repository layer is fundamental in clean architecture — separating data-fetching responsibilities from application logic in React apps.',
        durationSeconds: null,
        thumbnailUrl: null,
    },
    {
        id: 'c_0002',
        title: 'Bootstrapping an app',
        type: 'lesson',
        url: 'https://better.withnik.com/c/react-nextjs-discussions/bootstrapping-an-app',
        publishedAt: '2025-12-05',
        author: 'Stefano',
        space: 'React / Nextjs',
        excerpt: 'Practical walkthrough of setting up a React app from scratch with clean architecture principles, covering folder structure, entry points, and initial wiring.',
        durationSeconds: null,
        thumbnailUrl: null,
    },
];

test('renders one card per item, each showing title, excerpt, type and publishedAt', async ({
    mount,
}) => {
    const app = await mount('App/Default', { props: { items: stub } });

    const cards = app.getByTestId('content-card');
    await expect(cards).toHaveCount(2);

    const first = cards.nth(0);
    await expect(first.getByTestId('title')).toHaveText(
        'The need of Repository Layer',
    );
    await expect(first.getByTestId('excerpt')).toHaveText(
        'Explores why a repository layer is fundamental in clean architecture — separating data-fetching responsibilities from application logic in React apps.',
    );
    await expect(first.getByTestId('type')).toHaveText('lesson');
    await expect(first.getByTestId('publishedAt')).toHaveText('2025-12-04');

    const second = cards.nth(1);
    await expect(second.getByTestId('title')).toHaveText('Bootstrapping an app');
    await expect(second.getByTestId('excerpt')).toHaveText(
        'Practical walkthrough of setting up a React app from scratch with clean architecture principles, covering folder structure, entry points, and initial wiring.',
    );
    await expect(second.getByTestId('type')).toHaveText('lesson');
    await expect(second.getByTestId('publishedAt')).toHaveText('2025-12-05');
});

test('each card has a link that opens its url in a new tab', async ({
    mount,
}) => {
    const app = await mount('App/Default', { props: { items: stub } });

    const cards = app.getByTestId('content-card');

    const firstLink = cards.nth(0).getByRole('link');
    await expect(firstLink).toBeVisible();
    await expect(firstLink).toHaveAttribute(
        'href',
        'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-repository-layer',
    );
    await expect(firstLink).toHaveAttribute('target', '_blank');

    const secondLink = cards.nth(1).getByRole('link');
    await expect(secondLink).toBeVisible();
    await expect(secondLink).toHaveAttribute(
        'href',
        'https://better.withnik.com/c/react-nextjs-discussions/bootstrapping-an-app',
    );
    await expect(secondLink).toHaveAttribute('target', '_blank');
});
