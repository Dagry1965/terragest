export type EnterpriseRuntimeLifecycleStep =
  | "bootstrap"
  | "modules"
  | "data"
  | "security"
  | "workflow"
  | "automation"
  | "events"
  | "intelligence"
  | "ready";

export class EnterpriseRuntimeLifecycle {
  static steps(): {
    key: EnterpriseRuntimeLifecycleStep;
    label: string;
    completed: boolean;
  }[] {
    return [
      { key: "bootstrap", label: "Bootstrap runtime", completed: true },
      { key: "modules", label: "Modules ERP", completed: true },
      { key: "data", label: "Data binding", completed: true },
      { key: "security", label: "Security runtime", completed: true },
      { key: "workflow", label: "Workflow runtime", completed: true },
      { key: "automation", label: "Automation runtime", completed: true },
      { key: "events", label: "Event runtime", completed: true },
      { key: "intelligence", label: "Smart intelligence", completed: true },
      { key: "ready", label: "Enterprise ready", completed: false },
    ];
  }
}