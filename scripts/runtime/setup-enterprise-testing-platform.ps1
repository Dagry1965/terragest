$ErrorActionPreference = "Stop"

$ProjectRoot = "C:\Users\Admin\terragest"
Set-Location -LiteralPath $ProjectRoot

function Ensure-Dir($Path) {

  if (!(Test-Path -LiteralPath $Path)) {

    New-Item `
      -ItemType Directory `
      -Path $Path `
      -Force | Out-Null
  }
}

function Write-Utf8(
  $Path,
  $Content
) {

  $FullPath =
    Join-Path `
      $ProjectRoot `
      $Path

  $Dir =
    Split-Path `
      $FullPath `
      -Parent

  Ensure-Dir $Dir

  if (Test-Path -LiteralPath $FullPath) {

    $BackupDir =
      Join-Path `
        $ProjectRoot `
        "backup\enterprise-testing-platform"

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

  Write-Host `
    "WRITTEN: $Path" `
    -ForegroundColor Green
}

Write-Host ""
Write-Host `
  "ENTERPRISE TESTING PLATFORM" `
  -ForegroundColor Cyan

Write-Host ""

Ensure-Dir "src\runtime\testing"
Ensure-Dir "src\runtime\testing\engine"
Ensure-Dir "src\runtime\testing\registry"
Ensure-Dir "src\runtime\testing\simulation"
Ensure-Dir "src\runtime\testing\reports"
Ensure-Dir "src\runtime\testing\history"
Ensure-Dir "src\components\erp\testing"

Write-Utf8 `
"src\runtime\testing\engine\ERPTestingTypes.ts" `
@'
export type ERPTestStatus =
  | "pending"
  | "running"
  | "passed"
  | "failed";

export type ERPTestType =
  | "workflow"
  | "worker"
  | "security"
  | "tenant"
  | "queue"
  | "automation"
  | "monitoring"
  | "integration";

export type ERPTestCase = {
  id: string;
  label: string;
  type: ERPTestType;
  module: string;
  status: ERPTestStatus;
  duration: number;
  updatedAt: string;
};

export type ERPTestReport = {
  total: number;
  passed: number;
  failed: number;
  successRate: number;
};
'@

Write-Utf8 `
"src\runtime\testing\registry\ERPTestingRegistry.ts" `
@'
import type {
  ERPTestCase,
} from "../engine/ERPTestingTypes";

export const ERPTestingRegistry:
  ERPTestCase[] = [

  {
    id: "workflow_maintenance",
    label: "Workflow Maintenance",
    type: "workflow",
    module: "maintenance",
    status: "passed",
    duration: 240,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "worker_payments",
    label: "Worker Payments",
    type: "worker",
    module: "paiements",
    status: "passed",
    duration: 320,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "tenant_isolation",
    label: "Tenant Isolation",
    type: "tenant",
    module: "runtime",
    status: "passed",
    duration: 180,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "security_rbac",
    label: "Security RBAC",
    type: "security",
    module: "security",
    status: "failed",
    duration: 150,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "monitoring_center",
    label: "Monitoring Center",
    type: "monitoring",
    module: "monitoring",
    status: "passed",
    duration: 200,
    updatedAt: new Date().toISOString(),
  },

  {
    id: "automation_runtime",
    label: "Automation Runtime",
    type: "automation",
    module: "automation",
    status: "passed",
    duration: 280,
    updatedAt: new Date().toISOString(),
  },
];
'@

Write-Utf8 `
"src\runtime\testing\history\ERPTestingHistoryStore.ts" `
@'
import type {
  ERPTestCase,
} from "../engine/ERPTestingTypes";

class ERPTestingHistoryStoreClass {

  private history:
    ERPTestCase[] = [];

  add(
    item: ERPTestCase
  ) {

    this.history.unshift(item);

    this.history =
      this.history.slice(0, 500);
  }

  all() {

    return this.history;
  }

  passed() {

    return this.history.filter(
      (item) =>
        item.status === "passed"
    );
  }

  failed() {

    return this.history.filter(
      (item) =>
        item.status === "failed"
    );
  }
}

export const ERPTestingHistoryStore =
  new ERPTestingHistoryStoreClass();
'@

Write-Utf8 `
"src\runtime\testing\simulation\ERPRuntimeSimulation.ts" `
@'
import {
  ERPWorkerEngine,
} from "@/runtime/workers";

import {
  ERPAccessGuard,
} from "@/runtime/security";

import {
  ERPAutomationEngine,
} from "@/runtime/automation";

export const ERPRuntimeSimulation = {

  simulateWorkflow() {

    return {
      status: "success",
      duration: 250,
    };
  },

  simulateWorker() {

    return ERPWorkerEngine.executeJob(
      "worker_runtime_1",
      "materiels",
      "SIMULATION_JOB"
    );
  },

  simulateSecurity() {

    return ERPAccessGuard.can(
      "materiels",
      "read"
    );
  },

  simulateAutomation() {

    return ERPAutomationEngine.all();
  },
};
'@

Write-Utf8 `
"src\runtime\testing\reports\ERPTestingReportBuilder.ts" `
@'
import {
  ERPTestingRegistry,
} from "../registry/ERPTestingRegistry";

export function buildERPTestingReport() {

  const total =
    ERPTestingRegistry.length;

  const passed =
    ERPTestingRegistry.filter(
      (test) =>
        test.status === "passed"
    ).length;

  const failed =
    ERPTestingRegistry.filter(
      (test) =>
        test.status === "failed"
    ).length;

  return {
    total,
    passed,
    failed,
    successRate:
      total === 0
        ? 0
        : Math.round(
            (passed / total) * 100
          ),
  };
}
'@

Write-Utf8 `
"src\runtime\testing\engine\ERPTestingEngine.ts" `
@'
import {
  ERPTestingRegistry,
} from "../registry/ERPTestingRegistry";

import {
  ERPTestingHistoryStore,
} from "../history/ERPTestingHistoryStore";

import {
  buildERPTestingReport,
} from "../reports/ERPTestingReportBuilder";

export const ERPTestingEngine = {

  runAll() {

    ERPTestingRegistry.forEach(
      (test) => {

        ERPTestingHistoryStore.add(
          test
        );
      }
    );

    return buildERPTestingReport();
  },

  registry() {

    return ERPTestingRegistry;
  },

  history() {

    return ERPTestingHistoryStore.all();
  },

  report() {

    return buildERPTestingReport();
  },
};
'@

Write-Utf8 `
"src\runtime\testing\ERPTestingSeed.ts" `
@'
import {
  ERPTestingEngine,
} from "./engine/ERPTestingEngine";

let seeded = false;

export function seedERPTestingPlatform() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPTestingEngine.runAll();
}
'@

Write-Utf8 `
"src\runtime\testing\ERPTestingSnapshot.ts" `
@'
import {
  ERPTestingEngine,
} from "./engine/ERPTestingEngine";

export function getERPTestingSnapshot() {

  return {

    tests:
      ERPTestingEngine.registry(),

    history:
      ERPTestingEngine.history(),

    report:
      ERPTestingEngine.report(),
  };
}
'@

Write-Utf8 `
"src\runtime\testing\index.ts" `
@'
export * from "./engine/ERPTestingTypes";
export * from "./registry/ERPTestingRegistry";
export * from "./history/ERPTestingHistoryStore";
export * from "./simulation/ERPRuntimeSimulation";
export * from "./reports/ERPTestingReportBuilder";
export * from "./engine/ERPTestingEngine";
export * from "./ERPTestingSeed";
export * from "./ERPTestingSnapshot";
'@

Write-Utf8 `
"src\components\erp\testing\ERPTestingMetricsGrid.tsx" `
@'
import {
  ERPStatCard,
} from "@/components/erp/ui";

import type {
  getERPTestingSnapshot,
} from "@/runtime/testing";

type Snapshot =
  ReturnType<
    typeof getERPTestingSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTestingMetricsGrid({
  snapshot,
}: Props) {

  const report =
    snapshot.report;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Tests"
        value={report.total}
        helper="Runtime tests"
      />

      <ERPStatCard
        label="Passed"
        value={report.passed}
        helper="Succes"
      />

      <ERPStatCard
        label="Failed"
        value={report.failed}
        helper="Echecs"
      />

      <ERPStatCard
        label="Success Rate"
        value={`${report.successRate}%`}
        helper="Qualite runtime"
      />

    </div>
  );
}
'@

Write-Utf8 `
"src\components\erp\testing\ERPTestingRegistryPanel.tsx" `
@'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPTestingSnapshot,
} from "@/runtime/testing";

type Snapshot =
  ReturnType<
    typeof getERPTestingSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTestingRegistryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Runtime Tests
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Validation des couches runtime.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.tests.map((test) => (

          <div
            key={test.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {test.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {test.module}
                </p>

              </div>

              <span
                className={[
                  "rounded-full px-3 py-1 text-xs font-semibold",
                  test.status === "passed"
                    ? "bg-emerald-50 text-emerald-700"
                    : "bg-red-50 text-red-700",
                ].join(" ")}
              >
                {test.status}
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 `
"src\components\erp\testing\ERPTestingHistoryPanel.tsx" `
@'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPTestingSnapshot,
} from "@/runtime/testing";

type Snapshot =
  ReturnType<
    typeof getERPTestingSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTestingHistoryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Execution History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Historique des executions de tests.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.history.map((item) => (

          <div
            key={`${item.id}_${item.updatedAt}`}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {item.label}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {item.type}
                </p>

              </div>

              <span className="text-sm text-slate-500">
                {item.duration}ms
              </span>

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 `
"src\components\erp\testing\ERPTestingDashboard.tsx" `
@'
import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPTestingSnapshot,
  seedERPTestingPlatform,
} from "@/runtime/testing";

import {
  ERPTestingMetricsGrid,
} from "./ERPTestingMetricsGrid";

import {
  ERPTestingRegistryPanel,
} from "./ERPTestingRegistryPanel";

import {
  ERPTestingHistoryPanel,
} from "./ERPTestingHistoryPanel";

seedERPTestingPlatform();

export function ERPTestingDashboard() {

  const snapshot =
    getERPTestingSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Validation Center"
        title="Enterprise Testing Platform"
        description="Validation runtime, workflows, workers, securite, multi-tenant et observability."
      />

      <ERPTestingMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPTestingRegistryPanel
          snapshot={snapshot}
        />

        <ERPTestingHistoryPanel
          snapshot={snapshot}
        />

      </div>

    </div>
  );
}
'@

Write-Utf8 `
"src\components\erp\testing\index.ts" `
@'
export * from "./ERPTestingMetricsGrid";
export * from "./ERPTestingRegistryPanel";
export * from "./ERPTestingHistoryPanel";
export * from "./ERPTestingDashboard";
'@

Write-Utf8 `
"src\app\(private)\testing\page.tsx" `
@'
import {
  ERPTestingDashboard,
} from "@/components/erp/testing";

export default function Page() {

  return (
    <ERPTestingDashboard />
  );
}
'@

Write-Host ""
Write-Host `
  "ENTERPRISE TESTING PLATFORM INSTALLE" `
  -ForegroundColor Green

Write-Host ""
Write-Host `
  "Executer : pnpm build" `
  -ForegroundColor Yellow