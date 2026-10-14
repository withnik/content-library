import { Button, Heading, Link, PageHeader, Stack, Text } from '@primer/react';

// Raw content record shape — matches a single entry in data/content.json.
export type ContentItem = {
    id: string;
    title: string;
    type: string;
    media: string;
    durationSeconds: number | null;
    url: string;
    publishedAt: string;
    excerpt: string;
    thumbnailUrl: string | null;
};

export type ContentLibraryPageProps = {
    items: ContentItem[];
};

// Static composition only — no loop over `items` yet, no sorting, no
// formatting. This proves out the Primer-only UI for a single item; the
// list, ordering and app wiring land in a later iteration. Primer v38 has
// no generic Box/Card component, so the item's frame is a plain element
// spaced out with Tailwind, matching the convention set in App.tsx.
export function ContentLibraryPage({ items }: ContentLibraryPageProps) {
    const [item] = items;

    return (
        <main className="flex flex-col gap-4 p-6">
            <PageHeader>
                <PageHeader.TitleArea>
                    <PageHeader.Title>Content Library</PageHeader.Title>
                </PageHeader.TitleArea>
            </PageHeader>

            {item && (
                <div
                    data-testid={`content-item-${item.id}`}
                    className="rounded-md border border-gray-300 p-4"
                >
                    <Stack direction="vertical" gap="condensed">
                        <Stack direction="horizontal" justify="space-between" align="start">
                            <Link
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Heading as="h3" variant="small">
                                    {item.title}
                                </Heading>
                            </Link>
                            <Button
                                as="a"
                                href={item.url}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Open
                            </Button>
                        </Stack>
                        <Text as="p" size="small">
                            {item.type} · {item.publishedAt}
                        </Text>
                        <Text as="p">{item.excerpt}</Text>
                    </Stack>
                </div>
            )}
        </main>
    );
}
