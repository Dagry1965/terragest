import { persistRuntimeEntry } from "@/core/persistence/runtime-persistence";

export type ERPRuntimeEntry = {
  id: string;

  module: string;

  action: string;

  type:
    | "action"
    | "hook"
    | "event"
    | "workflow"
    | "audit"
    | "supervision";

  status:
    | "pending"
    | "success"
    | "warning"
    | "failed";

  timestamp: string;

  entityId?: string;

  message: string;
};

const runtimeTimeline:
  ERPRuntimeEntry[] = [];

export function pushRuntimeEntry(
  entry: Omit<
    ERPRuntimeEntry,
    "id" | "timestamp"
  >
) {
  const runtimeEntry:
    ERPRuntimeEntry = {
      id:
        `RT-${Date.now()}-${Math.random()}`,
      timestamp:
        new Date().toISOString(),
      ...entry,
    };

  runtimeTimeline.unshift(
    runtimeEntry
  );

  console.log(
    "ERP RUNTIME ENTRY",
    runtimeEntry
  );

  persistRuntimeEntry(
    runtimeEntry
  );

  return runtimeEntry;
}

export function getRuntimeTimeline() {
  return runtimeTimeline;
}

export function getModuleTimeline(
  module: string
) {
  return runtimeTimeline.filter(
    (entry) =>
      entry.module === module
  );
}

