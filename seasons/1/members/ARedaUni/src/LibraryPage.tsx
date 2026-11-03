import { useState } from 'react';
import { Heading, Label, Link, LinkButton, Text } from '@primer/react';
import { createContentLibraryViewModel } from './libraryviewmodel';
import type { ContentItem } from './library';

type Props = {
    items: readonly ContentItem[];
    locale: string;
};

// Primer builds the UI; Tailwind only spaces it out. Utilities cannot reach
// inside a Primer component's own styles — that is deliberate.
export function LibraryPage({ items, locale }: Props) {
    const [selectedType, setSelectedType] = useState(() => {
        try {
            return localStorage.getItem('selectedContentType') || 'all';
        } catch {
            return 'all';
        }
    });

    const handleTypeChange = (newType: string) => {
        setSelectedType(newType);
        try {
            localStorage.setItem('selectedContentType', newType);
        } catch {
            // localStorage not available, silently fail
        }
    };

    const vm = createContentLibraryViewModel(items, locale, selectedType);

    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">{vm.title}</Heading>

            <div className="my-2">
                <label htmlFor="type-filter">Filter by type:</label>
                <select
                    id="type-filter"
                    value={selectedType}
                    onChange={(e) => handleTypeChange(e.currentTarget.value)}
                    className="rounded border border-gray-300 px-3 py-2"
                >
                    <option value="all">All types</option>
                    {vm.availableTypes.map((type) => (
                        <option key={type} value={type}>
                            {type}
                        </option>
                    ))}
                </select>
            </div>

            <ul className="flex flex-col gap-6">
                {vm.items.map((entry) => (
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
