import {
    ActionList,
    ActionMenu,
    Button,
    Heading,
    Link,
    PageHeader,
    Stack,
    Text,
    TextInput,
} from '@primer/react';
import { SearchIcon } from '@primer/octicons-react';
import { useState } from 'react';
import { createContentLibraryViewModel } from './ContentLibraryViewModelService.ts';
import { useDebouncedCallback } from './useDebouncedCallback.ts';
import { useQueryParam } from './useQueryParam.ts';

const SEARCH_DEBOUNCE_MS = 1000;

export type ContentItem = {
    id: string;
    title: string;
    type: string;
    media?: string;
    durationSeconds: number | null;
    url: string;
    publishedAt: string;
    excerpt: string;
    thumbnailUrl: string | null;
};

export type ContentLibraryPageProps = {
    items: ContentItem[];
};

export function ContentLibraryPage({ items }: ContentLibraryPageProps) {
    const [filterValue, setFilterValue] = useQueryParam('type');
    const [searchValue, setSearchValue] = useQueryParam('q');
    const [searchInput, setSearchInput] = useState(searchValue ?? '');
    const [previousSearchValue, setPreviousSearchValue] = useState(searchValue);
    const commitSearch = useDebouncedCallback(
        (next: string) => setSearchValue(next.trim() || null),
        SEARCH_DEBOUNCE_MS,
    );

    if (previousSearchValue !== searchValue) {
        setPreviousSearchValue(searchValue);
        const next = searchValue ?? '';
        if (searchInput.trim() !== next) setSearchInput(next);
    }

    const viewModel = createContentLibraryViewModel(
        items,
        navigator.language,
        filterValue,
        searchValue,
    );

    return (
        <main className="flex flex-col gap-4 p-6">
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>{viewModel.title}</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>

            <TextInput
                type="search"
                aria-label="Search by title or excerpt"
                placeholder="Search by title or excerpt"
                leadingVisual={SearchIcon}
                value={searchInput}
                onChange={(event) => {
                    setSearchInput(event.target.value);
                    commitSearch(event.target.value);
                }}
            />

            <ActionMenu>
                <ActionMenu.Button>{filterValue ?? 'All'}</ActionMenu.Button>
                <ActionMenu.Overlay>
                    <ActionList selectionVariant="single">
                        <ActionList.Item
                            selected={filterValue === null}
                            onSelect={() => setFilterValue(null)}
                        >
                            All
                        </ActionList.Item>
                        {viewModel.filterOptions.map((option) => (
                            <ActionList.Item
                                key={option}
                                selected={filterValue === option}
                                onSelect={() => setFilterValue(option)}
                            >
                                {option}
                            </ActionList.Item>
                        ))}
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>

            {viewModel.items.length === 0 ? (
                <Text as="p" className="text-center text-gray-500">
                    No matching content
                </Text>
            ) : (
                <ul
                    role="list"
                    className="m-0 flex list-none flex-col gap-4 p-0"
                >
                    {viewModel.items.map((item) => (
                        <li
                            key={item.id}
                            className="rounded-md border border-gray-300 p-4"
                        >
                            <Stack direction="vertical" gap="condensed">
                                <Stack
                                    direction="horizontal"
                                    justify="space-between"
                                    align="start"
                                >
                                    <Heading as="h3" variant="small">
                                        <Link
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            {item.title}
                                        </Link>
                                    </Heading>
                                    <Button
                                        as="a"
                                        role="button"
                                        href={item.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        Open
                                    </Button>
                                </Stack>
                                <Text as="p" size="small">
                                    {item.type} · {item.date}
                                </Text>
                                <Text as="p">{item.excerpt}</Text>
                            </Stack>
                        </li>
                    ))}
                </ul>
            )}
        </main>
    );
}
