export interface ERPAutomation {

  id: string;

  module: string;

  trigger: string;

  action: (
    data: Record<string, unknown>
  ) => void;
}

export class ERPAutomationEngine {

  private automations:
    ERPAutomation[] = [];

  registerAutomation(
    automation: ERPAutomation
  ) {

    this.automations.push(
      automation
    );
  }

  execute(
    module: string,
    trigger: string,
    data: Record<string, unknown>
  ) {

    this.automations
      .filter(
        automation =>
          automation.module === module
          && automation.trigger === trigger
      )
      .forEach(
        automation =>
          automation.action(data)
      );
  }
}

export const erpAutomationEngine =
  new ERPAutomationEngine();
