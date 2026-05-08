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
    $BackupDir = Join-Path $ProjectRoot "backup\enterprise-ai-layer"
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
Write-Host "ENTERPRISE AI LAYER" -ForegroundColor Cyan
Write-Host ""

Ensure-Dir "src\runtime\ai"
Ensure-Dir "src\runtime\ai\insights"
Ensure-Dir "src\runtime\ai\recommendations"
Ensure-Dir "src\runtime\ai\anomalies"
Ensure-Dir "src\runtime\ai\search"
Ensure-Dir "src\runtime\ai\assistant"
Ensure-Dir "src\components\erp\ai"

Write-Utf8 "src\runtime\ai\insights\ERPAIInsight.ts" @'
export type ERPAIInsightLevel =
  | "info"
  | "warning"
  | "critical";

export type ERPAIInsight = {
  id: string;
  title: string;
  description: string;
  module: string;
  level: ERPAIInsightLevel;
  confidence: number;
  createdAt: string;
};
'@

Write-Utf8 "src\runtime\ai\recommendations\ERPAIRecommendation.ts" @'
export type ERPAIRecommendation = {
  id: string;
  title: string;
  description: string;
  module: string;
  impact: "low" | "medium" | "high";
  actionLabel?: string;
  createdAt: string;
};
'@

Write-Utf8 "src\runtime\ai\anomalies\ERPAIAnomaly.ts" @'
export type ERPAIAnomaly = {
  id: string;
  module: string;
  signal: string;
  severity: "low" | "medium" | "high";
  description: string;
  detectedAt: string;
};
'@

Write-Utf8 "src\runtime\ai\search\ERPSemanticSearchResult.ts" @'
export type ERPSemanticSearchResult = {
  id: string;
  title: string;
  source: string;
  score: number;
  excerpt: string;
};
'@

Write-Utf8 "src\runtime\ai\assistant\ERPAIAssistantMessage.ts" @'
export type ERPAIAssistantMessage = {
  id: string;
  role: "assistant" | "system";
  content: string;
  createdAt: string;
};
'@

Write-Utf8 "src\runtime\ai\insights\ERPAIInsightEngine.ts" @'
import { ERPRegistry } from "@/runtime/registry";
import { getERPMonitoringSnapshot } from "@/runtime/monitoring";
import type { ERPAIInsight } from "./ERPAIInsight";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function generateERPAIInsights(): ERPAIInsight[] {
  const monitoring = getERPMonitoringSnapshot();
  const modules = ERPRegistry.modules();

  return [
    {
      id: createId("ai_insight"),
      title: "Couverture runtime elevee",
      description: `${modules.length} modules sont raccordes au registre ERP central.`,
      module: "runtime",
      level: "info",
      confidence: 92,
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_insight"),
      title: "Surveillance des erreurs active",
      description: `${monitoring.errors.total} signaux d'erreur sont suivis par le Monitoring Center.`,
      module: "monitoring",
      level: monitoring.errors.total > 0 ? "warning" : "info",
      confidence: 88,
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_insight"),
      title: "Architecture SaaS prete",
      description: "Les couches tenant, security, persistence, workers et streams sont presentes.",
      module: "platform",
      level: "info",
      confidence: 86,
      createdAt: new Date().toISOString(),
    },
  ];
}
'@

Write-Utf8 "src\runtime\ai\recommendations\ERPAIRecommendationEngine.ts" @'
import type { ERPAIRecommendation } from "./ERPAIRecommendation";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function generateERPAIRecommendations(): ERPAIRecommendation[] {
  return [
    {
      id: createId("ai_reco"),
      title: "Renforcer les tests de securite",
      description: "Ajouter des cas RBAC par role, module et tenant avant production.",
      module: "security",
      impact: "high",
      actionLabel: "Ajouter tests RBAC",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_reco"),
      title: "Brancher la persistance Firestore",
      description: "Remplacer progressivement le driver in-memory par un driver Firestore tenant-aware.",
      module: "persistence",
      impact: "high",
      actionLabel: "Activer Firestore driver",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_reco"),
      title: "Activer les streams live reels",
      description: "Connecter le Realtime Gateway a Firebase, WebSocket ou SSE.",
      module: "streams",
      impact: "medium",
      actionLabel: "Connecter live backend",
      createdAt: new Date().toISOString(),
    },
  ];
}
'@

