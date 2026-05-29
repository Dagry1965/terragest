const fs = require("fs");
const path = require("path");

const root = process.cwd();

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

function addCheck(area, status, severity, message) {
  checks.push({ area, status, severity, message });
}

function hasAny(content, values) {
  return values.some((value) => content.includes(value));
}

function hasAll(content, values) {
  return values.every((value) => content.includes(value));
}

function inspectFile(relativePath, label) {
  const file = read(relativePath);

  if (!file.exists) {
    addCheck(label, "FAIL", "HIGH", `Missing file: ${relativePath}`);
    return file;
  }

  addCheck(label, "OK", "LOW", `File exists: ${relativePath}`);
  return file;
}

console.log("[Q2-OK-A] Product / Stock Hub display audit");
console.log("[ROOT]", root);

const pagePath = "src/app/(private)/produitsauto/hub/page.tsx";
const clientPath = "src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx";
const loaderPathCandidates = [
  "src/runtime/hubs/RuntimeProductStockOperationalHubLoader.ts",
  "src/runtime/hubs/product-stock/RuntimeProductStockOperationalHubLoader.ts",
  "src/runtime/operational/RuntimeProductStockOperationalHubLoader.ts",
  "src/runtime/operational/product-stock/RuntimeProductStockOperationalHubLoader.ts",
];
const recordHubPathCandidates = [
  "src/components/erp/records/ERPRecordHub.tsx",
  "src/components/erp/operational/ERPRecordHub.tsx",
  "src/components/erp/hubs/ERPRecordHub.tsx",
];

const page = inspectFile(pagePath, "server-page");
const client = inspectFile(clientPath, "client-component");

let loaderPath = null;
let loader = { exists: false, content: "" };

for (const candidate of loaderPathCandidates) {
  const file = read(candidate);
  if (file.exists) {
    loaderPath = candidate;
    loader = file;
    break;
  }
}

if (!loader.exists) {
  addCheck(
    "loader",
    "FAIL",
    "HIGH",
    "RuntimeProductStockOperationalHubLoader not found in expected paths"
  );
} else {
  addCheck("loader", "OK", "LOW", `Loader found: ${loaderPath}`);
}

let recordHubPath = null;
let recordHub = { exists: false, content: "" };

for (const candidate of recordHubPathCandidates) {
  const file = read(candidate);
  if (file.exists) {
    recordHubPath = candidate;
    recordHub = file;
    break;
  }
}

if (!recordHub.exists) {
  addCheck("record-hub", "FAIL", "HIGH", "ERPRecordHub not found in expected paths");
} else {
  addCheck("record-hub", "OK", "LOW", `ERPRecordHub found: ${recordHubPath}`);
}

/**
 * Server / Client boundary
 */
if (page.exists) {
  if (page.content.includes('"use client"') || page.content.includes("'use client'")) {
    addCheck("server-page", "FAIL", "HIGH", "page.tsx must remain a Server Component");
  } else {
    addCheck("server-page", "OK", "HIGH", "page.tsx is not marked as use client");
  }

  if (page.content.includes("RuntimeProductStockOperationalHubLoader")) {
    addCheck(
      "server-page",
      "FAIL",
      "HIGH",
      "Server page imports or references RuntimeProductStockOperationalHubLoader"
    );
  } else {
    addCheck(
      "server-page",
      "OK",
      "HIGH",
      "Server page does not reference RuntimeProductStockOperationalHubLoader"
    );
  }

  if (page.content.includes("firebase/firestore")) {
    addCheck("server-page", "FAIL", "HIGH", "Server page imports firebase/firestore");
  } else {
    addCheck("server-page", "OK", "HIGH", "Server page does not import firebase/firestore");
  }

  if (
    hasAny(page.content, [
      "Aucun produit s\\u00e9lectionn\\u00e9",
      "Aucun produit sélectionné",
      "productId",
    ])
  ) {
    addCheck("server-page", "OK", "MEDIUM", "Server page has empty state / productId logic");
  } else {
    addCheck("server-page", "WARN", "MEDIUM", "Server page empty state / productId logic unclear");
  }

  if (page.content.includes("ProductStockOperationalHubClient")) {
    addCheck("server-page", "OK", "HIGH", "Server page delegates to client component");
  } else {
    addCheck("server-page", "FAIL", "HIGH", "Server page does not delegate to client component");
  }
}

