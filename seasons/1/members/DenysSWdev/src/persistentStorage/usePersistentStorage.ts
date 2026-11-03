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
            'usePersistentStorage must be used inside PersistentStorageContext',
        );
    }
    return storage;
}

/**
 * Reads and writes one key as a plain string. An absent key reads as '' and
 * writing '' removes the key, so callers never deal with null. The cost: a
 * missing key can't be told apart from an empty one. Use
 * usePersistentStorage() directly if that distinction ever matters.
 */
export function usePersistentValue(
    key: string,
): [string, (value: string) => void] {
    const storage = usePersistentStorage();
    const value = useSyncExternalStore(
        storage.subscribe,
        () => storage.get(key) ?? '',
    );
    const setValue = useCallback(
        (next: string) => storage.set(key, next),
        [storage, key],
    );
    return [value, setValue];
}
