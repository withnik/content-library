import { useEffect, useState } from 'react';
import type { ContentItem } from './ContentDashboardService';
import { useKeyValueStorage } from './KeyValueStorage';

const selectedTypeStorageKey = 'content-library.selected-type';

export function useSelectedContentType(items: readonly ContentItem[]) {
    const storage = useKeyValueStorage();
    const [storedSelectedType, setSelectedType] = useState<string | null>(
        () => storage.get(selectedTypeStorageKey) ?? null,
    );
    const selectedType = items.some((item) => item.type === storedSelectedType)
        ? storedSelectedType
        : null;

    useEffect(() => {
        if (selectedType === null) {
            storage.delete(selectedTypeStorageKey);
            return;
        }

        storage.set(selectedTypeStorageKey, selectedType);
    }, [storage, selectedType]);

    return { selectedType, setSelectedType };
}
