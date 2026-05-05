import {
  RuntimeRealtimeGateway
}
from "./gateway/RuntimeRealtimeGateway";

const realtime =
  new RuntimeRealtimeGateway();

realtime.publish(
  "MATERIEL_BREAKDOWN_DECLARED",
  {
    severity:
      "HIGH",
  }
);

realtime.publish(
  "WORKFLOW_STARTED",
  {
    workflow:
      "BreakdownFlow",
  }
);

realtime.publish(
  "INTERVENTION_CREATED",
  {
    interventionId:
      "INT-001",
  }
);
