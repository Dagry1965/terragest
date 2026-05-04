import { EventBus } from "../events/core/event-bus";

import { WorkflowEngine } from "../workflows/engine/workflow-engine";

const eventBus =
  new EventBus();

const workflowEngine =
  new WorkflowEngine();

workflowEngine.register({

  name: "payment.workflow",

  trigger: "payment.validated",
});

eventBus.subscribe(

  "payment.validated",

  (event) => {

    workflowEngine.execute(
      event.type
    );
  }
);

eventBus.publish({

  type: "payment.validated",

  timestamp: new Date(),
});