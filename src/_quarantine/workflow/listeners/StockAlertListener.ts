import {
  EventBus,
} from "@/workflow/services/EventBus";

import {
  STOCK_ALERT,
} from "@/workflow/events/ProductEvents";

import {
  NotificationEngine,
} from "@/workflow/notifications/NotificationEngine";

EventBus.on(

  STOCK_ALERT,

  (
    payload
  ) => {

    NotificationEngine.notify(

      "Alerte stock",

      `Stock faible pour ${payload.nom}`
    );
  }
);
