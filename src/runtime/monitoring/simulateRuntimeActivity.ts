import {
  ConnectedRuntimeEventPublisher
}
from "./ConnectedRuntimeEventPublisher";

const publisher =
  new ConnectedRuntimeEventPublisher();

publisher.publish(
  "MATERIEL_BREAKDOWN_DECLARED",
  {
    materielId:
      "MAT-001",
  }
);

publisher.publish(
  "WORKFLOW_STARTED",
  {
    workflow:
      "BreakdownFlow",
  }
);

publisher.publish(
  "INTERVENTION_CREATED",
  {
    interventionId:
      "INT-001",
  }
);
