import { state } from "components/StatusTag";

export const IDLE_ID = 0;
export const SCHEDULED_PLAYING_ID = 1;
export const ERROR_ID = 2;
export const EMERGENCY_PLAYING_ID = 3;
export const EMERGENCY_STOPPED_ID = 4;

export interface IStatus {
  id: number;
  label: string;
  activeType: state;
}

export const STATUS: IStatus[] = [
  {
    id: 0,
    label: "Đang nghỉ",
    activeType: "idle",
  },
  {
    id: 1,
    label: "Phát theo lịch",
    activeType: "scheduledPlaying",
  },
  {
    id: 2,
    label: "Đang lỗi",
    activeType: "error",
  },
  {
    id: 3,
    label: "Phát khẩn cấp",
    activeType: "emergencyPlaying",
  },
  {
    id: 4,
    label: "Dừng khẩn cấp",
    activeType: "emergencyStopped",
  },
];
