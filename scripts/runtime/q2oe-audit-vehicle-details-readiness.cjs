const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "docs", "audits", "Q2-OE-vehicle-details-readiness.md");

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

    if (predicate(full)) results.push(full);
  }

  return results;
}

function rel(file) {
  return path.relative(root, file).replaceAll("\\", "/");
}

console.log("[Q2-OE] Vehicle details readiness audit");
console.log("[ROOT] " + root);

const requiredFiles = [
  "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  "src/app/(private)/clientsauto/hub/page.tsx",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/components/erp/hub/ERPRecordHubSelectedDetails.tsx",
  "src/runtime/modules/generated/clientsauto/clientsauto.module.ts",
  "src/runtime/modules/generated/vehicules/vehicules.module.ts",
  "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
  "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
];

for (const file of requiredFiles) {
  if (exists(file)) {
    add("files", "OK", "HIGH", "Found " + file);
  } else {
    add("files", "FAIL", "HIGH", "Missing " + file);
  }
}

const loader = exists("src/runtime/hub/RuntimeClientOperationalHubLoader.ts")
  ? read("src/runtime/hub/RuntimeClientOperationalHubLoader.ts")
  : "";

const expectedLoaderRefs = [
  "RuntimeDataBinding",
  "clientsautoModule",
  "vehiculesModule",
];

for (const ref of expectedLoaderRefs) {
  if (loader.includes(ref)) {
    add("loader", "OK", "HIGH", "Loader contains " + ref);
  } else {
    add("loader", "FAIL", "HIGH", "Loader missing " + ref);
  }
}

const futureRefs = [
  "interventionsautoModule",
  "facturesautoModule",
  "selectedVehicleId",
  "relatedRecordsBySection",
];

for (const ref of futureRefs) {
  if (loader.includes(ref)) {
    add("loader", "WARN", "LOW", "Loader already contains " + ref);
  } else {
    add("loader", "OK", "LOW", "Loader ready to receive " + ref);
  }
}

if (
  loader.includes("firebase/firestore") ||
  loader.includes("getDocs(") ||
  loader.includes("collection(")
) {
  add("loader", "FAIL", "HIGH", "Loader contains local Firestore access");
} else {
  add("loader", "OK", "HIGH", "No local Firestore access in loader");
}

const page = exists("src/app/(private)/clientsauto/hub/page.tsx")
  ? read("src/app/(private)/clientsauto/hub/page.tsx")
  : "";

if (page.includes("selectedVehicleId")) {
  add("route", "WARN", "LOW", "Route already passes selectedVehicleId");
} else {
  add("route", "OK", "MEDIUM", "Route can be extended to pass selectedVehicleId");
}

if (page.includes("searchParams")) {
  add("route", "OK", "HIGH", "Route uses searchParams");
} else {
  add("route", "FAIL", "HIGH", "Route does not use searchParams");
}

const backups = walk(root, (file) => path.basename(file).includes(".bak-q2oe"));

if (backups.length > 0) {
  for (const backup of backups) {
    add("cleanup", "FAIL", "HIGH", "Q2-OE backup still present: " + rel(backup));
  }
} else {
  add("cleanup", "OK", "HIGH", "No Q2-OE backup detected");
}

const ok = checks.filter((check) => check.status === "OK");
const warn = checks.filter((check) => check.status === "WARN");
const fail = checks.filter((check) => check.status === "FAIL");
const highFail = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");

const lines = [];

lines.push("# Q2-OE — Vehicle Details Readiness");
lines.push("");
lines.push("- Date: " + new Date().toISOString());
lines.push("- Root: `" + root + "`");
lines.push("");
lines.push("## Objectif");
lines.push("");
lines.push("Préparer le branchement des détails contextuels du véhicule sélectionné dans le Client Operational Hub.");
lines.push("");
lines.push("Cible :");
lines.push("");
lines.push("- véhicule sélectionné");
lines.push("- interventions liées au véhicule");
lines.push("- factures liées au véhicule");
lines.push("- pas de requête Firestore locale dans l’UI");
lines.push("");
lines.push("## Résumé");
lines.push("");
lines.push("- OK: " + ok.length);
lines.push("- WARN: " + warn.length);
lines.push("- FAIL: " + fail.length);
lines.push("- HIGH FAIL: " + highFail.length);
lines.push("");
lines.push("## Checks");
lines.push("");
lines.push("| Scope | Status | Severity | Message |");
lines.push("|---|---:|---:|---|");

for (const check of checks) {
  lines.push("| " + check.scope + " | " + check.status + " | " + check.severity + " | " + check.message.replaceAll("|", "\\|") + " |");
}

lines.push("");
lines.push("## Décision");
lines.push("");

if (highFail.length > 0) {
  lines.push("Q2-OE n’est pas prêt. Corriger les HIGH FAIL avant branchement.");
} else {
  lines.push("Q2-OE peut être branché : interventions + factures liées au véhicule sélectionné.");
}

fs.writeFileSync(reportPath, lines.join("\n"), "utf8");

console.log("[REPORT] " + rel(reportPath));
console.log("[OK] " + ok.length);
console.log("[WARN] " + warn.length);
console.log("[FAIL] " + fail.length);
console.log("[FAIL_HIGH] " + highFail.length);

if (highFail.length > 0) {
  process.exit(1);
}

console.log("[Q2-OE] Audit completed without HIGH failure.");