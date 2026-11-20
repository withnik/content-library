import { type Content } from '../../domain/ContentService';
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
    filterOptions: string[];
};
const ALL_ITEMS = '';

function getFilterOptions(items: Content[]): string[] {
    return [
        ALL_ITEMS,
        ...new Set(items.map((item) => item.type.toLowerCase())),
    ];
}

export function createContentLibraryPageModel(
    items: Content[],
    filterBy: string,
    search: string,
): ContentLibraryPageModel {
    const pageTitle = 'Content Library';
    const filterOptions = getFilterOptions(items);
    const requested = filterBy.toLowerCase();
    const selectedFilter = filterOptions.includes(requested)
        ? requested
        : ALL_ITEMS;

    const visibleItems =
        selectedFilter === ALL_ITEMS
            ? items
            : items.filter(
                  (item) => item.type.toLowerCase() === selectedFilter,
              );
    const searchResult = search
        ? visibleItems.filter(
              (item) =>
                  item.title
                      .toLowerCase()
                      .includes(search.trim().toLowerCase()) ||
                  item.excerpt.toLowerCase().includes(search.toLowerCase()),
          )
        : visibleItems;
    return {
        title: pageTitle,
        items: sortByNewest(searchResult).map((item) => ({
            id: item.id,
            title: item.title,
            excerpt: item.excerpt,
            type: item.type,
            author: item.author,
            publishedAt: item.publishedAt,
            url: item.url,
        })),
        filterOptions,
    };
}
