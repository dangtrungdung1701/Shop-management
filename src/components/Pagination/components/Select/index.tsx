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

interface ISelectProps {
  onSelect: (option: ISize) => void;
}

const Select = (props: ISelectProps) => {
  const { onSelect } = props;

  const [optionSelected, setOptionSelected] = useState<ISize>(listSize[0]);

  const handleSelect = (option: ISize) => {
    setOptionSelected(option);
    onSelect && onSelect(option);
  };

  return (
    <SelectContainer>
      <div>
        <Listbox value={optionSelected} onChange={handleSelect}>
          <div className={`relative text-neutral-1`}>
            <ListboxButton>
              <MenuButton className="group">
                <Text>{optionSelected?.size}</Text>
                <SVG name="common/table-size-select" width={16} height={16} />
              </MenuButton>
            </ListboxButton>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <ListboxOptionsContainer>
                {listSize?.map((option, index) => (
                  <Listbox.Option key={index} value={option}>
                    {({ selected, active }) => (
                      <MenuItem active={active || selected}>
                        {option.size}
                      </MenuItem>
                    )}
                  </Listbox.Option>
                ))}
              </ListboxOptionsContainer>
            </Transition>
          </div>
        </Listbox>
      </div>
    </SelectContainer>
  );
};

export default Select;

const listSize: ISize[] = [
  {
    size: 10,
  },
  {
    size: 20,
  },
  {
    size: 50,
  },
];
