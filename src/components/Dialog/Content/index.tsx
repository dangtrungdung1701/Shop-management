import { DialogContentContainer } from "./styles";

interface IDialogContentProps {
  className?: string;
}

const DialogContent: React.FC<IDialogContentProps> = ({
  children,
  className = "",
}) => {
  return (
    <DialogContentContainer className={className}>
      {children}
    </DialogContentContainer>
  );
};

export default DialogContent;
