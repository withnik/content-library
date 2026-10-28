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

            <ActionMenu>
                <ActionMenu.Button className="self-start">
                    {viewModel.selectedType || 'All types'}
                </ActionMenu.Button>
                <ActionMenu.Overlay>
                    <ActionList selectionVariant="single">
                        {viewModel.types.map((type) => (
                            <ActionList.Item
                                key={type}
                                selected={type === viewModel.selectedType}
                                onSelect={() => viewModel.selectType(type)}
                            >
                                {type || 'All types'}
                            </ActionList.Item>
                        ))}
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>

            {viewModel.items.map((item) => (
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
