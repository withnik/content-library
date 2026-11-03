export interface PersistentStorage {
    get(key: string): string | null;
    /** An empty or null value removes the key. */
    set(key: string, value: string | null): void;
    /** Returns a function that removes the listener. */
    subscribe(listener: () => void): () => void;
}
