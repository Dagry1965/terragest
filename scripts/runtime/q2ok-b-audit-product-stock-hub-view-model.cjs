const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  loader: "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts",
  types: "src/runtime/hub/RuntimeHubTypes.ts",
  kpiResolver: "src/runtime/hub/RuntimeHubKpiResolver.ts",
  engine: "src/runtime/hub/RuntimeHubEngine.ts",
  configResolver: "src/runtime/hub/RuntimeHubConfigResolver.ts",
  page: "src/app/(private)/produitsauto/hub/page.tsx",
  client: "src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx",
  hubPage: "src/components/erp/hub/ERPRecordHubPage.tsx",
  hubHeader: "src/components/erp/hub/ERPRecordHubHeader.tsx",
  hubKpiStrip: "src/components/erp/hub/ERPRecordHubKpiStrip.tsx",
  hubPrimary: "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  hubSelected: "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
};

const checks = [];

function read(relativePath) {
  const fullPath = path.join(root, relativePath);
  if (!fs.existsSync(fullPath)) {
    return { exists: false, content: "" };
  }
  return {
    exists: true,
    content: fs.readFileSync(fullPath, "utf8"),
  };
}

function add(area, status, severity, message) {
  checks.push({ area, status, severity, message });
}

function has(content, terms) {
  return terms.some((term) => content.includes(term));
}

function hasAll(content, terms) {
  return terms.every((term) => content.includes(term));
}

const loaded = {};
for (const [key, relativePath] of Object.entries(files)) {
  loaded[key] = read(relativePath);
  if (loaded[key].exists) {
    add(key, "OK", "LOW", `File exists: ${relativePath}`);
  } else {
    add(key, "FAIL", "HIGH", `Missing file: ${relativePath}`);
  }
}

const loader = loaded.loader.content;
const types = loaded.types.content;
const hubPage = loaded.hubPage.content;
const kpi = loaded.hubKpiStrip.content;
const primary = loaded.hubPrimary.content;
const selected = loaded.hubSelected.content;
const client = loaded.client.content;
const page = loaded.page.content;

/**
 * Boundary
 */
if (loaded.page.exists) {
  if (page.includes('"use client"') || page.includes("'use client'")) {
    add("boundary", "FAIL", "HIGH", "Server page is marked use client");
  } else {
    add("boundary", "OK", "HIGH", "Server page remains server-side");
  }

  if (page.includes("RuntimeProductStockOperationalHubLoader")) {
    add("boundary", "FAIL", "HIGH", "Server page references runtime loader");
  } else {
    add("boundary", "OK", "HIGH", "Server page does not reference runtime loader");
  }

  if (page.includes("firebase/firestore")) {
    add("boundary", "FAIL", "HIGH", "Server page imports firebase/firestore");
  } else {
    add("boundary", "OK", "HIGH", "Server page does not import firebase/firestore");
  }
}

if (loaded.client.exists) {
  if (client.includes('"use client"') || client.includes("'use client'")) {
    add("boundary", "OK", "HIGH", "Client component has use client");
  } else {
    add("boundary", "FAIL", "HIGH", "Client component missing use client");
  }

  if (client.includes("useEffect") && client.includes("RuntimeProductStockOperationalHubLoader")) {
    add("boundary", "OK", "HIGH", "Client loads runtime loader through client boundary");
  } else {
    add("boundary", "FAIL", "HIGH", "Client runtime loading pattern unclear");
  }
}

/**
 * Loader model
 */
