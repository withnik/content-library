import { type Content } from '../content/domain/ContentService';
let seq = 0;
const nextId = () => `c_${(seq++).toString().padStart(4, '0')}`;

export const buildContent = ({
    id = nextId(),
    ...overrides
}: Partial<Content> = {}): Content => ({
    id,
    title: `Title ${id}`,
    type: 'lesson',
    url: `https://better.withnik.com/c/test/${id}`,
    publishedAt: '2025-12-04',
    author: 'Stefano',
    space: 'React / Nextjs',
    excerpt: `Excerpt for ${id}`,
    durationSeconds: null,
    thumbnailUrl: null,
    ...overrides,
});
