import { StatusTagContainer } from "./styles";

interface IStatusTagProps {
  className?: string;
  active: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
}

const StatusTag: React.FC<IStatusTagProps> = props => {
  const { className = "", active, activeLabel, inactiveLabel } = props;
  return (
    <StatusTagContainer className={className} active={active}>
      {active ? activeLabel : inactiveLabel}
    </StatusTagContainer>
  );
};

export default StatusTag;
