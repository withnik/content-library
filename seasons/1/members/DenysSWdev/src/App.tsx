import content from '../../../data/content.json';
import { ContentLibraryPage } from './ContentLibraryPage';
import {
    createUrlStorage,
    PersistentStorageProvider,
} from './persistentStorage/index.ts';

const storage = createUrlStorage();

export function App() {
    return (
        <PersistentStorageProvider storage={storage}>
            <ContentLibraryPage items={content.items} />
        </PersistentStorageProvider>
    );
}
