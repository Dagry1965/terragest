const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const rdvRel = "src/runtime/modules/generated/rendezvous/rendezvous.module.ts";
const rdvFile = path.join(ROOT, rdvRel);

if (!fs.existsSync(rdvFile)) {
  throw new Error("File not found: " + rdvFile);
}

const original = fs.readFileSync(rdvFile, "utf8");
let content = original;

fs.writeFileSync(
  rdvFile + ".bak-q2a-e3b-fix-business-code-field",
  original,
  "utf8"
);

/**
 * 1. Restaurer businessCode.field si le script précédent l'a cassé.
 */
content = content.replace(
  /businessCode:\s*\{\s*field:\s*\r?\n\s*prefix:\s*"RDV",/,
  `businessCode: {
      field: "codeRendezVous",
      prefix: "RDV",`
);

/**
 * 2. Retirer codeRendezVous uniquement dans operational.table.fields.
 */
const operationalIndex = content.indexOf("operational:");
if (operationalIndex < 0) {
  throw new Error("Bloc operational introuvable.");
}

const tableIndex = content.indexOf("table:", operationalIndex);
if (tableIndex < 0) {
  throw new Error("Bloc operational.table introuvable.");
}

const schedulingIndex = content.indexOf("scheduling:", operationalIndex);
const endIndex = schedulingIndex > tableIndex ? schedulingIndex : content.length;

const before = content.slice(0, tableIndex);
let tableBlock = content.slice(tableIndex, endIndex);
const after = content.slice(endIndex);

tableBlock = tableBlock.replace(/\s*"codeRendezVous",\s*\r?\n/g, "\n");

content = before + tableBlock + after;

/**
 * Vérifications.
 */
const problems = [];

if (!content.includes('field: "codeRendezVous"')) {
  problems.push("businessCode.field codeRendezVous absent");
}

const operationalTableSlice = content.slice(tableIndex, endIndex);
if (operationalTableSlice.includes('"codeRendezVous"')) {
  problems.push("codeRendezVous encore présent dans operational.table.fields");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) {
    console.log(" - " + problem);
  }
  process.exit(1);
}

fs.writeFileSync(rdvFile, content, "utf8");

console.log("[DONE] businessCode restauré et colonne code RDV retirée seulement de la table opérationnelle.");
console.log("[WRITTEN]", rdvRel);
console.log("");
console.log("Next:");
console.log("pnpm build");
