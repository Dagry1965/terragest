Write-Host "=== TERRAGEST_V2 - SETUP ERP PERSISTENCE PROVIDER ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "src/core/persistence" | Out-Null

@'
export type RuntimeJob = any;

export type RuntimeEvent = any;

export type RuntimeMetric = any;

export type RuntimeTimelineEntry =
  any;

export type RuntimeTransaction =
  any;

export interface PersistenceProvider {
  saveJob(
    job: RuntimeJob
  ): Promise<void>;

  loadJobs(): Promise<
    RuntimeJob[]
  >;

  saveEvent(
    event: RuntimeEvent
  ): Promise<void>;

  loadEvents(): Promise<
    RuntimeEvent[]
  >;

  saveMetric(
    metric: RuntimeMetric
  ): Promise<void>;

  loadMetrics(): Promise<
    RuntimeMetric[]
  >;

  saveTimelineEntry(
    entry: RuntimeTimelineEntry
  ): Promise<void>;

  loadTimeline(): Promise<
    RuntimeTimelineEntry[]
  >;

  saveTransaction(
    transaction: RuntimeTransaction
  ): Promise<void>;

  loadTransactions(): Promise<
    RuntimeTransaction[]
  >;
}

let provider:
  PersistenceProvider | null =
    null;

export function registerPersistenceProvider(
  persistenceProvider: PersistenceProvider
) {
  provider =
    persistenceProvider;

  console.log(
    "ERP PERSISTENCE PROVIDER REGISTERED"
  );
}

export function getPersistenceProvider() {
  if (!provider) {
    throw new Error(
      "Aucun Persistence Provider enregistré"
    );
  }

  return provider;
}
'@ | Set-Content "src/core/persistence/persistence-provider.ts"

Write-Host "=== ERP PERSISTENCE PROVIDER créé avec succès ===" -ForegroundColor Green