import { expect, test } from '@withnik/configs/playwright';

const repositoryLesson = {
    id: 'c_0001',
    title: 'The need of Repository Layer',
    type: 'lesson',
    excerpt: 'Why a repository layer keeps data access out of the UI.',
    url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
    publishedAt: '2025-12-04',
};

const bootstrappingBlueprint = {
    id: 'c_0002',
    title: 'Bootstrapping an app',
    type: 'blueprint',
    excerpt: 'Standing up a React app with the tooling it will need.',
    url: 'https://better.withnik.com/c/react-nextjs-discussions/bootstrapping',
    publishedAt: '2025-12-05',
};

test.describe('The Content Library page', () => {
    test('is titled Content Library', async ({ mount }) => {
        const app = await mount('App/Default', { props: { items: [] } });

        await expect(
            app.getByRole('heading', { name: 'Content Library' }),
        ).toBeVisible();
    });

    test('shows a card per item with its title, type, excerpt and published date', async ({
        mount,
    }) => {
        const app = await mount('App/Default', {
            props: { items: [bootstrappingBlueprint, repositoryLesson] },
        });

        const cards = app.getByRole('listitem');
        const firstCard = cards.first();

        await expect(cards).toHaveCount(2);
        await expect(firstCard).toContainText('Bootstrapping an app');
        await expect(firstCard).toContainText('blueprint');
        await expect(firstCard).toContainText(
            'Standing up a React app with the tooling it will need.',
        );
        await expect(firstCard).toContainText('Dec 5, 2025');
    });

    test('lists the latest published item first', async ({ mount }) => {
        const app = await mount('App/Default', {
            props: { items: [repositoryLesson, bootstrappingBlueprint] },
        });

        const titles = app.getByRole('listitem').getByRole('heading');

        await expect(titles).toHaveText([
            'Bootstrapping an app',
            'The need of Repository Layer',
        ]);
    });

    test('opens the original in a new tab from the title and the Open button', async ({
        mount,
    }) => {
        const app = await mount('App/Default', {
            props: { items: [repositoryLesson] },
        });

        const title = app.getByRole('link', {
            name: 'The need of Repository Layer',
        });
        const openButton = app.getByRole('link', { name: 'Open' });

        await expect(title).toHaveAttribute(
            'href',
            'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
        );
        await expect(title).toHaveAttribute('target', '_blank');
        await expect(openButton).toHaveAttribute(
            'href',
            'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
        );
        await expect(openButton).toHaveAttribute('target', '_blank');
    });
});
