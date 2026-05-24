const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const rel = "src/runtime/status/RuntimeStatusGovernanceEngine.ts";
const file = path.join(ROOT, rel);
const backup = path.join(
  ROOT,
  `${rel}.bak-q21d1a3-remove-invalid-guidance-contract`
);

if (!fs.existsSync(file)) {
  console.error(`[ERROR] Missing file: ${rel}`);
  process.exit(1);
}

if (!fs.existsSync(backup)) {
  fs.copyFileSync(file, backup);
  console.log(`[BACKUP] ${rel}.bak-q21d1a3-remove-invalid-guidance-contract`);
}

let content = fs.readFileSync(file, "utf8");

// Remove the invalid receptionsstockauto guidance block that used `whenStatus`.
// The current RuntimeStatusGuidanceDefinition contract does not support it.
content = content.replace(
  /,\s*guidance:\s*\[\s*\{\s*whenStatus:\s*"brouillon"[\s\S]*?\}\s*,\s*\{\s*whenStatus:\s*"validee"[\s\S]*?\}\s*,?\s*\]/,
  ""
);

// Safety cleanup if formatting differs slightly.
content = content.replace(
  /\s*guidance:\s*\[\s*\{\s*whenStatus:\s*"brouillon"[\s\S]*?\}\s*,\s*\{\s*whenStatus:\s*"validee"[\s\S]*?\}\s*,?\s*\],/,
  ""
);

fs.writeFileSync(file, content, "utf8");

console.log("[DONE] Invalid reception guidance contract removed.");
console.log("Next: pnpm build");