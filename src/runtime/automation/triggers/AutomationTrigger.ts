import type {
  RuntimeEvent
}
from "@/runtime/core/types/RuntimeEvent";

import type {
  Automation
}
from "../types/Automation";

export class AutomationTrigger {

  matches(
    automation: Automation,
    event: RuntimeEvent
  ) {

    return automation.eventType === event.type;
  }
}