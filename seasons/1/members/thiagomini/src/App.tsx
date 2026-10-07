import { Heading } from '@primer/react';
import { ContentDashboard } from './ContentDashboard';
import { contentItems } from './ContentDashboardService';

export function App() {
    return (
        <main className="flex flex-col gap-6 p-6" aria-labelledby="page-title">
            <Heading as="h1" id="page-title">
                Content Library
            </Heading>

            <ContentDashboard items={contentItems} />
        </main>
    );
}
