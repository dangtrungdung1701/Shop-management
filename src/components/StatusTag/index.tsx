import { ACTIVE_ID, INACTIVE_ID } from "common/constants/device";
import { StatusTagContainer } from "./styles";

interface IStatusTagProps {
  className?: string;
  active: number;
  activeLabel?: string;
  inactiveLabel?: string;
  errorLabel?: string;
}

const StatusTag: React.FC<IStatusTagProps> = props => {
  const {
    className = "",
    active,
    activeLabel = "Đang phát",
    inactiveLabel = "Đang nghỉ",
    errorLabel = "Bị lỗi",
  } = props;
  return (
    <StatusTagContainer className={className} active={active}>
      {active === ACTIVE_ID
        ? activeLabel
        : active === INACTIVE_ID
        ? inactiveLabel
        : errorLabel}
    </StatusTagContainer>
  );
};

export default StatusTag;
