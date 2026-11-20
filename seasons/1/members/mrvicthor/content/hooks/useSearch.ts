import { useState } from 'react';

export const useSearch = () => {
    const [search, setSearch] = useState(
        new URLSearchParams(window.location.search).get('search') ?? '',
    );

    const handleSearch = (
        e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ) => {
        setSearch(e.target.value);
        const url = new URL(window.location.href);
        if (e.target.value === '') {
            url.searchParams.delete('search');
        } else {
            url.searchParams.set('search', e.target.value);
        }
        window.history.replaceState(null, '', url.toString());
        window.dispatchEvent(new Event('urlchange'));
    };

    return { search, handleSearch };
};
