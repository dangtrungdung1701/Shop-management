import { MouseEvent } from "react";
import { IconButtonContainer } from "./styles";
import Tooltip from "designs/Tooltip";

interface IIConButton {
  className?: string;
  tooltip?: string;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
}

const IconButton: React.FC<IIConButton> = props => {
  const { children, className = "", tooltip = "", onClick } = props;

  return (
    <IconButtonContainer className={className} onClick={onClick}>
      <Tooltip text={tooltip}>{children}</Tooltip>
    </IconButtonContainer>
  );
};

export default IconButton;
