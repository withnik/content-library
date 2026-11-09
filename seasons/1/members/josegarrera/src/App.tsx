import { PageHeader } from '@primer/react';
import { useState } from 'react';

import { ContentLibrary } from './ContentLibrary';
import {
    type ContentRecord,
    presentContentLibrary,
} from './contentLibraryViewModel';
import type { SelectedTypeStorage } from './selectedTypeStorage';
import { TypeFilter } from './TypeFilter';

type AppProps = {
    records: ContentRecord[];
    selectedTypeStorage: SelectedTypeStorage;
};

export function App({ records, selectedTypeStorage }: AppProps) {
    const [selectedType, setSelectedType] = useState(() =>
        selectedTypeStorage.load(),
    );
    const view = presentContentLibrary(records, { type: selectedType });

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
                    typeOptions={view.typeOptions}
                    onSelect={selectType}
                />
            </div>
            <ContentLibrary cards={view.cards} />
        </main>
    );
}
