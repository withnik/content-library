import { Heading, Label, Link, LinkButton, Text } from '@primer/react';
import content from '../../../data/content.json' with { type: 'json' };
import { newestFirst } from './content';

const items = newestFirst(content.items);

// publishedAt is a date-only ISO string, which Date parses as UTC midnight.
// Formatting in UTC keeps the calendar day; the viewer's zone would shift it.
const publishedDate = new Intl.DateTimeFormat(undefined, {
    dateStyle: 'medium',
    timeZone: 'UTC',
});

// Primer builds the UI; Tailwind only spaces it out. Utilities cannot reach
// inside a Primer component's own styles — that is deliberate.
export function App() {
    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">Content Library</Heading>
            <ul className="flex flex-col gap-6">
                {items.map((item) => (
                    <li key={item.id} className="flex flex-col gap-2">
                        <Heading as="h2" variant="small">
                            <Link href={item.url}>{item.title}</Link>
                        </Heading>
                        <div className="flex items-center gap-2">
                            <Label>{item.type}</Label>
                            <Text size="small">
                                <time dateTime={item.publishedAt}>
                                    {publishedDate.format(
                                        new Date(item.publishedAt),
                                    )}
                                </time>
                            </Text>
                        </div>
                        <Text as="p">{item.excerpt}</Text>
                        <div>
                            <LinkButton
                                href={item.url}
                                aria-label={`Open ${item.title}`}
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
