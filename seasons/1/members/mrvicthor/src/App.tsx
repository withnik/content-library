import { Heading, Link } from '@primer/react';
import { ContentLibrary } from '../content/useCases/viewContents/ContentLibrary';
import { ArrowLeftIcon } from '@primer/octicons-react';
import data from '../../../data/content.json';
import { createContentLibraryPageModel } from '../content/useCases/viewContents/ContentLibraryPageModelService';
import { useState } from 'react';
import FilterDropdown from '../content/useCases/viewContents/FilterDropdown';
import { type FilterBy } from '../content/domain/ContentService';
import EmptyCard from '../content/useCases/viewContents/EmptyCard';

export function App() {
    const [filterBy, setFilterBy] = useState<FilterBy>('all');
    const viewModel = createContentLibraryPageModel(data.items, filterBy);

    return (
        <main className="flex flex-col gap-4 p-6">
            <header className="grid grid-cols-[1fr_auto_1fr] items-center rounded-md bg-(--bgColor-emphasis) px-4 py-3 text-white [--fgColor-accent:var(--fgColor-onEmphasis)] [--fgColor-default:var(--fgColor-onEmphasis)]">
                <Link
                    href="/"
                    className="flex items-center gap-1 justify-self-start"
                >
                    <ArrowLeftIcon />
                    Back
                </Link>
                <Heading as="h1" variant="medium">
                    {viewModel.title}
                </Heading>
                <span aria-hidden="true" />
            </header>
            <FilterDropdown filterBy={filterBy} setFilterBy={setFilterBy} />
            {viewModel.items.length > 0 ? (
                <ContentLibrary items={viewModel.items} />
            ) : (
                <EmptyCard filterBy={filterBy} />
            )}
        </main>
    );
}
