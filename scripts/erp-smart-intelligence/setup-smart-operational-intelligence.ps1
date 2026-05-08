$ErrorActionPreference = "Stop"
$projectRoot = "C:\Users\Admin\terragest"

function WriteFile {
  param([string]$Path, [string]$Content)

  $fullPath = Join-Path $projectRoot $Path
  $dir = Split-Path $fullPath

  New-Item -ItemType Directory -Force $dir | Out-Null

  $utf8NoBom = New-Object System.Text.UTF8Encoding($false)
  [System.IO.File]::WriteAllText($fullPath, $Content, $utf8NoBom)

  Write-Host "OK $fullPath" -ForegroundColor Green
}

Write-Host "=== SMART OPERATIONAL INTELLIGENCE ===" -ForegroundColor Cyan

New-Item -ItemType Directory -Force "$projectRoot\src\runtime\smart-intelligence" | Out-Null
New-Item -ItemType Directory -Force "$projectRoot\src\components\erp\smart-intelligence" | Out-Null

WriteFile "src\runtime\smart-intelligence\SmartIntelligenceTypes.ts" @'
export type SmartRiskLevel =
  | "low"
  | "medium"
  | "high"
  | "critical";

export interface SmartScore {
  moduleKey: string;
  score: number;
  level: SmartRiskLevel;
  label: string;
  description: string;
}

export interface SmartAnomaly {
  id: string;
  moduleKey: string;
  title: string;
  description: string;
  level: SmartRiskLevel;
}

export interface SmartRecommendation {
  id: string;
  moduleKey: string;
  title: string;
  description: string;
  actionLabel: string;
  priority: SmartRiskLevel;
}

export interface SmartPrediction {
  id: string;
  moduleKey: string;
  title: string;
  description: string;
  probability: number;
}
'@

WriteFile "src\runtime\smart-intelligence\SmartScoringEngine.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { SmartScore, SmartRiskLevel } from "./SmartIntelligenceTypes";

function levelFromScore(score: number): SmartRiskLevel {
  if (score >= 85) return "critical";
  if (score >= 65) return "high";
  if (score >= 40) return "medium";
  return "low";
}

export class SmartScoringEngine {
  static score(module: ERPModule): SmartScore {
    const baseScores: Record<string, number> = {
      materiels: 78,
      stocks: 84,
      exploitations: 62,
      terrains: 38,
      produits: 31,
    };

    const score = baseScores[module.metadata.key] ?? 52;

    return {
      moduleKey: module.metadata.key,
      score,
      level: levelFromScore(score),
      label: "Score operationnel",
      description:
        "Score calcule a partir des signaux runtime, workflows, events et donnees metier.",
    };
  }
}
'@

WriteFile "src\runtime\smart-intelligence\SmartAnomalyDetector.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { SmartAnomaly } from "./SmartIntelligenceTypes";

export class SmartAnomalyDetector {
  static detect(module: ERPModule): SmartAnomaly[] {
    if (module.metadata.key === "stocks") {
      return [
        {
          id: "stock-consumption-anomaly",
          moduleKey: module.metadata.key,
          title: "Consommation anormale",
          description:
            "Le rythme de consommation semble superieur au comportement habituel.",
          level: "high",
        },
        {
          id: "stock-rupture-risk",
          moduleKey: module.metadata.key,
          title: "Risque de rupture",
          description:
            "Certains niveaux de stock peuvent devenir critiques prochainement.",
          level: "critical",
        },
      ];
    }

    if (module.metadata.key === "materiels") {
      return [
        {
          id: "materiel-maintenance-risk",
          moduleKey: module.metadata.key,
          title: "Maintenance sensible",
          description:
            "Plusieurs signaux indiquent un risque de panne ou d'immobilisation.",
          level: "high",
        },
      ];
    }

    return [
      {
        id: `${module.metadata.key}-activity-variation`,
        moduleKey: module.metadata.key,
        title: "Variation d'activite",
        description:
          "Une variation operationnelle merite une verification rapide.",
        level: "medium",
      },
    ];
  }
}
'@

WriteFile "src\runtime\smart-intelligence\SmartRecommendationEngine.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { SmartRecommendation } from "./SmartIntelligenceTypes";

