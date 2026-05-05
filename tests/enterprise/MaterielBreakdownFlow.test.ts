import {
  MaterielBreakdownFlow
}
from "../../src/runtime/orchestration/MaterielBreakdownFlow";

describe(
  "MaterielBreakdownFlow",
  () => {

    it(
      "should execute flow",
      async () => {

        const flow =
          new MaterielBreakdownFlow();

        const result =
          await flow.handle({
            severity:
              "HIGH",
          });

        expect(
          result
        ).toBeDefined();
      }
    );
  }
);
