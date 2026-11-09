import { PageHeader } from '@primer/react';

import { ContentLibrary } from './ContentLibrary';
import {
    type ContentRecord,
    presentContentLibrary,
} from './contentLibraryViewModel';
import { TypeFilter } from './TypeFilter';
import { useSearchParam } from './useSearchParam';

type AppProps = {
    records: ContentRecord[];
};

export function App({ records }: AppProps) {
    const [selectedType, selectType] = useSearchParam('type');
    const view = presentContentLibrary(records, { type: selectedType });

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
