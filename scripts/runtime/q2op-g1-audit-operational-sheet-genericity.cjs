const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  clientPage: "src/app/(private)/clientsauto/hub/page.tsx",
  clientSheet: "src/components/erp/hub/ERPClientOperationalSheet.tsx",
  clientSearchBox: "src/components/erp/hub/ClientOperationalSearchBox.tsx",
  clientTodayCards: "src/components/erp/hub/ClientOperationalTodayCards.tsx",
  clientLoader: "src/runtime/hub/RuntimeClientOperationalHubLoader.ts",
  clientSearchLoader: "src/runtime/hub/RuntimeClientOperationalSearchLoader.ts",
  clientTodayLoader: "src/runtime/hub/RuntimeClientOperationalTodayLoader.ts",
  hubTypes: "src/runtime/hub/RuntimeHubTypes.ts",
  hubIndex: "src/components/erp/hub/index.ts",
};

const checks = [];

function full(relativePath) {
  return path.join(root, relativePath);
}

function exists(relativePath) {
  return fs.existsSync(full(relativePath));
}

function read(relativePath) {
  if (!exists(relativePath)) return "";
  return fs.readFileSync(full(relativePath), "utf8");
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
    add("files", "WARN", "MEDIUM", `${key} missing: ${file}`);
  }
}

/**
 * Current specialization inventory.
 */
const specializationTargets = [
  ["clientSheet", "ERPClientOperationalSheet"],
  ["clientSearchBox", "ClientOperationalSearchBox"],
  ["clientTodayCards", "ClientOperationalTodayCards"],
  ["clientLoader", "RuntimeClientOperationalHubLoader"],
  ["clientSearchLoader", "RuntimeClientOperationalSearchLoader"],
  ["clientTodayLoader", "RuntimeClientOperationalTodayLoader"],
];

for (const [key, marker] of specializationTargets) {
  const content = loaded[key] ?? "";

  if (content.includes(marker)) {
    add("specialization-inventory", "WARN", "MEDIUM", `${marker} is currently client-specific and should be migrated later`);
  } else {
    add("specialization-inventory", "OK", "LOW", `${marker} not detected or already renamed`);
  }
}

/**
 * Ensure specialization is not AMARKHYS-hardcoded.
 */
const scope = Object.values(loaded).join("\n");
const lowerScope = scope.toLowerCase();

if (lowerScope.includes("amarkhys")) {
  add("hardcode", "WARN", "HIGH", "AMARKHYS wording detected; ensure it is branding/theme only, not runtime logic");
} else {
  add("hardcode", "OK", "HIGH", "No AMARKHYS hardcode detected in operational sheet scope");
}

if (hasAny(lowerScope, ["garage"])) {
  add("hardcode", "WARN", "MEDIUM", "Garage wording detected; acceptable only as configurable wording for this workspace");
} else {
  add("hardcode", "OK", "MEDIUM", "No garage-specific wording detected");
}

/**
 * Verify ERP runtime separation is still valid.
 */
if (loaded.clientPage.includes("firebase/firestore")) {
  add("boundary", "FAIL", "HIGH", "Client hub page imports firebase/firestore");
} else {
  add("boundary", "OK", "HIGH", "Client hub page does not import firebase/firestore");
}

if (loaded.clientPage.includes("RuntimeClientOperationalHubLoader")) {
  add("boundary", "FAIL", "HIGH", "Client hub server page imports runtime loader directly");
} else {
  add("boundary", "OK", "HIGH", "Client hub server page does not import runtime loader directly");
}

if (loaded.clientPage.includes("ClientOperationalSheetClient")) {
  add("boundary", "OK", "HIGH", "Client hub server page delegates to client component");
} else {
  add("boundary", "WARN", "HIGH", "Client hub client boundary is unclear");
}

if (loaded.clientSearchBox.includes('"use client"') && loaded.clientSearchBox.includes("RuntimeClientOperationalSearchLoader")) {
  add("boundary", "OK", "MEDIUM", "Search loader remains behind client boundary");
} else {
  add("boundary", "WARN", "MEDIUM", "Search client boundary unclear");
}

