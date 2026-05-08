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
    $BackupDir = Join-Path $ProjectRoot "backup\runtime-cockpit"
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
Write-Host "ERP RUNTIME COCKPIT" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\components\erp\cockpit"
Ensure-Dir "src\runtime\cockpit"

Write-Utf8 "src\runtime\cockpit\ERPCockpitSnapshot.ts" @'
import { ERPRegistry } from "@/runtime/registry";

export function getERPCockpitSnapshot() {
  const modules = ERPRegistry.modules();

  return {
    modulesCount: modules.length,
    schemasCount: modules.length,
    actionsCount: modules.reduce((total, module) => total + module.actions.length, 0),
    workflowsCount: modules.reduce((total, module) => total + module.workflows.length, 0),
    eventsCount: modules.reduce((total, module) => total + module.events.length, 0),
    automationCount: modules.reduce((total, module) => total + module.automation.length, 0),
    permissionsCount: modules.reduce((total, module) => total + module.permissions.length, 0),
    navigationCount: ERPRegistry.navigation().length,
    modules,
  };
}
'@

Write-Utf8 "src\runtime\cockpit\index.ts" @'
export * from "./ERPCockpitSnapshot";
'@

Write-Utf8 "src\components\erp\cockpit\ERPCockpitMetricGrid.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitMetricGridProps = {
  snapshot: Snapshot;
};

