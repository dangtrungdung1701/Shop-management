/**
 * @description Simple select is Select without form.
 *    You don't need to wrap Formik outside
 */
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  SelectContainer,
  MenuButton,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Text,
  Placeholder,
  EmptyData,
} from "./styles";
import FormControlLabel from "common/styles/FormControlLabel";
import DropdownArrowIcon from "icons/Arrows/SelectArrow";

export interface ISelectData {
  _id: string;
  name: string;
}

interface ISimpleSelectProps<T = any> {
  label?: string;
  className?: string;
  optionSelected: T;
  options: T[];
  onSelect: (option: T) => void;
  disabled?: boolean;
  placeholder?: string;
  /**
   * @description optionTarget is key of option which will be displayed in feature
   * @default optionTarget = "name"
   */
  optionTarget?: string;
  required?: boolean;
  renderOption?: (option: T, active: boolean) => JSX.Element;
}

const SimpleSelect = <T,>(props: ISimpleSelectProps<T>) => {
  const {
    className,
    label,
    options = [],
    optionSelected,
    placeholder = "",
    disabled = false,
    optionTarget = "name",
    required = false,
    renderOption,
    onSelect,
  } = props;

  const handleSelect = (option: T) => {
    onSelect && onSelect(option);
  };

  return (
    <SelectContainer className={className}>
      <FormControlLabel isError={false} required={required}>
        {label}
      </FormControlLabel>
      <div>
        <Listbox
          value={optionSelected}
          onChange={handleSelect}
          disabled={disabled}
        >
          <div
            className={`relative border rounded border-neutral-4 text-neutral-1`}
          >
            <ListboxButton>
              <MenuButton className="group" isError={false} disabled={disabled}>
                {optionSelected && Object.keys(optionSelected)?.length > 0 ? (
                  <Text>
                    {renderOption
                      ? renderOption(optionSelected, false)
                      : (optionSelected as any)?.[optionTarget]}
                  </Text>
                ) : (
                  <Placeholder className="placeholder">
                    {placeholder}
                  </Placeholder>
                )}
                <DropdownArrowIcon />
              </MenuButton>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptionsContainer>
                {options.length ? (
                  options?.map((option, index) => (
                    <Listbox.Option key={index} value={option}>
                      {({ selected, active }) => (
                        <MenuItem active={active || selected}>
                          {renderOption
                            ? renderOption(option, active || selected)
                            : (option as any)?.[optionTarget]}
                        </MenuItem>
                      )}
                    </Listbox.Option>
                  ))
                ) : (
                  <EmptyData>(Empty Data)</EmptyData>
                )}
              </ListboxOptionsContainer>
            </Transition>
          </div>
        </Listbox>
      </div>
    </SelectContainer>
  );
};

export default SimpleSelect;
