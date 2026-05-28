const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

const metadataFile = path.join(
  ROOT,
  "src",
  "runtime",
  "modules",
  "metadata",
  "ERPModuleMetadata.ts"
);

if (!fs.existsSync(metadataFile)) {
  throw new Error("File not found: " + metadataFile);
}

const original = fs.readFileSync(metadataFile, "utf8");
let content = original;

const backup = metadataFile + ".bak-q1b2-fix-real-metadata-business-code";
fs.writeFileSync(backup, original, "utf8");

if (!content.includes("export interface ERPBusinessCodeConfig")) {
  content =
`export interface ERPBusinessCodeConfig {
  field: string;
  prefix: string;
  sequenceScope?: "year" | "global";
  padLength?: number;
  readonly?: boolean;
  required?: boolean;
}

` + content;
}

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
  console.log("[FAIL] businessCode non ajouté dans ERPModuleMetadata réel.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(1);
}

fs.writeFileSync(metadataFile, content, "utf8");

console.log("[DONE] businessCode ajouté dans le vrai ERPModuleMetadata.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, metadataFile));
console.log("");
console.log("Next:");
console.log("pnpm build");
