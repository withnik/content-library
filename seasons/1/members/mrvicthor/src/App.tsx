import data from '../../../data/content.json';
import ContentLibraryPage from '../content/useCases/viewContents/ContentLibraryPage';

export function App() {
    return <ContentLibraryPage items={data.items} />;
}
