import { PageHeader } from '@primer/react';
import { useState } from 'react';

import { ContentLibrary } from './ContentLibrary';
import {
    type ContentRecord,
    listContentTypes,
    presentContentLibrary,
} from './contentLibraryViewModel';
import { TypeFilter } from './TypeFilter';

type AppProps = {
    records: ContentRecord[];
};

export function App({ records }: AppProps) {
    const [selectedType, setSelectedType] = useState<string | null>(null);

    return (
        <main className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
            <PageHeader role="banner" aria-label="Content Library">
                <PageHeader.TitleArea>
                    <PageHeader.Title as="h1">Content Library</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>
            <div>
                <TypeFilter
                    contentTypes={listContentTypes(records)}
                    selectedType={selectedType}
                    onSelect={setSelectedType}
                />
            </div>
            <ContentLibrary
                cards={presentContentLibrary(records, { type: selectedType })}
            />
        </main>
    );
}
