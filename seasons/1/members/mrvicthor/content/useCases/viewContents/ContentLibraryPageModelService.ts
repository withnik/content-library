import { type Content, type FilterBy } from '../../domain/ContentService';
import { sortByNewest } from '../../../helpers/sortByNewest';

type ContentLibraryPageModel = {
    title: string;
    items: {
        id: string;
        title: string;
        type: string;
        author: string;
        excerpt: string;
        publishedAt: string;
        url: string;
    }[];
};

export function createContentLibraryPageModel(
    items: Content[],
    filterBy: FilterBy,
): ContentLibraryPageModel {
    const pageTitle = 'Content Library';
    const visibleItems =
        filterBy === 'all'
            ? items
            : items.filter(
                  (item) => item.type.toLowerCase() === filterBy.toLowerCase(),
              );
    return {
        title: pageTitle,
        items: sortByNewest(visibleItems).map((item) => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            type: item.type,
            author: item.author,
            publishedAt: item.publishedAt,
            url: item.url,
        })),
    };
}
