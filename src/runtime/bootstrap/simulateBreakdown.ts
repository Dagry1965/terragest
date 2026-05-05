import { initializeRuntime }
from "./initializeRuntime";

import {
  MATERIEL_BREAKDOWN_DECLARED
}
from "../../features/materiels/events/MaterielEvents";

async function simulate() {

  const runtime =
    await initializeRuntime();

  runtime.eventBus.emit(
    MATERIEL_BREAKDOWN_DECLARED,
    {
      materielId: "MAT-001",
      severity: "HIGH",
    }
  );
}

simulate();
