const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimeDetails.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-h2-deduplicate-payment-actions`;
if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * This pass intentionally removes the duplicate primary payment action from ERPRuntimeDetails.
 * The single authoritative payment action remains in InvoicePaymentsHistory.
 */

const before = source;

source = source.replace(
  /<Link\s+href=\{invoicePaymentHref\}[\s\S]*?Enregistrer un paiement[\s\S]*?<\/Link>/m,
  `<a
                href="#historique-encaissements"
                className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-5 py-3 text-sm font-black text-white transition hover:bg-white/15"
              >
                Voir l'historique des encaissements
              </a>`
);

source = source.replace(
  /const invoicePaymentHref\s*=\s*[\s\S]*?;\s*const amountSummary\s*=/m,
  `const amountSummary =`
);

source = source.replace(
  /import \{ buildRuntimeFactureEncaissementCreateHref \} from "@\/runtime\/navigation\/RuntimeChildCreateHrefBuilder";\s*/m,
  ""
);

source = source.replace(
  /function buildInvoicePaymentHref\([\s\S]*?\n\}\n\nfunction getInvoiceAmountSummary/m,
  "function getInvoiceAmountSummary"
);

const changed = before !== source;

if (!changed) {
  console.error("[PATCH_FAILED] No duplicate payment action was removed. Inspect ERPRuntimeDetails manually.");
  process.exit(1);
}

const forbidden = [
  "invoicePaymentHref",
  "Enregistrer un paiement",
  "buildInvoicePaymentHref(",
  "buildRuntimeFactureEncaissementCreateHref",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Forbidden duplicate payment marker remains:", marker);
    process.exit(1);
  }
}

const required = [
  "getInvoiceAmountSummary",
  "Total TTC",
  "Déjà payé",
  "Reste à payer",
  "Voir l'historique des encaissements",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing required summary marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-H2] Duplicate invoice payment action removed from ERPRuntimeDetails.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");