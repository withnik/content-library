import { ContentLibrary } from '../src/ContentLibrary';
import type { ContentItem } from '../src/contentItem';

export const WithItems = ({ items }: { items: ContentItem[] }) => (
    <ContentLibrary items={items} />
);
