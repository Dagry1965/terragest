import type {
  ERPAutomation,
} from "./ERPAutomationEngine";

export class ERPAutomationRegistry {

  private static automations:
    ERPAutomation[] = [];

  static register(
    automation: ERPAutomation
  ) {

    this.automations.push(
      automation
    );
  }

  static all() {

    return this.automations;
  }
}