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
    $BackupDir = Join-Path $ProjectRoot "backup\multitenant-runtime"

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
Write-Host "MULTI-TENANT RUNTIME CORE" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\tenant"
Ensure-Dir "src\runtime\tenant\registry"
Ensure-Dir "src\runtime\tenant\context"
Ensure-Dir "src\runtime\tenant\metrics"
Ensure-Dir "src\runtime\tenant\isolation"
Ensure-Dir "src\components\erp\tenant"

Write-Utf8 "src\runtime\tenant\registry\ERPTenant.ts" @'
export type ERPTenantStatus =
  | "active"
  | "suspended"
  | "maintenance";

export type ERPTenantPlan =
  | "starter"
  | "business"
  | "enterprise";

export type ERPTenant = {
  id: string;
  key: string;
  name: string;
  status: ERPTenantStatus;
  plan: ERPTenantPlan;
  createdAt: string;
  modules: string[];
};
'@

Write-Utf8 "src\runtime\tenant\registry\ERPTenantRegistry.ts" @'
import type { ERPTenant } from "./ERPTenant";

export const ERPTenantRegistry: ERPTenant[] = [
  {
    id: "tenant_demo",
    key: "demo",
    name: "Terragest Demo",
    status: "active",
    plan: "enterprise",
    createdAt: new Date().toISOString(),
    modules: [
      "exploitations",
      "terrains",
      "materiels",
      "stocks",
      "maintenance",
      "paiements",
    ],
  },

  {
    id: "tenant_agricorp",
    key: "agricorp",
    name: "AgriCorp",
    status: "active",
    plan: "business",
    createdAt: new Date().toISOString(),
    modules: [
      "exploitations",
      "stocks",
      "produits",
    ],
  },

  {
    id: "tenant_farmgroup",
    key: "farmgroup",
    name: "FarmGroup",
    status: "maintenance",
    plan: "starter",
    createdAt: new Date().toISOString(),
    modules: [
      "terrains",
      "materiels",
    ],
  },
];
'@

Write-Utf8 "src\runtime\tenant\context\ERPTenantContext.ts" @'
import type { ERPTenant } from "../registry/ERPTenant";

import {
  ERPTenantRegistry,
} from "../registry/ERPTenantRegistry";

let currentTenant =
  ERPTenantRegistry[0];

export const ERPTenantContext = {

  current(): ERPTenant {

    return currentTenant;
  },

  setTenant(
    tenantId: string
  ) {

    const tenant =
      ERPTenantRegistry.find(
        (item) =>
          item.id === tenantId
      );

    if (!tenant) {
      return;
    }

    currentTenant = tenant;
  },
};
'@

Write-Utf8 "src\runtime\tenant\metrics\ERPTenantMetrics.ts" @'
export type ERPTenantMetrics = {
  tenantId: string;

  activeUsers: number;

  workflows: number;

  automations: number;

  queueJobs: number;

  alerts: number;

  storage: number;
};
'@

Write-Utf8 "src\runtime\tenant\metrics\ERPTenantMetricsStore.ts" @'
import type {
  ERPTenantMetrics,
} from "./ERPTenantMetrics";

class ERPTenantMetricsStoreClass {

  private metrics:
    ERPTenantMetrics[] = [];

  set(
    metrics: ERPTenantMetrics
  ) {

    const exists =
      this.metrics.some(
        (item) =>
          item.tenantId === metrics.tenantId
      );

    if (exists) {

      this.metrics =
        this.metrics.map(
          (item) =>
            item.tenantId === metrics.tenantId
              ? metrics
              : item
        );

      return;
    }

    this.metrics.push(metrics);
  }

  all() {

    return this.metrics;
  }

  byTenant(
    tenantId: string
  ) {

    return this.metrics.find(
      (item) =>
        item.tenantId === tenantId
    );
  }
}

export const ERPTenantMetricsStore =
  new ERPTenantMetricsStoreClass();
'@

