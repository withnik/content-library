import { useState } from 'react';
import {
    ActionList,
    ActionMenu,
    Button,
    Heading,
    Link,
    PageHeader,
    Stack,
    Text,
} from '@primer/react';
import { createContentLibraryViewModel } from './ContentLibraryViewModelService.ts';

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
    const viewModel = createContentLibraryViewModel(items, navigator.language);
    const [selectedType, setSelectedType] = useState(
        () => new URLSearchParams(location.search).get('type') ?? '',
    );
    const types = [...new Set(items.map((item) => item.type))].sort();
    const visibleItems = viewModel.items.filter(
        (item) => !selectedType || item.type === selectedType,
    );

    const selectType = (type: string) => {
        setSelectedType(type);
        const params = new URLSearchParams(location.search);
        if (type) params.set('type', type);
        else params.delete('type');
        const query = params.toString();
        history.replaceState(
            null,
            '',
            `${location.pathname}${query && `?${query}`}`,
        );
    };

    return (
        <main className="flex flex-col gap-4 p-6">
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>{viewModel.title}</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>

            <ActionMenu>
                <ActionMenu.Button className="self-start">
                    {selectedType || 'All types'}
                </ActionMenu.Button>
                <ActionMenu.Overlay>
                    <ActionList selectionVariant="single">
                        {['', ...types].map((type) => (
                            <ActionList.Item
                                key={type}
                                selected={type === selectedType}
                                onSelect={() => selectType(type)}
                            >
                                {type || 'All types'}
                            </ActionList.Item>
                        ))}
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>

            {visibleItems.map((item) => (
                <ul
                    key={item.id}
                    data-testid={`content-item-${item.id}`}
                    className="rounded-md border border-gray-300 p-4"
                >
                    <li>
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
                </ul>
            ))}
        </main>
    );
}