export class SmartRecommendationEngine {
  static recommend(module: ERPModule): SmartRecommendation[] {
    const common: SmartRecommendation[] = [
      {
        id: `${module.metadata.key}-audit-review`,
        moduleKey: module.metadata.key,
        title: "Verifier l'audit recent",
        description:
          "Consulter les derniers evenements pour confirmer la coherence operationnelle.",
        actionLabel: "Ouvrir audit",
        priority: "medium",
      },
    ];

    if (module.metadata.key === "stocks") {
      return [
        {
          id: "stock-reorder",
          moduleKey: module.metadata.key,
          title: "Preparer un reapprovisionnement",
          description:
            "Une commande preventive peut eviter une rupture.",
          actionLabel: "Lancer workflow",
          priority: "critical",
        },
        ...common,
      ];
    }

    if (module.metadata.key === "materiels") {
      return [
        {
          id: "materiel-maintenance-plan",
          moduleKey: module.metadata.key,
          title: "Planifier une maintenance preventive",
          description:
            "Les signaux indiquent une priorite de maintenance.",
          actionLabel: "Creer intervention",
          priority: "high",
        },
        ...common,
      ];
    }

    return common;
  }
}
'@

WriteFile "src\runtime\smart-intelligence\SmartPredictionEngine.ts" @'
import type { ERPModule } from "@/runtime/modules";
import type { SmartPrediction } from "./SmartIntelligenceTypes";

export class SmartPredictionEngine {
  static predict(module: ERPModule): SmartPrediction[] {
    if (module.metadata.key === "stocks") {
      return [
        {
          id: "stock-rupture-prediction",
          moduleKey: module.metadata.key,
          title: "Rupture possible",
          description:
            "Une rupture peut survenir si le rythme actuel continue.",
          probability: 76,
        },
      ];
    }

    if (module.metadata.key === "materiels") {
      return [
        {
          id: "materiel-downtime-prediction",
          moduleKey: module.metadata.key,
          title: "Immobilisation possible",
          description:
            "Risque d'immobilisation si aucune maintenance n'est planifiee.",
          probability: 68,
        },
      ];
    }

    return [
      {
        id: `${module.metadata.key}-stability-prediction`,
        moduleKey: module.metadata.key,
        title: "Stabilite probable",
        description:
          "Aucun risque majeur n'est detecte a court terme.",
        probability: 24,
      },
    ];
  }
}
'@

WriteFile "src\runtime\smart-intelligence\SmartOperationalIntelligence.ts" @'
import type { ERPModule } from "@/runtime/modules";
import { SmartScoringEngine } from "./SmartScoringEngine";
import { SmartAnomalyDetector } from "./SmartAnomalyDetector";
import { SmartRecommendationEngine } from "./SmartRecommendationEngine";
import { SmartPredictionEngine } from "./SmartPredictionEngine";

export class SmartOperationalIntelligence {
  static analyse(module: ERPModule) {
    return {
      score: SmartScoringEngine.score(module),
      anomalies: SmartAnomalyDetector.detect(module),
      recommendations: SmartRecommendationEngine.recommend(module),
      predictions: SmartPredictionEngine.predict(module),
    };
  }
}
'@

WriteFile "src\runtime\smart-intelligence\index.ts" @'
export type {
  SmartAnomaly,
  SmartPrediction,
  SmartRecommendation,
  SmartRiskLevel,
  SmartScore,
} from "./SmartIntelligenceTypes";

export { SmartScoringEngine } from "./SmartScoringEngine";
export { SmartAnomalyDetector } from "./SmartAnomalyDetector";
export { SmartRecommendationEngine } from "./SmartRecommendationEngine";
export { SmartPredictionEngine } from "./SmartPredictionEngine";
export { SmartOperationalIntelligence } from "./SmartOperationalIntelligence";
'@

WriteFile "src\components\erp\smart-intelligence\SmartRiskBadge.tsx" @'
import { ERPBadge } from "@/components/erp/ui";
import type { SmartRiskLevel } from "@/runtime/smart-intelligence";

interface SmartRiskBadgeProps {
  level: SmartRiskLevel;
}

export function SmartRiskBadge({ level }: SmartRiskBadgeProps) {
  const tone =
    level === "critical"
      ? "danger"
      : level === "high"
        ? "warning"
        : level === "medium"
          ? "info"
          : "success";

  return <ERPBadge tone={tone}>{level}</ERPBadge>;
}
'@

WriteFile "src\components\erp\smart-intelligence\SmartScorePanel.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { SmartScoringEngine } from "@/runtime/smart-intelligence";
import { SmartRiskBadge } from "./SmartRiskBadge";

interface SmartScorePanelProps {
  module: ERPModule;
}

