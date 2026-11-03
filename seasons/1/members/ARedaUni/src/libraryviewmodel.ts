import type { ContentItem } from './library';
import { filterByType, presentLibrary } from './library';

export type ContentLibraryViewModel = {
    title: string;
    items: ReturnType<typeof presentLibrary>;
    availableTypes: string[];
    selectedType: string;
};

export function createContentLibraryViewModel(
    items: readonly ContentItem[],
    locale: string,
    selectedType: string = 'all',
): ContentLibraryViewModel {
    const itemsArray = Array.from(items);
    const filtered = selectedType === 'all'
        ? itemsArray
        : filterByType(itemsArray, selectedType);

    const formattedItems = presentLibrary(filtered, { locale });

    const availableTypes = [...new Set(itemsArray.map(item => item.type))];

    return {
        title: 'Content Library',
        items: formattedItems,
        availableTypes,
        selectedType,
    };
}
