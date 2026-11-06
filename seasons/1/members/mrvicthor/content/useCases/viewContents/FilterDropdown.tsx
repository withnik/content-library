import { ActionList, ActionMenu } from '@primer/react';

type Props = {
    filterBy: string;
    handleFilter: (filter: string) => void;
    filterOptions: readonly ['', ...string[]];
};

const FilterDropdown = ({ filterBy, handleFilter, filterOptions }: Props) => {
    return (
        <div className="px-4">
            <ActionMenu>
                <ActionMenu.Button className="w-37.5 capitalize">
                    {filterBy === '' ? 'All types' : filterBy}
                </ActionMenu.Button>
                <ActionMenu.Overlay width="small">
                    <ActionList
                        selectionVariant="single"
                        className="capitalize"
                    >
                        {filterOptions.map((option) => (
                            <ActionList.Item
                                key={option}
                                selected={option === filterBy}
                                onSelect={() => handleFilter(option)}
                            >
                                {option === '' ? 'All types' : option}
                            </ActionList.Item>
                        ))}
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>
        </div>
    );
};

export default FilterDropdown;