if (loaded.loader.exists) {
  if (has(loader, ["stockTotal", "totalStock", "quantiteTotale", "quantityTotal"])) {
    add("loader-kpi", "OK", "HIGH", "Loader has stock total terminology");
  } else {
    add("loader-kpi", "FAIL", "HIGH", "Loader lacks stock total terminology");
  }

  if (has(loader, ["stocks.length", "stockCount", "nombreStocks"])) {
    add("loader-kpi", "OK", "HIGH", "Loader has stock count terminology");
  } else {
    add("loader-kpi", "FAIL", "HIGH", "Loader lacks stock count terminology");
  }

  if (has(loader, ["commandesOuvertes", "openOrders", "commandes ouvertes", "commandeCount", "commandes.length"])) {
    add("loader-kpi", "OK", "HIGH", "Loader has open orders / orders count terminology");
  } else {
    add("loader-kpi", "FAIL", "HIGH", "Loader lacks open orders KPI terminology");
  }

  if (has(loader, ["mouvementsRecents", "recentMovements", "mouvements.length", "mouvementsStock"])) {
    add("loader-kpi", "OK", "HIGH", "Loader has recent movements terminology");
  } else {
    add("loader-kpi", "FAIL", "HIGH", "Loader lacks recent movements KPI terminology");
  }

  if (has(loader, ["kpis", "metrics", "summary", "stats"])) {
    add("loader-kpi", "OK", "MEDIUM", "Loader exposes kpis/metrics/summary/stats");
  } else {
    add("loader-kpi", "FAIL", "MEDIUM", "Loader does not expose clear KPI structure");
  }

  if (has(loader, ["primaryCollection", "collections", "sections"])) {
    add("loader-viewmodel", "OK", "MEDIUM", "Loader prepares hub collections/sections");
  } else {
    add("loader-viewmodel", "WARN", "MEDIUM", "Loader collection model unclear");
  }

  if (has(loader, ["selected", "selectedRecord", "defaultSelected", "selectedItem"])) {
    add("loader-viewmodel", "OK", "MEDIUM", "Loader has selected item terminology");
  } else {
    add("loader-viewmodel", "WARN", "MEDIUM", "Loader selected item model unclear");
  }

  if (has(loader, ["label", "title", "subtitle", "description"])) {
    add("loader-labels", "OK", "MEDIUM", "Loader appears to prepare display labels");
  } else {
    add("loader-labels", "FAIL", "MEDIUM", "Loader does not clearly prepare display labels");
  }

  if (has(loader, ["sourceId", "recordId", "id:", ".id"])) {
    add("loader-labels", "INFO", "LOW", "Loader manipulates ids; verify UI maps them to business labels");
  }

  if (has(loader, ["Date(", "toDate", "seconds", "nanoseconds", "Timestamp"])) {
    add("loader-dates", "INFO", "MEDIUM", "Loader may need UI-safe date formatting");
  }
}

/**
 * Types
 */
if (loaded.types.exists) {
  if (has(types, ["kpis", "metrics", "summary", "value", "label"])) {
    add("types", "OK", "MEDIUM", "Hub types include KPI/display concepts");
  } else {
    add("types", "WARN", "MEDIUM", "Hub types may lack KPI/display concepts");
  }

  if (has(types, ["selected", "details", "items", "collections"])) {
    add("types", "OK", "MEDIUM", "Hub types include selected/details/items concepts");
  } else {
    add("types", "WARN", "MEDIUM", "Hub types selected/details/items concepts unclear");
  }
}

/**
 * Components
 */
if (loaded.hubKpiStrip.exists) {
  if (has(kpi, ["value", "metric.value", "kpi.value"])) {
    add("kpi-strip", "OK", "HIGH", "KPI strip renders KPI values");
  } else {
    add("kpi-strip", "FAIL", "HIGH", "KPI strip value rendering unclear");
  }

  if (has(kpi, ["—", "-", "fallback", "??"])) {
    add("kpi-strip", "INFO", "MEDIUM", "KPI strip has fallback behavior; verify why values show dashes");
  }
}

if (loaded.hubSelected.exists) {
  if (has(selected, ["selected", "record", "item"])) {
    add("selected-panel", "OK", "MEDIUM", "Selected panel renders selected item");
  } else {
    add("selected-panel", "WARN", "MEDIUM", "Selected panel selected item rendering unclear");
  }

  if (has(selected, [".id", "record.id", "item.id", "selected.id"])) {
    add("selected-panel", "WARN", "HIGH", "Selected panel may expose raw technical ids");
  } else {
    add("selected-panel", "OK", "HIGH", "Selected panel does not obviously expose raw ids");
  }

  if (has(selected, ["title", "label", "subtitle", "description"])) {
    add("selected-panel", "OK", "MEDIUM", "Selected panel supports business labels");
  } else {
    add("selected-panel", "FAIL", "MEDIUM", "Selected panel label rendering unclear");
  }
}

