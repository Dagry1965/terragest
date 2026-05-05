import { WorkflowRegistry }
from "../registry/WorkflowRegistry";

import { EventBus }
from "../events/EventBus";

export async function
bootstrapRuntime() {

  const registry =
    new WorkflowRegistry();

  const eventBus =
    new EventBus();

  console.log(
    "[Runtime] initialized"
  );

  return {
    registry,
    eventBus,
  };
}
