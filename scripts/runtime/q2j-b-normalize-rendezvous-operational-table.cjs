const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "rendezvous",
  "rendezvous.module.ts"
);

function fail(message) {
  console.log("[FAIL]", message);
  process.exit(1);
}

function read(filePath) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

function write(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
}

function extractObjectBlock(source, propertyName) {
  const start = source.indexOf(`${propertyName}:`);
  if (start < 0) return "";

  const braceStart = source.indexOf("{", start);
  if (braceStart < 0) return "";

  let depth = 0;
  let inString = false;
  let stringChar = "";
  let escaped = false;

  for (let i = braceStart; i < source.length; i++) {
    const char = source[i];

    if (inString) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === stringChar) {
        inString = false;
        stringChar = "";
      }
      continue;
    }

    if (char === '"' || char === "'" || char === "`") {
      inString = true;
      stringChar = char;
      continue;
    }

    if (char === "{") depth++;
    if (char === "}") depth--;

    if (depth === 0) return source.slice(start, i + 1);
  }

  return "";
}

function arrayLiteral(values, indent = "      ") {
  return "[\n" + values.map((value) => `${indent}  "${value}",`).join("\n") + "\n" + indent + "]";
}

if (!fs.existsSync(filePath)) {
  fail("rendezvous.module.ts not found");
}

let content = read(filePath);
const backupPath = filePath + ".bak-q2j-b-normalize-rendezvous-operational-table";
write(backupPath, content);

console.log("[BACKUP]", path.relative(ROOT, backupPath));

const operational = extractObjectBlock(content, "operational");
if (!operational) fail("operational block not found");

const table = extractObjectBlock(operational, "table");
if (!table) fail("operational.table block not found");

const nextTable = `table: {
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
      fields: ${arrayLiteral([
        "codeRendezVous",
        "dateRendezVous",
        "heureRendezVous",
        "clientId",
        "vehiculeId",
        "typeService",
        "statut",
      ], "      ")},
      relationLabelFields: {
        clientId: [
          "nom",
          "prenom",
          "telephone",
        ],
        vehiculeId: [
          "marque",
          "modele",
          "immatriculation",
        ],
      },
      hiddenFields: ${arrayLiteral([
        "id",
        "_id",
        "uid",
        "tenantId",
        "workspaceId",
        "createdAt",
        "updatedAt",
        "removedAt",
        "consumedByInterventionId",
      ], "      ")},
    }`;

const nextOperational = operational.replace(table, nextTable);
content = content.replace(operational, nextOperational);

write(filePath, content);

const updated = read(filePath);
const updatedOperational = extractObjectBlock(updated, "operational");
const updatedTable = extractObjectBlock(updatedOperational, "table");

const checks = [
  {
    label: "rendezvous keeps operational table",
    ok: updatedTable.includes("fields:"),
  },
  {
    label: "rendezvous visible fields normalized",
    ok:
      updatedTable.includes('"codeRendezVous"') &&
      updatedTable.includes('"dateRendezVous"') &&
      updatedTable.includes('"heureRendezVous"') &&
      updatedTable.includes('"clientId"') &&
      updatedTable.includes('"vehiculeId"') &&
      updatedTable.includes('"typeService"') &&
      updatedTable.includes('"statut"'),
  },
  {
    label: "client relation label uses nom/prenom/telephone",
    ok:
      updatedTable.includes("clientId:") &&
      updatedTable.includes('"nom"') &&
      updatedTable.includes('"prenom"') &&
      updatedTable.includes('"telephone"'),
  },
  {
    label: "vehicule relation label uses marque/modele/immatriculation",
    ok:
      updatedTable.includes("vehiculeId:") &&
      updatedTable.includes('"marque"') &&
      updatedTable.includes('"modele"') &&
      updatedTable.includes('"immatriculation"'),
  },
  {
    label: "hidden technical fields present",
    ok:
      updatedTable.includes('"tenantId"') &&
      updatedTable.includes('"workspaceId"') &&
      updatedTable.includes('"removedAt"'),
  },
  {
    label: "rendezvous keeps kpis",
    ok: updatedOperational.includes("kpis:"),
  },
  {
    label: "rendezvous keeps rightPanel",
    ok: updatedOperational.includes("rightPanel:") && updatedOperational.includes("metrics:"),
  },
  {
    label: "no duplicate relationLabelFields",
    ok: (updated.match(/relationLabelFields\s*:/g) ?? []).length === 1,
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-J-B] Normalize rendezvous operational table metadata");
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
console.log("[DONE] rendezvous operational table normalized.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\q2j-a-audit-operational-columns-rdv-interventions-factures.cjs");
console.log("  pnpm build");
