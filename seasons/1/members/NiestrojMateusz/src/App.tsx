import { contentAdapter } from './content-library/domain/ContentAdapter';
import { ContentLibraryPage } from './content-library/use-cases/view-content/ContentLibraryPage';

export function App() {
    return <ContentLibraryPage adapter={contentAdapter} />;
}
