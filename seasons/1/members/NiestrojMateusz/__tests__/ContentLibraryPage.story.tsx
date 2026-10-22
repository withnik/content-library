// Fakes stand in for the real adapter, so these scenarios never read
// data/content.json. mount('ContentLibraryPage/Single') etc.
import type { ContentAdapter } from '../src/content-library/domain/ContentAdapter';
import type { LibraryItem } from '../src/content-library/domain/ContentService';
import { ContentLibraryPage } from '../src/content-library/use-cases/view-content/ContentLibraryPage';

const item = (overrides: Partial<LibraryItem> = {}): LibraryItem => ({
    id: 'c_0001',
    title: 'Testing async React components',
    type: 'masterclass',
    durationSeconds: 2940,
    url: 'https://better.withnik.com/c/challenges/testing-async',
    publishedAt: '2026-04-02',
    excerpt: 'Live refactor of a flaky test suite.',
    ...overrides,
});

const fakeAdapter = (items: LibraryItem[]): ContentAdapter => ({
    getAll: () => items,
});

export const Single = () => (
    <ContentLibraryPage adapter={fakeAdapter([item()])} />
);

export const Five = () => (
    <ContentLibraryPage
        adapter={fakeAdapter(
            ['a', 'b', 'c', 'd', 'e'].map((id) =>
                item({ id, title: `Item ${id}`, url: `https://x.test/${id}` }),
            ),
        )}
    />
);
