// src/platform/workflows/ERPNotifications.ts

import { DomainEvents }
from "@/platform/events/DomainEvents";

import { NotificationBus }
from "@/platform/notifications/NotificationBus";

export function initializeERPNotifications() {

  DomainEvents.subscribe(
    "maintenance.created",
    () => {

      NotificationBus.info(
        "Nouvelle maintenance enregistrée"
      );
    }
  );

  DomainEvents.subscribe(
    "paiement.created",
    () => {

      NotificationBus.success(
        "Paiement enregistré"
      );
    }
  );

  DomainEvents.subscribe(
    "stock.created",
    () => {

      NotificationBus.success(
        "Mouvement de stock enregistré"
      );
    }
  );
}