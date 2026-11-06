import { useCallback, useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
    window.addEventListener('popstate', callback);
    window.addEventListener('urlchange', callback);

    return () => {
        window.removeEventListener('popstate', callback);
        window.removeEventListener('urlchange', callback);
    };
}

export function useQueryParams(key: string) {
    const value = useSyncExternalStore(
        subscribe,
        () => new URLSearchParams(window.location.search).get(key),
        () => null,
    );

    const setValue = useCallback(
        (next: string | null) => {
            const url = new URL(window.location.href);
            if (!next) {
                url.searchParams.delete(key);
            } else {
                url.searchParams.set(key, next);
            }
            window.history.replaceState(null, '', url.toString());
            window.dispatchEvent(new Event('urlchange'));
        },
        [key],
    );

    return [value, setValue] as const;
}
