import data from '../../../data/content.json';

import { useState } from 'react';
import { Heading } from '@primer/react';
import SimpleCard from './ui/cards/simple-card.component';
import {
    SimpleSelect,
    type SimpleSelectOption,
} from './ui/selects/simple-select.component';
import type { ContentItem } from './types/content.types';

import { sortByPublishedAtDesc } from './lib/sort-by-published-at';
import { formatPublishedAt } from './lib/format-published-at';
import { filterContent, uniqueContentTypes } from './lib/filter-content';

type AppProps = {
    contentItems?: ContentItem[];
};

const ALL_CONTENT_OPTION: SimpleSelectOption = {
    optionLabel: 'all',
    optionValue: 'all',
};

export const App = ({ contentItems = data.items }: AppProps) => {
    const [selectedContentOption, setSelectedContentOption] =
        useState<SimpleSelectOption>(ALL_CONTENT_OPTION);

    const sortedContentItems: ContentItem[] =
        sortByPublishedAtDesc(contentItems);
    const filteredContentItems = filterContent(sortedContentItems, {
        type: selectedContentOption.optionValue,
    });
    const contentItemTypes = uniqueContentTypes(contentItems);

    const selectContentOptions = [
        ALL_CONTENT_OPTION,
        ...contentItemTypes.map((type) => ({
            optionLabel: type,
            optionValue: type,
        })),
    ];

    return (
        <main className="flex flex-col gap-4 p-6">
            <Heading as="h1">Content Library</Heading>
            <SimpleSelect
                label="Type"
                options={selectContentOptions}
                selectedOption={selectedContentOption}
                onChange={setSelectedContentOption}
            />
            {filteredContentItems.map((contentItem: ContentItem) => {
                const { id, title, excerpt, type, publishedAt, url } =
                    contentItem;
                const formattedPublishedAt = formatPublishedAt(publishedAt);
                return (
                    <SimpleCard
                        key={id}
                        headerText={title}
                        descriptionText={excerpt}
                        subheaderText={type}
                        timeText={formattedPublishedAt}
                        href={url}
                    />
                );
            })}
        </main>
    );
};
