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
    $BackupDir = Join-Path $ProjectRoot "backup\advanced-monitoring"
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
Write-Host "ADVANCED OBSERVABILITY + MONITORING CENTER" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\monitoring"
Ensure-Dir "src\runtime\monitoring\health"
Ensure-Dir "src\runtime\monitoring\metrics"
Ensure-Dir "src\runtime\monitoring\topology"
Ensure-Dir "src\runtime\monitoring\errors"
Ensure-Dir "src\components\erp\monitoring"

Write-Utf8 "src\runtime\monitoring\health\ERPHealthCheck.ts" @'
export type ERPHealthStatus =
  | "healthy"
  | "warning"
  | "critical";

export type ERPHealthCheck = {
  key: string;
  label: string;
  status: ERPHealthStatus;
  description?: string;
};
'@

Write-Utf8 "src\runtime\monitoring\health\ERPHealthCenter.ts" @'
import { ERPRegistry } from "@/runtime/registry";
import { ERPCircuitBreaker } from "@/runtime/resilience";
import { ERPTenantRegistry } from "@/runtime/tenant";
import { ERPWorkerRegistry } from "@/runtime/workers";
import type { ERPHealthCheck } from "./ERPHealthCheck";

export function getERPHealthChecks(): ERPHealthCheck[] {
  const modules = ERPRegistry.modules();
  const workers = ERPWorkerRegistry;
  const tenants = ERPTenantRegistry;

  return [
    {
      key: "registry",
      label: "Runtime Registry",
      status: modules.length > 0 ? "healthy" : "critical",
      description: `${modules.length} modules enregistres`,
    },
    {
      key: "workers",
      label: "Workers",
      status: workers.some((worker) => worker.status === "running")
        ? "healthy"
        : "warning",
      description: `${workers.length} workers declares`,
    },
    {
      key: "tenants",
      label: "Tenants",
      status: tenants.some((tenant) => tenant.status === "active")
        ? "healthy"
        : "critical",
      description: `${tenants.length} tenants declares`,
    },
    {
      key: "circuit-breaker",
      label: "Circuit Breaker",
      status:
        ERPCircuitBreaker.currentState() === "open"
          ? "critical"
          : "healthy",
      description: `Etat: ${ERPCircuitBreaker.currentState()}`,
    },
  ];
}
'@

Write-Utf8 "src\runtime\monitoring\metrics\ERPMonitoringMetrics.ts" @'
export type ERPMonitoringMetrics = {
  modules: number;
  tenants: number;
  workers: number;
  workflows: number;
  queueJobs: number;
  realtimeMessages: number;
  securityAudits: number;
  persistenceRecords: number;
  healthWarnings: number;
  healthCritical: number;
};
'@

Write-Utf8 "src\runtime\monitoring\topology\ERPDependencyGraph.ts" @'
export type ERPDependencyNode = {
  id: string;
  label: string;
  group: string;
};

export type ERPDependencyEdge = {
  from: string;
  to: string;
  label?: string;
};

export type ERPDependencyGraph = {
  nodes: ERPDependencyNode[];
  edges: ERPDependencyEdge[];
};

export function getERPDependencyGraph(): ERPDependencyGraph {
  return {
    nodes: [
      { id: "registry", label: "Runtime Registry", group: "core" },
      { id: "ui", label: "Runtime UI", group: "ui" },
      { id: "events", label: "Event Bus", group: "runtime" },
      { id: "observability", label: "Observability", group: "runtime" },
      { id: "automation", label: "Automation", group: "runtime" },
      { id: "workflows", label: "Workflows", group: "runtime" },
      { id: "queue", label: "Queue / DLQ", group: "runtime" },
      { id: "realtime", label: "Realtime", group: "runtime" },
      { id: "security", label: "Security RBAC", group: "security" },
      { id: "tenant", label: "Multi-Tenant", group: "saas" },
      { id: "persistence", label: "Persistence", group: "data" },
      { id: "workers", label: "Workers", group: "runtime" },
      { id: "monitoring", label: "Monitoring", group: "ops" },
    ],
    edges: [
      { from: "registry", to: "ui", label: "schemas" },
      { from: "events", to: "observability", label: "timeline" },
      { from: "events", to: "automation", label: "triggers" },
      { from: "automation", to: "workflows", label: "orchestrates" },
      { from: "workflows", to: "queue", label: "async jobs" },
      { from: "queue", to: "workers", label: "execution" },
      { from: "events", to: "realtime", label: "streams" },
      { from: "security", to: "tenant", label: "access context" },
      { from: "tenant", to: "persistence", label: "isolation" },
      { from: "workers", to: "monitoring", label: "metrics" },
      { from: "persistence", to: "monitoring", label: "records" },
    ],
  };
}
'@

