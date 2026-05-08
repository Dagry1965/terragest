export type ERPCircuitBreakerState =
  | "closed"
  | "open"
  | "half_open";

class ERPCircuitBreakerClass {
  private state: ERPCircuitBreakerState = "closed";
  private failures = 0;
  private threshold = 5;

  recordSuccess() {
    this.failures = 0;
    this.state = "closed";
  }

  recordFailure() {
    this.failures += 1;

    if (this.failures >= this.threshold) {
      this.state = "open";
    }
  }

  currentState() {
    return this.state;
  }

  canExecute() {
    return this.state !== "open";
  }

  reset() {
    this.failures = 0;
    this.state = "closed";
  }
}

export const ERPCircuitBreaker = new ERPCircuitBreakerClass();