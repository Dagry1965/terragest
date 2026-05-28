const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/components/erp/operational/ERPOperationalTable.tsx";
const file = path.join(ROOT, rel);

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

fs.writeFileSync(
  file + ".bak-q2a-e4b-fix-relation-union-type",
  original,
  "utf8"
);

/**
 * Ajout helper relation compatible :
 * field.relation peut être string ou objet { module }.
 */
if (!content.includes("function getRelationModuleKey")) {
  const marker = "function getModule(moduleKey: string): ERPModule | undefined {";

  const helper = `
function getRelationModuleKey(field: ERPModuleField): string {
  const relation = field.relation;

  if (!relation) {
    return "";
  }

  if (typeof relation === "string") {
    return relation;
  }

  return String(relation.module ?? relation.collection ?? "").trim();
}

`;

  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Point insertion introuvable: getModule");
  }

  content = content.slice(0, index) + helper + content.slice(index);
}

/**
 * Remplacer les accès directs à relation.module.
 */
content = content.replace(
  /const relationFields = fieldColumns\.filter\(\s*\(column\) => column\.field\.relation\?\.module\s*\);/,
  `const relationFields = fieldColumns.filter(
        (column) => Boolean(getRelationModuleKey(column.field))
      );`
);

content = content.replace(
  /const targetModuleKey = column\.field\.relation\?\.module;/g,
  `const targetModuleKey = getRelationModuleKey(column.field);`
);

const problems = [];

if (!content.includes("function getRelationModuleKey")) {
  problems.push("helper getRelationModuleKey absent");
}

if (content.includes("relation?.module")) {
  problems.push("accès direct relation?.module encore présent");
}

if (!content.includes("Boolean(getRelationModuleKey(column.field))")) {
  problems.push("filtre relationFields non corrigé");
}

if (!content.includes("const targetModuleKey = getRelationModuleKey(column.field);")) {
  problems.push("targetModuleKey non corrigé");
}

if (problems.length > 0) {
  console.log("[FAIL]");
  for (const problem of problems) console.log(" - " + problem);
  process.exit(1);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q2-A-E4B relation union type corrigé dans ERPOperationalTable.");
console.log("[WRITTEN]", rel);
console.log("");
console.log("Next:");
console.log("pnpm build");
