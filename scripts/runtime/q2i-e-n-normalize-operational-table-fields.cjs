const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const modules = [
  {
    key: "clientsauto",
    path: path.join(ROOT, "src", "runtime", "modules", "generated", "clientsauto", "clientsauto.module.ts"),
    fields: [
      "codeClient",
      "nom",
      "prenom",
      "telephone",
      "email",
      "statut",
    ],
    hiddenFields: [
      "id",
      "_id",
      "tenantId",
      "workspaceId",
      "createdAt",
      "updatedAt",
    ],
  },
  {
    key: "vehicules",
    path: path.join(ROOT, "src", "runtime", "modules", "generated", "vehicules", "vehicules.module.ts"),
    fields: [
      "codeVehicule",
      "immatriculation",
      "marque",
      "modele",
      "clientId",
      "statut",
    ],
    hiddenFields: [
      "id",
      "_id",
      "tenantId",
      "workspaceId",
      "createdAt",
      "updatedAt",
    ],
  },
];

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

function toArrayLiteral(values, indent = "      ") {
  return "[\n" + values.map((value) => `${indent}  "${value}",`).join("\n") + "\n" + indent + "]";
}

function replaceTableBlock(content, config) {
  const operational = extractObjectBlock(content, "operational");

  if (!operational) {
    fail(`operational block not found for ${config.key}`);
  }

  const table = extractObjectBlock(operational, "table");

  if (!table) {
    fail(`operational.table block not found for ${config.key}`);
  }

  const nextTable = `table: {
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
      fields: ${toArrayLiteral(config.fields, "      ")},
      hiddenFields: ${toArrayLiteral(config.hiddenFields, "      ")},
    }`;

  const nextOperational = operational.replace(table, nextTable);

  return content.replace(operational, nextOperational);
}

for (const config of modules) {
  if (!fs.existsSync(config.path)) {
    fail(`${config.key} module not found`);
  }

  const original = read(config.path);
  write(config.path + ".bak-q2i-e-n-normalize-operational-table-fields", original);

  const updated = replaceTableBlock(original, config);
  write(config.path, updated);

  console.log("[WRITTEN]", path.relative(ROOT, config.path));
}

const checks = [];

for (const config of modules) {
  const content = read(config.path);
  const operational = extractObjectBlock(content, "operational");
  const table = extractObjectBlock(operational, "table");

  checks.push(
    {
      label: `${config.key} has operational.table.fields`,
      ok: table.includes("fields:") && config.fields.every((field) => table.includes(`"${field}"`)),
    },
    {
      label: `${config.key} keeps search enabled`,
      ok: table.includes("enableSearch: true"),
    },
    {
      label: `${config.key} keeps selection enabled`,
      ok: table.includes("enableSelection: true"),
    },
    {
      label: `${config.key} keeps density toggle enabled`,
      ok: table.includes("enableDensityToggle: true"),
    },
    {
      label: `${config.key} has hiddenFields`,
      ok: table.includes("hiddenFields:") && table.includes('"tenantId"'),
    },
    {
      label: `${config.key} keeps rightPanel`,
      ok: operational.includes("rightPanel:") && operational.includes("metrics:"),
    },
    {
      label: `${config.key} keeps kpis`,
      ok: operational.includes("kpis:"),
    }
  );
}

const failed = checks.filter((check) => !check.ok);

console.log("");
console.log("[Q2-I-E-N] Normalize operational table columns for clientsauto + vehicules");
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
console.log("[DONE] Operational table fields normalized by metadata.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
