import { describe, expect, it } from 'vitest';

import data from '../../../data/content.json';
import { sortByPublishedAtDesc } from '../src/lib/sort-by-published-at';

describe('content data', () => {
    it('has a full local dataset of about 30 items', () => {
        expect(data.items.length).toBeGreaterThanOrEqual(30);
    });

    it('is not already sorted newest-first in the file', () => {
        const fileOrder = data.items.map((item) => item.id);
        const sortedOrder = sortByPublishedAtDesc(data.items).map(
            (item) => item.id,
        );

        expect(fileOrder).not.toEqual(sortedOrder);
    });
});
