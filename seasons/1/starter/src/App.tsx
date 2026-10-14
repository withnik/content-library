import { Heading } from '@primer/react';
import data from "../../data/content.json";
import SimpleCard from './ui/cards/simple-card.component';
import type { ContentItem } from './types/content.types';

export function App() {
  const content: ContentItem[] = [...data.items].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
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
        )
      })}
    </main>
  );
};
