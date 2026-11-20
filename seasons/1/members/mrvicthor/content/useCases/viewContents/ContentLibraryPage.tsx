import { FormControl, Heading, Link, TextInput } from '@primer/react';
import { ArrowLeftIcon } from '@primer/octicons-react';
import { ContentLibrary } from './ContentLibrary';
import { createContentLibraryPageModel } from './ContentLibraryPageModelService';
import { SearchIcon } from '@primer/octicons-react';
import FilterDropdown from './FilterDropdown';
import EmptyCard from './EmptyCard';
import type { Content } from '../../domain/ContentService';
import { useQueryParams } from '../../hooks/useQueryParams';
import { useSearch } from '../../hooks/useSearch';

type Props = {
    items: Content[];
};

const ContentLibraryPage = ({ items }: Props) => {
    const [filterParam, setFilter] = useQueryParams('filter');
    const { search, handleSearch } = useSearch();

    const viewModel = createContentLibraryPageModel(
        items,
        filterParam ?? '',
        search,
    );
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
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <form role="search" className="flex-1 px-4">
                    <FormControl>
                        <FormControl.Label visuallyHidden>
                            Search
                        </FormControl.Label>
                        <TextInput
                            block
                            size="large"
                            type="search"
                            placeholder="Type to search"
                            leadingVisual={SearchIcon}
                            value={search}
                            onChange={(e) => handleSearch(e)}
                            className=""
                        />
                    </FormControl>
                </form>
                <FilterDropdown
                    filterBy={filterParam ?? ''}
                    handleFilter={setFilter}
                    filterOptions={viewModel.filterOptions}
                />
            </div>
            {viewModel.items.length > 0 ? (
                <ContentLibrary items={viewModel.items} />
            ) : (
                <EmptyCard />
            )}
        </main>
    );
};

export default ContentLibraryPage;