Write-Utf8 "src\runtime\monitoring\errors\ERPErrorAnalytics.ts" @'
import { ERPAlertStore } from "@/runtime/observability";
import { ERPDeadLetterStore } from "@/runtime/resilience";
import { ERPWorkerHistoryStore } from "@/runtime/workers";
import { ERPSecurityAuditStore } from "@/runtime/security";

export function getERPErrorAnalytics() {
  const alerts = ERPAlertStore.all();
  const dlq = ERPDeadLetterStore.all();
  const failedWorkers = ERPWorkerHistoryStore.failed();
  const denied = ERPSecurityAuditStore.denied();

  return {
    alerts: alerts.filter((alert) => alert.level !== "info"),
    dlq,
    failedWorkers,
    denied,
    total:
      alerts.filter((alert) => alert.level !== "info").length +
      dlq.length +
      failedWorkers.length +
      denied.length,
  };
}
'@

Write-Utf8 "src\runtime\monitoring\ERPMonitoringSnapshot.ts" @'
import { ERPRegistry } from "@/runtime/registry";
import { ERPTenantRegistry } from "@/runtime/tenant";
import { ERPWorkerRegistry, ERPWorkerHistoryStore } from "@/runtime/workers";
import { ERPWorkflowExecutionStore } from "@/runtime/workflows/enterprise";
import { ERPQueueStore } from "@/runtime/resilience";
import { getERPRealtimeSnapshot } from "@/runtime/realtime";
import { ERPSecurityAuditStore } from "@/runtime/security";
import { getERPHealthChecks } from "./health/ERPHealthCenter";
import { getERPDependencyGraph } from "./topology/ERPDependencyGraph";
import { getERPErrorAnalytics } from "./errors/ERPErrorAnalytics";

export function getERPMonitoringSnapshot() {
  const health = getERPHealthChecks();
  const realtime = getERPRealtimeSnapshot();
  const errors = getERPErrorAnalytics();

  return {
    metrics: {
      modules: ERPRegistry.modules().length,
      tenants: ERPTenantRegistry.length,
      workers: ERPWorkerRegistry.length,
      workflows: ERPWorkflowExecutionStore.all().length,
      queueJobs: ERPQueueStore.all().length,
      realtimeMessages: realtime.totalMessages,
      securityAudits: ERPSecurityAuditStore.all().length,
      persistenceRecords: 0,
      healthWarnings: health.filter((check) => check.status === "warning").length,
      healthCritical: health.filter((check) => check.status === "critical").length,
    },
    health,
    graph: getERPDependencyGraph(),
    errors,
    workerHistory: ERPWorkerHistoryStore.all(),
  };
}
'@

Write-Utf8 "src\runtime\monitoring\index.ts" @'
export * from "./health/ERPHealthCheck";
export * from "./health/ERPHealthCenter";
export * from "./metrics/ERPMonitoringMetrics";
export * from "./topology/ERPDependencyGraph";
export * from "./errors/ERPErrorAnalytics";
export * from "./ERPMonitoringSnapshot";
'@

