import { ActionList, ActionMenu } from '@primer/react';
import { FILTER_OPTIONS, type FilterBy } from '../../domain/ContentService';
type Props = {
    filterBy: FilterBy;
    setFilterBy: React.Dispatch<React.SetStateAction<FilterBy>>;
};

const FilterDropdown = ({ filterBy, setFilterBy }: Props) => {
    return (
        <div className="px-4">
            <ActionMenu>
                <ActionMenu.Button className="w-37.5 capitalize">
                    {filterBy === 'all' ? 'All types' : filterBy}
                </ActionMenu.Button>
                <ActionMenu.Overlay width="small">
                    <ActionList
                        selectionVariant="single"
                        className="capitalize"
                    >
                        {FILTER_OPTIONS.map((option) => (
                            <ActionList.Item
                                key={option}
                                selected={option === filterBy}
                                onSelect={() => setFilterBy(option)}
                            >
                                {option}
                            </ActionList.Item>
                        ))}
                    </ActionList>
                </ActionMenu.Overlay>
            </ActionMenu>
        </div>
    );
};

export default FilterDropdown;
