import {
    Button,
    FormControl,
    Heading,
    Label,
    Link,
    Select,
    Text,
    TextInput,
} from '@primer/react';
import { parseAsString, useQueryState } from 'nuqs';
import {
    createContentDashboardViewModel,
    type ContentItem,
} from './ContentDashboardService';
import { useSelectedContentType } from './useSelectedContentType';

interface ContentDashboardProps {
    items: readonly ContentItem[];
    locale: string;
}

export function ContentDashboard({ items, locale }: ContentDashboardProps) {
    const { selectedType, setSelectedType } = useSelectedContentType();
    const [searchQuery, setSearchQuery] = useQueryState(
        'search',
        parseAsString,
    );
    const viewModel = createContentDashboardViewModel(items, {
        locale,
        selectedType,
        searchQuery,
    });

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 sm:flex-row">
                <FormControl className="min-w-0 flex-1">
                    <FormControl.Label visuallyHidden>
                        Search content by title
                    </FormControl.Label>
                    <TextInput
                        block
                        placeholder="Type to search"
                        value={searchQuery ?? ''}
                        onChange={(event) => setSearchQuery(event.target.value)}
                    />
                </FormControl>
                <FormControl className="sm:w-48 sm:shrink-0">
                    <FormControl.Label visuallyHidden>
                        Filter content by type
                    </FormControl.Label>
                    <Select
                        block
                        value={viewModel.selectedType ?? ''}
                        onChange={(event) =>
                            setSelectedType(event.target.value || null)
                        }
                    >
                        <option value="">All</option>
                        {viewModel.types.map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {viewModel.isEmpty() && (
                <div>
                    <Heading as="h2">No matching content</Heading>
                    <Text
                        as="p"
                        aria-label="Try a different search term, or clear filters"
                    >
                        Try a different search term, or clear filters
                    </Text>
                </div>
            )}

            <ul className="m-0 flex list-none flex-col gap-4 p-0">
                {viewModel.items.map((item) => (
                    <li
                        key={item.id}
                        className="border-default flex flex-col gap-4 rounded border p-4"
                    >
                        <div className="flex flex-wrap items-center gap-2">
                            <Label>{item.type}</Label>
                            <Text as="time">{item.publishedAtFormatted}</Text>
                        </div>

                        <Heading as="h2">
                            <Link
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {item.title}
                            </Link>
                        </Heading>

                        <Text as="p">{item.excerpt}</Text>

                        <div>
                            <Button
                                as="a"
                                href={item.url}
                                target="_blank"
                                rel="noreferrer"
                            >
                                View content
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
