import { App } from '../src/App';
import type { ContentItem } from '../src/types/content.types';

const stubItems: ContentItem[] = [
  {
    id: 'old',
    title: 'Older item',
    type: 'lesson',
    url: 'https://example.com/old',
    publishedAt: '2025-12-04',
    author: 'Ada',
    space: 'Test',
    excerpt: 'Older excerpt',
    durationSeconds: null,
    thumbnailUrl: null,
  },
  {
    id: 'new',
    title: 'Newer item',
    type: 'recording',
    url: 'https://example.com/new',
    publishedAt: '2026-09-25',
    author: 'Nik',
    space: 'Test',
    excerpt: 'Newer excerpt',
    durationSeconds: null,
    thumbnailUrl: null,
  },
];

export const Default = () => <App />;
export const WithStubItems = () => <App contentItems={stubItems} />;