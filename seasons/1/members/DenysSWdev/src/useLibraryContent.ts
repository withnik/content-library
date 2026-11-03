import {
    createContentLibraryViewModel,
    type ContentItem,
    type ContentLibraryViewModel,
} from './ContentLibraryViewModelService.ts';
import { usePersistentValue } from './persistentStorage/index.ts';

export type LibraryContent = ContentLibraryViewModel & {
    selectedType: string;
    selectType: (type: string) => void;
};

export function useLibraryContent(items: ContentItem[]): LibraryContent {
    const [selectedType, selectType] = usePersistentValue('type');
    const model = createContentLibraryViewModel(items, navigator.language, {
        type: selectedType,
    });

    return { ...model, selectedType, selectType };
}
