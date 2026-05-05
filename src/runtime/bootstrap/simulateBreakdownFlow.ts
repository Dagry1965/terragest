import {
  bootstrapEnterpriseRuntime
}
from "./bootstrapEnterpriseRuntime";

import {
  registerBreakdownFlow
}
from "./registerBreakdownFlow";

import {
  MATERIEL_BREAKDOWN_DECLARED
}
from "../../features/materiels/events/MaterielEvents";

async function simulate() {

  const runtime =
    await bootstrapEnterpriseRuntime();

  registerBreakdownFlow(
    runtime.eventBus
  );

  runtime.eventBus.emit(
    MATERIEL_BREAKDOWN_DECLARED,
    {
      materielId: "MAT-001",
      severity: "HIGH",
      exploitationId: "EXP-001",
    }
  );
}

simulate();
