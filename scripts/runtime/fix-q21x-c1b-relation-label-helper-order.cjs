const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/modules/lifecycle/ERPRelationDataLoader.ts";
const file = path.join(ROOT, rel);
const backup = path.join(ROOT, `${rel}.bak-q21x-c1b-relation-label-helper-order`);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21x-c1b-relation-label-helper-order`);
}

let content = fs.readFileSync(file, "utf8");

const blockRegex =
  /\s*\/\/ Q21X_C1_GENERIC_LABEL_FIELDS[\s\S]*?if \(metadataDrivenLabel\) \{\s*return metadataDrivenLabel;\s*\}\s*/;

const match = content.match(blockRegex);

if (!match) {
  console.error("[ERROR] Q21X_C1_GENERIC_LABEL_FIELDS block not found.");
  process.exit(1);
}

const block = match[0];

content = content.replace(blockRegex, "\n");

const insertMarker = `    };const money = (key: string) => {`;

if (!content.includes(insertMarker)) {
  console.error("[ERROR] Cannot locate insertion marker after statusLabel/date helpers.");
  process.exit(1);
}

content = content.replace(insertMarker, `${block}\n${insertMarker}`);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Q21X-C1B generic relation label helper moved after statusLabel.");
console.log("Next:");
console.log("  pnpm build");
console.log("  pnpm audit:local");
console.log("  pnpm dev");