import type {
  RuntimeEvent
}
from "@/runtime/core/types/RuntimeEvent";

export type AutomationContext = {
  event: RuntimeEvent;
  payload?: unknown;
};

export type AutomationAction =
  (
    context: AutomationContext
  ) => void | Promise<void>;

export type Automation = {
  id: string;
  name: string;
  description?: string;
  eventType: string;
  action: AutomationAction;
};