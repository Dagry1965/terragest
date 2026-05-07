import {
  runtimeAutomations,
}
from "@/runtime/automation/runtimeAutomations";

export class RuntimeAutomationEngine {

  static async runAll() {

    for (
      const automation of
      runtimeAutomations
    ) {

      if (
        automation.enabled ===
        false
      ) {

        continue;
      }

      try {

        console.log(
          "Running automation",
          automation.id
        );

        await automation.handler();

      } catch (error) {

        console.error(
          "Automation error",
          automation.id,
          error
        );
      }
    }
  }
}
