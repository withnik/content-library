import { parseAsString, useQueryState } from 'nuqs';

export function useSelectedContentType() {
    const [typeFilter, setTypeFilter] = useQueryState('type', parseAsString);

    return { selectedType: typeFilter, setSelectedType: setTypeFilter };
}
