const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  erpModule: "src/runtime/modules/ERPModule.ts",
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  factures: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
};

function filePath(rel) {
  return path.join(ROOT, rel);
}

function read(rel) {
  const file = filePath(rel);
  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + rel);
  }
  return fs.readFileSync(file, "utf8");
}

function write(rel, content) {
  fs.writeFileSync(filePath(rel), content, "utf8");
}

function backup(rel, suffix) {
  fs.writeFileSync(filePath(rel) + suffix, read(rel), "utf8");
}

let erpModule = read(files.erpModule);
backup(files.erpModule, ".bak-q2i-jc-b-tree-summary-config");

if (!erpModule.includes("export interface ERPOperationalTreeSummaryBadgeConfig")) {
  const anchor = "export interface ERPOperationalTreeConfig {";

  const insert = `export interface ERPOperationalTreeSummaryBadgeConfig {
  label?: string;
  field?: string;
  tone?: "default" | "success" | "warning" | "danger" | "info";
  valueMap?: Record<string, string>;
  toneMap?: Record<string, "default" | "success" | "warning" | "danger" | "info">;
}

export interface ERPOperationalTreeSummaryMetricConfig {
  label: string;
  field: string;
  format?: "text" | "number" | "currency" | "percent";
}

export interface ERPOperationalTreeSummaryConfig {
  rootOnly?: boolean;
  badges?: ERPOperationalTreeSummaryBadgeConfig[];
  metrics?: ERPOperationalTreeSummaryMetricConfig[];
}

`;

  if (!erpModule.includes(anchor)) {
    throw new Error("ERPModule tree config anchor not found.");
  }

  erpModule = erpModule.replace(anchor, insert + anchor);
  console.log("[ADDED] ERPOperationalTreeSummaryConfig types");
} else {
  console.log("[SKIP] Summary config types already exist");
}

if (!/summary\?: ERPOperationalTreeSummaryConfig;/.test(erpModule)) {
  const anchor = "  placement?: ERPOperationalTreePlacement;";

  if (!erpModule.includes(anchor)) {
    throw new Error("ERPOperationalTreeConfig placement anchor not found.");
  }

  erpModule = erpModule.replace(anchor, anchor + "\n  summary?: ERPOperationalTreeSummaryConfig;");
  console.log("[ADDED] ERPOperationalTreeConfig.summary");
} else {
  console.log("[SKIP] ERPOperationalTreeConfig.summary already exists");
}

write(files.erpModule, erpModule);

let resolver = read(files.resolver);
backup(files.resolver, ".bak-q2i-jc-b-summary-mapping");

if (!resolver.includes("function buildRuntimeOperationalTreeSummary(")) {
  const anchor = "function getRecordValue(";

  const helper = `function normalizeSummaryLabel(value: unknown): string {
  if (value === null || value === undefined || value === "") {
    return "";
  }

  return String(value).replace(/_/g, " ").trim();
}

function buildRuntimeOperationalTreeSummary(params: {
  module: ERPModule;
  record: Record<string, unknown>;
  depth: number;
}): RuntimeOperationalTreeSummary | undefined {
  const summaryConfig = params.module.operational?.tree?.summary;

  if (!summaryConfig) {
    return undefined;
  }

  if (summaryConfig.rootOnly !== false && params.depth > 0) {
    return undefined;
  }

  const badges =
    summaryConfig.badges
      ?.map((badgeConfig) => {
        const rawValue = badgeConfig.field
          ? getRecordValue(params.record, badgeConfig.field)
          : badgeConfig.label;

        const rawKey = rawValue === null || rawValue === undefined ? "" : String(rawValue);
        const mappedLabel =
          rawKey && badgeConfig.valueMap?.[rawKey]
            ? badgeConfig.valueMap[rawKey]
            : badgeConfig.label ?? normalizeSummaryLabel(rawValue);

        if (!mappedLabel) {
          return null;
        }

        return {
          label: mappedLabel,
          tone:
            rawKey && badgeConfig.toneMap?.[rawKey]
              ? badgeConfig.toneMap[rawKey]
              : badgeConfig.tone,
        };
      })
      .filter(Boolean) ?? [];

  const metrics =
    summaryConfig.metrics
      ?.map((metricConfig) => {
        const value = getRecordValue(params.record, metricConfig.field);

        if (value === undefined || value === null || value === "") {
          return null;
        }

        return {
          label: metricConfig.label,
          value,
          format: metricConfig.format,
        };
      })
      .filter(Boolean) ?? [];

  if (badges.length === 0 && metrics.length === 0) {
    return undefined;
  }

  return {
    badges: badges as RuntimeOperationalTreeSummaryBadge[],
    metrics: metrics as RuntimeOperationalTreeSummaryMetric[],
  };
}

`;

  if (!resolver.includes(anchor)) {
    throw new Error("Resolver getRecordValue anchor not found.");
  }

  resolver = resolver.replace(anchor, helper + anchor);
  console.log("[ADDED] buildRuntimeOperationalTreeSummary helper");
} else {
  console.log("[SKIP] Summary mapping helper already exists");
}

