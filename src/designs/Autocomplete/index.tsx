/**
 * @name Autocomplete
 * @return_value_of_formik {String} a string which was joined of all selected option
 * @example
 *  - valueKey = "_id"
 *  - optionSelected = [{_id: "12EQ"}, {_id: "32UI"}, {_id: "7U21"}]
 * --> value submitted: "12EQ|32UI|7u21"
 */

import { useEffect, useState, Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useField, useFormikContext } from "formik";
import Fuse from "fuse.js";

import FormControlErrorHelper from "common/styles/FormControlErrorHelper";
import FormControlLabel from "common/styles/FormControlLabel";

import DropdownArrowIcon from "icons/Arrows/SelectArrow";

import { IIconSVGProps } from "typings";

import {
  AutocompleteContainer,
  HiddenInput,
  MenuButton,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Placeholder,
  EmptyData,
  SearchInput,
  Text,
} from "./styles";

interface IAutocompleteProps<T> {
  name: string;
  className?: string;
  optionSelected: T;
  label: string;
  options: T[];
  onSelect: (option: T) => void;
  disabled?: boolean;
  placeholder?: string;
  searchPlaceholder?: string;
  // Keys of properties to search in each object
  searchPropertyKeys?: string[];
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
  splitSign?: string; // ex: splitSign = "|" --> "abc|erf"
  required?: boolean;
  renderOption?: (option: T, active: boolean) => JSX.Element;
}

const Autocomplete = <T,>(props: IAutocompleteProps<T>) => {
  const {
    name,
    className,
    label,
    options = [],
    optionSelected = [],
    placeholder = "",
    searchPlaceholder = "Search...",
    disabled = false,
    formTarget = "_id",
    optionTarget = "name",
    required = false,
    splitSign = "|",
    searchPropertyKeys = ["name"],
    renderOption,
    onSelect,
  } = props;
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const isError = Boolean(!!meta.error && !!meta.touched);
  const [searchResults, setSearchResults] = useState<T[]>(options);

  const [inputText, setInputText] = useState("");

  useEffect(() => {
    handleSearch(inputText);
  }, [inputText]);

  useEffect(() => {
    handleSearch("");
  }, [options]);

  useEffect(() => {
    const id = setTimeout(() => {
      const newOption = (optionSelected as any)?.[formTarget] || "";
      setFieldValue(name, newOption);
    }, 300);
    return () => {
      clearTimeout(id);
    };
  }, [optionSelected]);

  const handleSearch = (searchText: string) => {
    if (!searchText) return setSearchResults(options);

    const fuseOptions = { includeScore: true, keys: searchPropertyKeys };
    const fuse = new Fuse(options, fuseOptions);
    const searchResults = fuse.search(searchText).map((opt: any) => opt.item);

    setSearchResults(searchResults as T[]);
  };

  const handleSelect = (option: T) => {
    onSelect && onSelect(option);
    setInputText("");
  };

  return (
    <AutocompleteContainer className="">
      <FormControlLabel isError={isError} required={required}>
        {label}
      </FormControlLabel>
      <div>
        <Listbox
          value={optionSelected}
          onChange={handleSelect as any}
          disabled={disabled}
        >
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
              >
                {optionSelected && Object.keys(optionSelected)?.length > 0 ? (
                  <Text>
                    {renderOption
                      ? renderOption(optionSelected as any, false)
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
                <div className="px-1 mb-1">
                  <SearchInput
                    autoFocus
                    autoComplete="off"
                    value={inputText}
                    placeholder={searchPlaceholder}
                    onChange={e => setInputText(e.target.value)}
                    onKeyDown={e => {
                      if (
                        ![
                          "Enter",
                          "Esc",
                          "Home",
                          "End",
                          "ArrowUp",
                          "ArrowDown",
                        ].includes(e.key)
                      ) {
                        e.stopPropagation();
                      }
                    }}
                  />
                </div>
                {searchResults?.length ? (
                  searchResults?.map((option: any, index) => (
                    <Listbox.Option key={index} value={option}>
                      {({ selected, active }) => (
                        <MenuItem active={active || selected}>
                          {option?.[optionTarget]}
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
        </Listbox>
      </div>
      {isError && <FormControlErrorHelper>{meta.error}</FormControlErrorHelper>}
      <HiddenInput {...field} />
    </AutocompleteContainer>
  );
};

export default Autocomplete;

const RemoveIcon: React.FC<IIconSVGProps> = props => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.32166 6.0001L11.8083 1.51327C11.9317 1.38976 11.9998 1.22498 12 1.04927C12 0.873464 11.9319 0.708488 11.8083 0.585171L11.4151 0.192098C11.2915 0.0682932 11.1267 0.000488281 10.9508 0.000488281C10.7752 0.000488281 10.6104 0.0682932 10.4868 0.192098L6.00019 4.67863L1.51337 0.192098C1.38995 0.0682932 1.22507 0.000488281 1.04927 0.000488281C0.873659 0.000488281 0.70878 0.0682932 0.585366 0.192098L0.192 0.585171C-0.064 0.841171 -0.064 1.25756 0.192 1.51327L4.67873 6.0001L0.192 10.4867C0.0684878 10.6104 0.000487805 10.7752 0.000487805 10.9509C0.000487805 11.1266 0.0684878 11.2914 0.192 11.415L0.585268 11.8081C0.708683 11.9318 0.873658 11.9997 1.04917 11.9997C1.22498 11.9997 1.38985 11.9318 1.51327 11.8081L6.0001 7.32146L10.4867 11.8081C10.6103 11.9318 10.7751 11.9997 10.9507 11.9997H10.9509C11.1266 11.9997 11.2914 11.9318 11.415 11.8081L11.8082 11.415C11.9316 11.2915 11.9997 11.1266 11.9997 10.9509C11.9997 10.7752 11.9316 10.6104 11.8082 10.4868L7.32166 6.0001Z"
        fill="white"
      />
    </svg>
  );
};
