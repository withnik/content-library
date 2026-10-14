import { PageHeader } from '@primer/react';

import { ContentLibrary } from './ContentLibrary';
import {
    type ContentRecord,
    presentContentLibrary,
} from './contentLibraryViewModel';

type AppProps = {
    records: ContentRecord[];
};

export function App({ records }: AppProps) {
    return (
        <main className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
            <PageHeader role="banner" aria-label="Content Library">
                <PageHeader.TitleArea>
                    <PageHeader.Title as="h1">Content Library</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>
            <ContentLibrary cards={presentContentLibrary(records)} />
        </main>
    );
}
