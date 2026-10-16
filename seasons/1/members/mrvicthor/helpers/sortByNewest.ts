import { type Content } from '../content/domain/ContentService';

export const sortByNewest = (items: Content[]) =>
    items.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
