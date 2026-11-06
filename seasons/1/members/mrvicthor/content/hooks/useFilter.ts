import type { Content } from '../domain/ContentService';
import { useQueryParams } from './useQueryParams';

export function useFilter(items: Content[]) {
    const [filterParam, setFilter] = useQueryParams('filter');
    const ALL_ITEMS = '';
    const FilterOptions = [
        ALL_ITEMS,
        ...new Set(items.map((item) => item.type.toLowerCase())),
    ] as const;

    const filter = filterParam?.toLowerCase() ?? ALL_ITEMS;

    return { filter, setFilter, FilterOptions };
}
