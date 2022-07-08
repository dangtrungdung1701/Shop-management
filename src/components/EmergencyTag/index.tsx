import { useEffect, useState } from "react";
import { StatusTagContainer } from "./styles";

enum MediaStatus {
  Broadcasting = 1,
  Ended = 2,
  Canceled = 3,
}

interface IStatusTagProps {
  className?: string;
  active: number;
}

const EmergencyTag: React.FC<IStatusTagProps> = props => {
  const { className = "", active } = props;

  const [label, setLabel] = useState("");

  useEffect(() => {
    handleDeviceStatus();
  }, [active]);

  const handleDeviceStatus = () => {
    switch (true) {
      case active === MediaStatus.Broadcasting:
        setLabel("Đang phát");
        break;
      case active === MediaStatus.Ended:
        setLabel("Đã phát");
        break;
      case active === MediaStatus.Canceled:
        setLabel("Đã hủy");
        break;
      default:
        setLabel("Đã hủy");
        break;
    }
  };

  return (
    <StatusTagContainer className={className} active={active}>
      {label}
    </StatusTagContainer>
  );
};

export default EmergencyTag;
