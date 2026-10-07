import { describe, expect, it } from 'vitest';

import { loadContentItems } from '../src/contentLibraryData';

describe('The data source', () => {
    it('provides every content item', () => {
        const items = loadContentItems();

        expect(items).toHaveLength(40);
    });

    it('provides the content items newest first', () => {
        const [newest] = loadContentItems();

        expect(newest).toEqual({
            id: 'c_0040',
            title: 'Building real apps together',
            type: 'blueprint',
            excerpt:
                "Nik introduces the community's initiative to build real applications collaboratively — a shift toward applied, hands-on learning with actual production constraints.",
            url: 'https://better.withnik.com/c/general-discussions/building-real-apps-together',
            publishedAt: '2026-09-25',
        });
    });
});
