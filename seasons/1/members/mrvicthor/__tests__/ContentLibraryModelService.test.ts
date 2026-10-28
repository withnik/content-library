import { describe, expect, it } from 'vitest';
import { createContentLibraryPageModel } from '../content/useCases/viewContents/ContentLibraryPageModelService';

const items = [
    {
        id: 'c_0001',
        title: 'The need of Repository Layer',
        type: 'lesson',
        url: 'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-repository-layer',
        publishedAt: '2025-12-04',
        author: 'Stefano',
        space: 'React / Nextjs',
        excerpt:
            'Explores why a repository layer is fundamental in clean architecture — separating data-fetching responsibilities from application logic in React apps.',
        durationSeconds: null,
        thumbnailUrl: null,
    },
    {
        id: 'c_0002',
        title: 'Bootstrapping an app',
        type: 'lesson',
        url: 'https://better.withnik.com/c/react-nextjs-discussions/bootstrapping-an-app',
        publishedAt: '2025-12-05',
        author: 'Stefano',
        space: 'React / Nextjs',
        excerpt:
            'Practical walkthrough of setting up a React app from scratch with clean architecture principles, covering folder structure, entry points, and initial wiring.',
        durationSeconds: null,
        thumbnailUrl: null,
    },
    {
        id: 'c_0003',
        title: 'The need of a ViewModel',
        type: 'lesson',
        url: 'https://better.withnik.com/c/react-nextjs-discussions/the-need-of-a-viewmodel',
        publishedAt: '2025-12-06',
        author: 'Stefano',
        space: 'React / Nextjs',
        excerpt:
            'Explains the ViewModel pattern and how it acts as the bridge between use-case business logic and UI presentation in a clean architecture React app.',
        durationSeconds: null,
        thumbnailUrl: null,
    },
];

describe('content library page model', () => {
    it('returns model with sorted items', () => {
        const result = createContentLibraryPageModel(items, 'all');
        expect(result).toEqual({
            title: result.title,
            items: result.items,
        });
    });

    it('returns empty data when source data is not available', () => {
        const result = createContentLibraryPageModel([], 'all');
        expect(result).toEqual({
            title: 'Content Library',
            items: [],
        });
    });
});
