const fs = require("fs");
const path = require("path");

const root = process.cwd();

const generatedDir = path.join(
  root,
  "src",
  "runtime",
  "modules",
  "generated"
);

const alwaysTechnicalFields = new Set([
  "id",
  "_id",
  "tenantId",
  "workspaceId",
  "moduleKey",
  "userId",
  "createdAt",
  "updatedAt",
  "deletedAt",
  "createdBy",
  "updatedBy",
  "deletedBy",

  // Stock runtime / anti-doublon
  "stockMovementId",
  "stockProcessedAt",
  "stockProcessedQuantity",

  // Source / audit runtime
  "sourceId",
  "sourceModule",
  "ligneInterventionId",
  "startAt",
  "endAt",
  "consumedByInterventionId",
]);

const relationFieldsAllowedInForms = new Set([
  "clientId",
  "vehiculeId",
  "rendezVousId",
  "rendezvousId",
  "interventionId",
  "produitId",
  "stockId",
  "factureId",
  "echeanceId",
  "encaissementId",
  "terrainId",
  "exploitationId",
  "contratId",
  "responsableId",
  "proprietaireId",
]);

const technicalFieldPatterns = [
  /Processed/i,
  /MovementId$/i,
  /Technical/i,
  /Internal/i,
  /Audit/i,
  /^source/i,
  /Trace/i,
];

function isTechnicalField(field) {
  if (alwaysTechnicalFields.has(field)) return true;

  if (relationFieldsAllowedInForms.has(field)) return false;

  if (field === "id" || field === "_id") return true;

  if (technicalFieldPatterns.some((pattern) => pattern.test(field))) {
    return true;
  }

  return false;
}

function listModuleFiles(dir) {
  const files = [];

  if (!fs.existsSync(dir)) {
    throw new Error(`Dossier introuvable: ${dir}`);
  }

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...listModuleFiles(fullPath));
    } else if (entry.isFile() && entry.name.endsWith(".module.ts")) {
      files.push(fullPath);
    }
  }

  return files;
}

function extractModuleKey(content, fallback) {
  const match = content.match(/metadata:\s*\{[\s\S]*?key:\s*"([^"]+)"/);

  return match?.[1] ?? fallback;
}

function extractFormBlock(content) {
  const formIndex = content.indexOf("form:");

  if (formIndex === -1) return "";

  const possibleEnds = [
    content.indexOf("\n  actions:", formIndex),
    content.indexOf("\n  workflows:", formIndex),
    content.indexOf("\n  composition:", formIndex),
    content.indexOf("\n  relations:", formIndex),
  ].filter((index) => index > formIndex);

  const end =
    possibleEnds.length > 0
      ? Math.min(...possibleEnds)
      : content.lastIndexOf("\n};");

  return content.slice(formIndex, end > formIndex ? end : content.length);
}

function extractFormFields(content) {
  const formBlock = extractFormBlock(content);
  const fields = new Set();

  if (!formBlock) return fields;

  const arrayRegex = /fields\s*:\s*\[([\s\S]*?)\]/g;

  let arrayMatch;
  while ((arrayMatch = arrayRegex.exec(formBlock)) !== null) {
    const arrayContent = arrayMatch[1];
    const stringRegex = /"([^"]+)"/g;

    let stringMatch;
    while ((stringMatch = stringRegex.exec(arrayContent)) !== null) {
      fields.add(stringMatch[1]);
    }
  }

  return fields;
}

const files = listModuleFiles(generatedDir);
const issues = [];

for (const file of files) {
  const content = fs.readFileSync(file, "utf8");
  const moduleKey = extractModuleKey(
    content,
    path.basename(path.dirname(file))
  );

  const formFields = extractFormFields(content);

  for (const field of formFields) {
    if (isTechnicalField(field)) {
      issues.push({
        moduleKey,
        field,
        file,
      });
    }
  }
}

console.log("");
console.log("=== AUDIT CHAMPS TECHNIQUES VISIBLES DANS LES FORMULAIRES ===");
console.log("");

if (issues.length === 0) {
  console.log("OK: aucun champ technique interdit détecté dans les formulaires.");
  process.exit(0);
}

for (const issue of issues) {
  console.log(
    `TECH_FIELD_IN_FORM | module=${issue.moduleKey} | field=${issue.field} | file=${issue.file}`
  );
}

console.log("");
console.log(`TOTAL: ${issues.length} champ(s) technique(s) visible(s) à corriger.`);
process.exit(1);