import { ContentDashboard } from '../src/ContentDashboard';
import type { ContentItem } from '../src/ContentDashboardService';
import { KeyValueStorageContext } from '../src/KeyValueStorage';

const singleItem = [
    {
        id: 'testing-content',
        title: 'Testing content',
        type: 'article',
        url: 'https://example.com/testing-content',
        publishedAt: '2026-04-13',
        excerpt: 'Learn how to write reliable tests.',
        durationSeconds: null,
        thumbnailUrl: null,
    },
] satisfies readonly ContentItem[];

export const WithSingleItem = () => (
    <ContentDashboard items={singleItem} locale="en-US" />
);

export const Default = ({
    items,
    locale,
}: {
    items: readonly ContentItem[];
    locale: string;
}) => <ContentDashboard items={items} locale={locale} />;

export const WithStoredLesson = ({
    items,
    locale,
}: {
    items: readonly ContentItem[];
    locale: string;
}) => {
    const storage = new Map<string, string>([
        ['content-library.selected-type', 'lesson'],
    ]);

    return (
        <KeyValueStorageContext.Provider value={storage}>
            <ContentDashboard items={items} locale={locale} />
        </KeyValueStorageContext.Provider>
    );
};

export const Empty = () => (
    <ContentDashboard items={[]} locale={navigator.language} />
);
