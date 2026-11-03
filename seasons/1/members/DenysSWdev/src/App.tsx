import content from '../../../data/content.json';
import { ContentLibraryPage } from './ContentLibraryPage';
import {
    createUrlStorage,
    PersistentStorageContext,
} from './persistentStorage/index.ts';

const storage = createUrlStorage();

export function App() {
    return (
        <PersistentStorageContext value={storage}>
            <ContentLibraryPage items={content.items} />
        </PersistentStorageContext>
    );
}
