import { TooltipContainer, TooltipText } from "./styles";

interface ITooltipProps {
  text: string;
  className?: string;
}

const Tooltip: React.FC<ITooltipProps> = ({
  className,
  children,
  text = "",
}) => {
  return (
    <TooltipContainer className={`group ${className}`}>
      {children}
      {text && (
        <TooltipText className="tooltip-text move-center-x">{text}</TooltipText>
      )}
    </TooltipContainer>
  );
};

export default Tooltip;
