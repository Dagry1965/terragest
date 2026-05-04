// src/platform/automation/ERPAutomationEngine.ts

import { DomainEvents }
from "@/platform/events/DomainEvents";

export interface ERPAutomation {

  name: string;

  trigger: string;

  run(payload?: unknown): void;
}

class ERPAutomationEngineManager {

  private automations: ERPAutomation[] = [];

  register(
    automation: ERPAutomation
  ) {

    console.log(
      `[AUTOMATION REGISTERED]
       ${automation.name}`
    );

    this.automations.push(
      automation
    );

    DomainEvents.subscribe(
      automation.trigger,
      automation.run
    );
  }

  getAutomations() {

    return this.automations;
  }
}

export const ERPAutomationEngine =
  new ERPAutomationEngineManager();