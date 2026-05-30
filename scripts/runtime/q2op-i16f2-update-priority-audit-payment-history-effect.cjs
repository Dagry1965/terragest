const fs = require("fs");
const path = require("path");

const root = process.cwd();

const auditPath = "scripts/runtime/q2op-i16a-audit-priority-workflows-from-action-bar.cjs";
const fullPath = path.join(root, auditPath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", auditPath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-i16f2-payment-history-effect`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

if (source.includes("Q2OP_I16F2_PAYMENT_HISTORY_EFFECT_AWARE_AUDIT")) {
  console.log("[SKIP] Priority audit already payment-history-effect aware.");
  process.exit(0);
}

const oldBlock = `  const extraEffectSources = mod.key === "lignesinterventionauto"
    ? [
        read("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"),
        read("src/runtime/line-items/RuntimeLineRemovalService.ts"),
        read("src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"),
      ]
    : [];`;

const newBlock = `  // Q2OP_I16F2_PAYMENT_HISTORY_EFFECT_AWARE_AUDIT
  // Some payment history effects are implemented through billing UI/runtime modules.
  // The audit must include these files to avoid false positives for encaissementsauto.
  const extraEffectSources =
    mod.key === "lignesinterventionauto"
      ? [
          read("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"),
          read("src/runtime/line-items/RuntimeLineRemovalService.ts"),
          read("src/runtime/modules/generated/interventionsauto/interventionsauto.module.ts"),
        ]
      : mod.key === "encaissementsauto"
        ? [
            read("src/components/erp/billing/InvoicePaymentsHistory.tsx"),
            read("src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx"),
            read("src/runtime/modules/generated/facturesauto/facturesauto.module.ts"),
            read("src/runtime/modules/generated/encaissementsauto/encaissementsauto.module.ts"),
          ]
        : [];`;

if (!source.includes(oldBlock)) {
  console.error("[PATCH_FAILED] Could not locate extraEffectSources block from I16-E2.");
  process.exit(1);
}

source = source.replace(oldBlock, newBlock);

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", auditPath);
console.log("[Q2-OP-I16-F2] Priority audit now detects encaissementsauto payment history effect.");
console.log("Next:");
console.log("  node .\\scripts\\runtime\\q2op-i16a-audit-priority-workflows-from-action-bar.cjs");
console.log("  pnpm build");
console.log("  git status --short");