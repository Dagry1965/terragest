const fs = require("fs");
const path = require("path");

const root = process.cwd();
const reportPath = path.join(root, "docs", "audits", "Q2-OD-client-hub-runtime-data-readiness.md");

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

console.log("[Q2-OD] Client Hub runtime data readiness audit");
console.log("[ROOT] " + root);

const requiredFiles = [
  "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  "src/app/(private)/clientsauto/hub/page.tsx",
  "src/components/erp/hub/ERPRecordHubPage.tsx",
  "src/runtime/hub/RuntimeHubEngine.ts",
];

for (const file of requiredFiles) {
  if (exists(file)) {
    add("foundation", "OK", "HIGH", "Found " + file);
  } else {
    add("foundation", "FAIL", "HIGH", "Missing " + file);
  }
}

const runtimeFiles = walk(path.join(root, "src", "runtime"), (file) => {
  return file.endsWith(".ts") || file.endsWith(".tsx");
});

const dataCandidates = [
  "RuntimeDataBinding",
  "FirestoreRuntimeQuery",
  "FirestoreRuntimeRepository",
  "RuntimeData",
  "findMany",
  "findById",
  "list(",
  "detail(",
];

for (const pattern of dataCandidates) {
  const matches = runtimeFiles.filter((file) => fs.readFileSync(file, "utf8").includes(pattern));

  if (matches.length > 0) {
    add("runtime-data", "OK", "MEDIUM", pattern + " detected in " + matches.length + " runtime file(s)");
  } else {
    add("runtime-data", "WARN", "LOW", pattern + " not detected");
  }
}

const loader = exists("src/runtime/hub/RuntimeClientOperationalHubLoader.ts")
  ? read("src/runtime/hub/RuntimeClientOperationalHubLoader.ts")
  : "";

if (loader.includes("firebase/firestore") || loader.includes("getDocs(") || loader.includes("collection(")) {
  add("loader", "FAIL", "HIGH", "Loader contains local Firestore access");
} else {
  add("loader", "OK", "HIGH", "Loader does not contain local Firestore access");
}

if (loader.includes("preview-client") || loader.includes("Client") && loader.includes("opérationnel")) {
  add("loader", "WARN", "MEDIUM", "Loader still appears to contain preview fallback data");
} else {
  add("loader", "OK", "MEDIUM", "No preview fallback marker detected");
}

const page = exists("src/app/(private)/clientsauto/hub/page.tsx")
  ? read("src/app/(private)/clientsauto/hub/page.tsx")
  : "";

if (page.includes("searchParams")) {
  add("route", "OK", "MEDIUM", "Route accepts searchParams");
} else {
  add("route", "WARN", "MEDIUM", "Route does not appear to accept searchParams yet");
}

if (page.includes("clientId")) {
  add("route", "OK", "MEDIUM", "Route passes clientId");
} else {
  add("route", "WARN", "MEDIUM", "Route does not pass clientId yet");
}

const backups = walk(root, (file) => path.basename(file).includes(".bak-q2od"));

if (backups.length > 0) {
  for (const backup of backups) {
    add("cleanup", "FAIL", "HIGH", "Q2-OD backup still present: " + rel(backup));
  }
} else {
  add("cleanup", "OK", "HIGH", "No Q2-OD backup detected");
}

const ok = checks.filter((check) => check.status === "OK");
const warn = checks.filter((check) => check.status === "WARN");
const fail = checks.filter((check) => check.status === "FAIL");
const highFail = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH");

const lines = [];

lines.push("# Q2-OD — Client Hub Runtime Data Readiness");
lines.push("");
lines.push("- Date: " + new Date().toISOString());
lines.push("- Root: `" + root + "`");
lines.push("");
lines.push("## Objectif");
lines.push("");
lines.push("Préparer le branchement du Client Operational Hub sur les vraies données runtime.");
lines.push("");
lines.push("Règles :");
lines.push("");
lines.push("- pas de requête Firestore locale dans l’UI");
lines.push("- privilégier les couches runtime existantes");
lines.push("- brancher d’abord client + véhicules");
lines.push("- interventions/factures seront renforcées dans une passe suivante");
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
  lines.push("Q2-OD n’est pas prêt. Corriger les HIGH FAIL avant branchement.");
} else {
  lines.push("Q2-OD peut être branché prudemment : loader runtime réel minimal client + véhicules.");
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

console.log("[Q2-OD] Audit completed without HIGH failure.");