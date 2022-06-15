import {
  ButtonHTMLAttributes,
  isValidElement,
  MouseEvent,
  ReactNode,
} from "react";

import { useRedirect } from "hooks/useRedirect";

import { ButtonContainer, Spinner } from "./styles";

export type IButtonVariant =
  | "primary"
  | "secondary"
  | "link"
  | "third"
  | "black-secondary"
  | "convex-second"
  | "danger"
  | "blue";
export type IButtonSize = "sm" | "md" | "lg";

interface IButtonProps extends ButtonHTMLAttributes<any> {
  className?: string;
  icon?: ReactNode;
  rightIcon?: ReactNode;
  size?: IButtonSize;
  variant?: IButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  to?: string;
}

const Button: React.FC<IButtonProps> = props => {
  const redirect = useRedirect();
  let {
    className = "",
    size = "md",
    icon = null,
    rightIcon = null,
    variant = "primary",
    disabled = false,
    loading = false,
    children,
    type = "button",
    to,
    onClick,
    ...rest
  } = props;

  if (!isValidElement(icon)) icon = null;
  if (!isValidElement(rightIcon)) rightIcon = null;

  const wrappedOnClick = (e: MouseEvent<HTMLButtonElement>) => {
    if (to) redirect(to);
    onClick && onClick(e);
  };

  return (
    <ButtonContainer
      className={className}
      disabled={disabled}
      loading={loading}
      size={size}
      variant={variant}
      type={type}
      onClick={wrappedOnClick}
      {...rest}
    >
      {loading ? <Spinner /> : icon}
      {children}
      {rightIcon}
    </ButtonContainer>
  );
};

export default Button;
