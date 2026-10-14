import contentSource from '../../../data/content.json';

import type { ContentItem } from './contentItem';

type ContentRecord = (typeof contentSource.items)[number];

export function loadContentItems(): ContentItem[] {
    return toContentItems(contentSource.items);
}

export function toContentItems(records: ContentRecord[]): ContentItem[] {
    return records.map(({ id, title, type, excerpt, url, publishedAt }) => ({
        id,
        title,
        type,
        excerpt,
        url,
        publishedAt,
    }));
}
