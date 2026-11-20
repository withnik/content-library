import { FormControl, TextInput } from '@primer/react';
import { SearchIcon } from '@primer/octicons-react';

type SearchFieldProps = {
    search: string;
    handleSearch: (
        e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
    ) => void;
};

export const SearchField = ({ search, handleSearch }: SearchFieldProps) => {
    return (
        <form role="search" className="flex-1 px-4">
            <FormControl>
                <FormControl.Label visuallyHidden>Search</FormControl.Label>
                <TextInput
                    block
                    size="large"
                    type="search"
                    placeholder="Type to search"
                    leadingVisual={SearchIcon}
                    value={search}
                    onChange={(e) => handleSearch(e)}
                    className=""
                />
            </FormControl>
        </form>
    );
};
