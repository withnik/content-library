import content from '../../../data/content.json';
import { ContentLibraryPage } from './ContentLibraryPage';

export function App() {
    return <ContentLibraryPage items={content.items} />;
}
