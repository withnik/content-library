import type { PersistentStorage } from '../../src/persistentStorage/index.ts';

export function createInMemoryStorage(
    initial: Record<string, string> = {},
): PersistentStorage {
    const values = new Map(Object.entries(initial));
    const listeners = new Set<() => void>();

    return {
        get: (key) => values.get(key) ?? null,

        set: (key, value) => {
            if (value) values.set(key, value);
            else values.delete(key);
            listeners.forEach((listener) => listener());
        },

        subscribe: (listener) => {
            listeners.add(listener);
            return () => {
                listeners.delete(listener);
            };
        },
    };
}
