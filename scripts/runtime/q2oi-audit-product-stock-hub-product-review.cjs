const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "docs", "audits", "Q2-OI-product-stock-hub-product-review.md");

const checks = [];

function add(scope, status, severity, message) {
  checks.push({ scope, status, severity, message });
}

function exists(relativePath) {
  return fs.existsSync(path.join(root, relativePath));
}

function read(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function walk(dir, predicate, results = []) {
  if (!fs.existsSync(dir)) return results;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(full, predicate, results);
      continue;
    }

    if (predicate(full)) {
      results.push(full);
    }
  }

  return results;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

console.log("[Q2-OI] Product / Stock Hub product review audit");
console.log("[ROOT] " + root);

const pagePath = "src/app/(private)/produitsauto/hub/page.tsx";
const clientPath = "src/app/(private)/produitsauto/hub/ProductStockOperationalHubClient.tsx";
const loaderPath = "src/runtime/hub/RuntimeProductStockOperationalHubLoader.ts";

const requiredFiles = [
  pagePath,
  clientPath,
  loaderPath,
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubPrimaryCollection.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
];

for (const file of requiredFiles) {
  if (exists(file)) {
    add("files", "OK", "HIGH", "Found " + file);
  } else {
    add("files", "FAIL", "HIGH", "Missing " + file);
  }
}

const page = exists(pagePath) ? read(pagePath) : "";
const client = exists(clientPath) ? read(clientPath) : "";
const loader = exists(loaderPath) ? read(loaderPath) : "";

const pageExpected = [
  ["ProductStockOperationalHubClient", "Server page delegates product data loading to client component"],
  ["no productId: rendering isolated empty page", "Server page renders isolated empty state without productId"],
  ["productId detected: rendering client runtime hub", "Server page switches to client runtime hub with productId"],
  ["Aucun produit s\\u00e9lectionn\\u00e9", "Empty state label marker is present"],
  ["Fiche Produit / Stock Op\\u00e9rationnelle", "Product hub title marker is present"],
];

for (const pair of pageExpected) {
  const marker = pair[0];
  const message = pair[1];

  if (page.includes(marker)) {
    add("server-page", "OK", "HIGH", message);
  } else {
    add("server-page", "FAIL", "HIGH", "Missing marker: " + marker + " | " + message);
  }
}

const pageForbidden = [
  "import { RuntimeProductStockOperationalHubLoader",
  "import { ERPRecordHubPage",
  'await import("@/runtime/hub/RuntimeProductStockOperationalHubLoader")',
  'await import("@/components/erp/hub")',
  "firebase/firestore",
  "getDocs(",
  "collection(",
];

for (const marker of pageForbidden) {
  if (page.includes(marker)) {
    add("server-page-boundary", "FAIL", "HIGH", "Forbidden server page marker detected: " + marker);
  } else {
    add("server-page-boundary", "OK", "MEDIUM", "Server page does not contain forbidden marker: " + marker);
  }
}

const clientExpected = [
  ['"use client"', "Client component boundary is declared"],
  ["useEffect", "Client component loads runtime data in useEffect"],
  ["RuntimeProductStockOperationalHubLoader", "Client component imports runtime loader dynamically"],
  ["ERPRecordHubPage", "Client component renders generic ERPRecordHubPage"],
  ["Donn", "Client component has error wording marker"],
];

for (const pair of clientExpected) {
  const marker = pair[0];
  const message = pair[1];

  if (client.includes(marker)) {
    add("client-boundary", "OK", "HIGH", message);
  } else {
    add("client-boundary", "FAIL", "HIGH", "Missing marker: " + marker + " | " + message);
  }
}

const loaderExpected = [
  ["if (!productId)", "Loader avoids blind reads without productId"],
  ["safeDetail", "Loader uses safe detail wrapper"],
  ["safeList", "Loader uses safe list wrapper"],
  ["Promise.all", "Loader batches related reads"],
  ["relatedRecordsBySection.mouvements", "Loader fills movements section"],
  ["relatedRecordsBySection.commandes", "Loader fills orders section"],
  ["relatedRecordsBySection.receptions", "Loader fills receptions section"],
];

for (const pair of loaderExpected) {
  const marker = pair[0];
  const message = pair[1];

  if (loader.includes(marker)) {
    add("loader", "OK", "MEDIUM", message);
  } else {
    add("loader", "FAIL", "HIGH", "Missing marker: " + marker + " | " + message);
  }
}

