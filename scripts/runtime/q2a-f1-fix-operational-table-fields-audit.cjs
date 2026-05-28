const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const file = path.join(
  ROOT,
  "scripts",
  "runtime",
  "q2a-f-operational-appointments-stabilization-audit.cjs"
);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");

fs.writeFileSync(
  file + ".bak-q2a-f1-fields-only-audit",
  original,
  "utf8"
);

let content = original;

const helper = `
function extractOperationalTableFields(content) {
  const operationalIndex = content.indexOf("operational:");
  if (operationalIndex < 0) return "";

  const tableIndex = content.indexOf("table:", operationalIndex);
  if (tableIndex < 0) return "";

  const fieldsIndex = content.indexOf("fields:", tableIndex);
  if (fieldsIndex < 0) return "";

  const hiddenFieldsIndex = content.indexOf("hiddenFields:", fieldsIndex);
  const rightPanelIndex = content.indexOf("rightPanel:", tableIndex);

  const endCandidates = [hiddenFieldsIndex, rightPanelIndex, content.length]
    .filter((index) => index > fieldsIndex);

  const endIndex = Math.min(...endCandidates);

  return content.slice(fieldsIndex, endIndex);
}

`;

if (!content.includes("function extractOperationalTableFields")) {
  const marker = "function checkNotContains";
  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: checkNotContains");
  }

  content = content.slice(0, index) + helper + content.slice(index);
}

const oldCodeCheck = `checkNotContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"]
    .split("table:")[1]
    ?.split("rightPanel:")[0] ?? "",
  '"codeRendezVous"',
  "codeRendezVous absent des colonnes table opérationnelle"
);`;

const newCodeCheck = `checkNotContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  extractOperationalTableFields(
    contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"]
  ),
  '"codeRendezVous"',
  "codeRendezVous absent de operational.table.fields"
);`;

const oldInterventionCheck = `checkNotContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"]
    .split("table:")[1]
    ?.split("rightPanel:")[0] ?? "",
  '"consumedByInterventionId"',
  "Intervention liée absente des colonnes table opérationnelle"
);`;

const newInterventionCheck = `checkNotContains(
  "src/runtime/modules/generated/rendezvous/rendezvous.module.ts",
  extractOperationalTableFields(
    contents["src/runtime/modules/generated/rendezvous/rendezvous.module.ts"]
  ),
  '"consumedByInterventionId"',
  "Intervention liée absente de operational.table.fields"
);`;

content = content.replace(oldCodeCheck, newCodeCheck);
content = content.replace(oldInterventionCheck, newInterventionCheck);

const problems = [];

if (!content.includes("function extractOperationalTableFields")) {
  problems.push("extractOperationalTableFields absent");
}

if (content.includes('.split("table:")[1]')) {
  problems.push("Ancienne extraction table trop large encore présente");
}

if (!content.includes("codeRendezVous absent de operational.table.fields")) {
  problems.push("Check codeRendezVous non corrigé");
}

if (!content.includes("Intervention liée absente de operational.table.fields")) {
  problems.push("Check consumedByInterventionId non corrigé");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-A-F1 audit corrigé : vérification uniquement dans operational.table.fields.");
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("node .\\scripts\\runtime\\q2a-f-operational-appointments-stabilization-audit.cjs");
