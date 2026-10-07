import { ContentDashboard } from '../src/ContentDashboard';
import type { ContentItem } from '../src/ContentDashboardService';

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
    locale?: string;
}) => <ContentDashboard items={items} locale={locale} />;

export const Empty = () => <ContentDashboard items={[]} />;
