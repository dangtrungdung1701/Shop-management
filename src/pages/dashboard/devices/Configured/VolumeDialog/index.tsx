import { useState } from "react";

import DialogHeader from "components/Dialog/Header";
import Dialog from "components/Dialog";

import VolumeSlider from "designs/Slider";

import { IConfiguredDevice, IVolumeDeviceInput } from "typings";

import {
  ButtonWrapper,
  Button,
  ElementWrapper,
  VolumeDialogContainer,
} from "./styles";

type IDialogProps = {
  editField?: IConfiguredDevice;
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
}) => {
  const [isOpen, setOpen] = useState(open);
  const [loading, setLoading] = useState(false);

  const [volume, setVolume] = useState<number | number[]>();

  const handleSubmit = async () => {
    const input: IVolumeDeviceInput = {
      volume,
    };
    console.log(input);
    handleCloseDialog();
    // try {
    //   if () {
    //     setLoading(true);
    //     const payload: IUpdateDistrict = {
    //       id: ?._id!,
    //       categoryInput: input,
    //     };
    //     await updateCategoryAPI(payload);
    //     onSuccess?.();
    //     setLoading(false);
    //     handleCloseDialog();
    //     return;
    //   }
    //   setLoading(true);
    //   const payload: ICreateDistrict = {
    //     categoryInput: input,
    //   };
    //   await createCategoryAPI(payload);
    //   onSuccess?.();
    //   setLoading(false);
    //   handleCloseDialog();
    // } catch (err) {
    //   setLoading(false);
    //   handleCloseDialog();
    // }
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
            initValue={20}
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
