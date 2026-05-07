import {
  RuntimeAutomationEngine,
}
from "@/runtime/automation/RuntimeAutomationEngine";

export class RuntimeScheduler {

  private static started =
    false;

  static start() {

    if (
      this.started
    ) {

      return;
    }

    this.started = true;

    console.log(
      "ERP Runtime Scheduler started"
    );

    // =====================================================
    // EVERY 60 SECONDS
    // =====================================================

    setInterval(
      async () => {

        console.log(
          "Scheduler tick..."
        );

        await RuntimeAutomationEngine
          .runAll();

      },

      60 * 1000
    );
  }
}
