import contentSource from '../../../data/content.json';

import { type ContentItem, sortNewestFirst } from './contentItem';

export function loadContentItems(): ContentItem[] {
    const items = contentSource.items.map(
        ({ id, title, type, excerpt, url, publishedAt }) => ({
            id,
            title,
            type,
            excerpt,
            url,
            publishedAt,
        }),
    );

    return sortNewestFirst(items);
}
