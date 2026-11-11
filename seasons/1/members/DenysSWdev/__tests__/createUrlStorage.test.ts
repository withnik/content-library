// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest';
import { createUrlStorage } from '../src/persistentStorage/createUrlStorage.ts';

const currentUrl = () => location.href.replace(location.origin, '');

describe('createUrlStorage', () => {
    beforeEach(() => {
        history.replaceState(null, '', '/');
    });

    it('reads a decoded value and returns null for a missing key', () => {
        history.replaceState(null, '', '/?search=hello%20world');
        const storage = createUrlStorage();

        expect(storage.get('search')).toBe('hello world');
        expect(storage.get('missing')).toBeNull();
    });

    it('stores a value with URL-reserved characters in the URL', () => {
        createUrlStorage().set('search', 'a&b=c #d');

        // A new instance proves the value lives in the URL, not in memory
        expect(createUrlStorage().get('search')).toBe('a&b=c #d');
    });

    it('updates one key and keeps the rest of the URL and history state', () => {
        const routerState = { route: 'library' };
        history.replaceState(
            routerState,
            '',
            '/library?type=video&search=old#top',
        );

        createUrlStorage().set('search', 'new');

        expect(currentUrl()).toBe('/library?type=video&search=new#top');
        expect(history.state).toEqual(routerState);
    });

    it.each([null, ''])('removes the key when the value is %j', (value) => {
        history.replaceState(null, '', '/library?search=old#top');

        createUrlStorage().set('search', value);

        expect(currentUrl()).toBe('/library#top');
    });
});
