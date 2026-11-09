import { describe, expect, it } from 'vitest';

import { ALL_CONTENT_TYPE } from '../src/lib/filter-content';
import { readTypeFromSearch, searchWithType } from '../src/lib/type-filter-url';

describe('readTypeFromSearch', () => {
    it('defaults to all when the param is missing', () => {
        expect(readTypeFromSearch('')).toBe(ALL_CONTENT_TYPE);
        expect(readTypeFromSearch('?')).toBe(ALL_CONTENT_TYPE);
    });

    it('reads the type param from the query string', () => {
        expect(readTypeFromSearch('?type=lesson')).toBe('lesson');
        expect(readTypeFromSearch('?q=x&type=recording')).toBe('recording');
    });
});

describe('searchWithType', () => {
    it('sets the type param for a concrete type', () => {
        expect(searchWithType('lesson')).toBe('?type=lesson');
    });

    it('removes the type param for all', () => {
        expect(searchWithType(ALL_CONTENT_TYPE, '?type=lesson')).toBe('');
    });

    it('preserves other query params when clearing type', () => {
        expect(searchWithType(ALL_CONTENT_TYPE, '?type=lesson&q=react')).toBe(
            '?q=react',
        );
    });
});
