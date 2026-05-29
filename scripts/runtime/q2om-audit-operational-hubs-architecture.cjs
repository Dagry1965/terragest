const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  clientHubPage: "src/app/(private)/clientsauto/hub/page.tsx",
  productHubPage: "src/app/(private)/produitsauto/hub/page.tsx",
  productHubClient: "src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx",

  hubIndex: "src/components/erp/hub/index.ts",
  hubPage: "src/components/erp/hub/ERPRecordHubPage.tsx",
  hubHeader: "src/components/erp/hub/ERPRecordHubHeader.tsx",
  hubKpiStrip: "src/components/erp/hub/ERPRecordHubKpiStrip.tsx",
  hubPrimary: "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  hubSelected: "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",

  runtimeTypes: "src/runtime/hub/RuntimeHubTypes.ts",
  runtimeEngine: "src/runtime/hub/RuntimeHubEngine.ts",
  runtimeConfigResolver: "src/runtime/hub/RuntimeHubConfigResolver.ts",
  runtimeLayoutResolver: "src/runtime/hub/RuntimeHubLayoutResolver.ts",
  runtimeKpiResolver: "src/runtime/hub/RuntimeHubKpiResolver.ts",
  runtimeRelationResolver: "src/runtime/hub/RuntimeHubRelationResolver.ts",
  clientLoader: "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  productLoader: "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts"
};

const checks = [];