const loaderForbidden = [
  "RuntimeDataBinding.list(produitsautoModule)",
  "safeList(produitsautoModule)",
  "firebase/firestore",
  "getDocs(",
  "collection(",
];

for (const marker of loaderForbidden) {
  if (loader.includes(marker)) {
    add("loader-boundary", "FAIL", "HIGH", "Forbidden loader marker detected: " + marker);
  } else {
    add("loader-boundary", "OK", "MEDIUM", "Loader does not contain forbidden marker: " + marker);
  }
}

const mojibakeMarkers = [
  "Ãƒ",
  "Ã¢",
  "ÃÆ",
  "Ã‚",
  "â€",
  "â€™",
];

let mojibakeDetected = false;

for (const marker of mojibakeMarkers) {
  if (page.includes(marker) || client.includes(marker)) {
    mojibakeDetected = true;
    add("encoding", "FAIL", "HIGH", "Mojibake marker detected: " + marker);
  }
}

if (!mojibakeDetected) {
  add("encoding", "OK", "HIGH", "No mojibake marker detected in Product Hub page/client");
}

const manualChecklist = [
  "Open /produitsauto/hub",
  "Verify empty state text is clean French",
  "Verify no server Firestore GRPC error appears without productId",
  "Open /produitsauto/hub?productId=<id-produit>",
  "Verify loading state appears in client component",
  "Verify product identity is displayed if data loads",
  "Verify stocks/emplacements are filtered by product",
  "Select stock and verify selectedStockId appears in URL",
  "Verify movements section is coherent",
  "Verify commandes section is coherent",
  "Verify receptions section is coherent",
  "Verify navigation buttons",
  "Verify layout uses page width without visual overload",
];

for (const item of manualChecklist) {
  add("manual-review", "INFO", "LOW", item);
}

const backups = walk(root, (file) => path.basename(file).includes(".bak-q2oi"));

if (backups.length > 0) {
  for (const backup of backups) {
    add("cleanup", "FAIL", "HIGH", "Q2-OI backup still present: " + rel(backup));
  }
} else {
  add("cleanup", "OK", "HIGH", "No Q2-OI backup detected");
}

const ok = checks.filter((check) => check.status === "OK");
const info = checks.filter((check) => check.status === "INFO");
const warn = checks.filter((check) => check.status === "WARN");
const fail = checks.filter((check) => check.status === "FAIL");
const highFail = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");

const lines = [];

lines.push("# Q2-OI - Product / Stock Operational Hub Product Review");
lines.push("");
lines.push("- Date: " + new Date().toISOString());
lines.push("- Root: `" + root + "`");
lines.push("");
lines.push("## Objective");
lines.push("");
lines.push("Validate the Product / Stock Operational Hub at `/produitsauto/hub`.");
lines.push("");
lines.push("This audit also validates the server/client boundary: the server page must not load Firestore without productId.");
lines.push("");
lines.push("## Technical summary");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- INFO: " + info.length);
lines.push("- WARN: " + warn.length);
lines.push("- FAIL: " + fail.length);
lines.push("- HIGH FAIL: " + highFail.length);
lines.push("");
lines.push("## Manual visual checklist");
lines.push("");
for (const item of manualChecklist) {
  lines.push("- [ ] " + item);
}
lines.push("");
lines.push("## Technical checks");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push("| " + check.scope + " | " + check.status + " | " + check.severity + " | " + check.message.replaceAll("|", "\\|") + " |");
}

lines.push("");
lines.push("## Decision");
lines.push("");

if (highFail.length > 0) {
  lines.push("Q2-OI is not technically validated. Fix HIGH FAIL items before final visual review.");
} else {
  lines.push("Q2-OI is ready for manual visual review. If the checklist is OK, the Product / Stock Operational Hub is demonstrable.");
}

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log("[REPORT] " + rel(reportPath));
console.log("[OK] " + ok.length);
console.log("[INFO] " + info.length);
console.log("[WARN] " + warn.length);
console.log("[FAIL] " + fail.length);
console.log("[FAIL_HIGH] " + highFail.length);

if (highFail.length > 0) {
  process.exit(1);
}

console.log("[Q2-OI] Product review audit completed without HIGH failure.");