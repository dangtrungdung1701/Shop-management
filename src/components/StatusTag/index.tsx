import {
  EMERGENCY_PLAYING_ID,
  EMERGENCY_STOPPED_ID,
  ERROR_ID,
  IDLE_ID,
  SCHEDULED_PLAYING_ID,
  STATUS,
} from "common/constants/device";

import { StatusTagContainer } from "./styles";

interface IStatusTagProps {
  className?: string;
  statusId: number;
}

export type state =
  | "idle"
  | "scheduledPlaying"
  | "error"
  | "emergencyPlaying"
  | "emergencyStopped";

const StatusTag: React.FC<IStatusTagProps> = props => {
  const { className = "", statusId } = props;
  const getStatusFromStatusId = () => {
    switch (statusId) {
      case IDLE_ID:
        return {
          activeType: STATUS[IDLE_ID].activeType,
          label: STATUS[IDLE_ID].label,
        };
      case SCHEDULED_PLAYING_ID:
        return {
          activeType: STATUS[SCHEDULED_PLAYING_ID].activeType,

          label: STATUS[SCHEDULED_PLAYING_ID].label,
        };
      case ERROR_ID:
        return {
          activeType: STATUS[ERROR_ID].activeType,

          label: STATUS[ERROR_ID].label,
        };
      case EMERGENCY_PLAYING_ID:
        return {
          activeType: STATUS[EMERGENCY_PLAYING_ID].activeType,

          label: STATUS[EMERGENCY_PLAYING_ID].label,
        };
      case EMERGENCY_STOPPED_ID:
        return {
          activeType: STATUS[EMERGENCY_STOPPED_ID].activeType,

          label: STATUS[EMERGENCY_STOPPED_ID].label,
        };

      default:
        return {
          activeType: STATUS[IDLE_ID].activeType,
          label: STATUS[0].label,
        };
    }
  };
  return (
    <StatusTagContainer
      className={className}
      active={getStatusFromStatusId().activeType}
    >
      {getStatusFromStatusId().label}
    </StatusTagContainer>
  );
};

export default StatusTag;
