import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import {
  SelectContainer,
  MenuButton,
  MenuItem,
  ListboxButton,
  ListboxOptionsContainer,
  Text,
} from "./styles";

import SVG from "designs/SVG";
interface ISize {
  size: number;
}

interface IActionDropdownProps<T> {
  ButtonAction: React.ReactElement;
  options: T[];
  renderItem: (option: T) => JSX.Element;
  className?: string;
}

const ActionDropdown = <T,>(props: IActionDropdownProps<T>) => {
  const { ButtonAction, options, renderItem, className } = props;

  return (
    <SelectContainer>
      <Listbox value={null} onChange={renderItem}>
        <div className={`relative text-neutral-1`}>
          <ListboxButton>{ButtonAction}</ListboxButton>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options>
              <ListboxOptionsContainer className={className}>
                {options?.map((option, index) => (
                  <Listbox.Option key={index} value={option}>
                    {renderItem(option)}
                  </Listbox.Option>
                ))}
              </ListboxOptionsContainer>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </SelectContainer>
  );
};

export default ActionDropdown;