if (client.exists) {
  if (client.content.includes('"use client"') || client.content.includes("'use client'")) {
    addCheck("client-component", "OK", "HIGH", "Client component has use client directive");
  } else {
    addCheck("client-component", "FAIL", "HIGH", "Client component missing use client directive");
  }

  if (client.content.includes("useEffect")) {
    addCheck("client-component", "OK", "HIGH", "Client component loads runtime data in useEffect");
  } else {
    addCheck("client-component", "FAIL", "HIGH", "Client component does not use useEffect for runtime loading");
  }

  if (client.content.includes("RuntimeProductStockOperationalHubLoader")) {
    addCheck("client-component", "OK", "HIGH", "Client component references the runtime loader");
  } else {
    addCheck("client-component", "FAIL", "HIGH", "Client component does not reference the runtime loader");
  }

  if (client.content.includes("firebase/firestore")) {
    addCheck("client-component", "WARN", "MEDIUM", "Client imports firebase/firestore directly");
  } else {
    addCheck("client-component", "OK", "MEDIUM", "Client does not import firebase/firestore directly");
  }

  if (hasAny(client.content, ["ERPRecordHub", "RecordHub"])) {
    addCheck("client-component", "OK", "MEDIUM", "Client renders a record hub component");
  } else {
    addCheck("client-component", "WARN", "MEDIUM", "Client hub rendering component unclear");
  }
}

/**
 * Loader / ViewModel audit
 */
if (loader.exists) {
  if (hasAny(loader.content, ["stockTotal", "totalStock", "quantiteTotale", "quantityTotal"])) {
    addCheck("loader", "OK", "HIGH", "Loader appears to compute stock total");
  } else {
    addCheck("loader", "FAIL", "HIGH", "Loader does not clearly compute stock total KPI");
  }

  if (hasAny(loader.content, ["stocks.length", "stockCount", "nombreStocks"])) {
    addCheck("loader", "OK", "HIGH", "Loader appears to compute stock count");
  } else {
    addCheck("loader", "FAIL", "HIGH", "Loader does not clearly compute stock count KPI");
  }

  if (hasAny(loader.content, ["commandesOuvertes", "openOrders", "commandes ouvertes", "commandeCount"])) {
    addCheck("loader", "OK", "HIGH", "Loader appears to compute open orders KPI");
  } else {
    addCheck("loader", "FAIL", "HIGH", "Loader does not clearly compute open orders KPI");
  }

  if (hasAny(loader.content, ["mouvementsRecents", "recentMovements", "mouvements.length"])) {
    addCheck("loader", "OK", "HIGH", "Loader appears to compute recent movements KPI");
  } else {
    addCheck("loader", "FAIL", "HIGH", "Loader does not clearly compute recent movements KPI");
  }

  if (hasAny(loader.content, ["metrics", "kpis", "summary", "stats"])) {
    addCheck("loader", "OK", "MEDIUM", "Loader exposes a summary/metrics/kpis structure");
  } else {
    addCheck("loader", "FAIL", "MEDIUM", "Loader does not expose a clear summary/metrics/kpis structure");
  }

  if (hasAny(loader.content, ["label", "title", "displayName", "nom", "reference", "code"])) {
    addCheck("loader", "OK", "MEDIUM", "Loader appears to prepare display labels");
  } else {
    addCheck("loader", "WARN", "MEDIUM", "Loader display label preparation unclear");
  }

  if (hasAny(loader.content, ["id:", ".id", "sourceId", "recordId"])) {
    addCheck("loader", "INFO", "LOW", "Loader handles technical identifiers; verify they are not exposed directly");
  }

  if (hasAny(loader.content, ["toDate", "seconds", "nanoseconds", "Timestamp"])) {
    addCheck("loader", "INFO", "MEDIUM", "Loader may handle Firestore dates; verify UI-safe formatting");
  }
}

