import { buildContent } from '../builders/buildContent';
import type { Content } from '../content/domain/ContentService';

export const buildContents = (
    count: number,
    overrides: Partial<Content> = {},
): Content[] => {
    return Array.from({ length: count }, () => buildContent(overrides));
};
