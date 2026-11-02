import {
    createContext,
    useCallback,
    useContext,
    useSyncExternalStore,
} from 'react';
import type { PersistentStorage } from './PersistentStorage.ts';

export const PersistentStorageContext = createContext<PersistentStorage | null>(
    null,
);

export function usePersistentStorage(): PersistentStorage {
    const storage = useContext(PersistentStorageContext);
    if (!storage) {
        throw new Error(
            'usePersistentStorage must be used inside PersistentStorageProvider',
        );
    }
    return storage;
}

export function usePersistentValue(
    key: string,
): [string | null, (value: string | null) => void] {
    const storage = usePersistentStorage();
    const value = useSyncExternalStore(storage.subscribe, () =>
        storage.get(key),
    );
    const setValue = useCallback(
        (next: string | null) => storage.set(key, next),
        [storage, key],
    );
    return [value, setValue];
}
