// src/platform/workflows/ERPWorkflow.ts

import { DomainEvents }
from "@/platform/events/DomainEvents";

export function initializeERPWorkflows() {

  DomainEvents.subscribe(
    "stock.created",
    (payload) => {

      console.log(
        "[WORKFLOW] stock.created",
        payload
      );
    }
  );

  DomainEvents.subscribe(
    "intervention.created",
    (payload) => {

      console.log(
        "[WORKFLOW] intervention.created",
        payload
      );
    }
  );

  DomainEvents.subscribe(
    "paiement.created",
    (payload) => {

      console.log(
        "[WORKFLOW] paiement.created",
        payload
      );
    }
  );
}