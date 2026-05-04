import { EventBus }
from "../core/event-bus";

import { WorkflowEngine }
from "../../workflows/engine/workflow-engine";

const eventBus =
  new EventBus();

const workflowEngine =
  new WorkflowEngine();

eventBus.subscribe(

  "payment.validated",

  (event) => {

    workflowEngine.execute(
      event.type
    );
  }
);