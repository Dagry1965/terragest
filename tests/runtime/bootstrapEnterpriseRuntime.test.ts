import {
  bootstrapEnterpriseRuntime
}
from "../../src/runtime/bootstrap/bootstrapEnterpriseRuntime";

describe(
  "bootstrapEnterpriseRuntime",
  () => {

    it(
      "should initialize runtime",
      async () => {

        const runtime =
          await bootstrapEnterpriseRuntime();

        expect(
          runtime.eventBus
        ).toBeDefined();

        expect(
          runtime.workflowRegistry
        ).toBeDefined();
      }
    );
  }
);
