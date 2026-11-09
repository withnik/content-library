import data from '../../../data/content.json';

import { Heading } from '@primer/react';
import SimpleCard from './ui/cards/simple-card.component';
import { SimpleSelect } from './ui/selects/simple-select.component';
import type { ContentItem } from './types/content.types';
import { formatPublishedAt } from './lib/format-published-at';
import { useContentLibrary } from './hooks/use-content-library';

type AppProps = {
    contentItems?: ContentItem[];
};

export const App = ({ contentItems = data.items }: AppProps) => {
    const {
        type: selectedType,
        setType,
        typeOptions,
        items,
    } = useContentLibrary(contentItems);

    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">Content Library</Heading>
            <SimpleSelect
                label="Type"
                options={typeOptions}
                value={selectedType}
                onChange={setType}
            />
            {items.map((contentItem: ContentItem) => {
                const { id, title, excerpt, type, publishedAt, url } =
                    contentItem;
                return (
                    <SimpleCard
                        key={id}
                        headerText={title}
                        descriptionText={excerpt}
                        subheaderText={type}
                        timeText={formatPublishedAt(publishedAt)}
                        href={url}
                    />
                );
            })}
        </main>
    );
};
