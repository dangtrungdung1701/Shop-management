import { useState } from "react";
import { Popover, Transition } from "@headlessui/react";

import IconButton from "designs/IconButton";

import { ActionButton, ActionsContainer, Overlay, Wrapper } from "./styles";

export * from "./Delete";
export * from "./Edit";
export * from "./Upgrade";

interface IActionsProps<T> {
  ButtonAction: React.ReactElement;
  options: T[];
  renderItem: (option: T) => JSX.Element;
  className?: string;
}

const ActionsTable = <T,>(props: IActionsProps<T>) => {
  const { ButtonAction, options = [], renderItem, className } = props;
  const [openPopover, setOpenPopover] = useState(false);

  return (
    <Popover as={Wrapper}>
      <IconButton
        onClick={() => {
          setOpenPopover(true);
        }}
      >
        <ActionButton>{ButtonAction}</ActionButton>
      </IconButton>
      {openPopover && (
        <Overlay
          onClick={() => {
            setOpenPopover(false);
          }}
        />
      )}

      <Transition
        show={openPopover}
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel static as={ActionsContainer} className={className}>
          {openPopover &&
            options.map((option, index) => (
              <div key={String(index)}>{renderItem(option)}</div>
            ))}
        </Popover.Panel>
      </Transition>
    </Popover>
  );
};

export default ActionsTable;
