import {
  EventBus,
} from "@/workflow/services/EventBus";

import {
  PRODUCT_CREATED,
} from "@/workflow/events/ProductEvents";

import {
  NotificationEngine,
} from "@/workflow/notifications/NotificationEngine";

EventBus.on(

  PRODUCT_CREATED,

  (
    payload
  ) => {

    NotificationEngine.notify(

      "Produit créé",

      `Nouveau produit: ${payload.nom}`
    );
  }
);
