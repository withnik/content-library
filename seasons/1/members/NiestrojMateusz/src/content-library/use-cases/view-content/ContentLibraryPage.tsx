import { Heading, Label, Link, LinkButton, Text } from '@primer/react';
import type { ContentAdapter } from '../../domain/ContentAdapter';
import { useViewContent } from './useViewContent';

type Props = {
    adapter: ContentAdapter;
};

// Primer builds the UI; Tailwind only spaces it out.
export function ContentLibraryPage({ adapter }: Props) {
    const rows = useViewContent(adapter);

    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">Content Library</Heading>
            <ul className="flex flex-col gap-4">
                {rows.map((row) => (
                    <li key={row.id} className="flex flex-col gap-2">
                        <Heading as="h2" variant="small">
                            <Link href={row.url}>{row.title}</Link>
                        </Heading>
                        <div className="flex items-center gap-2">
                            <Label>{row.type}</Label>
                            <Text size="small">{row.publishedAt}</Text>
                        </div>
                        <Text>{row.excerpt}</Text>
                        <div>
                            <LinkButton href={row.url}>
                                Open original
                            </LinkButton>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
