import { useState } from "react";

import Dialog from "components/Dialog";

import { AlertDialogContainer, Button } from "./styles";

interface IAlertDialogV2Props {
  loading?: boolean;
  isOpen: boolean;
  title: string;
  message?: string;
  onConfirm?: () => void;
  onClose?: () => void;
}

const AlertDialogV2: React.FC<IAlertDialogV2Props> = props => {
  const { title, isOpen, loading, message, onConfirm, onClose } = props;

  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleClose = () => {
    !loading && onClose?.();
  };

  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <AlertDialogContainer>
        <Dialog.Header title={title}></Dialog.Header>
        <Dialog.Content>{message}</Dialog.Content>
        <Dialog.ActionButtons>
          <Button size="sm" variant="secondary" onClick={handleClose}>
            Hủy
          </Button>
          <Button size="sm" loading={loading} onClick={handleConfirm}>
            Đồng ý
          </Button>
        </Dialog.ActionButtons>
      </AlertDialogContainer>
    </Dialog>
  );
};

export default AlertDialogV2;
