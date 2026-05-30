const fs = require("fs");
const path = require("path");

const root = process.cwd();

const auditPath = "scripts/runtime/q2op-i16a-audit-priority-workflows-from-action-bar.cjs";
const fullPath = path.join(root, auditPath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", auditPath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i16e2-line-totals-effect`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

if (source.includes("Q2OP_I16E2_LINE_TOTALS_EFFECT_AWARE_AUDIT")) {
  console.log("[SKIP] Priority audit already line-totals-effect aware.");
  process.exit(0);
}

const oldBlock = `  const source = [moduleSource || coreModules, actionFileSource]
    .filter(Boolean)
    .join("\\n");`;

const newBlock = `  // Q2OP_I16E2_LINE_TOTALS_EFFECT_AWARE_AUDIT
  // Some business effects are intentionally implemented outside module metadata:
  // - line totals are currently detectable through form/runtime line services/intervention totals fields.
  // The audit must read these runtime sources to avoid false positives while we progressively centralize logic.
  const extraEffectSources = mod.key === "lignesinterventionauto"
    ? [
        read("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"),
        read("src/runtime/line-items/RuntimeLineRemovalService.ts"),
        read("src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"),
      ]
    : [];

  const source = [moduleSource || coreModules, actionFileSource, ...extraEffectSources]
    .filter(Boolean)
    .join("\\n");`;

if (!source.includes(oldBlock)) {
  console.error("[PATCH_FAILED] Could not locate source composition block.");
  process.exit(1);
}

source = source.replace(oldBlock, newBlock);

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", auditPath);
console.log("[Q2-OP-I16-E2] Priority audit now detects lignesinterventionauto totals effect.");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  pnpm build");
console.log("  git status --short");