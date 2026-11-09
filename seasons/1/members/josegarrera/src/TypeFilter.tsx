import { ActionList, ActionMenu } from '@primer/react';

import type { TypeOption } from './contentLibraryViewModel';

type TypeFilterProps = {
    typeOptions: TypeOption[];
    onSelect: (type: string | null) => void;
};

export function TypeFilter({ typeOptions, onSelect }: TypeFilterProps) {
    const selectedOption = typeOptions.find((option) => option.selected);

    return (
        <ActionMenu>
            <ActionMenu.Button>{selectedOption?.label}</ActionMenu.Button>
            <ActionMenu.Overlay>
                <ActionList selectionVariant="single">
                    {typeOptions.map((option) => (
                        <ActionList.Item
                            key={option.label}
                            selected={option.selected}
                            onSelect={() => onSelect(option.type)}
                        >
                            {option.label}
                        </ActionList.Item>
                    ))}
                </ActionList>
            </ActionMenu.Overlay>
        </ActionMenu>
    );
}
