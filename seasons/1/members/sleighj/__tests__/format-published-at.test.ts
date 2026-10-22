import { describe, expect, it } from 'vitest';

import { formatPublishedAt } from '../src/lib/format-published-at';

const localShortDate = (isoDate: string) =>
    new Date(`${isoDate}T00:00:00`).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });

describe('formatPublishedAt', () => {
    it('formats an ISO date as a local short date', () => {
        expect(formatPublishedAt('2026-09-25')).toBe(
            localShortDate('2026-09-25'),
        );
    });

    it('formats dates consistently', () => {
        const dates = ['2025-12-04', '2026-03-15', '2026-09-25'];

        for (const date of dates) {
            expect(formatPublishedAt(date)).toBe(localShortDate(date));
        }
    });

    it('does not return the raw ISO string', () => {
        expect(formatPublishedAt('2026-09-25')).not.toBe('2026-09-25');
    });
});
