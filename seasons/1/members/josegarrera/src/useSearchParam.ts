import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
}

export function useSearchParam(name: string) {
    const value = useSyncExternalStore(subscribe, () =>
        new URLSearchParams(location.search).get(name),
    );

    function setValue(nextValue: string | null) {
        const url = new URL(location.href);
        if (nextValue === null) {
            url.searchParams.delete(name);
        } else {
            url.searchParams.set(name, nextValue);
        }
        history.pushState(null, '', url);
        listeners.forEach((listener) => listener());
    }

    return [value, setValue] as const;
}
