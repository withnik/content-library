import data from '../../../../../data/content.json';
import type { LibraryItem } from './ContentService';

export type ContentAdapter = {
    getAll: () => LibraryItem[];
};

const items: LibraryItem[] = data.items;

export const contentAdapter: ContentAdapter = {
    getAll: () => items,
};