if (loaded.clientTodayCards.includes('"use client"') && loaded.clientTodayCards.includes("RuntimeClientOperationalTodayLoader")) {
  add("boundary", "OK", "MEDIUM", "Today loader remains behind client boundary");
} else {
  add("boundary", "WARN", "MEDIUM", "Today panel client boundary unclear");
}

/**
 * Verify the exact visual target is preserved.
 */
const visualMarkers = [
  "FICHE CLIENT OPÉRATIONNELLE",
  "Vue 360°",
  "VÉHICULES DU CLIENT",
  "ACTIVITÉ RÉCENTE",
  "À VENIR",
  "ADAPTATION SELON LE TYPE DE CLIENT",
  "NAVIGATION RAPIDE",
  "PARCOURS DÉTAILLÉ",
  "BÉNÉFICES MÉTIER",
];

for (const marker of visualMarkers) {
  if (scope.includes(marker)) {
    add("visual-target", "OK", "HIGH", `Visual target marker present: ${marker}`);
  } else {
    add("visual-target", "FAIL", "HIGH", `Visual target marker missing: ${marker}`);
  }
}

/**
 * Verify operational behavior markers.
 */
const behaviorMarkers = [
  "clientId",
  "selectedVehicleId",
  "returnTo",
  "RuntimeDataBinding",
  "vehiclesCount",
  "activeInterventionsCount",
  "unpaidInvoicesCount",
  "revenueTotal",
  "recentActivity",
  "upcomingAppointments",
];

for (const marker of behaviorMarkers) {
  if (scope.includes(marker)) {
    add("behavior", "OK", "HIGH", `Behavior marker present: ${marker}`);
  } else {
    add("behavior", "WARN", "HIGH", `Behavior marker missing: ${marker}`);
  }
}

/**
 * Generic migration readiness.
 */
const genericTargets = [
  "ERPOperationalSheet",
  "ERPOperationalSearchBox",
  "ERPOperationalTodayPanel",
  "RuntimeOperationalSheetLoader",
  "RuntimeOperationalSearchLoader",
  "RuntimeOperationalTodayLoader",
];

for (const target of genericTargets) {
  if (scope.includes(target)) {
    add("migration-readiness", "OK", "LOW", `Generic target already exists: ${target}`);
  } else {
    add("migration-readiness", "INFO", "LOW", `Generic target not yet created: ${target}`);
  }
}

/**
 * Mojibake.
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

console.log("[Q2-OP-G1] Operational Sheet genericity audit");
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
reportLines.push("# Q2-OP-G1 Operational Sheet genericity audit");
reportLines.push("");
reportLines.push("Goal: preserve the exact approved Client Operational Sheet visual target while preparing migration to a generic ERP Operational Sheet template.");
reportLines.push("");
reportLines.push(`- OK: ${ok}`);
reportLines.push(`- INFO: ${info}`);
reportLines.push(`- WARN: ${warn}`);
reportLines.push(`- FAIL: ${fail}`);
reportLines.push(`- HIGH FAIL: ${failHigh}`);
reportLines.push("");
reportLines.push("## Migration direction");
reportLines.push("");
reportLines.push("- ERPClientOperationalSheet -> ERPOperationalSheet");
reportLines.push("- ClientOperationalSearchBox -> ERPOperationalSearchBox");
reportLines.push("- ClientOperationalTodayCards -> ERPOperationalTodayPanel");
reportLines.push("- RuntimeClientOperationalHubLoader -> RuntimeOperationalSheetLoader");
reportLines.push("- RuntimeClientOperationalSearchLoader -> RuntimeOperationalSearchLoader");
reportLines.push("- RuntimeClientOperationalTodayLoader -> RuntimeOperationalTodayLoader");
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
  reportLines.push("Fix HIGH failures before continuing.");
} else {
  reportLines.push("Proceed with a progressive generic migration. Do not change the approved visual layout. First extract generic operational search/today/template contracts, then map clientsauto through metadata.");
}

const reportPath = path.join(root, "docs/audits/Q2-OP-G1-operational-sheet-genericity-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));

if (failHigh > 0) {
  process.exitCode = 1;
}