import { useState } from 'react';
import {
    createContentLibraryViewModel,
    type ContentItem,
} from './ContentLibraryViewModelService.ts';

export function useLibraryContent(items: ContentItem[]) {
    const [selectedType, setSelectedType] = useState(
        () => new URLSearchParams(location.search).get('type') ?? '',
    );
    const types = ['', ...[...new Set(items.map((item) => item.type))].sort()];
    const model = createContentLibraryViewModel(items, navigator.language, {
        type: selectedType,
    });

    const selectType = (type: string) => {
        setSelectedType(type);
        const params = new URLSearchParams(location.search);
        if (type) params.set('type', type);
        else params.delete('type');
        const query = params.toString();
        history.replaceState(
            null,
            '',
            `${location.pathname}${query && `?${query}`}`,
        );
    };

    return { ...model, types, selectedType, selectType };
}
