/**
 * @description Simple select is Select without form.
 *    You don't need to wrap Formik outside
 */
import { Fragment, useEffect, useRef, useState } from "react";
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
import SearchBoxTable from "components/SearchBoxTable";

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
  isSearchBox?: boolean;
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
    isSearchBox = true,
  } = props;
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
    if ((option as any) === "CANCEL_ALL") {
      onSelect && onSelect(null as any);
      return;
    }
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
          <div ref={wrapperRef}>
            <div
              className={`relative border rounded border-neutral-4 text-neutral-1`}
            >
              <ListboxButton>
                <MenuButton
                  className="group"
                  isError={false}
                  disabled={disabled}
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
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
                  {optionSelected && (
                    <Listbox.Option key={-1} value="CANCEL_ALL">
                      <MenuItem className="text-primary-1">Bỏ chọn</MenuItem>
                    </Listbox.Option>
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
    </SelectContainer>
  );
};

export default SimpleSelect;
