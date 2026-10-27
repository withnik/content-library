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
    storage,
}: {
    items: readonly ContentItem[];
    locale: string;
    storage?: Record<string, string>;
}) => {
    const dashboard = <ContentDashboard items={items} locale={locale} />;

    return storage ? (
        <KeyValueStorageContext.Provider
            value={new Map(Object.entries(storage))}
        >
            {dashboard}
        </KeyValueStorageContext.Provider>
    ) : (
        dashboard
    );
};

export const Empty = () => (
    <ContentDashboard items={[]} locale={navigator.language} />
);