if (!resolver.includes("summary: buildRuntimeOperationalTreeSummary")) {
  const anchor = "    source: buildRuntimeOperationalTreeSource(record),";

  if (!resolver.includes(anchor)) {
    throw new Error("Resolver node source anchor not found.");
  }

  resolver = resolver.replace(
    anchor,
    anchor + "\n    summary: buildRuntimeOperationalTreeSummary({ module, record, depth }),"
  );
  console.log("[ADDED] node.summary mapping");
} else {
  console.log("[SKIP] node.summary mapping already exists");
}

write(files.resolver, resolver);

let factures = read(files.factures);
backup(files.factures, ".bak-q2i-jc-b-invoice-summary-config");

if (!factures.includes("summary: {")) {
  const treeAnchor = `tree: {`;

  if (!factures.includes(treeAnchor)) {
    throw new Error("facturesauto operational.tree anchor not found. Inspect metadata before patch.");
  }

  const summaryConfig = `tree: {
      summary: {
        rootOnly: true,
        badges: [
          {
            field: "typeFacture",
            valueMap: {
              atelier: "FACTURE ATELIER",
              boutique: "FACTURE BOUTIQUE",
              mixte: "FACTURE MIXTE",
            },
            tone: "info",
          },
          {
            field: "statutFacture",
            valueMap: {
              brouillon: "BROUILLON",
              emise: "ÉMISE",
              annulee: "ANNULÉE",
            },
            toneMap: {
              brouillon: "warning",
              emise: "success",
              annulee: "danger",
            },
          },
          {
            field: "statutPaiement",
            valueMap: {
              en_attente: "PAIEMENT EN ATTENTE",
              partiel: "PAIEMENT PARTIEL",
              paye: "PAYÉE",
            },
            toneMap: {
              en_attente: "warning",
              partiel: "warning",
              paye: "success",
            },
          },
        ],
        metrics: [
          { label: "HT", field: "montantHT", format: "currency" },
          { label: "TVA", field: "tva", format: "currency" },
          { label: "TTC", field: "montantTTC", format: "currency" },
          { label: "Payé", field: "montantPaye", format: "currency" },
          { label: "Reste", field: "resteAPayer", format: "currency" },
        ],
      },`;

  factures = factures.replace(treeAnchor, summaryConfig);
  console.log("[ADDED] facturesauto operational.tree.summary config");
} else {
  console.log("[SKIP] facturesauto summary config already exists");
}

write(files.factures, factures);

console.log("[DONE] Q2-I-J-C-B invoice summary metadata mapping added.");
console.log("[WRITTEN]", files.erpModule);
console.log("[WRITTEN]", files.resolver);
console.log("[WRITTEN]", files.factures);
