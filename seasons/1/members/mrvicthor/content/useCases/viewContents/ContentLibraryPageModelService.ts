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
};

export function createContentLibraryPageModel(
    items: Content[],
): ContentLibraryPageModel {
    const pageTitle = 'Content Library';
    return {
        title: pageTitle,
        items: sortByNewest(items).map((item) => ({
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
