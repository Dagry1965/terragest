$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {
  $FullPath = Join-Path $ProjectRoot $Path
  $Dir = Split-Path $FullPath -Parent
  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {
    $BackupDir = Join-Path $ProjectRoot "backup\persistence-runtime-enterprise"
    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item -LiteralPath $FullPath -Destination (Join-Path $BackupDir "$SafeName.bak") -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "PERSISTENCE RUNTIME ENTERPRISE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\persistence"
Ensure-Dir "src\runtime\persistence\drivers"
Ensure-Dir "src\runtime\persistence\repositories"
Ensure-Dir "src\runtime\persistence\stores"
Ensure-Dir "src\runtime\persistence\snapshots"
Ensure-Dir "src\components\erp\persistence"

Write-Utf8 "src\runtime\persistence\drivers\ERPPersistenceDriver.ts" @'
export type ERPPersistedRecord<T = unknown> = {
  id: string;
  tenantId: string;
  collection: string;
  data: T;
  createdAt: string;
  updatedAt: string;
};

export type ERPPersistenceDriver = {
  save<T>(
    collection: string,
    record: ERPPersistedRecord<T>
  ): Promise<void>;

  list<T>(
    collection: string,
    tenantId: string
  ): Promise<ERPPersistedRecord<T>[]>;

  get<T>(
    collection: string,
    tenantId: string,
    id: string
  ): Promise<ERPPersistedRecord<T> | undefined>;
};
'@

Write-Utf8 "src\runtime\persistence\drivers\ERPInMemoryPersistenceDriver.ts" @'
import type {
  ERPPersistedRecord,
  ERPPersistenceDriver,
} from "./ERPPersistenceDriver";

class ERPInMemoryPersistenceDriverClass
  implements ERPPersistenceDriver {

  private records:
    ERPPersistedRecord[] = [];

  async save<T>(
    collection: string,
    record: ERPPersistedRecord<T>
  ) {
    const exists =
      this.records.some(
        (item) =>
          item.collection === collection &&
          item.tenantId === record.tenantId &&
          item.id === record.id
      );

    if (exists) {
      this.records =
        this.records.map((item) =>
          item.collection === collection &&
          item.tenantId === record.tenantId &&
          item.id === record.id
            ? record as ERPPersistedRecord
            : item
        );

      return;
    }

    this.records.unshift(
      record as ERPPersistedRecord
    );

    this.records =
      this.records.slice(0, 1000);
  }

  async list<T>(
    collection: string,
    tenantId: string
  ) {
    return this.records.filter(
      (record) =>
        record.collection === collection &&
        record.tenantId === tenantId
    ) as ERPPersistedRecord<T>[];
  }

  async get<T>(
    collection: string,
    tenantId: string,
    id: string
  ) {
    return this.records.find(
      (record) =>
        record.collection === collection &&
        record.tenantId === tenantId &&
        record.id === id
    ) as ERPPersistedRecord<T> | undefined;
  }
}

export const ERPInMemoryPersistenceDriver =
  new ERPInMemoryPersistenceDriverClass();
'@

Write-Utf8 "src\runtime\persistence\repositories\ERPRuntimeRepository.ts" @'
import {
  ERPTenantContext,
} from "@/runtime/tenant";

import {
  ERPInMemoryPersistenceDriver,
} from "../drivers/ERPInMemoryPersistenceDriver";

import type {
  ERPPersistedRecord,
  ERPPersistenceDriver,
} from "../drivers/ERPPersistenceDriver";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export class ERPRuntimeRepository<T = unknown> {
  constructor(
    private readonly collection: string,
    private readonly driver: ERPPersistenceDriver = ERPInMemoryPersistenceDriver
  ) {}

  async save(
    data: T,
    id = createId(this.collection)
  ) {
    const tenant =
      ERPTenantContext.current();

    const now =
      new Date().toISOString();

    const record: ERPPersistedRecord<T> = {
      id,
      tenantId: tenant.id,
      collection: this.collection,
      data,
      createdAt: now,
      updatedAt: now,
    };

    await this.driver.save(
      this.collection,
      record
    );

    return record;
  }

  async list() {
    const tenant =
      ERPTenantContext.current();

    return this.driver.list<T>(
      this.collection,
      tenant.id
    );
  }

  async get(id: string) {
    const tenant =
      ERPTenantContext.current();

    return this.driver.get<T>(
      this.collection,
      tenant.id,
      id
    );
  }
}
'@

Write-Utf8 "src\runtime\persistence\stores\ERPPersistenceCollections.ts" @'
export const ERPPersistenceCollections = {
  events: "runtime_events",
  traces: "runtime_traces",
  alerts: "runtime_alerts",
  workflows: "runtime_workflows",
  queueJobs: "runtime_queue_jobs",
  audit: "runtime_audit",
  securityAudit: "runtime_security_audit",
} as const;
'@

Write-Utf8 "src\runtime\persistence\stores\ERPRuntimePersistenceService.ts" @'
import {
  ERPRuntimeRepository,
} from "../repositories/ERPRuntimeRepository";

import {
  ERPPersistenceCollections,
} from "./ERPPersistenceCollections";

export const ERPRuntimePersistenceService = {
  events:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.events
    ),

  traces:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.traces
    ),

  alerts:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.alerts
    ),

  workflows:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.workflows
    ),

  queueJobs:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.queueJobs
    ),

  audit:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.audit
    ),

  securityAudit:
    new ERPRuntimeRepository(
      ERPPersistenceCollections.securityAudit
    ),
};
'@

