const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const files = {
  vehicules: path.join(ROOT, "src", "runtime", "modules", "generated", "vehicules", "vehicules.module.ts"),
  clients: path.join(ROOT, "src", "runtime", "modules", "generated", "clientsauto", "clientsauto.module.ts"),
  table: path.join(ROOT, "src", "components", "erp", "operational", "ERPOperationalTable.tsx"),
  resolver: path.join(ROOT, "src", "runtime", "operational", "RuntimeOperationalDataResolver.ts"),
};

function read(file) {
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function printAround(label, content, pattern, before = 18, after = 60) {
  const lines = content.split(/\r?\n/);
  const indexes = [];

  lines.forEach((line, index) => {
    if (line.includes(pattern)) indexes.push(index);
  });

  console.log("");
  console.log(`[${label}] PATTERN ${pattern}`);
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

const vehicules = read(files.vehicules);
const clients = read(files.clients);
const table = read(files.table);
const resolver = read(files.resolver);

console.log("");
console.log("[Q2-I-E-N3] Audit vehicules client relation label resolution");
console.log("");

printAround("VEHICULES", vehicules, "clientId", 30, 80);
printAround("VEHICULES", vehicules, "relationLabelFields", 20, 60);
printAround("CLIENTSAUTO", clients, "key: \"nom\"", 20, 40);
printAround("CLIENTSAUTO", clients, "key: \"prenom\"", 20, 40);
printAround("CLIENTSAUTO", clients, "key: \"telephone\"", 20, 40);
printAround("TABLE", table, "relationLabels", 30, 90);
printAround("TABLE", table, "renderCell", 30, 90);
printAround("RESOLVER", resolver, "function getRelationModuleKey", 20, 80);
printAround("RESOLVER", resolver, "getRelationLabelFields", 20, 80);

const checks = [
  {
    label: "vehicules module contains clientId",
    ok: vehicules.includes("clientId"),
  },
  {
    label: "vehicules operational table contains relationLabelFields",
    ok: vehicules.includes("relationLabelFields"),
  },
  {
    label: "vehicules relationLabelFields includes nom/prenom/telephone",
    ok: vehicules.includes('"nom"') && vehicules.includes('"prenom"') && vehicules.includes('"telephone"'),
  },
  {
    label: "clientsauto has nom/prenom/telephone fields",
    ok: clients.includes('key: "nom"') && clients.includes('key: "prenom"') && clients.includes('key: "telephone"'),
  },
  {
    label: "ERPOperationalTable uses relationLabels",
    ok: table.includes("relationLabels"),
  },
  {
    label: "RuntimeOperationalDataResolver reads relation.module",
    ok: resolver.includes("relation.module"),
  },
  {
    label: "RuntimeOperationalDataResolver reads relation.collection",
    ok: resolver.includes("relation.collection"),
    warning: true,
  },
  {
    label: "RuntimeOperationalDataResolver reads relation.moduleKey",
    ok: resolver.includes("relation.moduleKey"),
    warning: true,
  },
];

const failures = checks.filter((check) => !check.ok && !check.warning);
const warnings = checks.filter((check) => !check.ok && check.warning);

console.log("");
console.log("[CHECKS]");
for (const check of checks) {
  const prefix = check.ok ? "[OK]" : check.warning ? "[WARN]" : "[FAIL]";
  console.log(`${prefix} ${check.label}`);
}

console.log("");
console.log(`[SUMMARY] OK: ${checks.filter((check) => check.ok).length} WARN: ${warnings.length} FAIL: ${failures.length}`);

if (failures.length > 0) process.exit(1);
