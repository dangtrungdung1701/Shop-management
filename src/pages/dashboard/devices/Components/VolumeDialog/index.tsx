import { useState } from "react";
import { toast } from "react-toastify";

import axiosClient from "common/utils/api";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import VolumeSlider from "designs/Slider";

import { IDevice, IVolumeDeviceInput } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  VolumeDialogContainer,
} from "./styles";

type IDialogProps = {
  editField?: IDevice;
  onClose?: () => void;
  onSuccess?: () => void;
} & (
  | {
      ButtonMenu: React.ReactElement;
      readonly open?: boolean;
    }
  | {
      readonly ButtonMenu?: React.ReactElement;
      open: boolean;
    }
);

const VolumeDialog: React.FC<IDialogProps> = ({
  open = false,
  ButtonMenu,
  onClose,
  onSuccess,
  editField,
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [volume, setVolume] = useState(editField?.volume || 0);

  const handleSubmit = async () => {
    const input: IVolumeDeviceInput = {
      volume,
    };
    try {
      const res = await axiosClient.put(`/Device/${editField?.id}`, input);
      if (res) {
        onSuccess?.();
        setLoading(false);
        handleCloseDialog();
        toast.dark("Cập nhật âm lượng thành công !", {
          type: toast.TYPE.SUCCESS,
        });
      }
    } catch (err) {
      setLoading(false);
      handleCloseDialog();
      toast.dark("Cập nhật âm lượng không thành công !", {
        type: toast.TYPE.ERROR,
      });
    }
  };

  const handleCloseDialog = () => {
    setOpen(false);
    onClose?.();
  };

  return (
    <>
      <ElementWrapper onClick={() => setOpen(true)}>
        {ButtonMenu}
      </ElementWrapper>
      <Dialog open={isOpen} onClose={handleCloseDialog} size="md">
        <VolumeDialogContainer>
          <DialogHeader title="Điều chỉnh âm lượng" />
          <VolumeSlider
            title="Âm lượng"
            initValue={volume}
            onChange={value => setVolume(value)}
          />
          <ButtonWrapper>
            <Button
              type="button"
              variant="secondary"
              onClick={handleCloseDialog}
            >
              Hủy
            </Button>
            <Button loading={loading} onClick={handleSubmit}>
              Lưu
            </Button>
          </ButtonWrapper>
        </VolumeDialogContainer>
      </Dialog>
    </>
  );
};

export default VolumeDialog;
