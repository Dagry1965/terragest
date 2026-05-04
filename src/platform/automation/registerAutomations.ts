// src/platform/automation/registerAutomations.ts

import { ERPAutomationEngine }
from "@/platform/automation/ERPAutomationEngine";

export function registerERPAutomations() {

  ERPAutomationEngine.register({

    name: "auto-stock-alert",

    trigger: "stock.created",

    run(payload) {

      console.log(
        "[AUTOMATION] stock alert triggered",
        payload
      );
    }
  });

  ERPAutomationEngine.register({

    name: "auto-generate-facture",

    trigger: "paiement.created",

    run(payload) {

      console.log(
        "[AUTOMATION] generate facture",
        payload
      );
    }
  });

  ERPAutomationEngine.register({

    name: "auto-maintenance-reminder",

    trigger: "maintenance.created",

    run(payload) {

      console.log(
        "[AUTOMATION] maintenance reminder",
        payload
      );
    }
  });
}