/**
 * Generic Record Hub display audit
 */
if (recordHub.exists) {
  if (hasAny(recordHub.content, ["Dossier s", "Dossier", "selected", "selectedRecord"])) {
    addCheck("record-hub", "INFO", "MEDIUM", "Record hub has selected record display logic");
  } else {
    addCheck("record-hub", "WARN", "MEDIUM", "Selected record display logic unclear");
  }

  if (hasAny(recordHub.content, ["metric", "kpi", "summary", "stats"])) {
    addCheck("record-hub", "OK", "MEDIUM", "Record hub supports metrics/kpis/summary display");
  } else {
    addCheck("record-hub", "FAIL", "MEDIUM", "Record hub does not clearly support metrics/kpis/summary display");
  }

  if (hasAny(recordHub.content, ["record.id", "item.id", "{id}", "selected.id"])) {
    addCheck(
      "record-hub",
      "WARN",
      "HIGH",
      "Record hub may expose raw technical ids in UI"
    );
  } else {
    addCheck("record-hub", "OK", "HIGH", "No obvious raw id exposure detected in RecordHub");
  }

  if (hasAny(recordHub.content, ["empty", "Empty", "Aucun", "aucun"])) {
    addCheck("record-hub", "OK", "MEDIUM", "Record hub appears to support empty states");
  } else {
    addCheck("record-hub", "WARN", "MEDIUM", "Record hub empty state support unclear");
  }
}

/**
 * Mojibake audit
 */
const mojibakePatterns = ["Ã", "Â", "â€™", "â€", " "];

for (const [area, file] of [
  ["server-page", page],
  ["client-component", client],
  ["loader", loader],
  ["record-hub", recordHub],
]) {
  if (!file.exists) continue;

  const found = mojibakePatterns.filter((pattern) => file.content.includes(pattern));
  if (found.length > 0) {
    addCheck(area, "FAIL", "HIGH", `Mojibake patterns found: ${found.join(", ")}`);
  } else {
    addCheck(area, "OK", "HIGH", "No mojibake pattern detected");
  }
}

/**
 * Report
 */
const ok = checks.filter((check) => check.status === "OK").length;
const info = checks.filter((check) => check.status === "INFO").length;
const warn = checks.filter((check) => check.status === "WARN").length;
const fail = checks.filter((check) => check.status === "FAIL").length;
const failHigh = checks.filter(
  (check) => check.status === "FAIL" && check.severity === "HIGH"
).length;

const reportLines = [];
reportLines.push("# Q2-OK-A Product / Stock Hub display audit");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Files");
reportLines.push("");
reportLines.push(`- Server page: \`${pagePath}\``);
reportLines.push(`- Client component: \`${clientPath}\``);
reportLines.push(`- Loader: \`${loaderPath || "NOT_FOUND"}\``);
reportLines.push(`- Record hub: \`${recordHubPath || "NOT_FOUND"}\``);
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
  reportLines.push("HIGH failures exist. Fix boundaries or loader/view model before polish.");
} else if (fail > 0 || warn > 0) {
  reportLines.push("No HIGH failure blocking runtime boundary, but display polish is required.");
} else {
  reportLines.push("Audit clean. Proceed with product stock hub display polish.");
}

const reportPath = path.join(root, "docs/audits/Q2-OK-A-product-stock-hub-display-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT]", path.relative(root, reportPath));

for (const check of checks) {
  if (check.status === "FAIL" || check.status === "WARN") {
    console.log(`[${check.status}] [${check.severity}] [${check.area}] ${check.message}`);
  }
}

if (failHigh > 0) {
  process.exitCode = 1;
}