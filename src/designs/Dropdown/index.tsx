import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";

import { MenuButtonContainer, MenuItems } from "./styles";

interface IListBoxProps<T> {
  className?: string;
  dropdownContainerClassName?: string;
  MenuButton: React.ReactNode;
  options: T[];
  renderItem: (option: T, active: boolean) => JSX.Element;
  onSelect?: (option: T) => void;
}

const Dropdown = <T,>(props: IListBoxProps<T>) => {
  const {
    dropdownContainerClassName,
    MenuButton,
    options = [],
    renderItem,
    className = "",
    onSelect,
  } = props;

  return (
    <div>
      <Menu as="div">
        {({ open }) => (
          <div className={"relative " + className}>
            <MenuButtonContainer>{MenuButton}</MenuButtonContainer>
            {open && (
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <MenuItems className={dropdownContainerClassName}>
                  <Menu.Items static>
                    {options.map((option, index) => (
                      <Menu.Item key={index} onClick={() => onSelect?.(option)}>
                        {({ active }) => renderItem(option, active)}
                      </Menu.Item>
                    ))}
                  </Menu.Items>
                </MenuItems>
              </Transition>
            )}
          </div>
        )}
      </Menu>
    </div>
  );
};

export default Dropdown;
