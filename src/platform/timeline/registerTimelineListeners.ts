// src/platform/timeline/registerTimelineListeners.ts

import { DomainEvents }
from "@/platform/events/DomainEvents";

import { ERPTimeline }
from "@/platform/timeline/ERPTimeline";

export function registerTimelineListeners() {

  DomainEvents.subscribe(
    "stock.created",
    (payload) => {

      ERPTimeline.add({

        entity: "stock",

        action: "stock.created",

        payload,

        timestamp: new Date()
      });
    }
  );

  DomainEvents.subscribe(
    "paiement.created",
    (payload) => {

      ERPTimeline.add({

        entity: "paiement",

        action: "paiement.created",

        payload,

        timestamp: new Date()
      });
    }
  );

  DomainEvents.subscribe(
    "maintenance.created",
    (payload) => {

      ERPTimeline.add({

        entity: "maintenance",

        action: "maintenance.created",

        payload,

        timestamp: new Date()
      });
    }
  );
}