Write-Host "=== TERRAGEST_V2 - SETUP RUNTIME PERSISTENCE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/persistence" | Out-Null

@'
import {
  ERPRuntimeEntry,
} from "@/core/runtime/runtime-timeline";

const persistedRuntime:
  ERPRuntimeEntry[] = [];

export async function persistRuntimeEntry(
  entry: ERPRuntimeEntry
) {
  persistedRuntime.unshift(entry);

  console.log(
    "ERP RUNTIME PERSISTED",
    entry
  );

  return entry;
}

export async function getPersistedRuntime() {
  return persistedRuntime;
}

export async function getPersistedModuleRuntime(
  module: string
) {
  return persistedRuntime.filter(
    (entry) =>
      entry.module === module
  );
}
'@ | Set-Content "src/core/persistence/runtime-persistence.ts"

Write-Host "=== RUNTIME PERSISTENCE créée avec succès ===" -ForegroundColor Green