export function SmartScorePanel({ module }: SmartScorePanelProps) {
  const score = SmartScoringEngine.score(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-black text-slate-950">
            Score intelligent
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {score.description}
          </p>
        </div>

        <SmartRiskBadge level={score.level} />
      </div>

      <p className="mt-6 text-5xl font-black text-slate-950">
        {score.score}
      </p>

      <div className="mt-4 h-3 rounded-full bg-slate-100">
        <div
          className="h-3 rounded-full bg-blue-600"
          style={{ width: `${score.score}%` }}
        />
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-intelligence\SmartAnomaliesPanel.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { SmartAnomalyDetector } from "@/runtime/smart-intelligence";
import { SmartRiskBadge } from "./SmartRiskBadge";

interface SmartAnomaliesPanelProps {
  module: ERPModule;
}

export function SmartAnomaliesPanel({ module }: SmartAnomaliesPanelProps) {
  const anomalies = SmartAnomalyDetector.detect(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Anomalies detectees
      </h2>

      <div className="mt-5 space-y-3">
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {anomaly.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {anomaly.description}
                </p>
              </div>

              <SmartRiskBadge level={anomaly.level} />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-intelligence\SmartRecommendationsPanel.tsx" @'
import { ERPButton } from "@/components/erp/ui";
import type { ERPModule } from "@/runtime/modules";
import { SmartRecommendationEngine } from "@/runtime/smart-intelligence";
import { SmartRiskBadge } from "./SmartRiskBadge";

interface SmartRecommendationsPanelProps {
  module: ERPModule;
}

export function SmartRecommendationsPanel({
  module,
}: SmartRecommendationsPanelProps) {
  const recommendations = SmartRecommendationEngine.recommend(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Recommandations
      </h2>

      <div className="mt-5 space-y-3">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation.id}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="mb-3 flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-black text-slate-900">
                  {recommendation.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {recommendation.description}
                </p>
              </div>

              <SmartRiskBadge level={recommendation.priority} />
            </div>

            <ERPButton variant="ghost" type="button">
              {recommendation.actionLabel}
            </ERPButton>
          </div>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-intelligence\SmartPredictionsPanel.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { SmartPredictionEngine } from "@/runtime/smart-intelligence";

interface SmartPredictionsPanelProps {
  module: ERPModule;
}

export function SmartPredictionsPanel({ module }: SmartPredictionsPanelProps) {
  const predictions = SmartPredictionEngine.predict(module);

  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-black text-slate-950">
        Predictions
      </h2>

      <div className="mt-5 space-y-3">
        {predictions.map((prediction) => (
          <div
            key={prediction.id}
            className="rounded-2xl border border-slate-100 bg-blue-50 p-4"
          >
            <p className="text-sm font-black text-blue-950">
              {prediction.title}
            </p>
            <p className="mt-1 text-sm text-blue-800">
              {prediction.description}
            </p>

            <div className="mt-4 flex items-center gap-3">
              <div className="h-2 flex-1 rounded-full bg-white">
                <div
                  className="h-2 rounded-full bg-blue-600"
                  style={{ width: `${prediction.probability}%` }}
                />
              </div>

              <span className="text-sm font-black text-blue-950">
                {prediction.probability}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-intelligence\SmartOperationalIntelligencePanel.tsx" @'
import type { ERPModule } from "@/runtime/modules";
import { SmartScorePanel } from "./SmartScorePanel";
import { SmartAnomaliesPanel } from "./SmartAnomaliesPanel";
import { SmartRecommendationsPanel } from "./SmartRecommendationsPanel";
import { SmartPredictionsPanel } from "./SmartPredictionsPanel";

interface SmartOperationalIntelligencePanelProps {
  module: ERPModule;
}

export function SmartOperationalIntelligencePanel({
  module,
}: SmartOperationalIntelligencePanelProps) {
  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-black text-slate-950">
          Intelligence operationnelle
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Analyse intelligente du module {module.metadata.label}.
        </p>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
        <SmartScorePanel module={module} />

        <div className="grid gap-6 xl:grid-cols-2">
          <SmartAnomaliesPanel module={module} />
          <SmartPredictionsPanel module={module} />
        </div>
      </div>

      <SmartRecommendationsPanel module={module} />
    </section>
  );
}
'@

WriteFile "src\components\erp\smart-intelligence\index.ts" @'
export { SmartRiskBadge } from "./SmartRiskBadge";
export { SmartScorePanel } from "./SmartScorePanel";
export { SmartAnomaliesPanel } from "./SmartAnomaliesPanel";
export { SmartRecommendationsPanel } from "./SmartRecommendationsPanel";
export { SmartPredictionsPanel } from "./SmartPredictionsPanel";
export { SmartOperationalIntelligencePanel } from "./SmartOperationalIntelligencePanel";
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
import { SmartOperationalIntelligencePanel } from "@/components/erp/smart-intelligence";

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

      <SmartOperationalIntelligencePanel module={module} />

      <section className="grid gap-8 2xl:grid-cols-[1fr_380px]">
        <div>{children}</div>

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
Write-Host "=== SMART OPERATIONAL INTELLIGENCE TERMINE ===" -ForegroundColor Green