$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)

  [System.IO.File]::WriteAllText(
    $fullPath,
    $Content,
    $utf8NoBom
  )

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== SMART RUNTIME ERP ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\smart-runtime" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\smart-runtime" | Out-Null

WriteFile "src\runtime\smart-runtime\ERPSmartInsight.ts" @'
export type ERPSmartInsightLevel =
  | "info"
  | "success"
  | "warning"
  | "danger";

export interface ERPSmartInsight {
  id: string;
  title: string;
  description: string;
  level: ERPSmartInsightLevel;
  recommendation?: string;
}
'@

WriteFile "src\runtime\smart-runtime\ERPSmartRuntimeEngine.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { ERPSmartInsight } from "./ERPSmartInsight";

export class ERPSmartRuntimeEngine {
  static analyse(module: ERPModule): ERPSmartInsight[] {
    return [
      {
        id: `${module.metadata.key}-smart-1`,
        title: "Activite inhabituelle detectee",
        description:
          "Le volume d'activite est plus eleve que la normale.",
        level: "warning",
        recommendation:
          "Verifier les workflows en attente.",
      },
      {
        id: `${module.metadata.key}-smart-2`,
        title: "Performance stable",
        description:
          "Le module reste dans une plage operationnelle correcte.",
        level: "success",
        recommendation:
          "Maintenir les controles actuels.",
      },
      {
        id: `${module.metadata.key}-smart-3`,
        title: "Optimisation possible",
        description:
          "Des automatisations supplementaires peuvent etre activees.",
        level: "info",
        recommendation:
          "Activer les traitements automatiques.",
      },
    ];
  }
}
'@

WriteFile "src\runtime\smart-runtime\ERPSmartPriorityEngine.ts" @'
import type { ERPModule } from "@/runtime/modules";

export interface ERPSmartPriority {
  label: string;
  value: string;
}

export class ERPSmartPriorityEngine {
  static priorities(module: ERPModule): ERPSmartPriority[] {
    return [
      {
        label: "Priorite haute",
        value: "4 actions critiques",
      },
      {
        label: "Suivi operationnel",
        value: "2 workflows ouverts",
      },
      {
        label: "Verification",
        value: "1 controle recommande",
      },
    ];
  }
}
'@

WriteFile "src\runtime\smart-runtime\ERPSmartRecommendations.ts" @'
import type { ERPModule } from "@/runtime/modules";

export class ERPSmartRecommendations {
  static generate(module: ERPModule): string[] {
    return [
      `Analyser les donnees du module ${module.metadata.label}.`,
      "Verifier les elements critiques.",
      "Optimiser les automatisations.",
      "Controler les dependances metier.",
    ];
  }
}
'@

WriteFile "src\runtime\smart-runtime\index.ts" @'
export type {
  ERPSmartInsight,
  ERPSmartInsightLevel,
} from "./ERPSmartInsight";

export { ERPSmartRuntimeEngine } from "./ERPSmartRuntimeEngine";
export { ERPSmartPriorityEngine } from "./ERPSmartPriorityEngine";
export { ERPSmartRecommendations } from "./ERPSmartRecommendations";
'@

WriteFile "src\components\erp\smart-runtime\ERPSmartInsightsPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPSmartRuntimeEngine } from "@/runtime/smart-runtime";

interface ERPSmartInsightsPanelProps {
  module: ERPModule;
}