Write-Utf8 "src\runtime\ai\anomalies\ERPAIAnomalyDetector.ts" @'
import { getERPMonitoringSnapshot } from "@/runtime/monitoring";
import type { ERPAIAnomaly } from "./ERPAIAnomaly";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function detectERPAIAnomalies(): ERPAIAnomaly[] {
  const monitoring = getERPMonitoringSnapshot();
  const anomalies: ERPAIAnomaly[] = [];

  if (monitoring.errors.total > 0) {
    anomalies.push({
      id: createId("ai_anomaly"),
      module: "monitoring",
      signal: "ERROR_SIGNALS",
      severity: "medium",
      description: `${monitoring.errors.total} signaux d'erreur detectes.`,
      detectedAt: new Date().toISOString(),
    });
  }

  if (monitoring.metrics.healthCritical > 0) {
    anomalies.push({
      id: createId("ai_anomaly"),
      module: "health",
      signal: "CRITICAL_HEALTH",
      severity: "high",
      description: "Des health checks critiques sont presents.",
      detectedAt: new Date().toISOString(),
    });
  }

  return anomalies;
}
'@

Write-Utf8 "src\runtime\ai\search\ERPSemanticRuntimeSearch.ts" @'
import { ERPRegistry } from "@/runtime/registry";
import type { ERPSemanticSearchResult } from "./ERPSemanticSearchResult";

export function searchERPRuntime(
  query: string
): ERPSemanticSearchResult[] {
  const normalized =
    query.toLowerCase().trim();

  return ERPRegistry.modules()
    .filter((module) =>
      module.label.toLowerCase().includes(normalized) ||
      module.key.toLowerCase().includes(normalized) ||
      module.description?.toLowerCase().includes(normalized)
    )
    .map((module, index) => ({
      id: module.key,
      title: module.label,
      source: "Runtime Registry",
      score: 100 - index * 5,
      excerpt:
        module.description ??
        "Module ERP runtime.",
    }));
}
'@

Write-Utf8 "src\runtime\ai\assistant\ERPAIAssistantEngine.ts" @'
import type { ERPAIAssistantMessage } from "./ERPAIAssistantMessage";

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

export function getERPAIAssistantMessages(): ERPAIAssistantMessage[] {
  return [
    {
      id: createId("ai_msg"),
      role: "system",
      content: "AI Runtime Assistant initialise sur le contexte ERP Terragest.",
      createdAt: new Date().toISOString(),
    },
    {
      id: createId("ai_msg"),
      role: "assistant",
      content: "Priorite recommandee : brancher la persistance reelle et renforcer les tests RBAC multi-tenant.",
      createdAt: new Date().toISOString(),
    },
  ];
}
'@

Write-Utf8 "src\runtime\ai\ERPAISnapshot.ts" @'
import { generateERPAIInsights } from "./insights/ERPAIInsightEngine";
import { generateERPAIRecommendations } from "./recommendations/ERPAIRecommendationEngine";
import { detectERPAIAnomalies } from "./anomalies/ERPAIAnomalyDetector";
import { searchERPRuntime } from "./search/ERPSemanticRuntimeSearch";
import { getERPAIAssistantMessages } from "./assistant/ERPAIAssistantEngine";

export function getERPAISnapshot() {
  const insights =
    generateERPAIInsights();

  const recommendations =
    generateERPAIRecommendations();

  const anomalies =
    detectERPAIAnomalies();

  const searchResults =
    searchERPRuntime("materiels");

  const messages =
    getERPAIAssistantMessages();

  return {
    insights,
    recommendations,
    anomalies,
    searchResults,
    messages,
    metrics: {
      insights: insights.length,
      recommendations: recommendations.length,
      anomalies: anomalies.length,
      searchResults: searchResults.length,
      messages: messages.length,
    },
  };
}
'@

Write-Utf8 "src\runtime\ai\index.ts" @'
export * from "./insights/ERPAIInsight";
export * from "./insights/ERPAIInsightEngine";

export * from "./recommendations/ERPAIRecommendation";
export * from "./recommendations/ERPAIRecommendationEngine";

export * from "./anomalies/ERPAIAnomaly";
export * from "./anomalies/ERPAIAnomalyDetector";

export * from "./search/ERPSemanticSearchResult";
export * from "./search/ERPSemanticRuntimeSearch";

export * from "./assistant/ERPAIAssistantMessage";
export * from "./assistant/ERPAIAssistantEngine";

export * from "./ERPAISnapshot";
'@