function read(relativePath) {
  const full = path.join(root, relativePath);
  if (!fs.existsSync(full)) return "";
  return fs.readFileSync(full, "utf8");
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function add(area, status, severity, message) {
  checks.push({ area, status, severity, message });
}

function hasAny(content, terms) {
  return terms.some((term) => content.includes(term));
}

function hasAll(content, terms) {
  return terms.every((term) => content.includes(term));
}

const loaded = {};

for (const [key, file] of Object.entries(files)) {
  loaded[key] = read(file);

  if (exists(file)) {
    add("files", "OK", "LOW", `${key} exists: ${file}`);
  } else {
    add("files", "FAIL", "HIGH", `${key} missing: ${file}`);
  }
}

/**
 * Product hub server/client boundary.
 */
if (loaded.productHubPage) {
  if (loaded.productHubPage.includes('"use client"') || loaded.productHubPage.includes("'use client'")) {
    add("boundary-product", "FAIL", "HIGH", "Product hub page is marked use client");
  } else {
    add("boundary-product", "OK", "HIGH", "Product hub page remains Server Component");
  }

  if (loaded.productHubPage.includes("RuntimeProductStockOperationalHubLoader")) {
    add("boundary-product", "FAIL", "HIGH", "Product hub server page imports/references runtime loader");
  } else {
    add("boundary-product", "OK", "HIGH", "Product hub server page does not reference runtime loader");
  }

  if (loaded.productHubPage.includes("firebase/firestore")) {
    add("boundary-product", "FAIL", "HIGH", "Product hub server page imports firebase/firestore");
  } else {
    add("boundary-product", "OK", "HIGH", "Product hub server page does not import firebase/firestore");
  }

  if (loaded.productHubPage.includes("ProductStockOperationalHubClient")) {
    add("boundary-product", "OK", "HIGH", "Product hub delegates runtime loading to client component");
  } else {
    add("boundary-product", "WARN", "HIGH", "Product hub client delegation unclear");
  }
}

if (loaded.productHubClient) {
  if (
    loaded.productHubClient.includes('"use client"') &&
    loaded.productHubClient.includes("useEffect") &&
    loaded.productHubClient.includes("RuntimeProductStockOperationalHubLoader")
  ) {
    add("boundary-product", "OK", "HIGH", "Product hub client loads runtime data in client boundary");
  } else {
    add("boundary-product", "FAIL", "HIGH", "Product hub client runtime loading pattern is unclear");
  }

  if (loaded.productHubClient.includes("firebase/firestore")) {
    add("boundary-product", "WARN", "MEDIUM", "Product hub client imports firebase/firestore directly");
  } else {
    add("boundary-product", "OK", "MEDIUM", "Product hub client does not import firebase/firestore directly");
  }
}

/**
 * Client hub boundary.
 */
if (loaded.clientHubPage) {
  if (loaded.clientHubPage.includes("firebase/firestore")) {
    add("boundary-client", "FAIL", "HIGH", "Client hub page imports firebase/firestore");
  } else {
    add("boundary-client", "OK", "HIGH", "Client hub page does not import firebase/firestore");
  }

  if (hasAny(loaded.clientHubPage, ["RuntimeClientOperationalHubLoader", "ERPRecordHubPage", "ERPRecordHub"])) {
    add("boundary-client", "OK", "MEDIUM", "Client hub uses runtime/generic hub concepts");
  } else {
    add("boundary-client", "WARN", "MEDIUM", "Client hub generic runtime usage unclear");
  }
}

/**
 * Generic hub components must stay business-neutral.
 */
const hubComponents = [
  "hubPage",
  "hubHeader",
  "hubKpiStrip",
  "hubPrimary",
  "hubSelected"
];

for (const key of hubComponents) {
  const content = loaded[key];
  if (!content) continue;

  if (hasAny(content.toLowerCase(), ["clientsauto", "produitsauto", "amarkhys", "garage"])) {
    add("generic-components", "FAIL", "HIGH", `${files[key]} contains business-specific terms`);
  } else {
    add("generic-components", "OK", "HIGH", `${files[key]} has no obvious business-specific terms`);
  }

  if (hasAny(content, ["ERPRecordHub", "ERPRecordHubConfig", "ERPRecordHubRecord", "ERPRecordHubRelationDescriptor"])) {
    add("generic-components", "OK", "MEDIUM", `${files[key]} uses generic hub types`);
  } else {
    add("generic-components", "WARN", "MEDIUM", `${files[key]} generic hub type usage unclear`);
  }
}

/**
 * Runtime hub types / engine / resolvers.
 */
if (loaded.runtimeTypes) {
  if (
    hasAll(loaded.runtimeTypes, [
      "ERPRecordHubConfig",
      "ERPRecordHubRecord",
      "ERPRecordHubKpiConfig",
      "ERPRecordHubPrimaryCollectionConfig",
      "ERPRecordHubRelatedSectionConfig"
    ])
  ) {
    add("runtime-types", "OK", "HIGH", "Runtime hub types define generic config/record/kpi/relations");
  } else {
    add("runtime-types", "FAIL", "HIGH", "Runtime hub types are missing core generic concepts");
  }
}

if (loaded.runtimeEngine) {
  if (hasAny(loaded.runtimeEngine, ["RuntimeHubKpiResolver", "RuntimeHubLayoutResolver", "RuntimeHubRelationResolver"])) {
    add("runtime-engine", "OK", "HIGH", "RuntimeHubEngine composes runtime resolvers");
  } else {
    add("runtime-engine", "WARN", "HIGH", "RuntimeHubEngine composition is unclear");
  }
}

if (loaded.runtimeKpiResolver) {
  if (hasAll(loaded.runtimeKpiResolver, ["rootRecord[kpi.field]", "normalizeKpiValue"])) {
    add("runtime-kpi", "OK", "HIGH", "KPI resolver reads configured fields from rootRecord");
  } else {
    add("runtime-kpi", "FAIL", "HIGH", "KPI resolver does not clearly read metadata-configured fields");
  }

  if (loaded.runtimeKpiResolver.includes("â") || loaded.runtimeKpiResolver.includes("Ã") || loaded.runtimeKpiResolver.includes("Â")) {
    add("runtime-kpi", "FAIL", "HIGH", "KPI resolver contains mojibake");
  } else {
    add("runtime-kpi", "OK", "HIGH", "KPI resolver has no mojibake");
  }
}

/**
 * Loader specialization checks.
 * Loaders may be domain-oriented, but must use runtime binding and produce a hub view model.
 */
if (loaded.clientLoader) {
  if (hasAny(loaded.clientLoader, ["RuntimeDataBinding", "safeList", "safeDetail"])) {
    add("loaders", "OK", "MEDIUM", "Client loader uses runtime data binding");
  } else {
    add("loaders", "WARN", "MEDIUM", "Client loader data binding usage unclear");
  }
}

if (loaded.productLoader) {
  if (hasAny(loaded.productLoader, ["RuntimeDataBinding", "safeList", "safeDetail"])) {
    add("loaders", "OK", "MEDIUM", "Product loader uses runtime data binding");
  } else {
    add("loaders", "WARN", "MEDIUM", "Product loader data binding usage unclear");
  }

  if (
    hasAll(loaded.productLoader, [
      "enrichRootRecord",
      "displayLabel",
      "stockTotal",
      "openOrders",
      "recentMovements"
    ])
  ) {
    add("loaders", "OK", "MEDIUM", "Product loader prepares a clean operational view model");
  } else {
    add("loaders", "WARN", "MEDIUM", "Product loader operational view model enrichment incomplete");
  }
}

/**
 * Metadata-driven checks.
 */
if (loaded.productHubPage) {
  if (
    hasAll(loaded.productHubPage, [
      "ERPRecordHubConfig",
      "kpis:",
      "primaryCollection:",
      "selectedRecordDetails:",
      "labelFields",
      "subtitleFields"
    ])
  ) {
    add("metadata-product", "OK", "HIGH", "Product hub is driven by ERPRecordHubConfig metadata");
  } else {
    add("metadata-product", "FAIL", "HIGH", "Product hub metadata config is incomplete");
  }

  if (loaded.productHubPage.includes("sourceId")) {
    add("metadata-product", "WARN", "MEDIUM", "Product hub metadata still exposes sourceId");
  } else {
    add("metadata-product", "OK", "MEDIUM", "Product hub metadata does not expose sourceId");
  }

  if (
    hasAll(loaded.productHubPage, [
      'field: "stockTotal"',
      'field: "stockCount"',
      'field: "openOrders"',
      'field: "recentMovements"'
    ])
  ) {
    add("metadata-product", "OK", "HIGH", "Product hub KPI fields are aligned with runtime view model");
  } else {
    add("metadata-product", "FAIL", "HIGH", "Product hub KPI fields are not aligned with runtime view model");
  }
}

if (loaded.clientHubPage) {
  if (hasAny(loaded.clientHubPage, ["ERPRecordHubConfig", "primaryCollection", "selectedRecordDetails", "kpis"])) {
    add("metadata-client", "OK", "MEDIUM", "Client hub appears metadata-driven");
  } else {
    add("metadata-client", "WARN", "MEDIUM", "Client hub metadata-driven structure unclear");
  }
}

/**
 * Detect all hub routes.
 */
const hubDir = path.join(root, "src/app/(private)");
let hubRoutes = [];

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full);
      continue;
    }

    if (entry.name === "page.tsx" && full.replace(/\\/g, "/").includes("/hub/")) {
      hubRoutes.push(path.relative(root, full).replace(/\\/g, "/"));
    }
  }
}

