const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const filePath = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "generated",
  "vehicules",
  "vehicules.module.ts"
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

if (!fs.existsSync(filePath)) {
  fail("vehicules.module.ts not found");
}

let content = read(filePath);

const backupPath = filePath + ".bak-q2i-e-n3b-relation-label-fields-in-table";
write(backupPath, content);

console.log("[BACKUP]", path.relative(ROOT, backupPath));

/**
 * Supprime d'abord tout bloc relationLabelFields existant dans le fichier,
 * pour éviter les doublons ou les blocs mal placés.
 */
content = content.replace(
  /\n\s*relationLabelFields\s*:\s*\{[\s\S]*?\n\s*\},/m,
  ""
);

const operational = extractObjectBlock(content, "operational");
if (!operational) fail("operational block not found");

const table = extractObjectBlock(operational, "table");
if (!table) fail("operational.table block not found");

const relationLabelFieldsBlock = `relationLabelFields: {
        clientId: [
          "nom",
          "prenom",
          "telephone",
        ],
      },`;

let nextTable = table;

const hiddenFieldsIndex = nextTable.indexOf("\n      hiddenFields:");

if (hiddenFieldsIndex >= 0) {
  nextTable =
    nextTable.slice(0, hiddenFieldsIndex).trimEnd() +
    "\n      " +
    relationLabelFieldsBlock +
    nextTable.slice(hiddenFieldsIndex);
} else {
  const closingIndex = nextTable.lastIndexOf("\n    }");

  if (closingIndex < 0) {
    fail("table closing point not found");
  }

  nextTable =
    nextTable.slice(0, closingIndex).trimEnd() +
    "\n      " +
    relationLabelFieldsBlock +
    nextTable.slice(closingIndex);
}

const nextOperational = operational.replace(table, nextTable);
content = content.replace(operational, nextOperational);

write(filePath, content);

const updated = read(filePath);
const updatedOperational = extractObjectBlock(updated, "operational");
const updatedTable = extractObjectBlock(updatedOperational, "table");

const checks = [
  {
    label: "vehicules operational.table exists",
    ok: Boolean(updatedTable),
  },
  {
    label: "relationLabelFields is inside operational.table",
    ok:
      updatedTable.includes("relationLabelFields:") &&
      updatedTable.includes("clientId:") &&
      updatedTable.includes('"nom"') &&
      updatedTable.includes('"prenom"') &&
      updatedTable.includes('"telephone"'),
  },
  {
    label: "relationLabelFields is not duplicated outside table",
    ok: (updated.match(/relationLabelFields\s*:/g) ?? []).length === 1,
  },
  {
    label: "clientId remains in operational.table.fields",
    ok: updatedTable.includes('"clientId"'),
  },
  {
    label: "vehicules keeps kpis",
    ok: updatedOperational.includes("kpis:"),
  },
  {
    label: "vehicules keeps rightPanel",
    ok: updatedOperational.includes("rightPanel:") && updatedOperational.includes("metrics:"),
  },
];

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-E-N3B] Move vehicules relationLabelFields inside operational.table");
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
console.log("[DONE] relationLabelFields is now inside operational.table.");
console.log("");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\q2i-e-n3-audit-vehicules-client-relation-label.cjs");
console.log("  pnpm build");
