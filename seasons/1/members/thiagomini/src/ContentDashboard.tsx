import {
    Button,
    FormControl,
    Heading,
    Label,
    Link,
    Select,
    Text,
} from '@primer/react';
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
    const { selectedType, setSelectedType } = useSelectedContentType(items);
    const viewModel = createContentDashboardViewModel(items, {
        locale,
        selectedType,
    });

    return (
        <>
            <FormControl>
                <FormControl.Label>Filter content by type</FormControl.Label>
                <Select
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

            <ul className="flex flex-col gap-4">
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
        </>
    );
}
