const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "billing",
  "PaymentReceiptActions.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * Dans buildReceiptText(), cancelledInvoice est utilisé
 * mais pas forcément déclaré.
 */
if (
  content.includes('cancelledInvoice ? "Facture liée annulée : oui" : ""') &&
  !content.includes("const cancelledInvoice =\n      isInvoiceCancelled(context?.invoice ?? null);")
) {
  const marker = `  const invoiceNumber =
    buildInvoiceNumber(
      context?.invoice ?? null,
      value(payment, "factureId", factureId)
    );

  return [`;

  const replacement = `  const invoiceNumber =
    buildInvoiceNumber(
      context?.invoice ?? null,
      value(payment, "factureId", factureId)
    );

  const cancelledInvoice =
    isInvoiceCancelled(context?.invoice ?? null);

  return [`;

  if (!content.includes(marker)) {
    console.error("buildReceiptText invoiceNumber marker not found");
    console.log(
      'Get-Content ".\\\\src\\\\components\\\\erp\\\\billing\\\\PaymentReceiptActions.tsx" | Select-Object -Skip 250 -First 60'
    );
    process.exit(1);
  }

  content = content.replace(marker, replacement);
}

/**
 * Nettoyage indentation éventuelle.
 */
content = content.replace(
  `    "Facture : " + invoiceNumber,
      cancelledInvoice ? "Facture liée annulée : oui" : "",
    "Client : " + buildClientLabel(context?.client ?? null),`,
  `    "Facture : " + invoiceNumber,
    cancelledInvoice ? "Facture liée annulée : oui" : "",
    "Client : " + buildClientLabel(context?.client ?? null),`
);

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED PaymentReceiptActions cancelledInvoice variable");