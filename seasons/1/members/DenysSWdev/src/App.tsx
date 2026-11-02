import content from '../../../data/content.json';
import { ContentLibraryPage } from './ContentLibraryPage';
import { createUrlStorage } from './PersistentStorage.ts';
import { PersistentStorageProvider } from './PersistentStorageProvider.tsx';

const storage = createUrlStorage();

export function App() {
    return (
        <PersistentStorageProvider storage={storage}>
            <ContentLibraryPage items={content.items} />
        </PersistentStorageProvider>
    );
}
