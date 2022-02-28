import { Fragment, PropsWithChildren } from "react";
import { Dialog as DialogUI, Transition } from "@headlessui/react";
import DialogHeader from "./Header";
import DialogContent from "./Content";
import ActionButtons from "./ActionButton";

export type IDialogSize = "sm" | "md" | "lg" | "auto";

interface ILoginDialogProps {
  size?: IDialogSize;
  open: boolean | undefined;
  onClose: () => void;
  className?: string;
}

const sizes: {
  [key in IDialogSize]: string;
} = {
  sm: "w-min",
  md: "w-full max-w-phone",
  lg: "w-full max-w-laptop",
  auto: "w-auto",
};

const Dialog = (props: PropsWithChildren<ILoginDialogProps>): JSX.Element => {
  const { size = "md", children, className = "", open, onClose } = props;

  const handleClose = () => {
    onClose && onClose();
  };

  return (
    <Transition appear show={open} as={Fragment}>
      <DialogUI
        as="div"
        className="fixed inset-0 overflow-y-auto z-100"
        onClose={handleClose}
      >
        <div className="min-h-screen px-2 text-center py-1">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogUI.Overlay
              className="fixed inset-0 "
              style={{ backgroundColor: "#131313b3" }}
            />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className={`
              inline-block text-left align-middle transition-all transform rounded-md shadow-lg bg-primary-3
              ${sizes[size]}
              ${className}
            `}
            >
              {children}
            </div>
          </Transition.Child>
        </div>
      </DialogUI>
    </Transition>
  );
};

Dialog.Header = DialogHeader;
Dialog.Content = DialogContent;
Dialog.ActionButtons = ActionButtons;

Dialog.Divider = ({
  children,
  className = "",
}: PropsWithChildren<{ className: string }>) => {
  return <div className="w-full h-full">{children}</div>;
};

export default Dialog;