Write-Utf8 "src\runtime\tenant\isolation\ERPTenantIsolation.ts" @'
import {
  ERPTenantContext,
} from "../context/ERPTenantContext";

export const ERPTenantIsolation = {

  canAccessModule(
    moduleKey: string
  ) {

    const tenant =
      ERPTenantContext.current();

    return tenant.modules.includes(
      moduleKey
    );
  },

  requireModule(
    moduleKey: string
  ) {

    const allowed =
      this.canAccessModule(
        moduleKey
      );

    if (!allowed) {

      throw new Error(
        `Tenant cannot access module: ${moduleKey}`
      );
    }

    return true;
  },
};
'@

Write-Utf8 "src\runtime\tenant\ERPTenantSnapshot.ts" @'
import {
  ERPTenantRegistry,
} from "./registry/ERPTenantRegistry";

import {
  ERPTenantContext,
} from "./context/ERPTenantContext";

import {
  ERPTenantMetricsStore,
} from "./metrics/ERPTenantMetricsStore";

export function getERPTenantSnapshot() {

  const current =
    ERPTenantContext.current();

  return {

    current,

    tenants:
      ERPTenantRegistry,

    metrics:
      ERPTenantMetricsStore.all(),

    currentMetrics:
      ERPTenantMetricsStore.byTenant(
        current.id
      ),

    tenantsCount:
      ERPTenantRegistry.length,

    activeTenants:
      ERPTenantRegistry.filter(
        (tenant) =>
          tenant.status === "active"
      ).length,
  };
}
'@

Write-Utf8 "src\runtime\tenant\ERPTenantSeed.ts" @'
import {
  ERPTenantMetricsStore,
} from "./metrics/ERPTenantMetricsStore";

let seeded = false;

export function seedERPTenantRuntime() {

  if (seeded) {
    return;
  }

  seeded = true;

  ERPTenantMetricsStore.set({
    tenantId: "tenant_demo",
    activeUsers: 18,
    workflows: 24,
    automations: 12,
    queueJobs: 5,
    alerts: 2,
    storage: 82,
  });

  ERPTenantMetricsStore.set({
    tenantId: "tenant_agricorp",
    activeUsers: 7,
    workflows: 8,
    automations: 4,
    queueJobs: 2,
    alerts: 1,
    storage: 31,
  });

  ERPTenantMetricsStore.set({
    tenantId: "tenant_farmgroup",
    activeUsers: 2,
    workflows: 1,
    automations: 0,
    queueJobs: 0,
    alerts: 0,
    storage: 8,
  });
}
'@

Write-Utf8 "src\runtime\tenant\index.ts" @'
export * from "./registry/ERPTenant";
export * from "./registry/ERPTenantRegistry";

export * from "./context/ERPTenantContext";

export * from "./metrics/ERPTenantMetrics";
export * from "./metrics/ERPTenantMetricsStore";

export * from "./isolation/ERPTenantIsolation";

export * from "./ERPTenantSnapshot";
export * from "./ERPTenantSeed";
'@

Write-Utf8 "src\components\erp\tenant\ERPTenantMetricsGrid.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";

import type {
  getERPTenantSnapshot,
} from "@/runtime/tenant";

