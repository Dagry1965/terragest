import {
  RuntimeAutomation,
}
from "@/runtime/automation/RuntimeAutomation";

import {
  RuntimeNotificationEngine,
}
from "@/runtime/notifications/RuntimeNotificationEngine";

export const runtimeAutomations:
  RuntimeAutomation[] = [

  // =====================================================
  // STOCK CHECK
  // =====================================================

  {
    id:
      "daily-stock-check",

    name:
      "Daily Stock Check",

    schedule:
      "0 8 * * *",

    enabled:
      true,

    handler:
      async () => {

        console.log(
          "Running stock automation..."
        );

        await RuntimeNotificationEngine
          .notify({

            type:
              "automation",

            module:
              "stocks",

            title:
              "Vérification automatique des stocks",

            message:
              "Analyse automatique des stocks exécutée.",

            severity:
              "info",
          });
      },
  },

  // =====================================================
  // WORKFLOW CHECK
  // =====================================================

  {
    id:
      "workflow-monitoring",

    name:
      "Workflow Monitoring",

    schedule:
      "0 * * * *",

    enabled:
      true,

    handler:
      async () => {

        console.log(
          "Running workflow monitoring..."
        );

        await RuntimeNotificationEngine
          .notify({

            type:
              "automation",

            module:
              "workflow",

            title:
              "Surveillance workflows",

            message:
              "Contrôle automatique des workflows effectué.",

            severity:
              "info",
          });
      },
  },
];