if (loaded.hubPrimary.exists) {
  if (has(primary, [".id", "item.id", "record.id"])) {
    add("primary-collection", "WARN", "HIGH", "Primary collection may expose raw ids");
  } else {
    add("primary-collection", "OK", "HIGH", "Primary collection does not obviously expose raw ids");
  }

  if (has(primary, ["title", "label", "subtitle", "description"])) {
    add("primary-collection", "OK", "MEDIUM", "Primary collection supports labels/subtitles");
  } else {
    add("primary-collection", "WARN", "MEDIUM", "Primary collection label support unclear");
  }
}

/**
 * Mojibake only in hub files
 */
const mojibakePatterns = ["Ã", "Â", "'", """, "\uFFFD"];
for (const [key, file] of Object.entries(loaded)) {
  if (!file.exists) continue;
  const found = mojibakePatterns.filter((pattern) => file.content.includes(pattern));
  if (found.length > 0) {
    add("mojibake", "FAIL", "HIGH", `${key} contains mojibake patterns: ${found.join(", ")}`);
  } else {
    add("mojibake", "OK", "HIGH", `${key} has no mojibake pattern`);
  }
}

/**
 * Print snippets around important terms
 */
function printLines(key, patterns) {
  const file = loaded[key];
  if (!file.exists) return;

  const relativePath = files[key];
  const lines = file.content.split(/\r?\n/);

  console.log("");
  console.log(`[SNIPPETS] ${key} - ${relativePath}`);

  let printed = 0;
  for (let i = 0; i < lines.length; i++) {
    if (patterns.some((pattern) => lines[i].includes(pattern))) {
      const start = Math.max(0, i - 2);
      const end = Math.min(lines.length - 1, i + 2);

      console.log(`--- around line ${i + 1}`);
      for (let j = start; j <= end; j++) {
        console.log(`${String(j + 1).padStart(4, " ")}: ${lines[j]}`);
      }

      printed++;
      if (printed >= 8) break;
    }
  }

  if (printed === 0) {
    console.log("No snippet found for requested patterns.");
  }
}

const ok = checks.filter((c) => c.status === "OK").length;
const info = checks.filter((c) => c.status === "INFO").length;
const warn = checks.filter((c) => c.status === "WARN").length;
const fail = checks.filter((c) => c.status === "FAIL").length;
const failHigh = checks.filter((c) => c.status === "FAIL" && c.severity === "HIGH").length;

console.log("[Q2-OK-B] Product / Stock Hub view model audit");
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

printLines("loader", [
  "kpis",
  "metrics",
  "summary",
  "stock",
  "mouvement",
  "commande",
  "reception",
  "label",
  "title",
]);

printLines("hubKpiStrip", ["value", "kpi", "metric", "—", "fallback"]);
printLines("hubSelected", ["selected", ".id", "title", "label", "subtitle", "description"]);
printLines("hubPrimary", ["item.id", ".id", "title", "label", "subtitle", "description"]);

const reportLines = [];
reportLines.push("# Q2-OK-B Product / Stock Hub view model audit");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Files");
reportLines.push("");
for (const [key, relativePath] of Object.entries(files)) {
  reportLines.push(`- ${key}: \`${relativePath}\` — ${loaded[key].exists ? "FOUND" : "MISSING"}`);
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
  reportLines.push("Fix HIGH failures before implementing display polish.");
} else if (fail > 0 || warn > 0) {
  reportLines.push("Runtime boundary is likely stable. Implement display polish in loader/view model and generic hub components.");
} else {
  reportLines.push("Audit clean. Proceed to product stock hub display polish.");
}

const reportPath = path.join(root, "docs/audits/Q2-OK-B-product-stock-hub-view-model-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("");
console.log("[REPORT]", path.relative(root, reportPath));

if (failHigh > 0) {
  process.exitCode = 1;
}