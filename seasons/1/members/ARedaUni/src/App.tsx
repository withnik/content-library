import content from '../../../data/content.json' with { type: 'json' };
import { LibraryPage } from './LibraryPage';

// Composition root: decides where the page's inputs come from, nothing else.
export function App() {
    return <LibraryPage items={content.items} locale={navigator.language} />;
}
