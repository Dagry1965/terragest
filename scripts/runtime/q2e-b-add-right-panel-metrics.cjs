const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  rightPanel: "src/components/erp/operational/ERPOperationalRightPanel.tsx",
  rendezvous: "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  interventions: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
};

function abs(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = abs(rel);

  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + rel);
  }

  return fs.readFileSync(file, "utf8");
}

function write(rel, content) {
  fs.writeFileSync(abs(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

function backup(rel, suffix) {
  const file = abs(rel);
  fs.writeFileSync(file + suffix, fs.readFileSync(file, "utf8"), "utf8");
  console.log("[BACKUP]", rel + suffix);
}

/**
 * 1. ERPModule.ts : ajouter ERPOperationalRightPanelMetricConfig.
 */
{
  const rel = files.erpModule;
  backup(rel, ".bak-q2e-b-right-panel-metrics-contract");

  let content = read(rel);

  if (!content.includes("ERPOperationalRightPanelMetricConfig")) {
    const marker = "export interface ERPOperationalRightPanelConfig {";

    if (!content.includes(marker)) {
      throw new Error("Point insertion introuvable: ERPOperationalRightPanelConfig");
    }

    const metricContract = `export type ERPOperationalRightPanelMetricType =
  | "count"
  | "countWhere"
  | "sum"
  | "average";

export type ERPOperationalRightPanelMetricFormat =
  | "number"
  | "currency"
  | "percent";

export interface ERPOperationalRightPanelMetricConfig {
  key: string;
  label: string;
  type: ERPOperationalRightPanelMetricType;
  field?: string;
  equals?: unknown;
  format?: ERPOperationalRightPanelMetricFormat;
  currency?: string;
}

`;

    content = content.replace(marker, metricContract + marker);
  }

  if (!content.includes("metrics?: ERPOperationalRightPanelMetricConfig[];")) {
    content = content.replace(
      /export interface ERPOperationalRightPanelConfig \{\s*/,
      (match) => `${match}  metrics?: ERPOperationalRightPanelMetricConfig[];\n`
    );
  }

  if (!content.includes("metrics?: ERPOperationalRightPanelMetricConfig[];")) {
    throw new Error("metrics non ajouté dans ERPOperationalRightPanelConfig");
  }

  write(rel, content);
}

/**
 * 2. ERPOperationalRightPanel.tsx : rendre les métriques metadata-driven.
 */
{
  const rel = files.rightPanel;
  backup(rel, ".bak-q2e-b-right-panel-metrics-renderer");

  const content = `"use client";

import type {
  ERPModule,
  ERPOperationalRightPanelMetricConfig,
} from "@/runtime/modules/ERPModule";

type ERPOperationalRightPanelProps = {
  module: ERPModule;
  data: Record<string, unknown>[];
};

function getRecordNumber(
  record: Record<string, unknown>,
  field?: string
): number {
  if (!field) return 0;

  const value = record[field];

  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  if (typeof value === "string") {
    const normalized = value.replace(/\\s/g, "").replace(",", ".");
    const parsed = Number(normalized);

    return Number.isFinite(parsed) ? parsed : 0;
  }

  return 0;
}

function matchesMetricFilter(
  record: Record<string, unknown>,
  metric: ERPOperationalRightPanelMetricConfig
): boolean {
  if (!metric.field) {
    return true;
  }

  if (!Object.prototype.hasOwnProperty.call(metric, "equals")) {
    return true;
  }

  return String(record[metric.field] ?? "") === String(metric.equals ?? "");
}

function resolveMetricValue(
  data: Record<string, unknown>[],
  metric: ERPOperationalRightPanelMetricConfig
): number {
  if (metric.type === "count") {
    return data.length;
  }

  if (metric.type === "countWhere") {
    return data.filter((record) => matchesMetricFilter(record, metric)).length;
  }

  if (metric.type === "sum") {
    return data.reduce(
      (total, record) => total + getRecordNumber(record, metric.field),
      0
    );
  }

  if (metric.type === "average") {
    const values = data
      .map((record) => getRecordNumber(record, metric.field))
      .filter((value) => Number.isFinite(value));

    if (values.length === 0) {
      return 0;
    }

    return values.reduce((total, value) => total + value, 0) / values.length;
  }

  return 0;
}

function formatMetricValue(
  value: number,
  metric: ERPOperationalRightPanelMetricConfig
): string {
  if (metric.format === "currency") {
    const formatted = new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(value);

    return metric.currency ? \`\${formatted} \${metric.currency}\` : formatted;
  }

  if (metric.format === "percent") {
    return \`\${new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 1,
    }).format(value)} %\`;
  }

  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 1,
  }).format(value);
}

function getDefaultMetrics(): ERPOperationalRightPanelMetricConfig[] {
  return [
    {
      key: "total",
      label: "Total affiché",
      type: "count",
      format: "number",
    },
  ];
}

export function ERPOperationalRightPanel({
  module,
  data,
}: ERPOperationalRightPanelProps) {
  const panel = module.operational?.rightPanel;

  if (!panel?.enabled) {
    return null;
  }

  const metrics = panel.metrics?.length ? panel.metrics : getDefaultMetrics();

  return (
    <aside className="rounded-[1.7rem] border border-amber-100 bg-[#FFF9EA] p-5 text-[#10251C] shadow-[0_18px_55px_rgba(146,99,12,0.10)]">
      <div>
        <p className="text-[11px] font-black uppercase tracking-[0.22em] text-amber-700">
          {panel.type ?? "summary"}
        </p>

        <h2 className="mt-2 text-xl font-black">
          {panel.title ?? "Panneau opérationnel"}
        </h2>

        <p className="mt-2 text-sm font-semibold leading-6 text-slate-600">
          Synthèse runtime liée au module {module.metadata.label}.
        </p>
      </div>

      <div className="mt-5 grid gap-3">
        {metrics.map((metric) => {
          const value = resolveMetricValue(data, metric);

          return (
            <div
              key={metric.key}
              className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm"
            >
              <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                {metric.label}
              </p>

              <p className="mt-2 text-2xl font-black text-[#10251C]">
                {formatMetricValue(value, metric)}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
`;

  write(rel, content);
}

/**
 * 3. Ajouter des metrics génériques dans les 3 modules.
 */
function insertMetricsInRightPanel(content, moduleName, metricsBlock) {
  const rightPanelIndex = content.indexOf("rightPanel:");

  if (rightPanelIndex < 0) {
    throw new Error("rightPanel introuvable pour " + moduleName);
  }

  const rightPanelEnd = content.indexOf("}", rightPanelIndex);

  if (rightPanelEnd < 0) {
    throw new Error("Fin rightPanel introuvable pour " + moduleName);
  }

  const rightPanelBlock = content.slice(rightPanelIndex, rightPanelEnd);

  if (rightPanelBlock.includes("metrics:")) {
    console.log("[SKIP] metrics déjà présent:", moduleName);
    return content;
  }

  const typeLine = content.indexOf("type:", rightPanelIndex);

  if (typeLine < 0 || typeLine > rightPanelEnd) {
    throw new Error("type introuvable dans rightPanel pour " + moduleName);
  }

  const lineEnd = content.indexOf("\n", typeLine);

  return content.slice(0, lineEnd + 1) + metricsBlock + content.slice(lineEnd + 1);
}

{
  const rel = files.rendezvous;
  backup(rel, ".bak-q2e-b-right-panel-metrics");

  let content = read(rel);

  content = insertMetricsInRightPanel(
    content,
    "rendezvous",
`      metrics: [
        {
          key: "total",
          label: "Rendez-vous affichés",
          type: "count",
          format: "number",
        },
        {
          key: "confirmes",
          label: "Confirmés",
          type: "countWhere",
          field: "statut",
          equals: "confirme",
          format: "number",
        },
        {
          key: "en_cours",
          label: "En cours",
          type: "countWhere",
          field: "statut",
          equals: "en_cours",
          format: "number",
        },
      ],
`
  );

  write(rel, content);
}

{
  const rel = files.interventions;
  backup(rel, ".bak-q2e-b-right-panel-metrics");

  let content = read(rel);

  content = insertMetricsInRightPanel(
    content,
    "interventionsauto",
`      metrics: [
        {
          key: "total",
          label: "Interventions affichées",
          type: "count",
          format: "number",
        },
        {
          key: "en_cours",
          label: "En cours",
          type: "countWhere",
          field: "statut",
          equals: "en_cours",
          format: "number",
        },
        {
          key: "cout_total",
          label: "Coût total",
          type: "sum",
          field: "coutTotal",
          format: "currency",
          currency: "FCFA",
        },
      ],
`
  );

  write(rel, content);
}

{
  const rel = files.factures;
  backup(rel, ".bak-q2e-b-right-panel-metrics");

  let content = read(rel);

  content = insertMetricsInRightPanel(
    content,
    "facturesauto",
`      metrics: [
        {
          key: "total",
          label: "Factures affichées",
          type: "count",
          format: "number",
        },
        {
          key: "montant_ttc",
          label: "Montant TTC",
          type: "sum",
          field: "montantTTC",
          format: "currency",
          currency: "FCFA",
        },
        {
          key: "reste_a_payer",
          label: "Reste à payer",
          type: "sum",
          field: "resteAPayer",
          format: "currency",
          currency: "FCFA",
        },
      ],
`
  );

  write(rel, content);
}

console.log("");
console.log("[DONE] Q2-E-B rightPanel.metrics ajouté et rendu.");
console.log("");
console.log("Next:");
console.log("pnpm build");
