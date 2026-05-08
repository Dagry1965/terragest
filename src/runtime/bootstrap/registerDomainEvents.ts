import { EventBus }
from "../events/EventBus";

import {
  MATERIEL_BREAKDOWN_DECLARED
}
from "../../features/materiels/events/MaterielEvents";

export function
registerDomainEvents(
  eventBus: EventBus
) {

  eventBus.on(
    MATERIEL_BREAKDOWN_DECLARED,
    payload => {

      console.log(
        "[Runtime] handling breakdown",
        payload
      );
    }
  );

  console.log(
    "[Runtime] domain events registered"
  );
}
