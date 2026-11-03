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

    const showEverything = selectedType === 'all';
    const filtered = showEverything
        ? itemsArray
        : filterByType(itemsArray, selectedType);

    const formattedItems = presentLibrary(filtered, { locale });

    // Types come from ALL items, so choosing one never hides the others.
    const everyType = itemsArray.map((item) => item.type);
    const availableTypes = [...new Set(everyType)];

    return {
        title: 'Content Library',
        items: formattedItems,
        availableTypes,
        selectedType,
    };
}
