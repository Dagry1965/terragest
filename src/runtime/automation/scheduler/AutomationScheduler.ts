import type {
  Automation
}
from "../types/Automation";

export class AutomationScheduler {

  private automations:
    Automation[] = [];

  register(
    automation: Automation
  ) {

    this.automations.push(
      automation
    );
  }

  getAll() {

    return this.automations;
  }
}