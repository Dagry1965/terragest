const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const targets = [
  {
    rel: "src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts",
    backup: ".bak-q2g-a1-operational-table-fields",
    fields: [
      "clientId",
      "vehiculeId",
      "dateIntervention",
      "typeIntervention",
      "kilometrage",
      "coutTotal",
      "statut",
    ],
  },
  {
    rel: "src/runtime/modules/generated/facturesauto/facturesauto.module.ts",
    backup: ".bak-q2g-a1-operational-table-fields",
    fields: [
      "numeroFacture",
      "clientId",
      "vehiculeId",
      "dateFacture",
      "montantTTC",
      "montantPaye",
      "resteAPayer",
      "statutPaiement",
    ],
  },
];

function abs(rel) {
  return path.join(ROOT, rel);
}

function replaceOperationalTableFields(content, fields, rel) {
  const operationalIndex = content.indexOf("operational:");
  if (operationalIndex < 0) {
    throw new Error("operational introuvable dans " + rel);
  }

  const tableIndex = content.indexOf("table:", operationalIndex);
  if (tableIndex < 0) {
    throw new Error("operational.table introuvable dans " + rel);
  }

  const fieldsIndex = content.indexOf("fields:", tableIndex);
  if (fieldsIndex < 0) {
    throw new Error("operational.table.fields introuvable dans " + rel);
  }

  const arrayStart = content.indexOf("[", fieldsIndex);
  if (arrayStart < 0) {
    throw new Error("Début tableau fields introuvable dans " + rel);
  }

  let depth = 0;
  let arrayEnd = -1;

  for (let i = arrayStart; i < content.length; i += 1) {
    const char = content[i];

    if (char === "[") depth += 1;
    if (char === "]") depth -= 1;

    if (depth === 0) {
      arrayEnd = i;
      break;
    }
  }

  if (arrayEnd < 0) {
    throw new Error("Fin tableau fields introuvable dans " + rel);
  }

  const fieldBlock = `fields: [
${fields.map((field) => `          "${field}",`).join("\n")}
        ]`;

  return (
    content.slice(0, fieldsIndex) +
    fieldBlock +
    content.slice(arrayEnd + 1)
  );
}

for (const target of targets) {
  const file = abs(target.rel);

  if (!fs.existsSync(file)) {
    throw new Error("File not found: " + target.rel);
  }

  const original = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file + target.backup, original, "utf8");

  const next = replaceOperationalTableFields(original, target.fields, target.rel);

  for (const field of target.fields) {
    if (!next.includes(`"${field}"`)) {
      throw new Error(`Champ ${field} non présent après correction dans ${target.rel}`);
    }
  }

  fs.writeFileSync(file, next, "utf8");
  console.log("[WRITTEN]", target.rel);
}

console.log("");
console.log("[DONE] Q2-G-A1 operational.table.fields corrigés.");
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\q2g-final-operational-ux-runtime-audit.cjs");
console.log("pnpm run build");
