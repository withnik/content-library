import { expect, test } from '@withnik/configs/playwright';

const bootstrappingBlueprint = {
    id: 'c_0002',
    title: 'Bootstrapping an app',
    type: 'blueprint',
    excerpt: 'Standing up a React app with the tooling it will need.',
    url: 'https://better.withnik.com/c/react-nextjs-discussions/bootstrapping',
    publishedAt: '2025-12-05',
};

const repositoryLesson = {
    id: 'c_0001',
    title: 'The need of Repository Layer',
    type: 'lesson',
    excerpt: 'Why a repository layer keeps data access out of the UI.',
    url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
    publishedAt: '2025-12-04',
};

test('lets a visitor find the newest content item and open its original', async ({
    mount,
}) => {
    const app = await mount('App/Default', {
        props: { records: [bootstrappingBlueprint, repositoryLesson] },
    });

    const cards = app.getByRole('listitem');
    const newestCard = cards.first();
    const openButton = newestCard.getByRole('link', { name: 'Open' });

    await expect(
        app.getByRole('heading', { name: 'Content Library' }),
    ).toBeVisible();
    await expect(cards).toHaveCount(2);
    await expect(newestCard).toContainText('Bootstrapping an app');
    await expect(newestCard).toContainText(
        'Standing up a React app with the tooling it will need.',
    );
    await expect(newestCard).toContainText('blueprint');
    await expect(openButton).toHaveAttribute(
        'href',
        'https://better.withnik.com/c/react-nextjs-discussions/bootstrapping',
    );
    await expect(openButton).toHaveAttribute('target', '_blank');
});
