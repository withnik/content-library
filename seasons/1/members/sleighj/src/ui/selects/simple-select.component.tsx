import { FormControl, Select } from '@primer/react';

type SimpleSelectProps = {
    options: readonly string[];
    value: string;
    onChange: (value: string) => void;
    label?: string;
};

export const SimpleSelect = ({
    label,
    options,
    value,
    onChange,
}: SimpleSelectProps) => {
    return (
        <FormControl>
            <FormControl.Label>{label}</FormControl.Label>
            <Select value={value} onChange={(e) => onChange(e.target.value)}>
                {options.map((option) => (
                    <Select.Option key={option} value={option}>
                        {option}
                    </Select.Option>
                ))}
            </Select>
        </FormControl>
    );
};
