const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  genericList: path.join(ROOT, "src", "components", "erp", "generic", "GenericListPage.tsx"),
  operationalPage: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalModulePage.tsx"),
  coreModules: path.join(ROOT, "src", "runtime", "modules", "definitions", "coreModules.ts"),
  clients: path.join(ROOT, "src", "runtime", "modules", "generated", "clientsauto", "clientsauto.module.ts"),
  vehicules: path.join(ROOT, "src", "runtime", "modules", "generated", "vehicules", "vehicules.module.ts"),
  rendezvous: path.join(ROOT, "src", "runtime", "modules", "generated", "rendezvous", "rendezvous.module.ts"),
  interventions: path.join(ROOT, "src", "runtime", "modules", "generated", "interventionsauto", "interventionsauto.module.ts"),
  factures: path.join(ROOT, "src", "runtime", "modules", "generated", "facturesauto", "facturesauto.module.ts"),
};

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function printAround(content, pattern, before = 20, after = 50) {
  const lines = content.split(/\r?\n/);
  const indexes = [];

  lines.forEach((line, index) => {
    if (line.includes(pattern)) indexes.push(index);
  });

  console.log("");
  console.log(`[PATTERN] ${pattern}`);
  console.log(`[MATCHES] ${indexes.length}`);

  for (const index of indexes) {
    console.log("");
    console.log(`[AROUND LINE ${index + 1}]`);

    const start = Math.max(0, index - before);
    const end = Math.min(lines.length, index + after + 1);

    for (let i = start; i < end; i++) {
      console.log(String(i + 1).padStart(4, " ") + ": " + lines[i]);
    }
  }
}

function moduleSummary(label, file) {
  const content = read(file);

  return {
    label,
    file: path.relative(ROOT, file),
    exists: fs.existsSync(file),
    hasOperational: content.includes("operational:"),
    hasKpis: content.includes("kpis:"),
    hasTable: content.includes("table:"),
    hasRightPanel: content.includes("rightPanel:"),
    hasComposition: content.includes("composition:") && content.includes("children:"),
  };
}

const generic = read(files.genericList);
const core = read(files.coreModules);

console.log("");
console.log("[Q2-I-E-H] Audit GenericListPage operational routing");
console.log("");

console.log("[GENERIC LIST PAGE]");
console.log(JSON.stringify({
  exists: fs.existsSync(files.genericList),
  importsOperationalPage: generic.includes("ERPOperationalModulePage"),
  mentionsOperational: generic.includes("operational"),
  mentionsKpis: generic.includes("kpis"),
  mentionsComposition: generic.includes("composition"),
  usesModuleKey: generic.includes("moduleKey"),
  usesCoreModules: generic.includes("coreModules") || generic.includes("allERPModules"),
  usesRegistry: generic.includes("Registry") || generic.includes("registry"),
  usesRuntimeDataResolver: generic.includes("RuntimeOperationalDataResolver"),
  usesRuntimeDataBinding: generic.includes("RuntimeDataBinding"),
}, null, 2));

console.log("");
console.log("[MODULE SUMMARIES]");
console.log(JSON.stringify([
  moduleSummary("clientsauto", files.clients),
  moduleSummary("vehicules", files.vehicules),
  moduleSummary("rendezvous", files.rendezvous),
  moduleSummary("interventionsauto", files.interventions),
  moduleSummary("facturesauto", files.factures),
], null, 2));

console.log("");
console.log("[CORE MODULES]");
console.log(JSON.stringify({
  exists: fs.existsSync(files.coreModules),
  importsClientsauto: core.includes("clientsautoModule"),
  importsVehicules: core.includes("vehiculesModule"),
  importsRendezvous: core.includes("rendezvousModule"),
  importsInterventions: core.includes("interventionsautoModule"),
  importsFactures: core.includes("facturesautoModule"),
  containsGeneratedSpread: core.includes("clientsautoModule") && core.includes("vehiculesModule"),
  hasOperationalLiteral: core.includes("operational:"),
  hasKpisLiteral: core.includes("kpis:"),
}, null, 2));

printAround(generic, "ERPOperationalModulePage", 20, 60);
printAround(generic, "operational", 20, 60);
printAround(generic, "moduleKey", 20, 60);
printAround(generic, "coreModules", 20, 60);
printAround(generic, "allERPModules", 20, 60);
printAround(generic, "RuntimeDataBinding", 20, 60);
printAround(generic, "return", 20, 80);

const checks = [
  {
    label: "GenericListPage exists",
    ok: fs.existsSync(files.genericList),
  },
  {
    label: "GenericListPage can route to ERPOperationalModulePage",
    ok: generic.includes("ERPOperationalModulePage"),
    warning: true,
  },
  {
    label: "GenericListPage checks module.operational",
    ok: generic.includes("operational"),
    warning: true,
  },
  {
    label: "Generated clientsauto has operational.kpis",
    ok: read(files.clients).includes("operational:") && read(files.clients).includes("kpis:"),
  },
  {
    label: "Generated vehicules has operational.kpis",
    ok: read(files.vehicules).includes("operational:") && read(files.vehicules).includes("kpis:"),
  },
  {
    label: "coreModules imports clientsauto module",
    ok: core.includes("clientsautoModule"),
  },
  {
    label: "coreModules imports vehicules module",
    ok: core.includes("vehiculesModule"),
  },
];

const hardFailures = checks.filter((check) => !check.ok && !check.warning);
const warnings = checks.filter((check) => !check.ok && check.warning);

console.log("");
console.log("[CHECKS]");
for (const check of checks) {
  const prefix = check.ok ? "[OK]" : check.warning ? "[WARN]" : "[FAIL]";
  console.log(`${prefix} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.filter((c) => c.ok).length} WARN: ${warnings.length} FAIL: ${hardFailures.length}`);

if (hardFailures.length > 0) process.exit(1);

console.log("");
console.log("[DONE] Q2-I-E-H audit completed.");
console.log("");
console.log("Next:");
console.log("  If GenericListPage does not route operational modules, add a generic branch there.");
