import { createContext, useContext } from 'react';

export interface KeyValueStorage {
    get(key: string): string | undefined;
    set(key: string, value: string): void;
    delete(key: string): void;
}

export const localStorageKeyValueStorage: KeyValueStorage = {
    get(key) {
        return window.localStorage.getItem(key) ?? undefined;
    },
    set(key, value) {
        window.localStorage.setItem(key, value);
    },
    delete(key) {
        window.localStorage.removeItem(key);
    },
};

export const KeyValueStorageContext = createContext<KeyValueStorage>(
    localStorageKeyValueStorage,
);

export function useKeyValueStorage() {
    return useContext(KeyValueStorageContext);
}
