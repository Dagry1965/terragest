const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "runtime",
  "ERPRelatedRecordsPanel.tsx"
);

if (!fs.existsSync(file)) {
  throw new Error(`Fichier introuvable: ${file}`);
}

let content = fs.readFileSync(file, "utf8");

const backup = `${file}.bak-q12g-d-clean-labels`;
fs.writeFileSync(backup, content, "utf8");

console.log("BACKUP:", backup);

const oldFunction = `function getChildRecordLabel(
  record: Record<string, unknown>,
  childModule?: ERPModule
): string {
  const visibleFields =
    childModule?.schema?.fields
      ?.filter((field) => field.list?.order !== undefined)
      ?.sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
      ?.map((field) => field.key) ?? [];

  const label = getLabelFromFields(record, visibleFields.slice(0, 3));

  return label || getFallbackRecordLabel(record);
}`;

const newFunction = `function looksLikeTechnicalId(value: unknown): boolean {
  const text = String(value ?? "").trim();

  if (!text) return false;

  // Firestore-like ids / technical ids often contain mixed case letters + numbers
  // and are not meaningful labels for end users.
  if (/^[A-Za-z0-9_-]{16,}$/.test(text)) {
    return true;
  }

  return false;
}

function isTechnicalField(field: string): boolean {
  const key = field.toLowerCase();

  return (
    key === "id" ||
    key === "_id" ||
    key.endsWith("id") ||
    key.includes("uuid") ||
    key.includes("technical") ||
    key.includes("foreignkey")
  );
}

function formatBusinessValue(value: unknown): string {
  const text = String(value ?? "").trim();

  const labels: Record<string, string> = {
    piece: "Pièce",
    main_oeuvre: "Main d’œuvre",
    service: "Service",
    remise: "Remise",
    brouillon: "Brouillon",
    validee: "Validée",
    facturee: "Facturée",
    annulee: "Annulée",
  };

  return labels[text] ?? text;
}

function getBusinessLabelFromRecord(
  record: Record<string, unknown>,
  preferredFields: string[]
): string {
  const values = preferredFields
    .map((field) => record[field])
    .filter((value) => value !== undefined && value !== null)
    .map(formatBusinessValue)
    .filter((value) => value.trim() !== "")
    .filter((value) => !looksLikeTechnicalId(value));

  return values.join(" - ");
}

function getChildRecordLabel(
  record: Record<string, unknown>,
  childModule?: ERPModule
): string {
  const priorityLabel = getBusinessLabelFromRecord(record, [
    "designation",
    "libelle",
    "nom",
    "titre",
    "reference",
    "code",
    "typeLigne",
    "type",
  ]);

  if (priorityLabel) {
    return priorityLabel;
  }

  const visibleFields =
    childModule?.schema?.fields
      ?.filter((field) => field.list?.order !== undefined)
      ?.sort((a, b) => Number(a.list?.order ?? 999) - Number(b.list?.order ?? 999))
      ?.map((field) => field.key)
      ?.filter((field) => !isTechnicalField(field)) ?? [];

  const label = getBusinessLabelFromRecord(record, visibleFields.slice(0, 3));

  return label || "Enregistrement lié";
}`;

if (!content.includes(oldFunction)) {
  throw new Error("Ancienne fonction getChildRecordLabel introuvable. Inspection manuelle nécessaire.");
}

content = content.replace(oldFunction, newFunction);

// Nettoie aussi les relations affichées en sous-titre : pas d’ID technique seul.
content = content.replace(
  `return relationLabel;`,
  `if (!relationLabel || looksLikeTechnicalId(relationLabel)) {
                return null;
              }

              return relationLabel;`
);

// Nettoyage mojibake éventuel
content = content.replace(/·/g, "·");
content = content.replace(/lié/g, "lié");
content = content.replace(/Main d'oeuvre/g, "Main d’œuvre");

fs.writeFileSync(file, content, "utf8");

console.log("OK: libellés enfants nettoyés pour éviter les IDs techniques.");