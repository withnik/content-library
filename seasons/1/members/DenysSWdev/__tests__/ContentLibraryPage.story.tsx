import {
    ContentLibraryPage,
    type ContentLibraryPageProps,
} from '../src/ContentLibraryPage';
import { createUrlStorage } from '../src/PersistentStorage.ts';
import { PersistentStorageProvider } from '../src/PersistentStorageProvider.tsx';

const urlStorage = createUrlStorage();

export const Default = (props: ContentLibraryPageProps) => (
    <PersistentStorageProvider storage={urlStorage}>
        <ContentLibraryPage {...props} />
    </PersistentStorageProvider>
);
