const fs = require("fs");
const path = require("path");

const root = process.cwd();

const files = {
  page: "src/app/(private)/vehicules/hub/page.tsx",
  client: "src/app/(private)/vehicules/hub/VehicleOperationalHubClient.tsx",
  loader: "src/runtime/hub/RuntimeVehicleOperationalHubLoader.ts",
  hubPage: "src/components/erp/hub/ERPRecordHubPage.tsx",
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

if (loaded.page.includes('"use client"') || loaded.page.includes("'use client'")) {
  add("boundary", "FAIL", "HIGH", "Vehicle hub page is marked use client");
} else {
  add("boundary", "OK", "HIGH", "Vehicle hub page remains Server Component");
}

if (loaded.page.includes("RuntimeVehicleOperationalHubLoader")) {
  add("boundary", "FAIL", "HIGH", "Vehicle hub page references runtime loader");
} else {
  add("boundary", "OK", "HIGH", "Vehicle hub page does not reference runtime loader");
}

if (loaded.page.includes("firebase/firestore")) {
  add("boundary", "FAIL", "HIGH", "Vehicle hub page imports firebase/firestore");
} else {
  add("boundary", "OK", "HIGH", "Vehicle hub page does not import firebase/firestore");
}

if (loaded.page.includes("VehicleOperationalHubClient")) {
  add("boundary", "OK", "HIGH", "Vehicle hub page delegates to client component");
} else {
  add("boundary", "FAIL", "HIGH", "Vehicle hub page does not delegate to client component");
}

if (
  loaded.client.includes('"use client"') &&
  loaded.client.includes("useEffect") &&
  loaded.client.includes("RuntimeVehicleOperationalHubLoader") &&
  loaded.client.includes("ERPRecordHubPage")
) {
  add("client-boundary", "OK", "HIGH", "Vehicle client owns runtime loader and renders generic hub page");
} else {
  add("client-boundary", "FAIL", "HIGH", "Vehicle client boundary pattern incomplete");
}

if (loaded.client.includes("firebase/firestore")) {
  add("client-boundary", "WARN", "MEDIUM", "Vehicle client imports firebase/firestore directly");
} else {
  add("client-boundary", "OK", "MEDIUM", "Vehicle client does not import firebase/firestore directly");
}

if (
  hasAll(loaded.loader, [
    "RuntimeDataBinding",
    "safeDetail",
    "safeList",
    "enrichVehicleRecord",
    "appointmentsCount",
    "interventionsCount",
    "invoicesCount",
    "revenueTotal",
  ])
) {
  add("loader", "OK", "HIGH", "Vehicle loader prepares runtime view model and KPI fields");
} else {
  add("loader", "FAIL", "HIGH", "Vehicle loader view model/KPI fields incomplete");
}

if (
  hasAll(loaded.loader, [
    "rendezvous",
    "lignes",
    "factures",
    "encaissements",
    "relatedRecordsBySection",
  ])
) {
  add("loader", "OK", "HIGH", "Vehicle loader prepares related sections");
} else {
  add("loader", "FAIL", "HIGH", "Vehicle loader related sections incomplete");
}

if (
  hasAll(loaded.page, [
    "ERPRecordHubConfig",
    "kpis:",
    "primaryCollection:",
    "selectedRecordDetails:",
    'field: "appointmentsCount"',
    'field: "interventionsCount"',
    'field: "invoicesCount"',
    'field: "revenueTotal"',
  ])
) {
  add("metadata", "OK", "HIGH", "Vehicle hub metadata is complete and KPI fields are aligned");
} else {
  add("metadata", "FAIL", "HIGH", "Vehicle hub metadata/KPI fields incomplete");
}

if (
  hasAll(loaded.hubPage, [
    "selectedRecordId?: string | null;",
    "selectedRecordId = null",
    "selectedRecordId ??",
  ])
) {
  add("generic-hub", "OK", "HIGH", "Generic ERPRecordHubPage supports initial selectedRecordId");
} else {
  add("generic-hub", "FAIL", "HIGH", "Generic ERPRecordHubPage selectedRecordId support incomplete");
}

const mojibakePatterns = ["Ã", "Â", "â€™", "â€", "\uFFFD"];

for (const [key, content] of Object.entries(loaded)) {
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

console.log("[Q2-ON-B3] Vehicle Operational Hub route audit");
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
reportLines.push("# Q2-ON-B3 Vehicle Operational Hub route audit");
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
  reportLines.push(`| ${check.area} | ${check.status} | ${check.severity} | ${check.message.replace(/\|/g, "/")} |`);
}

reportLines.push("");
reportLines.push("## Recommendation");
reportLines.push("");

if (failHigh > 0) {
  reportLines.push("HIGH failures exist. Fix the Vehicle Operational Hub route before commit.");
} else if (fail > 0 || warn > 0) {
  reportLines.push("No HIGH blocker. Review warnings before commit.");
} else {
  reportLines.push("Audit clean. Build, then commit Q2-ON-B.");
}

const reportPath = path.join(root, "docs/audits/Q2-ON-B3-vehicle-operational-hub-route-audit.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, reportLines.join("\n"), "utf8");

console.log("[REPORT]", path.relative(root, reportPath));

if (failHigh > 0) {
  process.exitCode = 1;
}