import { beforeAll, describe, expect, it } from 'vitest';
import { createContentLibraryViewModel } from '../src/libraryviewmodel';
import type { ContentItem } from '../src/library';

// West of UTC: a date-only ISO string parsed as UTC midnight is the previous
// day here, so a formatter that ignores that would fail these tests.
beforeAll(() => {
    process.env.TZ = 'America/Los_Angeles';
});

const item = (overrides: Partial<ContentItem> = {}): ContentItem => ({
    id: 'c_0001',
    title: 'A title',
    type: 'lesson',
    url: 'https://better.withnik.com/c/a-title',
    publishedAt: '2026-01-01',
    excerpt: 'An excerpt.',
    durationSeconds: null,
    thumbnailUrl: null,
    ...overrides,
});

const inUS = 'en-US';

describe('ContentLibraryViewModel', () => {
    it('returns all items sorted newest-first by default', () => {
        const items = [
            item({ id: 'mid', publishedAt: '2026-02-10' }),
            item({ id: 'old', publishedAt: '2025-12-31' }),
            item({ id: 'new', publishedAt: '2026-03-01' }),
        ];

        const vm = createContentLibraryViewModel(items, inUS);

        expect(vm.items.map((i) => i.id)).toEqual(['new', 'mid', 'old']);
    });

    it('filters items by selected type and keeps newest-first order', () => {
        const items = [
            item({ id: 'c_0001', type: 'lesson', publishedAt: '2026-01-01' }),
            item({
                id: 'c_0002',
                type: 'soft-skill',
                publishedAt: '2026-01-01',
            }),
            item({
                id: 'c_0003',
                type: 'soft-skill',
                publishedAt: '2026-01-02',
            }),
        ];

        const vm = createContentLibraryViewModel(items, inUS, 'soft-skill');

        expect(vm.items.map((i) => i.id)).toEqual(['c_0003', 'c_0002']);
    });

    it('includes all available types in the view model', () => {
        const items = [
            item({ type: 'lesson' }),
            item({ type: 'blueprint' }),
            item({ type: 'lesson' }),
        ];

        const vm = createContentLibraryViewModel(items, inUS);

        expect(vm.availableTypes).toContain('lesson');
        expect(vm.availableTypes).toContain('blueprint');
        expect(vm.availableTypes).toHaveLength(2);
    });

    it('defaults selectedType to "all" when not provided', () => {
        const items = [item()];

        const vm = createContentLibraryViewModel(items, inUS);

        expect(vm.selectedType).toBe('all');
    });

    it('sets selectedType when provided', () => {
        const items = [item()];

        const vm = createContentLibraryViewModel(items, inUS, 'lesson');

        expect(vm.selectedType).toBe('lesson');
    });
});
