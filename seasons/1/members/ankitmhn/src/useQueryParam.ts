import { useCallback, useSyncExternalStore } from 'react';

function subscribe(onChange: () => void) {
    navigation.addEventListener('currententrychange', onChange);
    return () => navigation.removeEventListener('currententrychange', onChange);
}

export function useQueryParam(key: string) {
    const value = useSyncExternalStore(
        subscribe,
        () => new URLSearchParams(location.search).get(key),
        () => null,
    );

    const setValue = useCallback(
        (next: string | null) => {
            const url = new URL(location.href);
            if (next == null) url.searchParams.delete(key);
            else url.searchParams.set(key, next);
            history.pushState(null, '', url);
        },
        [key],
    );

    return [value, setValue] as const;
}