type Snapshot =
  ReturnType<
    typeof getERPTenantSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTenantMetricsGrid({
  snapshot,
}: Props) {

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">

      <ERPStatCard
        label="Tenants"
        value={snapshot.tenantsCount}
        helper="Tenants ERP"
      />

      <ERPStatCard
        label="Active"
        value={snapshot.activeTenants}
        helper="Tenants actifs"
      />

      <ERPStatCard
        label="Current"
        value={snapshot.current.name}
        helper={snapshot.current.plan}
      />

      <ERPStatCard
        label="Modules"
        value={snapshot.current.modules.length}
        helper="Modules autorises"
      />

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\tenant\ERPTenantRegistryPanel.tsx" @'
import {
  ERPSection,
} from "@/components/erp/ui";

import type {
  getERPTenantSnapshot,
} from "@/runtime/tenant";

type Snapshot =
  ReturnType<
    typeof getERPTenantSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTenantRegistryPanel({
  snapshot,
}: Props) {

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Tenant Registry
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Registre des tenants ERP.
        </p>

      </div>

      <div className="space-y-4">

        {snapshot.tenants.map((tenant) => (

          <div
            key={tenant.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >

            <div className="flex items-center justify-between">

              <div>

                <p className="font-semibold text-slate-900">
                  {tenant.name}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  {tenant.plan}
                </p>

              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {tenant.status}
              </span>

            </div>

            <div className="mt-4 flex flex-wrap gap-2">

              {tenant.modules.map((module) => (

                <span
                  key={module}
                  className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700"
                >
                  {module}
                </span>

              ))}

            </div>

          </div>

        ))}

      </div>

    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\tenant\ERPTenantMetricsPanel.tsx" @'
import {
  ERPSection,
  ERPEmptyState,
} from "@/components/erp/ui";

import type {
  getERPTenantSnapshot,
} from "@/runtime/tenant";

type Snapshot =
  ReturnType<
    typeof getERPTenantSnapshot
  >;

type Props = {
  snapshot: Snapshot;
};

export function ERPTenantMetricsPanel({
  snapshot,
}: Props) {

  const metrics =
    snapshot.currentMetrics;

  return (
    <ERPSection>

      <div className="mb-5">

        <h2 className="text-lg font-semibold text-slate-950">
          Tenant Metrics
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Activite runtime du tenant courant.
        </p>

      </div>

      {!metrics ? (

        <ERPEmptyState
          title="Aucune metrique"
          description="Les metriques tenant apparaitront ici."
        />

      ) : (

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Users</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.activeUsers}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Workflows</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.workflows}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Automations</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.automations}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-sm text-slate-500">Storage</p>
            <p className="mt-2 text-3xl font-semibold text-slate-950">
              {metrics.storage}%
            </p>
          </div>

        </div>

      )}

    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\tenant\ERPTenantDashboard.tsx" @'
import {
  ERPPageHeader,
} from "@/components/erp/ui";

import {
  getERPTenantSnapshot,
  seedERPTenantRuntime,
} from "@/runtime/tenant";

import {
  ERPTenantMetricsGrid,
} from "./ERPTenantMetricsGrid";

import {
  ERPTenantRegistryPanel,
} from "./ERPTenantRegistryPanel";

import {
  ERPTenantMetricsPanel,
} from "./ERPTenantMetricsPanel";

seedERPTenantRuntime();

export function ERPTenantDashboard() {

  const snapshot =
    getERPTenantSnapshot();

  return (
    <div className="space-y-8">

      <ERPPageHeader
        eyebrow="ERP Multi-Tenant"
        title="Tenant Runtime Dashboard"
        description="Isolation tenant, contexte runtime, modules, quotas et activite SaaS."
      />

      <ERPTenantMetricsGrid
        snapshot={snapshot}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">

        <ERPTenantRegistryPanel
          snapshot={snapshot}
        />

        <ERPTenantMetricsPanel
          snapshot={snapshot}
        />

      </div>

    </div>
  );
}
'@

Write-Utf8 "src\components\erp\tenant\index.ts" @'
export * from "./ERPTenantMetricsGrid";
export * from "./ERPTenantRegistryPanel";
export * from "./ERPTenantMetricsPanel";
export * from "./ERPTenantDashboard";
'@

Write-Utf8 "src\app\(private)\tenants\page.tsx" @'
import {
  ERPTenantDashboard,
} from "@/components/erp/tenant";

export default function Page() {

  return (
    <ERPTenantDashboard />
  );
}
'@

Write-Host ""
Write-Host "MULTI-TENANT RUNTIME CORE INSTALLE" -ForegroundColor Green
Write-Host ""
Write-Host "Executer : pnpm build" -ForegroundColor Yellow