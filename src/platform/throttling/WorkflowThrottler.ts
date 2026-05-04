// src/platform/throttling/WorkflowThrottler.ts

class WorkflowThrottlerManager {

  private activeExecutions = 0;

  private readonly maxExecutions = 5;

  canExecute(): boolean {

    return (
      this.activeExecutions
      < this.maxExecutions
    );
  }

  startExecution() {

    this.activeExecutions++;

    console.log(
      "[THROTTLER] active",
      this.activeExecutions
    );
  }

  finishExecution() {

    if (
      this.activeExecutions > 0
    ) {

      this.activeExecutions--;
    }

    console.log(
      "[THROTTLER] active",
      this.activeExecutions
    );
  }

  getStatus() {

    return {

      active:
        this.activeExecutions,

      max:
        this.maxExecutions
    };
  }
}

export const WorkflowThrottler =
  new WorkflowThrottlerManager();