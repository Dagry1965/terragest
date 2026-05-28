const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(ROOT, "src", "runtime", "modules", "ERPModule.ts");

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1b3-clean-duplicate-business-code-type";
fs.writeFileSync(backup, original, "utf8");

content = content.replace(
  /export interface ERPBusinessCodeConfig \{\s*field: string;\s*prefix: string;\s*sequenceScope\?: "year" \| "global";\s*padLength\?: number;\s*readonly\?: boolean;\s*required\?: boolean;\s*\}\s*\n/g,
  ""
);

if (content === original) {
  console.log("[INFO] Aucun doublon ERPBusinessCodeConfig trouvé dans ERPModule.ts.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Doublon ERPBusinessCodeConfig supprimé de ERPModule.ts.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next: pnpm build");
