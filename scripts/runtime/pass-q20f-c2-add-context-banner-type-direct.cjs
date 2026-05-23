const fs = require("fs");
const path = require("path");

const root = process.cwd();

function p(rel) {
  return path.join(root, rel);
}

function backup(rel, suffix) {
  const source = p(rel);
  const target = source + suffix;

  if (fs.existsSync(source) && !fs.existsSync(target)) {
    fs.copyFileSync(source, target);
    console.log("[BACKUP]", rel + suffix);
  }
}

function write(rel, content) {
  fs.writeFileSync(p(rel), content, "utf8");
  console.log("[WRITTEN]", rel);
}

const file = "src/runtime/modules/ERPModule.ts";

backup(file, ".bak-q20f-c2-context-banner-type-direct-v2");

let content = fs.readFileSync(p(file), "utf8");

const contextTypes = `
export interface ERPCompositionContextBannerItem {
  relationField?: string;
  field?: string;
  moduleKey: string;
  labelFields?: string[];
  title?: string;
  icon?: string;
  tone?: string;
}

export interface ERPCompositionContextBanner {
  title?: string;
  items: ERPCompositionContextBannerItem[];
}

`;

if (!content.includes("export interface ERPCompositionContextBannerItem")) {
  const marker = "export interface ERPModuleComposition";

  if (!content.includes(marker)) {
    throw new Error("ERPModuleComposition introuvable dans ERPModule.ts");
  }

  content = content.replace(marker, contextTypes + marker);
}

if (!content.includes("contextBanner?: ERPCompositionContextBanner;")) {
  content = content.replace(
    /export interface ERPModuleComposition\s*\{\s*/,
    "export interface ERPModuleComposition {\n    contextBanner?: ERPCompositionContextBanner;\n    "
  );
}

write(file, content);

console.log("");
console.log("[Q20F_C2_DONE] contextBanner typed in ERPModuleComposition.");
console.log("");
console.log("Next:");
console.log("  pnpm build");