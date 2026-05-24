const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/generated/commandesstockauto/commandesstockauto.module.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21b-composition-children-keys`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21b-composition-children-keys`);
}

let content = fs.readFileSync(file, "utf8");

content = content.replace(
  /(\{\s*\n\s*moduleKey: "lignescommandestockauto",)/,
  `{
        key: "lignes-commandestock",
        moduleKey: "lignescommandestockauto",`
);

content = content.replace(
  /(\{\s*\n\s*moduleKey: "receptionsstockauto",)/,
  `{
        key: "receptions-stock",
        moduleKey: "receptionsstockauto",`
);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] composition.children keys added.");
console.log("Next: pnpm build");