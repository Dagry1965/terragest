import {
  PersistentMaterielBreakdownFlow
}
from "./PersistentMaterielBreakdownFlow";

async function simulate() {

  const flow =
    new PersistentMaterielBreakdownFlow();

  await flow.execute({
    materielId:
      "MAT-001",

    severity:
      "HIGH",

    exploitationId:
      "EXP-001",
  });
}

simulate();
