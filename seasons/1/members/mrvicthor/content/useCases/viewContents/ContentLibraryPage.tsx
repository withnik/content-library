import { Heading, Link } from '@primer/react';
import { ArrowLeftIcon } from '@primer/octicons-react';
import { ContentLibrary } from './ContentLibrary';
import { createContentLibraryPageModel } from './ContentLibraryPageModelService';
import FilterDropdown from './FilterDropdown';
import EmptyCard from './EmptyCard';
import type { Content } from '../../domain/ContentService';
import { useQueryParams } from '../../hooks/useQueryParams';

type Props = {
    items: Content[];
};

const ContentLibraryPage = ({ items }: Props) => {
    const [filterParam, setFilter] = useQueryParams('filter');

    const viewModel = createContentLibraryPageModel(items, filterParam ?? '');
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
            <FilterDropdown
                filterBy={filterParam ?? ''}
                handleFilter={setFilter}
                filterOptions={viewModel.filterOptions}
            />
            {viewModel.items.length > 0 ? (
                <ContentLibrary items={viewModel.items} />
            ) : (
                <EmptyCard filterBy={String(filterParam)} />
            )}
        </main>
    );
};

export default ContentLibraryPage;
