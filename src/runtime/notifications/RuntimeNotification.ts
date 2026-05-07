export interface RuntimeNotification {

  type: string;

  module: string;

  title: string;

  message: string;

  severity?:
    | "info"
    | "warning"
    | "critical";

  createdAt?: any;

  read?: boolean;
}
