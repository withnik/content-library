import { expect, test } from '@withnik/configs/playwright';

const repositoryLesson = {
    id: 'c_0001',
    title: 'The need of Repository Layer',
    type: 'lesson',
    excerpt: 'Why a repository layer keeps data access out of the UI.',
    url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
    publishedAt: '2025-12-04',
};

const bootstrappingLesson = {
    id: 'c_0002',
    title: 'Bootstrapping an app',
    type: 'blueprint',
    excerpt: 'Standing up a React app with the tooling it will need.',
    url: 'https://better.withnik.com/c/react-nextjs-discussions/bootstrapping',
    publishedAt: '2025-12-05',
};

test.describe('The content library', () => {
    test('shows a card per item with its title, type, excerpt and published date', async ({
        mount,
    }) => {
        const library = await mount('ContentLibrary/WithItems', {
            props: { items: [repositoryLesson, bootstrappingLesson] },
        });

        const cards = library.getByRole('listitem');
        const firstCard = cards.first();

        await expect(cards).toHaveCount(2);
        await expect(firstCard).toContainText('The need of Repository Layer');
        await expect(firstCard).toContainText('lesson');
        await expect(firstCard).toContainText(
            'Why a repository layer keeps data access out of the UI.',
        );
        await expect(firstCard).toContainText('Dec 4, 2025');
    });

    test('opens the original in a new tab from the title and the Open button', async ({
        mount,
    }) => {
        const library = await mount('ContentLibrary/WithItems', {
            props: { items: [repositoryLesson] },
        });

        const title = library.getByRole('link', {
            name: 'The need of Repository Layer',
        });
        const openButton = library.getByRole('link', { name: 'Open' });

        await expect(title).toHaveAttribute('href', repositoryLesson.url);
        await expect(title).toHaveAttribute('target', '_blank');
        await expect(openButton).toHaveAttribute('href', repositoryLesson.url);
        await expect(openButton).toHaveAttribute('target', '_blank');
    });
});
