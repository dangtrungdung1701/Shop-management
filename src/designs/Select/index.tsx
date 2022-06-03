import React, { useEffect, Fragment, useRef, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useField, useFormikContext } from "formik";
import {
  SelectContainer,
  HiddenInput,
  MenuButton,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Text,
  Placeholder,
  EmptyData,
} from "./styles";
import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";
import DropdownArrowIcon from "icons/Arrows/SelectArrow";
import SearchBoxTable from "components/SearchBoxTable";
import { keyframes } from "styled-components";
export interface ISelectData {
  _id: string;
  name: string;
}
interface ISelectProps<T = any> {
  name: string;
  label?: string;
  className?: string;
  optionSelected?: T;
  options: T[];
  onSelect: (option: T) => void;
  disabled?: boolean;
  placeholder?: string;
  isSearchBox?: boolean;
  /**
   * @description targetForm is key of optionSelected. When form is submitted,
   * value of name will be optionSelected[targetForm]
   * @default targetForm = "_id"
   */
  formTarget?: string;
  /**
   * @description optionTarget is key of option which will be displayed in feature
   * @default optionTarget = "name"
   */
  optionTarget?: string;
  required?: boolean;
  renderOption?: (option: T, active: boolean) => JSX.Element;
}

const Select = <T,>(props: ISelectProps<T>) => {
  const {
    name,
    className,
    label,
    options = [],
    optionSelected,
    placeholder = "",
    disabled = false,
    formTarget = "id",
    optionTarget = "displayName",
    required = false,
    renderOption,
    onSelect,
    isSearchBox = true,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);

  const [isOpen, setIsOpen] = useState(false);
  const [optionList, setOptionList] = useState<T[]>([]);
  const [searchText, setSearchText] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) {
      setSearchText("");
    }
  }, [isOpen]);

  useEffect(() => {
    setOptionList(
      options?.filter(item =>
        (item as any)?.[optionTarget]?.toLowerCase().match(searchText),
      ),
    );
  }, [searchText]);

  useEffect(() => {
    setOptionList(options);
  }, [options]);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  const handleSelect = (option: T) => {
    setIsOpen(!isOpen);
    setFieldValue(name, "SELECTED");
    onSelect && onSelect(option);
  };
  return (
    <SelectContainer className="">
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <div>
        <Listbox
          value={optionSelected}
          onChange={handleSelect}
          disabled={disabled}
        >
          <div ref={wrapperRef}>
            <div
              className={`relative border rounded  text-neutral-1 ${
                isError ? "border-sematic-1 text-sematic-1" : "border-neutral-4"
              } ${className}`}
            >
              <ListboxButton>
                <MenuButton
                  className="group"
                  isError={isError}
                  disabled={disabled}
                  onClick={() => setIsOpen(!isOpen)}
                >
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
                show={isOpen}
                as={Fragment}
                leave="transition ease-in duration-100"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <ListboxOptionsContainer
                  as="ul"
                  onKeyUp={(e: React.KeyboardEvent) => {
                    if (
                      e.keyCode === 32 ||
                      e.keyCode === 13 ||
                      e.keyCode === 27
                    ) {
                      e.stopPropagation();
                    }
                  }}
                >
                  {isSearchBox && options.length !== 0 && (
                    <li className="sticky bg-primary-3">
                      <MenuItem>
                        <SearchBoxTable
                          onFetchData={value => {
                            setSearchText(value.trim());
                          }}
                          placeholder="Tìm kiếm..."
                          className="w-full"
                          isSelect
                        />
                      </MenuItem>
                    </li>
                  )}
                  {optionList.length ? (
                    optionList?.map((option, index) => (
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
                    <EmptyData>(Trống)</EmptyData>
                  )}
                </ListboxOptionsContainer>
              </Transition>
            </div>
          </div>
        </Listbox>
      </div>
      {isError && <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>}
      <HiddenInput {...field} />
    </SelectContainer>
  );
};

export default Select;
