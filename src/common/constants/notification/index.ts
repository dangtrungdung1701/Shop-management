import { IAppearanceTypes, INotificationPayload } from "typings";

export type INotification = {
  [key in IAppearanceTypes]: string;
};

export const notificationTitle: INotification = {
  error: "Lỗi",
  success: "Thành công",
  warning: "Cảnh báo",
  info: "Thông tin",
};
