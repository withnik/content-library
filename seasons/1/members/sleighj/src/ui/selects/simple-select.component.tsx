import { FormControl, Select } from '@primer/react';

export type SimpleSelectOption = {
  optionLabel: string,
  optionValue: string,
};

type SimpleSelectProps = {
  options: SimpleSelectOption[];
  selectedOption: SimpleSelectOption;
  onChange: (selectOption: SimpleSelectOption) => void;
  label?: string;
};

export const SimpleSelect = ({
  label,
  options,
  selectedOption,
  onChange,
}: SimpleSelectProps) => {
  return (
    <FormControl>
      <FormControl.Label>{label}</FormControl.Label>
      <Select
        value={selectedOption.optionLabel}
        onChange={(e) => {
          const returnedOption = {
            optionLabel: e.target.value,
            optionValue: e.target.value
          };
          onChange(returnedOption);
        }}
      >
        {options.map((option: SimpleSelectOption, i) => {
          const { optionLabel, optionValue } = option;
          const optionKey = `${i}-${optionValue}`;
          return (
            <Select.Option
              key={optionKey}
              value={optionValue}>
              {optionLabel}
            </Select.Option>
          )
        })}
      </Select>
    </FormControl>
  );
};
