import { WorkflowRegistry }
from "../registry/WorkflowRegistry";

import { EventBus }
from "../events/EventBus";

import {
  registerMaterielWorkflows
}
from "./registerMaterielWorkflows";

import {
  registerDomainEvents
}
from "./registerDomainEvents";

export async function
initializeRuntime() {

  const registry =
    new WorkflowRegistry();

  const eventBus =
    new EventBus();

  registerMaterielWorkflows(
    registry
  );

  registerDomainEvents(
    eventBus
  );

  console.log(
    "[Runtime] fully initialized"
  );

  return {
    registry,
    eventBus,
  };
}
