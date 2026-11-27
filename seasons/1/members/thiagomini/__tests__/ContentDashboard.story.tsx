import { ContentDashboard } from '../src/ContentDashboard';
import type { ContentItem } from '../src/ContentDashboardService';
import { NuqsAdapter } from 'nuqs/adapters/react';

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
    <NuqsAdapter>
        <ContentDashboard items={singleItem} locale="en-US" />
    </NuqsAdapter>
);

export const Default = ({
    items,
    locale,
}: {
    items: readonly ContentItem[];
    locale: string;
}) => {
    return (
        <NuqsAdapter>
            <ContentDashboard items={items} locale={locale} />
        </NuqsAdapter>
    );
};

export const Empty = () => (
    <NuqsAdapter>
        <ContentDashboard items={[]} locale={navigator.language} />
    </NuqsAdapter>
);
