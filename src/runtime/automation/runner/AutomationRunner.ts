
import type {
  RuntimeEvent
}
from "@/runtime/core/types/RuntimeEvent";

import type {
  Automation
}
from "../types/Automation";

import {
  AutomationTrigger
}
from "../triggers/AutomationTrigger";

export class AutomationRunner {

  private trigger =
    new AutomationTrigger();

  async run(
    automations: Automation[],
    event: RuntimeEvent
  ) {

    for (const automation of automations) {

      const matches =
        this.trigger.matches(
          automation,
          event
        );

      if (!matches) {
        continue;
      }

      console.log(
        `[Automation Triggered] ${automation.name}`
      );

      await automation.action({
        event,
        payload:
          event.payload,
      });
    }
  }
}