walk(hubDir);

add("hub-routes", "INFO", "LOW", `Detected hub routes: ${hubRoutes.join(", ") || "none"}`);

if (hubRoutes.length >= 2) {
  add("hub-routes", "OK", "MEDIUM", "At least two operational hubs exist; architecture can be compared");
} else {
  add("hub-routes", "WARN", "MEDIUM", "Less than two hub routes detected");
}

/**
 * Mojibake in hub architecture files.
 */
const mojibakePatterns = ["Ã", "Â", "â€™", "â€", "\uFFFD"];

for (const [key, content] of Object.entries(loaded)) {
  if (!content) continue;

  const found = mojibakePatterns.filter((pattern) => content.includes(pattern));
  if (found.length > 0) {
    add("mojibake", "FAIL", "HIGH", `${files[key]} contains mojibake: ${found.join(", ")}`);
  } else {
    add("mojibake", "OK", "HIGH", `${files[key]} has no mojibake`);
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

console.log("[Q2-OM] Operational hubs architecture audit");
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
reportLines.push("# Q2-OM Operational hubs architecture audit");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Detected hub routes");
reportLines.push("");

for (const route of hubRoutes) {
  reportLines.push(`- \`${route}\``);
}

reportLines.push("");
reportLines.push("## Checks");
reportLines.push("");
reportLines.push("| Area | Status | Severity | Message |");
reportLines.push("|---|---:|---:|---|");

for (const check of checks) {
  reportLines.push(`| ${check.area} | ${check.status} | ${check.severity} | ${check.message.replace(/\|/g, "/")} |`);
}

reportLines.push("");
reportLines.push("## Recommendation");
reportLines.push("");

if (failHigh > 0) {
  reportLines.push("HIGH failures exist. Fix architecture boundaries before creating another hub.");
} else if (fail > 0 || warn > 0) {
  reportLines.push("No HIGH blocker. Review warnings, then decide whether to consolidate shared loader patterns before the next hub.");
} else {
  reportLines.push("Architecture audit is clean. The hub pattern is ready to be reused for another operational hub.");
}

const reportPath = path.join(root, "docs/audits/Q2-OM-operational-hubs-architecture-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));

if (failHigh > 0) {
  process.exitCode = 1;
}