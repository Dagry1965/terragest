import type { WorkflowRuntimeInstance } from "./WorkflowRuntimeTypes";

export class WorkflowRuntimeAudit {
  static log(instance: WorkflowRuntimeInstance, label: string) {
    console.log("WORKFLOW AUDIT", {
      workflow: instance.workflowKey,
      recordId: instance.recordId,
      step: instance.currentStep,
      label,
      date: new Date().toISOString(),
    });
  }
}