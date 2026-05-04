// src/platform/circuit-breaker/CircuitBreaker.ts

export class CircuitBreaker {

  private failures = 0;

  private opened = false;

  constructor(
    private readonly threshold = 3
  ) {}

  async execute(
    operation: () => Promise<void>
  ) {

    if (this.opened) {

      console.warn(
        "[CIRCUIT BREAKER] OPEN"
      );

      return;
    }

    try {

      await operation();

      this.failures = 0;

    } catch (error) {

      this.failures++;

      console.error(
        "[CIRCUIT BREAKER] failure",
        this.failures,
        error
      );

      if (
        this.failures >= this.threshold
      ) {

        this.opened = true;

        console.error(
          "[CIRCUIT BREAKER] TRIPPED"
        );
      }

      throw error;
    }
  }

  reset() {

    this.failures = 0;

    this.opened = false;
  }

  isOpen(): boolean {

    return this.opened;
  }

  getFailures(): number {

    return this.failures;
  }
}