export function ERPSmartInsightsPanel({
  module,
}: ERPSmartInsightsPanelProps) {

  const insights =
    ERPSmartRuntimeEngine.analyse(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">
          Insights intelligents
        </h2>

        <p className="text-sm text-slate-500">
          Analyse operationnelle du runtime ERP.
        </p>
      </div>

      <div className="space-y-4">

        {insights.map((insight) => (

          <div
            key={insight.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
          >

            <div className="flex items-start justify-between gap-3">

              <div>

                <h3 className="text-sm font-black text-slate-900">
                  {insight.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {insight.description}
                </p>

                {insight.recommendation && (
                  <p className="mt-3 text-sm font-medium text-blue-700">
                    {insight.recommendation}
                  </p>
                )}

              </div>

              <ERPBadge tone={insight.level}>
                {insight.level}
              </ERPBadge>

            </div>
          </div>
        ))}

      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-runtime\ERPSmartPriorityPanel.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { ERPSmartPriorityEngine } from "@/runtime/smart-runtime";

interface ERPSmartPriorityPanelProps {
  module: ERPModule;
}

export function ERPSmartPriorityPanel({
  module,
}: ERPSmartPriorityPanelProps) {

  const priorities =
    ERPSmartPriorityEngine.priorities(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">
          Priorites intelligentes
        </h2>

        <p className="text-sm text-slate-500">
          Actions prioritaires detectees.
        </p>
      </div>

      <div className="space-y-3">

        {priorities.map((priority) => (

          <div
            key={priority.label}
            className="flex items-center justify-between rounded-2xl bg-slate-50 p-4"
          >

            <div>
              <p className="text-sm font-black text-slate-900">
                {priority.label}
              </p>

              <p className="mt-1 text-sm text-slate-500">
                {priority.value}
              </p>
            </div>

            <ERPBadge tone="warning">
              Action
            </ERPBadge>

          </div>
        ))}

      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-runtime\ERPSmartRecommendationsPanel.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPSmartRecommendations } from "@/runtime/smart-runtime";

interface ERPSmartRecommendationsPanelProps {
  module: ERPModule;
}

export function ERPSmartRecommendationsPanel({
  module,
}: ERPSmartRecommendationsPanelProps) {

  const recommendations =
    ERPSmartRecommendations.generate(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">

      <div className="mb-5">
        <h2 className="text-lg font-black text-slate-950">
          Recommandations ERP
        </h2>

        <p className="text-sm text-slate-500">
          Suggestions generees par le runtime intelligent.
        </p>
      </div>

      <div className="space-y-3">

        {recommendations.map((recommendation) => (

          <div
            key={recommendation}
            className="rounded-2xl border border-slate-100 bg-blue-50 p-4"
          >
            <p className="text-sm font-medium text-blue-950">
              {recommendation}
            </p>
          </div>

        ))}

      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-runtime\ERPSmartRuntimePanel.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { ERPSmartInsightsPanel } from "./ERPSmartInsightsPanel";
import { ERPSmartPriorityPanel } from "./ERPSmartPriorityPanel";
import { ERPSmartRecommendationsPanel } from "./ERPSmartRecommendationsPanel";

interface ERPSmartRuntimePanelProps {
  module: ERPModule;
}

export function ERPSmartRuntimePanel({
  module,
}: ERPSmartRuntimePanelProps) {

  return (
    <div className="space-y-6">

      <ERPSmartInsightsPanel module={module} />

      <div className="grid gap-6 xl:grid-cols-2">

        <ERPSmartPriorityPanel module={module} />

        <ERPSmartRecommendationsPanel module={module} />

      </div>

    </div>
  );
}
'@

WriteFile "src\components\erp\smart-runtime\index.ts" @'
export { ERPSmartRuntimePanel } from "./ERPSmartRuntimePanel";
export { ERPSmartInsightsPanel } from "./ERPSmartInsightsPanel";
export { ERPSmartPriorityPanel } from "./ERPSmartPriorityPanel";
export { ERPSmartRecommendationsPanel } from "./ERPSmartRecommendationsPanel";
'@

WriteFile "src\components\erp\workspace\ERPWorkspaceLayout.tsx" @'
import type { ReactNode } from "react";
import type { ERPModule } from "@/runtime/modules";

import { ERPWorkspaceActivity } from "./ERPWorkspaceActivity";
import { ERPWorkspaceCommandCenter } from "./ERPWorkspaceCommandCenter";
import { ERPWorkspaceContextPanel } from "./ERPWorkspaceContextPanel";
import { ERPWorkspaceQuickActions } from "./ERPWorkspaceQuickActions";
import { ERPWorkspaceTabs } from "./ERPWorkspaceTabs";

import { ERPLiveOperationalPanel } from "@/components/erp/live-operational";
import { ERPSmartRuntimePanel } from "@/components/erp/smart-runtime";

interface ERPWorkspaceLayoutProps {
  module: ERPModule;
  children: ReactNode;
}

export function ERPWorkspaceLayout({
  module,
  children,
}: ERPWorkspaceLayoutProps) {

  return (
    <div className="space-y-8">

      <ERPWorkspaceQuickActions module={module} />

      <ERPWorkspaceTabs />

      <ERPLiveOperationalPanel module={module} />

      <ERPSmartRuntimePanel module={module} />

      <section className="grid gap-8 2xl:grid-cols-[1fr_380px]">

        <div>
          {children}
        </div>

        <aside className="space-y-6">

          <ERPWorkspaceContextPanel module={module} />

          <ERPWorkspaceCommandCenter module={module} />

          <ERPWorkspaceActivity module={module} />

        </aside>

      </section>
    </div>
  );
}
'@

Set-Location $projectRoot

pnpm build

Write-Host ""
Write-Host "=== SMART RUNTIME ERP TERMINE ===" -ForegroundColor Green
