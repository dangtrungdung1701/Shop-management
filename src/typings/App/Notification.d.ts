export type IAppearanceTypes = "error" | "info" | "success" | "warning";

export interface INotificationPayload {
  type: IAppearanceTypes;
  title?: string;
  message: string;
}