export function ERPCockpitMetricGrid({
  snapshot,
}: ERPCockpitMetricGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Modules" value={snapshot.modulesCount} helper="Modules runtime" />
      <ERPStatCard label="Schemas" value={snapshot.schemasCount} helper="Schemas generatifs" />
      <ERPStatCard label="Actions" value={snapshot.actionsCount} helper="Actions ERP" />
      <ERPStatCard label="Workflows" value={snapshot.workflowsCount} helper="Processus metier" />
      <ERPStatCard label="Events" value={snapshot.eventsCount} helper="Evenements domaine" />
      <ERPStatCard label="Automation" value={snapshot.automationCount} helper="Automatisations" />
      <ERPStatCard label="Permissions" value={snapshot.permissionsCount} helper="Controle acces" />
      <ERPStatCard label="Navigation" value={snapshot.navigationCount} helper="Routes registre" />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\cockpit\ERPCockpitModuleMatrix.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitModuleMatrixProps = {
  snapshot: Snapshot;
};

export function ERPCockpitModuleMatrix({
  snapshot,
}: ERPCockpitModuleMatrixProps) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Matrice modules ERP
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Controle de couverture runtime par module.
        </p>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200">
        <table className="w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Module</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Fields</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Actions</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Workflows</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Events</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Automation</th>
              <th className="px-4 py-3 text-left font-semibold text-slate-600">Permissions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 bg-white">
            {snapshot.modules.map((module) => (
              <tr key={module.key}>
                <td className="px-4 py-3 font-medium text-slate-900">{module.label}</td>
                <td className="px-4 py-3 text-slate-600">{module.schema.fields.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.actions.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.workflows.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.events.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.automation.length}</td>
                <td className="px-4 py-3 text-slate-600">{module.permissions.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\cockpit\ERPCockpitStreamsPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitStreamsPanelProps = {
  snapshot: Snapshot;
};

export function ERPCockpitStreamsPanel({
  snapshot,
}: ERPCockpitStreamsPanelProps) {
  const streams = [
    {
      label: "Event stream",
      value: snapshot.eventsCount,
      helper: "Evenements domaine declares",
    },
    {
      label: "Workflow monitoring",
      value: snapshot.workflowsCount,
      helper: "Workflows rattaches aux modules",
    },
    {
      label: "Automation monitoring",
      value: snapshot.automationCount,
      helper: "Automatisations disponibles",
    },
    {
      label: "Navigation registry",
      value: snapshot.navigationCount,
      helper: "Routes issues du registre",
    },
  ];

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Flux runtime
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Vision logique des flux ERP connectes au registre central.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {streams.map((stream) => (
          <div
            key={stream.label}
            className="rounded-2xl border border-slate-200 bg-slate-50 p-5"
          >
            <div className="flex items-center justify-between">
              <p className="font-medium text-slate-900">{stream.label}</p>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Actif
              </span>
            </div>

            <p className="mt-3 text-3xl font-semibold text-slate-950">
              {stream.value}
            </p>

            <p className="mt-1 text-sm text-slate-500">
              {stream.helper}
            </p>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\cockpit\ERPCockpitHealthPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPCockpitSnapshot } from "@/runtime/cockpit";

type Snapshot = ReturnType<typeof getERPCockpitSnapshot>;

type ERPCockpitHealthPanelProps = {
  snapshot: Snapshot;
};

export function ERPCockpitHealthPanel({
  snapshot,
}: ERPCockpitHealthPanelProps) {
  const checks = [
    {
      label: "Registry modules",
      ok: snapshot.modulesCount > 0,
    },
    {
      label: "Schemas disponibles",
      ok: snapshot.schemasCount === snapshot.modulesCount,
    },
    {
      label: "Actions configurees",
      ok: snapshot.actionsCount > 0,
    },
    {
      label: "Workflows declares",
      ok: snapshot.workflowsCount > 0,
    },
    {
      label: "Events declares",
      ok: snapshot.eventsCount > 0,
    },
    {
      label: "Navigation generee",
      ok: snapshot.navigationCount > 0,
    },
  ];

  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Health system ERP
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Controle minimal de coherence du runtime.
        </p>
      </div>

      <div className="space-y-3">
        {checks.map((check) => (
          <div
            key={check.label}
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3"
          >
            <span className="text-sm font-medium text-slate-700">
              {check.label}
            </span>

            <span
              className={[
                "rounded-full px-3 py-1 text-xs font-semibold",
                check.ok
                  ? "bg-emerald-50 text-emerald-700"
                  : "bg-red-50 text-red-700",
              ].join(" ")}
            >
              {check.ok ? "OK" : "A verifier"}
            </span>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\cockpit\ERPRuntimeCockpitDashboard.tsx" @'
import { ERPPageHeader } from "@/components/erp/ui";
import { getERPCockpitSnapshot } from "@/runtime/cockpit";

import { ERPCockpitMetricGrid } from "./ERPCockpitMetricGrid";
import { ERPCockpitModuleMatrix } from "./ERPCockpitModuleMatrix";
import { ERPCockpitStreamsPanel } from "./ERPCockpitStreamsPanel";
import { ERPCockpitHealthPanel } from "./ERPCockpitHealthPanel";

export function ERPRuntimeCockpitDashboard() {
  const snapshot = getERPCockpitSnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Mission Control"
        title="Cockpit runtime Terragest"
        description="Supervision centrale des modules, schemas, actions, workflows, events, automation, permissions et navigation."
      />

      <ERPCockpitMetricGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPCockpitStreamsPanel snapshot={snapshot} />
        <ERPCockpitHealthPanel snapshot={snapshot} />
      </div>

      <ERPCockpitModuleMatrix snapshot={snapshot} />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\cockpit\index.ts" @'
export * from "./ERPCockpitMetricGrid";
export * from "./ERPCockpitModuleMatrix";
export * from "./ERPCockpitStreamsPanel";
export * from "./ERPCockpitHealthPanel";
export * from "./ERPRuntimeCockpitDashboard";
'@

Write-Utf8 "src\app\(private)\runtime-cockpit\page.tsx" @'
import { ERPRuntimeCockpitDashboard } from "@/components/erp/cockpit";

export default function Page() {
  return <ERPRuntimeCockpitDashboard />;
}
'@

Write-Host ""
Write-Host "ERP RUNTIME COCKPIT INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow