import { Button, Heading, Link, PageHeader, Stack, Text } from '@primer/react';
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

    return (
        <main className="flex flex-col gap-4 p-6">
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>{viewModel.title}</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>

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
