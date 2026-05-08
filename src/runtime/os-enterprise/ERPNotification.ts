export type ERPNotificationLevel =
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface ERPNotification {
  id: string;
  title: string;
  message: string;
  level: ERPNotificationLevel;
  time: string;
}