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
