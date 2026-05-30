const fs = require("fs");
const path = require("path");

const root = process.cwd();

const auditPath = "scripts/runtime/q2op-i16a-audit-priority-workflows-from-action-bar.cjs";
const fullPath = path.join(root, auditPath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", auditPath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i16c5-read-action-files`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

if (source.includes("Q2OP_I16C5_ACTION_FILE_AWARE_AUDIT")) {
  console.log("[SKIP] Audit already action-file aware.");
  process.exit(0);
}

const oldBlock = `  const source = moduleSource || coreModules;
  const sourceFile = moduleSource ? modulePath : files.coreModules;`;

const newBlock = `  // Q2OP_I16C5_ACTION_FILE_AWARE_AUDIT
  // Some generated modules delegate their actions to a sibling *.actions.ts file.
  // The audit must inspect both the module definition and its action file,
  // otherwise it reports false missing actions for modules using actions: xxxActions.
  const actionFilePath = \`src/runtime/modules/generated/\${mod.key}/\${mod.key}.actions.ts\`;
  const actionFileSource = read(actionFilePath);

  const source = [moduleSource || coreModules, actionFileSource]
    .filter(Boolean)
    .join("\\n");

  const sourceFile = moduleSource ? modulePath : files.coreModules;`;

if (!source.includes(oldBlock)) {
  console.error("[PATCH_FAILED] Could not locate source/sourceFile block.");
  process.exit(1);
}

source = source.replace(oldBlock, newBlock);

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", auditPath);
console.log("[Q2-OP-I16-C5] Priority audit now reads module + actions files.");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  git status --short");