Write-Utf8 "src\runtime\persistence\snapshots\ERPPersistenceSnapshot.ts" @'
import {
  ERPRuntimePersistenceService,
} from "../stores/ERPRuntimePersistenceService";

export async function getERPPersistenceSnapshot() {
  const [
    events,
    traces,
    alerts,
    workflows,
    queueJobs,
    audit,
    securityAudit,
  ] = await Promise.all([
    ERPRuntimePersistenceService.events.list(),
    ERPRuntimePersistenceService.traces.list(),
    ERPRuntimePersistenceService.alerts.list(),
    ERPRuntimePersistenceService.workflows.list(),
    ERPRuntimePersistenceService.queueJobs.list(),
    ERPRuntimePersistenceService.audit.list(),
    ERPRuntimePersistenceService.securityAudit.list(),
  ]);

  return {
    events,
    traces,
    alerts,
    workflows,
    queueJobs,
    audit,
    securityAudit,
    total:
      events.length +
      traces.length +
      alerts.length +
      workflows.length +
      queueJobs.length +
      audit.length +
      securityAudit.length,
  };
}
'@

Write-Utf8 "src\runtime\persistence\ERPPersistenceSeed.ts" @'
import {
  ERPRuntimePersistenceService,
} from "./stores/ERPRuntimePersistenceService";

let seeded = false;

export async function seedERPPersistenceRuntime() {
  if (seeded) {
    return;
  }

  seeded = true;

  await ERPRuntimePersistenceService.events.save({
    type: "ENTITY_CREATED",
    module: "materiels",
    actor: "runtime",
  });

  await ERPRuntimePersistenceService.traces.save({
    action: "WORKFLOW_STARTED",
    module: "maintenance",
    status: "success",
  });

  await ERPRuntimePersistenceService.alerts.save({
    title: "Stock faible",
    module: "stocks",
    level: "warning",
  });

  await ERPRuntimePersistenceService.workflows.save({
    workflowKey: "maintenance-critical-flow",
    state: "running",
  });

  await ERPRuntimePersistenceService.queueJobs.save({
    type: "PAYMENT_RETRY",
    module: "paiements",
    status: "completed",
  });

  await ERPRuntimePersistenceService.audit.save({
    module: "contrats",
    action: "export",
    actor: "admin",
  });

  await ERPRuntimePersistenceService.securityAudit.save({
    module: "paiements",
    action: "audit",
    allowed: true,
  });
}
'@

Write-Utf8 "src\runtime\persistence\index.ts" @'
export * from "./drivers/ERPPersistenceDriver";
export * from "./drivers/ERPInMemoryPersistenceDriver";
export * from "./repositories/ERPRuntimeRepository";
export * from "./stores/ERPPersistenceCollections";
export * from "./stores/ERPRuntimePersistenceService";
export * from "./snapshots/ERPPersistenceSnapshot";
export * from "./ERPPersistenceSeed";
'@

Write-Utf8 "src\components\erp\persistence\ERPPersistenceDashboard.tsx" @'
import {
  ERPPageHeader,
  ERPSection,
  ERPStatCard,
} from "@/components/erp/ui";

import {
  getERPPersistenceSnapshot,
  seedERPPersistenceRuntime,
} from "@/runtime/persistence";

export default async function ERPPersistenceDashboard() {
  await seedERPPersistenceRuntime();

  const snapshot =
    await getERPPersistenceSnapshot();

  const cards = [
    ["Events", snapshot.events.length],
    ["Traces", snapshot.traces.length],
    ["Alerts", snapshot.alerts.length],
    ["Workflows", snapshot.workflows.length],
    ["Queue Jobs", snapshot.queueJobs.length],
    ["Audit", snapshot.audit.length],
    ["Security Audit", snapshot.securityAudit.length],
    ["Total", snapshot.total],
  ] as const;

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Persistence"
        title="Persistence Runtime Enterprise"
        description="Repository runtime tenant-aware pour events, traces, alerts, workflows, queue jobs et audit."
      />

      <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
        {cards.map(([label, value]) => (
          <ERPStatCard
            key={label}
            label={label}
            value={value}
            helper="Persisted runtime"
          />
        ))}
      </div>

      <ERPSection>
        <div className="mb-5">
          <h2 className="text-lg font-semibold text-slate-950">
            Collections runtime
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Couche de persistance generique prete pour Firestore ou autre backend.
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200">
          <table className="w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Collection
                </th>
                <th className="px-4 py-3 text-left font-semibold text-slate-600">
                  Records
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 bg-white">
              {cards.map(([label, value]) => (
                <tr key={label}>
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {label}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ERPSection>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\persistence\index.ts" @'
export { default as ERPPersistenceDashboard } from "./ERPPersistenceDashboard";
'@

Write-Utf8 "src\app\(private)\persistence\page.tsx" @'
import {
  ERPPersistenceDashboard,
} from "@/components/erp/persistence";

export default function Page() {
  return <ERPPersistenceDashboard />;
}
'@

Write-Host ""
Write-Host "PERSISTENCE RUNTIME ENTERPRISE INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow