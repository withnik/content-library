import { Heading } from '@primer/react';
import data from '../../../data/content.json';
import { sortByPublishedAtDesc } from './lib/sort-by-published-at';
import type { ContentItem } from './types/content.types';
import SimpleCard from './ui/cards/simple-card.component';
import { formatPublishedAt } from './lib/format-published-at';

type AppProps = {
  contentItems?: ContentItem[];
};

export const App = ({ contentItems = data.items }: AppProps) => {
  const sortedContentItems: ContentItem[] = sortByPublishedAtDesc(contentItems);

  return (
    <main className="flex flex-col gap-4 p-6">
      <Heading as="h1">Content Library</Heading>
      {sortedContentItems.map((contentItem: ContentItem) => {
        const { id, title, excerpt, type, publishedAt, url } = contentItem;
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
