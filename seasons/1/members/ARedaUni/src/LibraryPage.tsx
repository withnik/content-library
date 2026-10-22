import { Heading, Label, Link, LinkButton, Text } from '@primer/react';
import { presentLibrary, type ContentItem } from './library';

type Props = {
    items: readonly ContentItem[];
    locale: string;
};

// Primer builds the UI; Tailwind only spaces it out. Utilities cannot reach
// inside a Primer component's own styles — that is deliberate.
export function LibraryPage({ items, locale }: Props) {
    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">Content Library</Heading>
            <ul className="flex flex-col gap-6">
                {presentLibrary(items, { locale }).map((entry) => (
                    <li key={entry.id} className="flex flex-col gap-2">
                        <Heading as="h2" variant="small">
                            <Link href={entry.url}>{entry.title}</Link>
                        </Heading>
                        <div className="flex items-center gap-2">
                            <Label>{entry.type}</Label>
                            <Text size="small">
                                <time dateTime={entry.publishedAt}>
                                    {entry.publishedOn}
                                </time>
                            </Text>
                        </div>
                        <Text as="p">{entry.excerpt}</Text>
                        <div>
                            <LinkButton
                                href={entry.url}
                                aria-label={`Open ${entry.title}`}
                            >
                                Open
                            </LinkButton>
                        </div>
                    </li>
                ))}
            </ul>
        </main>
    );
}
