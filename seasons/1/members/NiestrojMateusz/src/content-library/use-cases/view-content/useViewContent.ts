import { useMemo } from 'react';
import type { ContentAdapter } from '../../domain/ContentAdapter';
import { sortByNewest } from '../../domain/ContentService';
import { createContentLibraryViewModel } from './ContentLibraryService';

export const useViewContent = (adapter: ContentAdapter) =>
    useMemo(
        () => createContentLibraryViewModel(sortByNewest(adapter.getAll())),
        [adapter],
    );
