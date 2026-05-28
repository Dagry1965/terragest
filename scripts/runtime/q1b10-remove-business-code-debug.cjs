const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const file = path.join(ROOT, "src", "runtime", "codes", "RuntimeBusinessCodeGenerator.ts");

if (!fs.existsSync(file)) {
  throw new Error("File not found: " + file);
}

const original = fs.readFileSync(file, "utf8");
let content = original;

const backup = file + ".bak-q1b10-remove-business-code-debug";
fs.writeFileSync(backup, original, "utf8");

content = content.replace(
  /\s*console\.info\("\[RUNTIME_BUSINESS_CODE_DEBUG\]", \{[\s\S]*?\n\s*\}\);\s*/g,
  "\n"
);

if (content === original) {
  console.log("[INFO] Aucun debug business code trouvé.");
  console.log("[BACKUP]", path.relative(ROOT, backup));
  process.exit(0);
}

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Debug RuntimeBusinessCodeGenerator supprimé.");
console.log("[BACKUP]", path.relative(ROOT, backup));
console.log("[WRITTEN]", path.relative(ROOT, file));
console.log("");
console.log("Next: pnpm build");
