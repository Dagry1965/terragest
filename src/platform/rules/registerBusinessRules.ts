// src/platform/rules/registerBusinessRules.ts

import { BusinessRulesEngine }
from "@/platform/rules/BusinessRulesEngine";

export function registerBusinessRules() {

  BusinessRulesEngine.register({

    name: "stock-alert-rule",

    event: "stock.created",

    execute(payload) {

      console.log(
        "[RULE] stock alert",
        payload
      );
    }
  });

  BusinessRulesEngine.register({

    name: "maintenance-notification-rule",

    event: "maintenance.created",

    execute(payload) {

      console.log(
        "[RULE] maintenance notification",
        payload
      );
    }
  });

  BusinessRulesEngine.register({

    name: "paiement-facture-rule",

    event: "paiement.created",

    execute(payload) {

      console.log(
        "[RULE] generate facture",
        payload
      );
    }
  });
}