Write-Utf8 "src\components\erp\ai\ERPAIMetricsGrid.tsx" @'
import { ERPStatCard } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIMetricsGrid({
  snapshot,
}: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
      <ERPStatCard label="Insights" value={snapshot.metrics.insights} helper="Runtime intelligence" />
      <ERPStatCard label="Recommendations" value={snapshot.metrics.recommendations} helper="AI guidance" />
      <ERPStatCard label="Anomalies" value={snapshot.metrics.anomalies} helper="Detection" />
      <ERPStatCard label="Search" value={snapshot.metrics.searchResults} helper="Semantic results" />
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\ai\ERPAIInsightsPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIInsightsPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          AI Insights
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Analyse intelligente du runtime ERP.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.insights.map((insight) => (
          <div
            key={insight.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {insight.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {insight.description}
                </p>
              </div>

              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                {insight.confidence}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\ai\ERPAIRecommendationsPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIRecommendationsPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Recommendations
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Suggestions operationnelles pour renforcer la plateforme.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.recommendations.map((item) => (
          <div
            key={item.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {item.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {item.description}
                </p>
              </div>

              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                {item.impact}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\ai\ERPAIAnomaliesPanel.tsx" @'
import { ERPSection, ERPEmptyState } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAIAnomaliesPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Anomaly Detection
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Detection des signaux runtime inhabituels.
        </p>
      </div>

      {snapshot.anomalies.length === 0 ? (
        <ERPEmptyState
          title="Aucune anomalie"
          description="Aucun signal anormal detecte."
        />
      ) : (
        <div className="space-y-4">
          {snapshot.anomalies.map((anomaly) => (
            <div
              key={anomaly.id}
              className="rounded-2xl border border-amber-200 bg-amber-50 p-5"
            >
              <p className="font-semibold text-amber-900">
                {anomaly.signal}
              </p>
              <p className="mt-1 text-sm text-amber-700">
                {anomaly.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\ai\ERPAISearchPanel.tsx" @'
import { ERPSection } from "@/components/erp/ui";
import type { getERPAISnapshot } from "@/runtime/ai";

type Snapshot = ReturnType<typeof getERPAISnapshot>;

type Props = {
  snapshot: Snapshot;
};

export function ERPAISearchPanel({
  snapshot,
}: Props) {
  return (
    <ERPSection>
      <div className="mb-5">
        <h2 className="text-lg font-semibold text-slate-950">
          Semantic Runtime Search
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Recherche semantique simulee sur le registre ERP.
        </p>
      </div>

      <div className="space-y-4">
        {snapshot.searchResults.map((result) => (
          <div
            key={result.id}
            className="rounded-2xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">
                  {result.title}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  {result.excerpt}
                </p>
              </div>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                {result.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </ERPSection>
  );
}
'@

Write-Utf8 "src\components\erp\ai\ERPAIDashboard.tsx" @'
import { ERPPageHeader } from "@/components/erp/ui";
import { getERPAISnapshot } from "@/runtime/ai";

import { ERPAIMetricsGrid } from "./ERPAIMetricsGrid";
import { ERPAIInsightsPanel } from "./ERPAIInsightsPanel";
import { ERPAIRecommendationsPanel } from "./ERPAIRecommendationsPanel";
import { ERPAIAnomaliesPanel } from "./ERPAIAnomaliesPanel";
import { ERPAISearchPanel } from "./ERPAISearchPanel";

export function ERPAIDashboard() {
  const snapshot = getERPAISnapshot();

  return (
    <div className="space-y-8">
      <ERPPageHeader
        eyebrow="ERP Intelligence"
        title="Enterprise AI Runtime Layer"
        description="Insights, recommandations, detection d'anomalies et recherche semantique runtime."
      />

      <ERPAIMetricsGrid snapshot={snapshot} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <ERPAIInsightsPanel snapshot={snapshot} />
        <ERPAIRecommendationsPanel snapshot={snapshot} />
        <ERPAIAnomaliesPanel snapshot={snapshot} />
        <ERPAISearchPanel snapshot={snapshot} />
      </div>
    </div>
  );
}
'@

Write-Utf8 "src\components\erp\ai\index.ts" @'
export * from "./ERPAIMetricsGrid";
export * from "./ERPAIInsightsPanel";
export * from "./ERPAIRecommendationsPanel";
export * from "./ERPAIAnomaliesPanel";
export * from "./ERPAISearchPanel";
export * from "./ERPAIDashboard";
'@

Write-Utf8 "src\app\(private)\ai-runtime\page.tsx" @'
import { ERPAIDashboard } from "@/components/erp/ai";

export default function Page() {
  return <ERPAIDashboard />;
}
'@

Write-Host ""
Write-Host "ENTERPRISE AI LAYER INSTALLE" -ForegroundColor Green
Write-Host "Executer : pnpm build" -ForegroundColor Yellow