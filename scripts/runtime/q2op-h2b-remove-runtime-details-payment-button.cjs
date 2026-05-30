const fs = require("fs");
const path = require("path");

const root = process.cwd();
const filePath = "src/components/erp/runtime/ERPRuntimeDetails.tsx";
const fullPath = path.join(root, filePath);

if (!fs.existsSync(fullPath)) {
  console.error("[MISSING]", filePath);
  process.exit(1);
}

const backupPath = `${fullPath}.bak-q2op-h2b-remove-payment-button`;

if (!fs.existsSync(backupPath)) {
  fs.copyFileSync(fullPath, backupPath);
  console.log("[BACKUP]", path.relative(root, backupPath));
}

let source = fs.readFileSync(fullPath, "utf8");

/**
 * 1. Rename the duplicate payment action title into a neutral summary title.
 */
source = source.replace(
  /<h2([^>]*)>\s*Enregistrer un paiement\s*<\/h2>/m,
  `<h2$1>
              Synthèse paiement facture
              </h2>`
);

/**
 * 2. Replace the duplicate action button by a non-primary navigation link.
 */
source = source.replace(
  /<Link\s+href=\{paymentHref\}[\s\S]*?Enregistrer un paiement[\s\S]*?<\/Link>/m,
  `<a
              href="#historique-encaissements"
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/10 px-6 py-4 text-sm font-black text-white transition hover:bg-white/15 min-w-[220px] self-end lg:self-end mt-auto mb-0"
            >
              Voir l'historique des encaissements
            </a>`
);

/**
 * 3. Remove now-unused paymentHref variable.
 */
source = source.replace(
  /const paymentHref\s*=\s*isInvoice\s*\?[\s\S]*?:\s*"#";\s*const amountSummary\s*=/m,
  `const amountSummary =`
);

/**
 * 4. Remove now-unused manual payment href function if still present.
 */
source = source.replace(
  /function buildInvoicePaymentHref\([\s\S]*?\n\}\n\nfunction getInvoiceAmountSummary/m,
  `function getInvoiceAmountSummary`
);

/**
 * 5. Remove now-unused builder import from this file.
 */
source = source.replace(
  /import \{ buildRuntimeFactureEncaissementCreateHref \} from "@\/runtime\/navigation\/RuntimeChildCreateHrefBuilder";\s*/m,
  ""
);

const forbidden = [
  "Enregistrer un paiement",
  "paymentHref",
  "buildInvoicePaymentHref(",
];

for (const marker of forbidden) {
  if (source.includes(marker)) {
    console.error("[PATCH_FAILED] Forbidden marker remains:", marker);
    process.exit(1);
  }
}

const required = [
  "Encaissement facture",
  "Synthèse paiement facture",
  "Total TTC",
  "Déjà payé",
  "Reste à payer",
  "Voir l'historique des encaissements",
];

for (const marker of required) {
  if (!source.includes(marker)) {
    console.error("[PATCH_FAILED] Missing required marker:", marker);
    process.exit(1);
  }
}

fs.writeFileSync(fullPath, source, "utf8");

console.log("[WRITTEN]", filePath);
console.log("[Q2-OP-H2B] Duplicate runtime invoice payment button removed.");
console.log("Next:");
console.log("  pnpm build");
console.log("  git status --short");