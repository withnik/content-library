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
import { Blankslate } from '@primer/react/experimental';
import { SearchIcon } from '@primer/octicons-react';
import type { ContentItem } from './ContentLibraryViewModelService.ts';
import { useLibraryContent } from './useLibraryContent.ts';

export type ContentLibraryPageProps = {
    items: ContentItem[];
};

export function ContentLibraryPage({ items }: ContentLibraryPageProps) {
    const viewModel = useLibraryContent(items);

    return (
        <main className="flex flex-col gap-4 p-6">
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>{viewModel.title}</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>

            <Stack direction="horizontal" gap="condensed" wrap="wrap">
                <TextInput
                    type="search"
                    aria-label="Search content"
                    placeholder="Search content"
                    leadingVisual={SearchIcon}
                    value={viewModel.searchQuery}
                    onChange={(event) => viewModel.search(event.target.value)}
                />

                <ActionMenu>
                    <ActionMenu.Button>
                        {viewModel.selectedTypeLabel}
                    </ActionMenu.Button>
                    <ActionMenu.Overlay>
                        <ActionList selectionVariant="single">
                            {viewModel.types.map((typeOption) => (
                                <ActionList.Item
                                    key={typeOption.value}
                                    selected={
                                        typeOption.value ===
                                        viewModel.selectedType
                                    }
                                    onSelect={() =>
                                        viewModel.selectType(typeOption.value)
                                    }
                                >
                                    {typeOption.label}
                                </ActionList.Item>
                            ))}
                        </ActionList>
                    </ActionMenu.Overlay>
                </ActionMenu>
            </Stack>

            {viewModel.items.length === 0 ? (
                <Blankslate border>
                    <Blankslate.Heading as="h2">
                        No matching content
                    </Blankslate.Heading>
                    <Blankslate.Description>
                        Try a different search term, or clear filters.
                    </Blankslate.Description>
                </Blankslate>
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
