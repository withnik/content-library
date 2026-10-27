import { PageHeader } from '@primer/react';
import { useState } from 'react';

import { ContentLibrary } from './ContentLibrary';
import {
    type ContentRecord,
    listContentTypes,
    presentContentLibrary,
    resolveSelectedType,
} from './contentLibraryViewModel';
import type { SelectedTypeStorage } from './selectedTypeStorage';
import { TypeFilter } from './TypeFilter';

type AppProps = {
    records: ContentRecord[];
    selectedTypeStorage: SelectedTypeStorage;
};

export function App({ records, selectedTypeStorage }: AppProps) {
    const contentTypes = listContentTypes(records);
    const [selectedType, setSelectedType] = useState(() =>
        resolveSelectedType(selectedTypeStorage.load(), contentTypes),
    );

    function selectType(type: string | null) {
        setSelectedType(type);
        selectedTypeStorage.save(type);
    }

    return (
        <main className="mx-auto flex max-w-3xl flex-col gap-4 p-6">
            <PageHeader role="banner" aria-label="Content Library">
                <PageHeader.TitleArea>
                    <PageHeader.Title as="h1">Content Library</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>
            <div>
                <TypeFilter
                    contentTypes={contentTypes}
                    selectedType={selectedType}
                    onSelect={selectType}
                />
            </div>
            <ContentLibrary
                cards={presentContentLibrary(records, { type: selectedType })}
            />
        </main>
    );
}
