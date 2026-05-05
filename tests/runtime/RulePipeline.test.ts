import { RulePipeline }
from "../../src/runtime/rules/pipelines/RulePipeline";

describe(
  "RulePipeline",
  () => {

    it(
      "should execute pipeline",
      () => {

        const pipeline =
          new RulePipeline();

        const result =
          pipeline.execute({
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
