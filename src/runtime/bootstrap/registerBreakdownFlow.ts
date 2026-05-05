import { EventBus }
from "../events/EventBus";

import {
  MATERIEL_BREAKDOWN_DECLARED
}
from "../../features/materiels/events/MaterielEvents";

import {
  MaterielBreakdownFlow
}
from "../orchestration/MaterielBreakdownFlow";

export function
registerBreakdownFlow(
  eventBus: EventBus
) {

  const flow =
    new MaterielBreakdownFlow();

  eventBus.on(
    MATERIEL_BREAKDOWN_DECLARED,
    payload => {

      flow.handle(payload);
    }
  );

  console.log(
    "[Runtime] breakdown flow registered"
  );
}
