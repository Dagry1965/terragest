export class RetryPolicy {

  execute(
    action: () => void,
    retries: number = 3
  ) {

    for (
      let index = 0;
      index < retries;
      index++
    ) {

      try {

        action();

        return;

      } catch (error) {

        console.error(
          "[RETRY ERROR]",
          error
        );
      }
    }

    console.error(
      "[RETRY FAILED]"
    );
  }
}
