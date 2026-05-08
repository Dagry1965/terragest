import type {
  ERPAutomationExecution,
} from "./ERPAutomationExecution";

class ERPAutomationTimelineStoreClass {

  private executions:
    ERPAutomationExecution[] = [];

  add(
    execution: ERPAutomationExecution
  ) {

    this.executions.unshift(
      execution
    );

    this.executions =
      this.executions.slice(0, 200);
  }

  all() {

    return this.executions;
  }
}

export const ERPAutomationTimelineStore =
  new ERPAutomationTimelineStoreClass();