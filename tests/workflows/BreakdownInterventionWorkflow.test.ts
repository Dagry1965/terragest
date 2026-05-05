import {
  BreakdownInterventionWorkflow
}
from "../../src/features/interventions/workflows/BreakdownInterventionWorkflow";

describe(
  "BreakdownInterventionWorkflow",
  () => {

    it(
      "should create intervention",
      async () => {

        const workflow =
          new BreakdownInterventionWorkflow();

        const result =
          await workflow.execute({
            materielId:
              "MAT-001",
          });

        expect(
          result
        ).toBeDefined();
      }
    );
  }
);
