import { ALL_CONTENT_TYPE } from './filter-content';

export const TYPE_SEARCH_PARAM = 'type';

/** Reads the type filter from a query string. Defaults to all. */
export function readTypeFromSearch(search: string): string {
    const type = new URLSearchParams(search).get(TYPE_SEARCH_PARAM);
    return type && type.length > 0 ? type : ALL_CONTENT_TYPE;
}

/**
 * Returns the path + query for the given type filter.
 * "all" drops the param so the default URL stays clean.
 */
export function searchWithType(type: string, currentSearch = ''): string {
    const params = new URLSearchParams(currentSearch);

    if (!type || type === ALL_CONTENT_TYPE) {
        params.delete(TYPE_SEARCH_PARAM);
    } else {
        params.set(TYPE_SEARCH_PARAM, type);
    }

    const query = params.toString();
    return query ? `?${query}` : '';
}

export function writeTypeToUrl(type: string): void {
    const nextSearch = searchWithType(type, window.location.search);
    const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
    window.history.replaceState(null, '', nextUrl);
}
