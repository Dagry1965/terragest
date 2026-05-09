import type {
  ERPLevel,
  ERPMessageType,
  ERPStatus,
} from "./ERPRuntimeTypes";

export interface ERPRuntimeEntity {

  id?: string;

  module?: string;

  action?: string;

  actor?: string;

  title?: string;

  message?: string;

  description?: string;

  status?: ERPStatus;

  level?: ERPLevel;

  type?: ERPMessageType;

  metadata?:
    Record<string, unknown>;

  createdAt?: string;

  timestamp?: string;
}