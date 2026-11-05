import { useState } from 'react';
import {
    ContentLibraryPage,
    type ContentLibraryPageProps,
} from '../src/ContentLibraryPage';
import { PersistentStorageContext } from '../src/persistentStorage/index.ts';
import { createInMemoryStorage } from './fakes/createInMemoryStorage.ts';

type DefaultProps = ContentLibraryPageProps & {
    /** Values the storage already holds when the page opens. */
    stored?: Record<string, string>;
};

export const Default = ({ stored, ...props }: DefaultProps) => {
    const [storage] = useState(() => createInMemoryStorage(stored));

    return (
        <PersistentStorageContext value={storage}>
            <ContentLibraryPage {...props} />
        </PersistentStorageContext>
    );
};
