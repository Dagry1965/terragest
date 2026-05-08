$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {
  if (!(Test-Path -LiteralPath $Path)) {
    New-Item -ItemType Directory -Path $Path -Force | Out-Null
  }
}

function Write-Utf8($Path, $Content) {

  $FullPath =
    Join-Path $ProjectRoot $Path

  $Dir =
    Split-Path $FullPath -Parent

  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {

    $BackupDir =
      Join-Path `
        $ProjectRoot `
        "backup\distributed-workers"

    Ensure-Dir $BackupDir

    $SafeName = $Path
    $SafeName = $SafeName.Replace("\", "__")
    $SafeName = $SafeName.Replace("/", "__")
    $SafeName = $SafeName.Replace(":", "")

    Copy-Item `
      -LiteralPath $FullPath `
      -Destination (
        Join-Path `
          $BackupDir `
          "$SafeName.bak"
      ) `
      -Force
  }

  [System.IO.File]::WriteAllText(
    $FullPath,
    $Content,
    [System.Text.UTF8Encoding]::new($false)
  )

  Write-Host "WRITTEN: $Path" -ForegroundColor Green
}

Write-Host ""
Write-Host "DISTRIBUTED WORKERS + SCHEDULER ENGINE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\workers"
Ensure-Dir "src\runtime\workers\engine"
Ensure-Dir "src\runtime\workers\scheduler"
Ensure-Dir "src\runtime\workers\registry"
Ensure-Dir "src\runtime\workers\history"
Ensure-Dir "src\runtime\workers\metrics"
Ensure-Dir "src\components\erp\workers"

Write-Utf8 "src\runtime\workers\engine\ERPWorkerTypes.ts" @'
export type ERPWorkerStatus =
  | "idle"
  | "running"
  | "paused"
  | "offline";

export type ERPWorkerJobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed";

export type ERPWorker = {
  id: string;
  label: string;
  queue: string;
  status: ERPWorkerStatus;
  concurrency: number;
  updatedAt: string;
};

export type ERPWorkerJob = {
  id: string;
  workerId: string;
  module: string;
  type: string;
  status: ERPWorkerJobStatus;
  startedAt?: string;
  completedAt?: string;
  createdAt: string;
};

export type ERPScheduledTask = {
  id: string;
  label: string;
  module: string;
  cron: string;
  enabled: boolean;
  nextRun: string;
};
'@

Write-Utf8 "src\runtime\workers\registry\ERPWorkerRegistry.ts" @'
import type {
  ERPWorker,
} from "../engine/ERPWorkerTypes";

export const ERPWorkerRegistry: ERPWorker[] = [
  {
    id: "worker_runtime_1",
    label: "Runtime Worker 1",
    queue: "runtime",
    status: "running",
    concurrency: 5,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "worker_automation_1",
    label: "Automation Worker",
    queue: "automation",
    status: "running",
    concurrency: 3,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "worker_reporting_1",
    label: "Reporting Worker",
    queue: "reporting",
    status: "idle",
    concurrency: 2,
    updatedAt: new Date().toISOString(),
  },
];
'@

Write-Utf8 "src\runtime\workers\scheduler\ERPSchedulerRegistry.ts" @'
import type {
  ERPScheduledTask,
} from "../engine/ERPWorkerTypes";

export const ERPSchedulerRegistry: ERPScheduledTask[] = [
  {
    id: "task_stock_sync",
    label: "Synchronisation stock",
    module: "stocks",
    cron: "*/15 * * * *",
    enabled: true,
    nextRun: new Date().toISOString(),
  },

  {
    id: "task_payment_retry",
    label: "Retry paiements",
    module: "paiements",
    cron: "*/5 * * * *",
    enabled: true,
    nextRun: new Date().toISOString(),
  },

  {
    id: "task_reporting",
    label: "Generation reporting",
    module: "reporting",
    cron: "0 * * * *",
    enabled: true,
    nextRun: new Date().toISOString(),
  },
];
'@

Write-Utf8 "src\runtime\workers\history\ERPWorkerHistoryStore.ts" @'
import type {
  ERPWorkerJob,
} from "../engine/ERPWorkerTypes";

class ERPWorkerHistoryStoreClass {

  private jobs:
    ERPWorkerJob[] = [];

  add(
    job: ERPWorkerJob
  ) {

    this.jobs.unshift(job);

    this.jobs =
      this.jobs.slice(0, 300);
  }

  all() {

    return this.jobs;
  }

  completed() {

    return this.jobs.filter(
      (job) =>
        job.status === "completed"
    );
  }

  failed() {

    return this.jobs.filter(
      (job) =>
        job.status === "failed"
    );
  }
}

export const ERPWorkerHistoryStore =
  new ERPWorkerHistoryStoreClass();
'@

Write-Utf8 "src\runtime\workers\metrics\ERPWorkerMetricsStore.ts" @'
export type ERPWorkerMetrics = {
  activeWorkers: number;
  runningJobs: number;
  completedJobs: number;
  failedJobs: number;
  scheduledTasks: number;
};

let metrics: ERPWorkerMetrics = {
  activeWorkers: 0,
  runningJobs: 0,
  completedJobs: 0,
  failedJobs: 0,
  scheduledTasks: 0,
};

export const ERPWorkerMetricsStore = {

  set(
    next: ERPWorkerMetrics
  ) {

    metrics = next;
  },

  get() {

    return metrics;
  },
};
'@

Write-Utf8 "src\runtime\workers\engine\ERPWorkerEngine.ts" @'
import {
  ERPWorkerRegistry,
} from "../registry/ERPWorkerRegistry";

import {
  ERPSchedulerRegistry,
} from "../scheduler/ERPSchedulerRegistry";

import {
  ERPWorkerHistoryStore,
} from "../history/ERPWorkerHistoryStore";

import {
  ERPWorkerMetricsStore,
} from "../metrics/ERPWorkerMetricsStore";

import type {
  ERPWorkerJob,
} from "./ERPWorkerTypes";

function createId(
  prefix: string
) {

  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export const ERPWorkerEngine = {

  workers() {

    return ERPWorkerRegistry;
  },

  scheduledTasks() {

    return ERPSchedulerRegistry;
  },

  executeJob(
    workerId: string,
    module: string,
    type: string,
    shouldFail = false
  ) {

    const startedAt =
      new Date().toISOString();

    const job: ERPWorkerJob = {
      id: createId("worker_job"),
      workerId,
      module,
      type,
      status: shouldFail
        ? "failed"
        : "completed",
      startedAt,
      completedAt:
        new Date().toISOString(),
      createdAt: startedAt,
    };

    ERPWorkerHistoryStore.add(job);

    this.refreshMetrics();

    return job;
  },

  refreshMetrics() {

    const workers =
      ERPWorkerRegistry;

    const jobs =
      ERPWorkerHistoryStore.all();

    ERPWorkerMetricsStore.set({
      activeWorkers:
        workers.filter(
          (worker) =>
            worker.status === "running"
        ).length,

      runningJobs:
        jobs.filter(
          (job) =>
            job.status === "running"
        ).length,

      completedJobs:
        ERPWorkerHistoryStore.completed().length,

      failedJobs:
        ERPWorkerHistoryStore.failed().length,

      scheduledTasks:
        ERPSchedulerRegistry.length,
    });
  },
};
'@

Write-Utf8 "src\runtime\workers\ERPWorkersSeed.ts" @'
import {
  ERPWorkerEngine,
} from "./engine/ERPWorkerEngine";

let seeded = false;

export function seedERPWorkersRuntime() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPWorkerEngine.executeJob(
    "worker_runtime_1",
    "materiels",
    "SYNC_MATERIELS"
  );

  ERPWorkerEngine.executeJob(
    "worker_automation_1",
    "stocks",
    "LOW_STOCK_AUTOMATION"
  );

  ERPWorkerEngine.executeJob(
    "worker_runtime_1",
    "paiements",
    "PAYMENT_RETRY",
    true
  );

  ERPWorkerEngine.refreshMetrics();
}
'@

Write-Utf8 "src\runtime\workers\ERPWorkersSnapshot.ts" @'
import {
  ERPWorkerRegistry,
} from "./registry/ERPWorkerRegistry";

import {
  ERPSchedulerRegistry,
} from "./scheduler/ERPSchedulerRegistry";

import {
  ERPWorkerHistoryStore,
} from "./history/ERPWorkerHistoryStore";

import {
  ERPWorkerMetricsStore,
} from "./metrics/ERPWorkerMetricsStore";

export function getERPWorkersSnapshot() {

  return {

    workers:
      ERPWorkerRegistry,

    scheduledTasks:
      ERPSchedulerRegistry,

    jobs:
      ERPWorkerHistoryStore.all(),

    metrics:
      ERPWorkerMetricsStore.get(),
  };
}
'@

Write-Utf8 "src\runtime\workers\index.ts" @'
export * from "./engine/ERPWorkerTypes";
export * from "./registry/ERPWorkerRegistry";
export * from "./scheduler/ERPSchedulerRegistry";
export * from "./history/ERPWorkerHistoryStore";
export * from "./metrics/ERPWorkerMetricsStore";
export * from "./engine/ERPWorkerEngine";
export * from "./ERPWorkersSeed";
export * from "./ERPWorkersSnapshot";
'@

Write-Utf8 "src\components\erp\workers\ERPWorkersMetricsGrid.tsx" @'
import {
  ERPStatCard,
} from "@/components/erp/ui";

import type {
  getERPWorkersSnapshot,
} from "@/runtime/workers";

type Snapshot =
  ReturnType<
    typeof getERPWorkersSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPWorkersMetricsGrid({
  snapshot,
}: Props) {

  const metrics =
    snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Workers"
        value={metrics.activeWorkers}
        helper="Workers actifs"
      />

      <ERPStatCard
        label="Completed"
        value={metrics.completedJobs}
        helper="Jobs completes"
      />

      <ERPStatCard
        label="Failed"
        value={metrics.failedJobs}
        helper="Jobs en echec"
      />

      <ERPStatCard
        label="Scheduled"
        value={metrics.scheduledTasks}
        helper="Cron tasks"
      />

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\workers\ERPWorkersRegistryPanel.tsx" @'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPWorkersSnapshot,
} from "@/runtime/workers";

type Snapshot =
  ReturnType<
    typeof getERPWorkersSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPWorkersRegistryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Distributed Workers
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Workers runtime distribues.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.workers.map((worker) => (

          <div
            key={worker.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {worker.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Queue: {worker.queue}
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {worker.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\workers\ERPSchedulerPanel.tsx" @'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPWorkersSnapshot,
} from "@/runtime/workers";

type Snapshot =
  ReturnType<
    typeof getERPWorkersSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPSchedulerPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Scheduler Engine
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Taches cron runtime.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.scheduledTasks.map((task) => (

          <div
            key={task.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <p className="font-semibold text-slate-900">
              {task.label}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {task.cron}
            </p>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\workers\ERPWorkerHistoryPanel.tsx" @'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPWorkersSnapshot,
} from "@/runtime/workers";

type Snapshot =
  ReturnType<
    typeof getERPWorkersSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPWorkerHistoryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Execution History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Historique des jobs workers.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.jobs.map((job) => (

          <div
            key={job.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {job.type}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {job.module}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  job.status === "completed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {job.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\workers\ERPWorkersDashboard.tsx" @'
import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPWorkersSnapshot,
  seedERPWorkersRuntime,
} from "@/runtime/workers";

import {
  ERPWorkersMetricsGrid,
} from "./ERPWorkersMetricsGrid";

import {
  ERPWorkersRegistryPanel,
} from "./ERPWorkersRegistryPanel";

import {
  ERPSchedulerPanel,
} from "./ERPSchedulerPanel";

import {
  ERPWorkerHistoryPanel,
} from "./ERPWorkerHistoryPanel";

seedERPWorkersRuntime();

export function ERPWorkersDashboard() {

  const snapshot =
    getERPWorkersSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Distributed Runtime"
        title="Workers & Scheduler Engine"
        description="Workers distribues, scheduler runtime, batch processing et orchestration longue duree."
      />

      <ERPWorkersMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPWorkersRegistryPanel
          snapshot={snapshot}
        />

        <ERPSchedulerPanel
          snapshot={snapshot}
        />

      </div>

      <ERPWorkerHistoryPanel
        snapshot={snapshot}
      />

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\workers\index.ts" @'
export * from "./ERPWorkersMetricsGrid";
export * from "./ERPWorkersRegistryPanel";
export * from "./ERPSchedulerPanel";
export * from "./ERPWorkerHistoryPanel";
export * from "./ERPWorkersDashboard";
'@

Write-Utf8 "src\app\(private)\workers\page.tsx" @'
import {
  ERPWorkersDashboard,
} from "@/components/erp/workers";

export default function Page() {

  return (
    <ERPWorkersDashboard />
  );
}
'@

Write-Host ""
Write-Host "DISTRIBUTED WORKERS + SCHEDULER ENGINE INSTALLE" -ForegroundColor Green
Write-Host ""
Write-Host "Executer : pnpm build" -ForegroundColor Yellow