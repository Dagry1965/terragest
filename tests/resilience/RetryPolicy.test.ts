import { RetryPolicy }
from "../../src/runtime/resilience/RetryPolicy";

describe(
  "RetryPolicy",
  () => {

    it(
      "should retry callback",
      async () => {

        const retry =
          new RetryPolicy();

        let count = 0;

        await retry.execute(
          async () => {

            count++;
          }
        );

        expect(
          count
        ).toBe(1);
      }
    );
  }
);
