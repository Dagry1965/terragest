const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const clientsPath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "clientsauto",
  "clientsauto.module.ts"
);

const operationalResolverPath = path.join(
  ROOT,
  "src",
  "runtime",
  "operational",
  "RuntimeOperationalChildrenResolver.ts"
);

const operationalTablePath = path.join(
  ROOT,
  "src",
  "components",
  "erp",
  "operational",
  "ERPOperationalTable.tsx"
);

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

const clients = read(clientsPath);
const resolver = read(operationalResolverPath);
const table = read(operationalTablePath);

const checks = [
  {
    label: "clientsauto module exists",
    ok: fs.existsSync(clientsPath),
  },
  {
    label: "clientsauto has composition.children",
    ok: clients.includes("composition") && clients.includes("children"),
  },
  {
    label: "clientsauto references vehicules",
    ok: clients.includes("vehicules"),
  },
  {
    label: "clientsauto references rendezvous or interventions",
    ok: clients.includes("rendezvous") || clients.includes("interventionsauto"),
  },
  {
    label: "clientsauto has operational.branding",
    ok: clients.includes("operational") && clients.includes("branding"),
  },
  {
    label: "clientsauto has rightPanel.metrics",
    ok: clients.includes("rightPanel") && clients.includes("metrics"),
  },
  {
    label: "operational table can render expanded children",
    ok: table.includes("ERPOperationalExpandedChildren"),
  },
  {
    label: "operational resolver supports real child module",
    ok: resolver.includes("module: ERPModule") && resolver.includes("module: childModule"),
  },
  {
    label: "operational resolver supports recursive children",
    ok: resolver.includes("depth + 1") && resolver.includes("children: RuntimeOperationalExpandedGroup[]"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-B] Audit clientsauto operational readiness final");
console.log("");

for (const check of checks) {
  console.log(`${check.ok ? "[OK]" : "[FAIL]"} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.length - failed.length} FAIL: ${failed.length}`);

if (failed.length > 0) {
  process.exit(1);
}

console.log("");
console.log("[DONE] clientsauto is operational-ready.");
console.log("");
console.log("Next:");
console.log("  Q2-I-C — add operational metadata to vehicules");
