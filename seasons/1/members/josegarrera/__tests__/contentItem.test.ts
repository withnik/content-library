import { afterEach, describe, expect, it, vi } from 'vitest';

import {
    type ContentItem,
    formatPublishedAt,
    sortNewestFirst,
} from '../src/contentItem';

function aContentItem(overrides: Partial<ContentItem>): ContentItem {
    return {
        id: 'c_0001',
        title: 'The need of Repository Layer',
        type: 'lesson',
        excerpt: 'Why a repository layer keeps data access out of the UI.',
        url: 'https://better.withnik.com/c/react-nextjs-discussions/repository-layer',
        publishedAt: '2025-12-04',
        ...overrides,
    };
}

describe('The content library order', () => {
    it('puts the latest published item first', () => {
        const older = aContentItem({ id: 'c_0001', publishedAt: '2025-12-04' });
        const newer = aContentItem({ id: 'c_0002', publishedAt: '2026-09-25' });

        const sorted = sortNewestFirst([older, newer]);

        expect(sorted).toEqual([newer, older]);
    });

    it('leaves the data source order untouched', () => {
        const older = aContentItem({ id: 'c_0001', publishedAt: '2025-12-04' });
        const newer = aContentItem({ id: 'c_0002', publishedAt: '2026-09-25' });
        const asLoaded = [older, newer];

        sortNewestFirst(asLoaded);

        expect(asLoaded).toEqual([older, newer]);
    });
});

describe('The published date', () => {
    afterEach(() => {
        vi.unstubAllEnvs();
    });

    it('reads as a month, day and year', () => {
        const formatted = formatPublishedAt('2026-04-02');

        expect(formatted).toBe('Apr 2, 2026');
    });

    it('keeps the calendar day west of Greenwich', () => {
        vi.stubEnv('TZ', 'Pacific/Honolulu');

        const formatted = formatPublishedAt('2026-04-02');

        expect(formatted).toBe('Apr 2, 2026');
    });

    it('keeps the calendar day east of Greenwich', () => {
        vi.stubEnv('TZ', 'Asia/Tokyo');

        const formatted = formatPublishedAt('2026-04-02');

        expect(formatted).toBe('Apr 2, 2026');
    });
});