Write-Utf8 "src\components\erp\monitoring\ERPMonitoringMetricsGrid.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPMonitoringMetricsGrid({
  snapshot,
}: Props) {
  const metrics = snapshot.metrics;

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Modules" value={metrics.modules} helper="Registry" />
      <ERPStatCard label="Tenants" value={metrics.tenants} helper="SaaS runtime" />
      <ERPStatCard label="Workers" value={metrics.workers} helper="Execution" />
      <ERPStatCard label="Workflows" value={metrics.workflows} helper="Instances" />
      <ERPStatCard label="Queue" value={metrics.queueJobs} helper="Jobs" />
      <ERPStatCard label="Realtime" value={metrics.realtimeMessages} helper="Messages" />
      <ERPStatCard label="Security" value={metrics.securityAudits} helper="Audit logs" />
      <ERPStatCard label="Errors" value={snapshot.errors.total} helper="Analytics" />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\monitoring\ERPHealthPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPHealthPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Health Checks
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Etat des sous-systemes ERP.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.health.map((check) => (
          <div
            key={check.key}
            className="flex items-center justify-between rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div>
              <p className="font-semibold text-slate-900">
                {check.label}
              </p>
              <p className="mt-1 text-sm text-slate-500">
                {check.description}
              </p>
            </div>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                check.status === "healthy"
                  ? "bg-emerald-50 text-emerald-700"
                  : check.status === "warning"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              {check.status}
            </span>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\monitoring\ERPTopologyPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPTopologyPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Runtime Topology
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Graphe logique des dependances ERP.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {snapshot.graph.nodes.map((node) => (
          <div
            key={node.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <p className="font-semibold text-slate-900">
              {node.label}
            </p>
            <p className="mt-1 text-sm text-slate-500">
              {node.group}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-6 space-y-2">
        {snapshot.graph.edges.map((edge) => (
          <div
            key={`${edge.from}-${edge.to}`}
            className="rounded-xl bg-slate-50 px-4 py-3 text-sm text-slate-600"
          >
            {edge.from} → {edge.to}
            {edge.label ? ` / ${edge.label}` : ""}
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\monitoring\ERPErrorAnalyticsPanel.tsx" @'
import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import type { getERPMonitoringSnapshot } from "@/runtime/monitoring";

type Snapshot = ReturnType<typeof getERPMonitoringSnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPErrorAnalyticsPanel({
  snapshot,
}: Props) {
  const errors = snapshot.errors;

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Error Analytics
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Alertes, DLQ, workers failed et acces refuses.
        </p>
      </div>

      {errors.total === 0 ? (
        <ERPEmptyState
          title="Aucune erreur critique"
          description="Le runtime ne remonte pas d'erreur."
        />
      ) : (
        <div className="space-y-4">
          {errors.alerts.map((alert) => (
            <div
              key={alert.id}
              className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <p className="font-semibold text-amber-900">
                {alert.title}
              </p>
              <p className="mt-1 text-sm text-amber-700">
                {alert.module}
              </p>
            </div>
          ))}

          {errors.dlq.map((job) => (
            <div
              key={job.id}
              className="rounded-2xl border border-red-200 bg-red-50 p-5"
            >
              <p className="font-semibold text-red-900">
                DLQ: {job.type}
              </p>
              <p className="mt-1 text-sm text-red-700">
                {job.module}
              </p>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\monitoring\ERPMonitoringDashboard.tsx" @'
import { ERPPageHeader } from "@/components/erp/ui";
import { getERPMonitoringSnapshot } from "@/runtime/monitoring";

import { ERPMonitoringMetricsGrid } from "./ERPMonitoringMetricsGrid";
import { ERPHealthPanel } from "./ERPHealthPanel";
import { ERPTopologyPanel } from "./ERPTopologyPanel";
import { ERPErrorAnalyticsPanel } from "./ERPErrorAnalyticsPanel";

export function ERPMonitoringDashboard() {
  const snapshot = getERPMonitoringSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Monitoring Center"
        title="Advanced Observability"
        description="Health checks, topology, runtime metrics, dependency graph et error analytics."
      />

      <ERPMonitoringMetricsGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPHealthPanel snapshot={snapshot} />
        <ERPErrorAnalyticsPanel snapshot={snapshot} />
      </div>

      <ERPTopologyPanel snapshot={snapshot} />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\monitoring\index.ts" @'
export * from "./ERPMonitoringMetricsGrid";
export * from "./ERPHealthPanel";
export * from "./ERPTopologyPanel";
export * from "./ERPErrorAnalyticsPanel";
export * from "./ERPMonitoringDashboard";
'@

Write-Utf8 "src\app\(private)\monitoring\page.tsx" @'
import { ERPMonitoringDashboard } from "@/components/erp/monitoring";

export default function Page() {
  return <ERPMonitoringDashboard />;
}
'@

Write-Host ""
Write-Host "ADVANCED OBSERVABILITY + MONITORING CENTER INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow