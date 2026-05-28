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
      "uid",
      "tenantId",
      "workspaceId",
      "createdAt",
      "updatedAt",
      "removedAt",
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
      "uid",
      "tenantId",
      "workspaceId",
      "createdAt",
      "updatedAt",
      "removedAt",
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

function arrayLiteral(values, indent = "      ") {
  return "[\n" + values.map((value) => `${indent}  "${value}",`).join("\n") + "\n" + indent + "]";
}

function replaceOrInsertTable(content, config) {
  const operational = extractObjectBlock(content, "operational");

  if (!operational) {
    fail(`operational block not found for ${config.key}`);
  }

  const table = extractObjectBlock(operational, "table");

  const nextTable = `table: {
      enableSearch: true,
      enableSelection: true,
      enableDensityToggle: true,
      fields: ${arrayLiteral(config.fields, "      ")},
      hiddenFields: ${arrayLiteral(config.hiddenFields, "      ")},
    }`;

  let nextOperational;

  if (table) {
    nextOperational = operational.replace(table, nextTable);
  } else {
    const rightPanelIndex = operational.indexOf("\n    rightPanel:");

    if (rightPanelIndex < 0) {
      fail(`Unable to find insertion point before rightPanel for ${config.key}`);
    }

    nextOperational =
      operational.slice(0, rightPanelIndex).trimEnd() +
      "\n    " +
      nextTable +
      ",\n" +
      operational.slice(rightPanelIndex);
  }

  return content.replace(operational, nextOperational);
}

for (const config of modules) {
  if (!fs.existsSync(config.path)) {
    fail(`${config.key} module not found`);
  }

  const original = read(config.path);
  write(config.path + ".bak-q2i-e-n-normalize-operational-table-fields", original);

  const updated = replaceOrInsertTable(original, config);
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
      label: `${config.key} has same table feature structure`,
      ok:
        table.includes("enableSearch: true") &&
        table.includes("enableSelection: true") &&
        table.includes("enableDensityToggle: true"),
    },
    {
      label: `${config.key} has hidden technical fields`,
      ok:
        table.includes("hiddenFields:") &&
        table.includes('"tenantId"') &&
        table.includes('"workspaceId"') &&
        table.includes('"removedAt"'),
    },
    {
      label: `${config.key} keeps kpis`,
      ok: operational.includes("kpis:"),
    },
    {
      label: `${config.key} keeps rightPanel`,
      ok: operational.includes("rightPanel:") && operational.includes("metrics:"),
    },
    {
      label: `${config.key} keeps branding contract`,
      ok:
        operational.includes("brandName:") &&
        operational.includes("runtimeLabel:") &&
        operational.includes("eyebrow:"),
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
console.log("[DONE] Operational table columns normalized by metadata.");
console.log("");
console.log("Next:");
console.log("  pnpm build");
