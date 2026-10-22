export const formatPublishedAt = (publishedAt: string) => {
    return new Date(`${publishedAt}T00:00:00`).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
};
