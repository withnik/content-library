import { useState } from 'react';
import {
    createContentLibraryViewModel,
    type ContentItem,
    type ContentLibraryViewModel,
} from './ContentLibraryViewModelService.ts';

export type LibraryContent = ContentLibraryViewModel & {
    selectedType: string;
    selectType: (type: string) => void;
};

export function useLibraryContent(items: ContentItem[]): LibraryContent {
    const [selectedType, setSelectedType] = useState(
        () => new URLSearchParams(location.search).get('type') ?? '',
    );
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

    return { ...model, selectedType, selectType };
}
