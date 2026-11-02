export interface PersistentStorage {
    get(key: string): string | null;
    /** An empty or null value removes the key. */
    set(key: string, value: string | null): void;
    /** Returns a function that removes the listener. */
    subscribe(listener: () => void): () => void;
}

export function createUrlStorage(): PersistentStorage {
    const listeners = new Set<() => void>();
    const notify = () => listeners.forEach((listener) => listener());

    return {
        get: (key) => new URLSearchParams(location.search).get(key),

        set: (key, value) => {
            const params = new URLSearchParams(location.search);
            if (value) params.set(key, value);
            else params.delete(key);
            const query = params.toString();
            // Keep history.state (routers store data in it) and the #hash.
            history.replaceState(
                history.state,
                '',
                `${location.pathname}${query && `?${query}`}${location.hash}`,
            );
            notify();
        },

        subscribe: (listener) => {
            listeners.add(listener);
            // Back/forward changes the URL without going through set().
            window.addEventListener('popstate', listener);
            return () => {
                listeners.delete(listener);
                window.removeEventListener('popstate', listener);
            };
        },
    };
}
