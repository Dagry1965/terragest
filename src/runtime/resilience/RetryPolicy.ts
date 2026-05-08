export class RetryPolicy {

  async execute(
    callback: () => Promise<void>,
    retries = 3
  ) {

    let attempt = 0;

    while (attempt < retries) {

      try {

        await callback();

        return;
      }
      catch (error) {

        attempt++;

        console.error(
          "[RetryPolicy]",
          error
        );

        if (attempt >= retries) {
          throw error;
        }
      }
    }
  }
}
