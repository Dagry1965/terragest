const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(ROOT, "src", "runtime", "modules", "ERPModule.ts");

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1b2-fix-business-code-metadata-type";
fs.writeFileSync(backup, original, "utf8");

/**
 * 1. Ajouter le type ERPBusinessCodeConfig s'il n'existe pas.
 */
if (!content.includes("export interface ERPBusinessCodeConfig")) {
  const marker =
    content.includes("export interface ERPCompositionBreadcrumb")
      ? "export interface ERPCompositionBreadcrumb"
      : "export interface ERPModuleMetadata";

  const index = content.indexOf(marker);

  if (index < 0) {
    throw new Error("Aucun point d'insertion trouvé pour ERPBusinessCodeConfig.");
  }

  const typeBlock = `export interface ERPBusinessCodeConfig {
  field: string;
  prefix: string;
  sequenceScope?: "year" | "global";
  padLength?: number;
  readonly?: boolean;
  required?: boolean;
}

`;

  content = content.slice(0, index) + typeBlock + content.slice(index);
}

/**
 * 2. Ajouter businessCode?: ERPBusinessCodeConfig dans ERPModuleMetadata.
 */
if (!content.includes("businessCode?: ERPBusinessCodeConfig;")) {
  const interfaceIndex = content.indexOf("export interface ERPModuleMetadata");

  if (interfaceIndex < 0) {
    throw new Error("Interface ERPModuleMetadata introuvable.");
  }

  const openBraceIndex = content.indexOf("{", interfaceIndex);

  if (openBraceIndex < 0) {
    throw new Error("Ouverture ERPModuleMetadata introuvable.");
  }

  content =
    content.slice(0, openBraceIndex + 1) +
    `
  businessCode?: ERPBusinessCodeConfig;` +
    content.slice(openBraceIndex + 1);
}

if (
  !content.includes("export interface ERPBusinessCodeConfig") ||
  !content.includes("businessCode?: ERPBusinessCodeConfig;")
) {
  console.log("[FAIL] Typage businessCode non appliqué.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

if (content === original) {
  console.log("[INFO] Aucun changement, le typage semble déjà présent.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Typage ERPModuleMetadata.businessCode corrigé.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next:");
console.log("pnpm build");
