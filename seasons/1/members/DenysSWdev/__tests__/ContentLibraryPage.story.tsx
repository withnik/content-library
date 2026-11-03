import {
    ContentLibraryPage,
    type ContentLibraryPageProps,
} from '../src/ContentLibraryPage';
import {
    createUrlStorage,
    PersistentStorageProvider,
} from '../src/persistentStorage/index.ts';

const urlStorage = createUrlStorage();

export const Default = (props: ContentLibraryPageProps) => (
    <PersistentStorageProvider storage={urlStorage}>
        <ContentLibraryPage {...props} />
    </PersistentStorageProvider>
);
