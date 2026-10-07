import type { ContentItem } from '../src/ContentDashboardService';

class ContentItemBuilder {
    private readonly overrides: Partial<ContentItem> = {};

    publishedAt(value: string) {
        return this.with({ publishedAt: value });
    }

    entitled(value: string) {
        return this.with({ title: value });
    }

    with(overrides: Partial<ContentItem>) {
        Object.assign(this.overrides, overrides);
        return this;
    }

    build(): ContentItem {
        const title = this.overrides.title ?? 'Content title';

        return {
            id: title.toLowerCase().replaceAll(' ', '-'),
            title,
            type: 'lesson',
            url: 'https://example.com/content',
            publishedAt: '2026-01-01',
            excerpt: 'Content excerpt.',
            durationSeconds: null,
            thumbnailUrl: null,
            ...this.overrides,
        };
    }
}

export const anItem = () => new ContentItemBuilder();
