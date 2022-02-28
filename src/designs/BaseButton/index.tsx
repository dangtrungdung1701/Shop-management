import { ButtonHTMLAttributes, MouseEvent } from "react";
import { ButtonContainer } from "./styles";
import { useRedirect } from "hooks/useRedirect";

interface IBaseButtonProps extends ButtonHTMLAttributes<any> {
  className?: string;
  to?: string;
}

const BaseButton: React.FC<IBaseButtonProps> = props => {
  const redirect = useRedirect();
  const {
    className = "",
    to,
    children,
    type = "button",
    onClick,
    ...rest
  } = props;

  const wrappedOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (to) redirect(to);
    onClick && onClick(e);
  };

  return (
    <ButtonContainer
      className={className}
      type={type}
      onClick={wrappedOnClick}
      {...rest}
    >
      {children}
    </ButtonContainer>
  );
};

export default BaseButton;
