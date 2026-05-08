export type ERPDomainEventType =
  | "ENTITY_CREATED"
  | "ENTITY_UPDATED"
  | "ENTITY_DELETED"
  | "WORKFLOW_STARTED"
  | "WORKFLOW_COMPLETED"
  | "AUTOMATION_TRIGGERED"
  | "RULE_TRIGGERED"
  | "ALERT_TRIGGERED";

export type ERPDomainEvent = {
  id: string;

  type: ERPDomainEventType;

  module: string;

  entityId?: string;

  timestamp: string;

  actor?: string;

  payload?: Record<string, unknown>;
};