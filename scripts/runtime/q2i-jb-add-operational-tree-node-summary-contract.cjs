const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  resolver: "src/runtime/operational/RuntimeOperationalTreeResolver.ts",
  treeView: "src/components/erp/operational/ERPOperationalTreeView.tsx",
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

let resolver = read(files.resolver);
backup(files.resolver, ".bak-q2i-jb-node-summary-contract");

if (!resolver.includes("export type RuntimeOperationalTreeSummaryTone")) {
  const anchor = "export type RuntimeOperationalTreeNodeRole";

  const insert = `export type RuntimeOperationalTreeSummaryTone =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info";

export type RuntimeOperationalTreeMetricFormat =
  | "text"
  | "number"
  | "currency"
  | "percent";

export interface RuntimeOperationalTreeSummaryBadge {
  label: string;
  tone?: RuntimeOperationalTreeSummaryTone;
}

export interface RuntimeOperationalTreeSummaryMetric {
  label: string;
  value: unknown;
  format?: RuntimeOperationalTreeMetricFormat;
}

export interface RuntimeOperationalTreeSummary {
  badges?: RuntimeOperationalTreeSummaryBadge[];
  metrics?: RuntimeOperationalTreeSummaryMetric[];
}

`;

  if (!resolver.includes(anchor)) {
    throw new Error("Resolver anchor not found: " + anchor);
  }

  resolver = resolver.replace(anchor, insert + anchor);
  console.log("[ADDED] RuntimeOperationalTree summary types");
} else {
  console.log("[SKIP] Summary types already exist");
}

if (!/summary\?: RuntimeOperationalTreeSummary;/.test(resolver)) {
  const anchor = "  source?: RuntimeOperationalTreeSource;";

  if (!resolver.includes(anchor)) {
    throw new Error("RuntimeOperationalTreeNode source anchor not found.");
  }

  resolver = resolver.replace(anchor, anchor + "\n  summary?: RuntimeOperationalTreeSummary;");
  console.log("[ADDED] RuntimeOperationalTreeNode.summary");
} else {
  console.log("[SKIP] RuntimeOperationalTreeNode.summary already exists");
}

write(files.resolver, resolver);

let treeView = read(files.treeView);
backup(files.treeView, ".bak-q2i-jb-render-node-summary");

if (!treeView.includes("function getSummaryToneClassName(")) {
  const anchor = "function getRoleClassName(role: RuntimeOperationalTreeNodeRole): string {";

  const insert = `function getSummaryToneClassName(tone?: string): string {
  switch (tone) {
    case "success":
      return "border-emerald-200 bg-emerald-50 text-emerald-800";
    case "warning":
      return "border-amber-200 bg-amber-50 text-amber-800";
    case "danger":
      return "border-rose-200 bg-rose-50 text-rose-800";
    case "info":
      return "border-cyan-200 bg-cyan-50 text-cyan-800";
    default:
      return "border-slate-200 bg-slate-50 text-slate-700";
  }
}

function formatSummaryMetricValue(value: unknown, format?: string): string {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  if (format === "currency") {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return String(value);
    }

    return new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 0,
    }).format(numberValue);
  }

  if (format === "number") {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return String(value);
    }

    return new Intl.NumberFormat("fr-FR", {
      maximumFractionDigits: 2,
    }).format(numberValue);
  }

  if (format === "percent") {
    const numberValue = Number(value);

    if (!Number.isFinite(numberValue)) {
      return String(value);
    }

    return new Intl.NumberFormat("fr-FR", {
      style: "percent",
      maximumFractionDigits: 1,
    }).format(numberValue);
  }

  return String(value);
}

`;

  if (!treeView.includes(anchor)) {
    throw new Error("TreeView role class anchor not found.");
  }

  treeView = treeView.replace(anchor, insert + anchor);
  console.log("[ADDED] Summary tone + metric format helpers");
} else {
  console.log("[SKIP] Summary helpers already exist");
}

const summaryBlock = `                {node.summary?.badges?.length || node.summary?.metrics?.length ? (
                  <div className="mt-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-2">
                    {node.summary?.badges?.length ? (
                      <div className="flex flex-wrap gap-1.5">
                        {node.summary.badges.map((badge, index) => (
                          <span
                            key={badge.label + "-" + index}
                            className={[
                              "inline-flex rounded-full border px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.14em]",
                              getSummaryToneClassName(badge.tone),
                            ].join(" ")}
                          >
                            {badge.label}
                          </span>
                        ))}
                      </div>
                    ) : null}

                    {node.summary?.metrics?.length ? (
                      <div className="mt-2 grid gap-1.5 sm:grid-cols-2 lg:grid-cols-5">
                        {node.summary.metrics.map((metric, index) => (
                          <div
                            key={metric.label + "-" + index}
                            className="rounded-xl border border-white bg-white px-2.5 py-1.5 shadow-sm"
                          >
                            <div className="text-[10px] font-black uppercase tracking-[0.14em] text-slate-400">
                              {metric.label}
                            </div>
                            <div className="mt-0.5 truncate text-xs font-black text-slate-900">
                              {formatSummaryMetricValue(metric.value, metric.format)}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : null}
                  </div>
                ) : null}

`;

if (!treeView.includes("node.summary?.badges")) {
  const anchor = `                {sourceSummary ? (
                  <div className="mt-2 inline-flex max-w-full rounded-xl border border-cyan-100 bg-cyan-50 px-2.5 py-1 text-[11px] font-semibold text-cyan-800">
                    <span className="mr-1 font-black uppercase tracking-wide">
                      Source
                    </span>
                    <span className="truncate">{sourceSummary}</span>
                  </div>
                ) : null}
`;

  if (!treeView.includes(anchor)) {
    throw new Error("Source summary block anchor not found.");
  }

  treeView = treeView.replace(anchor, anchor + "\n" + summaryBlock);
  console.log("[ADDED] Node summary rendering block");
} else {
  console.log("[SKIP] Node summary rendering already exists");
}

const forbiddenPatterns = [
  "montantHT",
  "montantTTC",
  "statutPaiement",
  "FAC-ATELIER",
  "facturesauto",
  "AMARKHYS",
  "ORG_AMARKHYS_001",
  "amarkhys",
  "firebase/firestore",
  "RuntimeDataBinding.list",
];

for (const pattern of forbiddenPatterns) {
  if (treeView.includes(pattern)) {
    throw new Error("Forbidden pattern detected in generic TreeView: " + pattern);
  }
}

write(files.treeView, treeView);

console.log("[DONE] Q2-I-J-B generic operational tree node summary contract added.");
console.log("[WRITTEN]", files.resolver);
console.log("[WRITTEN]", files.treeView);
