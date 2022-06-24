import { useCallback, useState } from "react";

import AlertDialogV2 from "components/AlertDialogV2";

import Switch from "designs/Switch";
import Dropdown from "designs/Dropdown";
import SVG from "designs/SVG";

import { OptionDropdown } from "./styles";

type IActionType =
  | "edit"
  | "delete"
  | "info"
  | "update"
  | "switch"
  | "restart"
  | "volume"
  | "config";

interface IActionButtonsProps {
  buttons: {
    delete?: {
      DialogContent?: React.FC<{ onClose: () => void }>; // An dialog
      title?: string;
      message?: string;
      onDelete?: () => Promise<void>;
    };
    edit?: {
      DialogContent: React.FC<{ onClose: () => void }>; // An dialog
    };
    config?: {
      DialogContent: React.FC<{ onClose: () => void }>; // An dialog
    };
    info?: {
      DialogContent: React.FC<any>; // An dialog
    };
    volume?: {
      DialogContent: React.FC<any>; // An dialog
    };
    update?: {
      DialogContent: React.FC<{ onClose: () => void }>; // An dialog
    };
    switch?: {
      title: string;
      message: string;
      value?: boolean;
      onSwitch: () => Promise<void>;
    };
    restart?: {
      title: string;
      message: string;
      onRestart: () => Promise<void>;
    };
  };
}

type IOption = {
  type: IActionType;
  iconName?: string;
  name: string;
};

const options: {
  [k in IActionType]: IOption;
} = {
  edit: {
    type: "edit",
    iconName: "actions/edit",
    name: "Chỉnh sửa",
  },
  config: {
    type: "config",
    iconName: "actions/config",
    name: "Cấu hình",
  },
  delete: {
    type: "delete",
    iconName: "actions/delete",
    name: "Xóa",
  },
  info: {
    type: "info",
    iconName: "actions/info",
    name: "Thông tin",
  },
  update: {
    type: "update",
    iconName: "actions/change-password",
    name: "Đổi mật khẩu",
  },
  switch: {
    type: "switch",
    name: "Hoạt động",
  },
  restart: {
    type: "restart",
    iconName: "actions/restart",
    name: "Khởi động lại",
  },
  volume: {
    type: "volume",
    iconName: "actions/volume",
    name: "Âm lượng",
  },
};

const ActionButtons: React.FC<IActionButtonsProps> = ({ buttons }) => {
  const [optionSelected, setOptionSelected] = useState<IOption | null>(null);
  const [loading, setLoading] = useState(false);
  const [selectedOptions] = useState(() => {
    const selectedOptions: IOption[] = [];

    for (let actionType in buttons) {
      selectedOptions.push(options[actionType as IActionType]);
    }
    return selectedOptions;
  });

  const handleClose = useCallback(() => {
    setOptionSelected(null);
  }, []);

  const onSwitchChange = () => {};
  return (
    <>
      <Dropdown
        className="flex justify-end "
        dropdownContainerClassName={`w-18 right-6`}
        MenuButton={<SVG name="common/3dot" width={16} height={16} />}
        options={selectedOptions}
        renderItem={option => (
          <OptionDropdown>
            {option.iconName ? (
              <SVG name={option.iconName} width={18} height={18} />
            ) : (
              <Switch value={buttons.switch?.value} />
            )}
            {option.name}
          </OptionDropdown>
        )}
        onSelect={option => {
          setOptionSelected(option);
        }}
      />
      {buttons.switch && (
        <AlertDialogV2
          loading={loading}
          isOpen={optionSelected?.type === "switch"}
          onClose={() => setOptionSelected(null)}
          title={buttons.switch?.title || ""}
          message={buttons?.switch?.message}
          onConfirm={async () => {
            try {
              setLoading(true);
              await buttons.switch?.onSwitch();
              setLoading(false);
              setOptionSelected(null);
            } catch (error) {
              setOptionSelected(null);
              setLoading(false);
            }
          }}
        />
      )}
      {buttons.restart && (
        <AlertDialogV2
          loading={loading}
          isOpen={optionSelected?.type === "restart"}
          onClose={() => setOptionSelected(null)}
          title={buttons.restart?.title || ""}
          message={buttons?.restart?.message}
          onConfirm={async () => {
            try {
              setLoading(true);
              await buttons.restart?.onRestart();
              setLoading(false);
              setOptionSelected(null);
            } catch (error) {
              setOptionSelected(null);
              setLoading(false);
            }
          }}
        />
      )}
      {optionSelected?.type === "delete" &&
      buttons.delete &&
      buttons.delete.DialogContent ? (
        <buttons.delete.DialogContent onClose={handleClose} />
      ) : (
        <AlertDialogV2
          loading={loading}
          isOpen={optionSelected?.type === "delete"}
          onClose={() => setOptionSelected(null)}
          title={buttons.delete?.title || ""}
          message={buttons?.delete?.message}
          onConfirm={async () => {
            try {
              setLoading(true);
              await buttons.delete?.onDelete?.();
              setLoading(false);
              setOptionSelected(null);
            } catch (error) {
              setOptionSelected(null);
              setLoading(false);
            }
          }}
        />
      )}
      {optionSelected?.type === "edit" && buttons.edit && (
        <buttons.edit.DialogContent onClose={handleClose} />
      )}
      {optionSelected?.type === "config" && buttons.config && (
        <buttons.config.DialogContent onClose={handleClose} />
      )}
      {optionSelected?.type === "volume" && buttons.volume && (
        <buttons.volume.DialogContent onClose={handleClose} />
      )}
      {optionSelected?.type === "info" && buttons.info && (
        <buttons.info.DialogContent onClose={handleClose} />
      )}
      {optionSelected?.type === "update" && buttons.update && (
        <buttons.update.DialogContent onClose={handleClose} />
      )}
    </>
  );
};

export default ActionButtons;
