const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  loader: "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
  kpiResolver: "src/runtime/hub/RuntimeHubKpiResolver.ts",
  selected: "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  primary: "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  client: "src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx",
  page: "src/app/(private)/produitsauto/hub/page.tsx",
};

const checks = [];

function read(file) {
  const full = path.join(root, file);
  if (!fs.existsSync(full)) {
    return "";
  }
  return fs.readFileSync(full, "utf8");
}

function add(area, status, severity, message) {
  checks.push({ area, status, severity, message });
}

function hasAll(content, terms) {
  return terms.every((term) => content.includes(term));
}

function hasAny(content, terms) {
  return terms.some((term) => content.includes(term));
}

const loader = read(files.loader);
const kpiResolver = read(files.kpiResolver);
const selected = read(files.selected);
const primary = read(files.primary);
const client = read(files.client);
const page = read(files.page);

for (const [key, file] of Object.entries(files)) {
  if (fs.existsSync(path.join(root, file))) {
    add("files", "OK", "LOW", `${key} exists: ${file}`);
  } else {
    add("files", "FAIL", "HIGH", `${key} missing: ${file}`);
  }
}

/**
 * Server/client boundary must remain clean.
 */
if (page.includes('"use client"') || page.includes("'use client'")) {
  add("boundary", "FAIL", "HIGH", "page.tsx is marked use client");
} else {
  add("boundary", "OK", "HIGH", "page.tsx remains a Server Component");
}

if (page.includes("RuntimeProductStockOperationalHubLoader")) {
  add("boundary", "FAIL", "HIGH", "page.tsx references runtime loader");
} else {
  add("boundary", "OK", "HIGH", "page.tsx does not reference runtime loader");
}

if (page.includes("firebase/firestore")) {
  add("boundary", "FAIL", "HIGH", "page.tsx imports firebase/firestore");
} else {
  add("boundary", "OK", "HIGH", "page.tsx does not import firebase/firestore");
}

if (
  client.includes('"use client"') &&
  client.includes("useEffect") &&
  client.includes("RuntimeProductStockOperationalHubLoader")
) {
  add("boundary", "OK", "HIGH", "client component owns runtime loader call");
} else {
  add("boundary", "FAIL", "HIGH", "client runtime boundary is not clear");
}

/**
 * KPI enrichment.
 */
if (
  hasAll(loader, [
    "function enrichRootRecord",
    "stockTotal",
    "stockCount",
    "openOrders",
    "recentMovements",
  ])
) {
  add("kpi-runtime", "OK", "HIGH", "loader enriches rootRecord with KPI fields");
} else {
  add("kpi-runtime", "FAIL", "HIGH", "loader does not clearly enrich rootRecord with KPI fields");
}

if (
  hasAll(loader, [
    "totalStock",
    "quantiteTotale",
    "nombreStocks",
    "commandesOuvertes",
    "mouvementsRecents",
  ])
) {
  add("kpi-runtime", "OK", "MEDIUM", "loader exposes multilingual/backward-compatible KPI aliases");
} else {
  add("kpi-runtime", "WARN", "MEDIUM", "loader KPI aliases incomplete");
}

if (
  hasAll(kpiResolver, [
    "normalizeKpiValue",
    "rootRecord[kpi.field]",
    "\\u2014",
  ])
) {
  add("kpi-resolver", "OK", "HIGH", "KPI resolver reads configured fields from rootRecord with safe fallback");
} else {
  add("kpi-resolver", "FAIL", "HIGH", "KPI resolver does not read KPI fields cleanly");
}

/**
 * Label enrichment.
 */
if (
  hasAll(loader, [
    "buildBusinessLabel",
    "displayLabel",
    "enrichStockRecord",
    "enrichRelatedRecord",
  ])
) {
  add("labels", "OK", "HIGH", "loader enriches records with displayLabel labels");
} else {
  add("labels", "FAIL", "HIGH", "loader does not clearly enrich display labels");
}

if (
  hasAll(selected, [
    "displayLabel",
    "label",
    "designation",
    "emplacement",
    "\\u00c9l\\u00e9ment li\\u00e9",
  ])
) {
  add("labels", "OK", "HIGH", "selected panel fallback avoids raw id display");
} else {
  add("labels", "FAIL", "HIGH", "selected panel fallback may still expose raw id");
}

if (
  hasAll(primary, [
    "fallbackFields",
    "displayLabel",
    "designation",
    "emplacement",
    "\\u00c9l\\u00e9ment",
  ])
) {
  add("labels", "OK", "HIGH", "primary collection fallback avoids raw id display");
} else {
  add("labels", "FAIL", "HIGH", "primary collection fallback may still expose raw id");
}

/**
 * Raw id usage is acceptable for React key, href building and selection callbacks.
 */
const dangerousDisplayPatterns = [
  "{record.id}",
  "{selectedRecord.id}",
  "{item.id}",
];

const dangerousSelected = dangerousDisplayPatterns.filter((term) =>
  selected.includes(term)
);

const dangerousPrimary = dangerousDisplayPatterns.filter((term) =>
  primary.includes(term)
);

if (dangerousSelected.length === 0) {
  add("id-display", "OK", "HIGH", "selected panel has no direct JSX raw id display pattern");
} else {
  add("id-display", "FAIL", "HIGH", `selected panel may display raw ids: ${dangerousSelected.join(", ")}`);
}

if (dangerousPrimary.length === 0) {
  add("id-display", "OK", "HIGH", "primary collection has no direct JSX raw id display pattern");
} else {
  add("id-display", "FAIL", "HIGH", `primary collection may display raw ids: ${dangerousPrimary.join(", ")}`);
}

/**
 * Mojibake in touched files.
 */
const mojibakePatterns = ["Ã", "Â", "'", """, "\uFFFD"];
for (const [key, content] of Object.entries({
  loader,
  kpiResolver,
  selected,
  primary,
  client,
  page,
})) {
  const found = mojibakePatterns.filter((pattern) => content.includes(pattern));
  if (found.length > 0) {
    add("mojibake", "FAIL", "HIGH", `${key} contains mojibake: ${found.join(", ")}`);
  } else {
    add("mojibake", "OK", "HIGH", `${key} has no mojibake`);
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

console.log("[Q2-OK-C2] Product / Stock Hub polish audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);

for (const check of checks) {
  if (check.status === "FAIL" || check.status === "WARN") {
    console.log(`[${check.status}] [${check.severity}] [${check.area}] ${check.message}`);
  }
}

const reportLines = [];
reportLines.push("# Q2-OK-C2 Product / Stock Hub polish audit");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Checks");
reportLines.push("");
reportLines.push("| Area | Status | Severity | Message |");
reportLines.push("|---|---:|---:|---|");

for (const check of checks) {
  reportLines.push(
    `| ${check.area} | ${check.status} | ${check.severity} | ${check.message.replace(/\|/g, "/")} |`
  );
}

reportLines.push("");
reportLines.push("## Recommendation");
reportLines.push("");

if (failHigh > 0) {
  reportLines.push("Fix HIGH failures before committing Q2-OK-C.");
} else if (fail > 0 || warn > 0) {
  reportLines.push("No HIGH failure. Review remaining warnings before commit.");
} else {
  reportLines.push("Audit clean. Build, test visually, then commit Q2-OK-C.");
}

const reportPath = path.join(
  root,
  "docs/audits/Q2-OK-C2-product-stock-hub-polish-audit.md"
);

fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));

if (failHigh > 0) {
  process.exitCode = 1;
}