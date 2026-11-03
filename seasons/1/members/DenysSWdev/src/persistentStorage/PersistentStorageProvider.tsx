import type { ReactNode } from 'react';
import type { PersistentStorage } from './PersistentStorage.ts';
import { PersistentStorageContext } from './usePersistentStorage.ts';

export function PersistentStorageProvider({
    storage,
    children,
}: {
    storage: PersistentStorage;
    children: ReactNode;
}) {
    return (
        <PersistentStorageContext.Provider value={storage}>
            {children}
        </PersistentStorageContext.Provider>
    );
}
