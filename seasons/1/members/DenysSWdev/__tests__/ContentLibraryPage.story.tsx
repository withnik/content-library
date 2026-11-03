import {
    ContentLibraryPage,
    type ContentLibraryPageProps,
} from '../src/ContentLibraryPage';
import {
    createUrlStorage,
    PersistentStorageContext,
} from '../src/persistentStorage/index.ts';

const urlStorage = createUrlStorage();

export const Default = (props: ContentLibraryPageProps) => (
    <PersistentStorageContext value={urlStorage}>
        <ContentLibraryPage {...props} />
    </PersistentStorageContext>
);
