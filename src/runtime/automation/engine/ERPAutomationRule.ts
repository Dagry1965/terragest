import type {
  ERPDomainEventType,
} from "@/runtime/events/ERPDomainEvent";

export type ERPAutomationActionType =
  | "NOTIFY"
  | "ALERT"
  | "WORKFLOW"
  | "AUDIT"
  | "WEBHOOK";

export type ERPAutomationRule = {

  id: string;

  module: string;

  trigger: ERPDomainEventType;

  action: ERPAutomationActionType;

  description?: string;
};