import { Heading } from '@primer/react';
import data from '../../data/content.json';
import { sortByPublishedAtDesc } from './lib/sort-by-published-at';
import type { ContentItem } from './types/content.types';
import SimpleCard from './ui/cards/simple-card.component';

export function App() {
    const content: ContentItem[] = sortByPublishedAtDesc(data.items);

    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">Content Library</Heading>
            {content.map((item: ContentItem) => {
                const { id, title, excerpt, type, publishedAt, url } = item;
                return (
                    <SimpleCard
                        key={id}
                        headerText={title}
                        descriptionText={excerpt}
                        subheaderText={type}
                        timeText={publishedAt}
                        href={url}
                    />
                );
            })}
        </main>
    );
}
