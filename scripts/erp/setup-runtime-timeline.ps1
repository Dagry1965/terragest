Write-Host "=== TERRAGEST_V2 - SETUP ERP RUNTIME TIMELINE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/runtime" | Out-Null

@'
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
'@ | Set-Content "src/core/runtime/runtime-timeline.ts"

Write-Host "=== ERP RUNTIME TIMELINE créée avec succès ===" -ForegroundColor Green