import { useState } from 'react';

import type { ContentItem } from '../types/content.types';
import { filterContent, typeFilterOptions } from '../lib/filter-content';
import { sortByPublishedAtDesc } from '../lib/sort-by-published-at';
import { readTypeFromSearch, writeTypeToUrl } from '../lib/type-filter-url';

export function useContentLibrary(contentItems: readonly ContentItem[]) {
    const [type, setTypeState] = useState(() =>
        readTypeFromSearch(window.location.search),
    );

    const setType = (next: string) => {
        setTypeState(next);
        writeTypeToUrl(next);
    };

    return {
        type,
        setType,
        typeOptions: typeFilterOptions(contentItems),
        items: filterContent(sortByPublishedAtDesc(contentItems), { type }),
    };
}
