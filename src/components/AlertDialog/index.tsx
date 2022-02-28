import { useState } from "react";
import Dialog from "components/Dialog";
import {
  ElementButton,
  AlertDialogContainer,
  Title,
  Message,
  ButtonWrapper,
  Button,
  Content,
} from "./styles";

interface IAlertDialogProps {
  ButtonMenu?: React.ReactElement;
  title: string;
  message?: string;
  onConfirm?: (closeDialog: () => void) => void;
  isDanger?: boolean;
}

const AlertDialog: React.FC<IAlertDialogProps> = props => {
  const { ButtonMenu, title, message, onConfirm, isDanger } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleConfirm = () => {
    setLoading(true);
    onConfirm && onConfirm(handleClose);
  };

  const handleClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setLoading(false);
  };

  return (
    <>
      <ElementButton onClick={handleClick}>{ButtonMenu}</ElementButton>
      <Dialog open={isOpen} onClose={handleClose}>
        <AlertDialogContainer>
          <Content isDanger={isDanger}>
            <Title>{title}</Title>
            <Message>{message}</Message>
          </Content>
          <ButtonWrapper>
            <Button variant="secondary" onClick={handleClose}>
              Hủy
            </Button>
            <Button variant="primary" onClick={handleConfirm} loading={loading}>
              Đồng ý
            </Button>
          </ButtonWrapper>
        </AlertDialogContainer>
      </Dialog>
    </>
  );
};

export default AlertDialog;
