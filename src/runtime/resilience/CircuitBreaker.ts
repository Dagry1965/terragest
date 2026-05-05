export class CircuitBreaker {

  private failures = 0;

  private threshold = 5;

  private opened = false;

  async execute(
    callback: () => Promise<void>
  ) {

    if (this.opened) {

      throw new Error(
        "Circuit breaker opened"
      );
    }

    try {

      await callback();

      this.failures = 0;
    }
    catch (error) {

      this.failures++;

      if (
        this.failures >= this.threshold
      ) {

        this.opened = true;
      }

      throw error;
    }
  }
}
