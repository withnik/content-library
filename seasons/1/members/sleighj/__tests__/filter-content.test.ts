import { describe, expect, it } from 'vitest';

import {
  ALL_CONTENT_TYPE,
  filterContent,
  uniqueContentTypes,
} from '../src/lib/filter-content';
import type { ContentItem } from '../src/types/content.types';

function item(
  overrides: Pick<ContentItem, 'id' | 'title' | 'type'>,
): ContentItem {
  return {
    url: 'https://example.com',
    publishedAt: '2026-01-01',
    author: 'Test',
    space: 'Test',
    excerpt: 'Excerpt',
    durationSeconds: null,
    thumbnailUrl: null,
    ...overrides,
  };
}

const items = [
  item({ id: '1', title: 'Lesson A', type: 'lesson' }),
  item({ id: '2', title: 'Recording A', type: 'recording' }),
  item({ id: '3', title: 'Lesson B', type: 'lesson' }),
];

describe('filterContent', () => {
  it('returns all items when type is all', () => {
    expect(
      filterContent(items, { type: ALL_CONTENT_TYPE }).map((i) => i.id),
    ).toEqual(['1', '2', '3']);
  });

  it('returns only items of the selected type', () => {
    expect(
      filterContent(items, { type: 'lesson' }).map((i) => i.title),
    ).toEqual(['Lesson A', 'Lesson B']);
  });

  it('does not mutate the input array', () => {
    const before = [...items];
    filterContent(items, { type: 'lesson' });
    expect(items).toEqual(before);
  });
});

describe('uniqueContentTypes', () => {
  it('derives sorted unique types from the items', () => {
    expect(uniqueContentTypes(items)).toEqual(['lesson', 'recording']);
  });
});
