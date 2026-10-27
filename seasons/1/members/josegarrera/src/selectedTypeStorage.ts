export type SelectedTypeStorage = {
    load(): string | null;
    save(type: string | null): void;
};

const storageKey = 'content-library.selected-type';

export const browserSelectedTypeStorage: SelectedTypeStorage = {
    load() {
        try {
            return localStorage.getItem(storageKey);
        } catch {
            return null;
        }
    },
    save(type) {
        try {
            if (type === null) {
                localStorage.removeItem(storageKey);
                return;
            }
            localStorage.setItem(storageKey, type);
        } catch {
            // Storage unavailable (e.g. private mode): the selection just isn't remembered.
        }
    },
};
