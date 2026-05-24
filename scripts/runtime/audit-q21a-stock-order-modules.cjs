const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const GENERATED_DIR = path.join(ROOT, "src/runtime/modules/generated");

const KEYWORDS = [
  "commande",
  "commandes",
  "achat",
  "achats",
  "fournisseur",
  "fournisseurs",
  "stock",
  "stocks",
  "reception",
  "receptions",
  "mouvement",
  "mouvements",
  "produit",
  "produits",
];

function walk(dir) {
  if (!fs.existsSync(dir)) {
    return [];
  }

  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(full);
    }

    return [full];
  });
}

function rel(file) {
  return path.relative(ROOT, file).replace(/\\/g, "/");
}

function read(file) {
  return fs.readFileSync(file, "utf8");
}

function extractModuleKey(content) {
  const match =
    content.match(/metadata\s*:\s*\{[\s\S]*?key\s*:\s*"([^"]+)"/) ||
    content.match(/key\s*:\s*"([^"]+)"/);

  return match?.[1] ?? "";
}

function extractCollection(content) {
  const match = content.match(/collection\s*:\s*"([^"]+)"/);
  return match?.[1] ?? "";
}

function extractFieldBlocks(content) {
  const fieldsStart = content.indexOf("fields:");
  if (fieldsStart === -1) return [];

  const blocks = [];
  const fieldRegex = /\{\s*key\s*:\s*"([^"]+)"[\s\S]*?\n\s*\}/g;
  const fieldArea = content.slice(fieldsStart);

  let match;
  while ((match = fieldRegex.exec(fieldArea))) {
    blocks.push({
      key: match[1],
      block: match[0],
    });
  }

  return blocks;
}

function summarizeField(field) {
  const block = field.block;

  const label =
    block.match(/label\s*:\s*"([^"]+)"/)?.[1] ?? "";

  const type =
    block.match(/type\s*:\s*"([^"]+)"/)?.[1] ?? "";

  const relationModule =
    block.match(/relation\s*:\s*\{\s*module\s*:\s*"([^"]+)"/)?.[1] ||
    block.match(/relation\s*:\s*"([^"]+)"/)?.[1] ||
    "";

  const sourceField =
    block.match(/sourceField\s*:\s*"([^"]+)"/)?.[1] ?? "";

  const targetField =
    block.match(/targetField\s*:\s*"([^"]+)"/)?.[1] ?? "";

  const includeEmptyTarget =
    block.includes("includeEmptyTarget") ?
      (block.match(/includeEmptyTarget\s*:\s*(true|false)/)?.[1] ?? "") :
      "";

  return {
    key: field.key,
    label,
    type,
    relationModule,
    sourceField,
    targetField,
    includeEmptyTarget,
  };
}

function isRelevantFile(file) {
  const name = rel(file).toLowerCase();

  if (!name.endsWith(".module.ts")) {
    return false;
  }

  return KEYWORDS.some((keyword) => name.includes(keyword));
}

function main() {
  console.log("");
  console.log("[Q21A] Audit modules commande / fournisseur / stock / reception");
  console.log("");

  const files = walk(GENERATED_DIR).filter(isRelevantFile);

  if (files.length === 0) {
    console.log("[WARN] Aucun module candidat trouve.");
    return;
  }

  for (const file of files) {
    const content = read(file);
    const moduleKey = extractModuleKey(content);
    const collection = extractCollection(content);
    const fields = extractFieldBlocks(content).map(summarizeField);

    console.log("============================================================");
    console.log(`FILE       : ${rel(file)}`);
    console.log(`MODULE KEY : ${moduleKey}`);
    console.log(`COLLECTION : ${collection}`);
    console.log("");

    const interestingFields = fields.filter((field) => {
      const joined = [
        field.key,
        field.label,
        field.type,
        field.relationModule,
        field.sourceField,
        field.targetField,
      ].join(" ").toLowerCase();

      return KEYWORDS.some((keyword) => joined.includes(keyword)) ||
        field.type === "relation";
    });

    if (interestingFields.length === 0) {
      console.log("Aucun champ relationnel interessant detecte.");
      continue;
    }

    for (const field of interestingFields) {
      console.log(`- ${field.key}`);
      console.log(`  label      : ${field.label}`);
      console.log(`  type       : ${field.type}`);

      if (field.relationModule) {
        console.log(`  relation   : ${field.relationModule}`);
      }

      if (field.sourceField || field.targetField) {
        console.log(`  filterBy   : ${field.sourceField || "?"} -> ${field.targetField || "?"}`);
        console.log(`  includeEmptyTarget: ${field.includeEmptyTarget || "(non defini)"}`);
      }
    }

    console.log("");
  }

  console.log("============================================================");
  console.log("[DONE] Audit termine. Aucun fichier modifie.");
}

main();