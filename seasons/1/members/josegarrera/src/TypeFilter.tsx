import { ActionList, ActionMenu } from '@primer/react';

type TypeFilterProps = {
    contentTypes: string[];
    selectedType: string | null;
    onSelect: (type: string | null) => void;
};

export function TypeFilter({
    contentTypes,
    selectedType,
    onSelect,
}: TypeFilterProps) {
    return (
        <ActionMenu>
            <ActionMenu.Button>{selectedType ?? 'All types'}</ActionMenu.Button>
            <ActionMenu.Overlay>
                <ActionList selectionVariant="single">
                    <ActionList.Item
                        selected={selectedType === null}
                        onSelect={() => onSelect(null)}
                    >
                        All types
                    </ActionList.Item>
                    {contentTypes.map((type) => (
                        <ActionList.Item
                            key={type}
                            selected={type === selectedType}
                            onSelect={() => onSelect(type)}
                        >
                            {type}
                        </ActionList.Item>
                    ))}
                </ActionList>
            </ActionMenu.Overlay>
        </ActionMenu>
    );
}
