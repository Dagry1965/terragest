// src/platform/workflows/ERPAudit.ts

import { DomainEvents }
from "@/platform/events/DomainEvents";

import { AuditTrail }
from "@/platform/audit/AuditTrail";

export function initializeERPAudit() {

  const events = [

    "stock.created",
    "intervention.created",
    "maintenance.created",
    "paiement.created",
    "contrat.created"
  ];

  for (const event of events) {

    DomainEvents.subscribe(
      event,
      (payload) => {

        AuditTrail.log(
          event,
          payload
        );
      }
    );
  }
}