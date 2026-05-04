// src/platform/resilience/RetryPolicy.ts

export class RetryPolicy {

  static async execute(

    operation: () => Promise<void>,

    retries = 3
  ) {

    let attempt = 0;

    while (attempt < retries) {

      try {

        await operation();

        return;

      } catch (error) {

        attempt++;

        console.error(
          `[RETRY]
           attempt ${attempt}`,
          error
        );

        if (attempt >= retries) {

          throw error;
        }
      }
    }
  }
}