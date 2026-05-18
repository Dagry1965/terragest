const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "billing",
  "InvoiceDocumentActions.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * Dans la fonction de message partage/WhatsApp,
 * cancelled est utilisé mais pas déclaré.
 * On l'ajoute juste après le calcul du statut paiement.
 */
if (
  content.includes("cancelled\n      ?") &&
  !content.includes("const cancelled =\n      isInvoiceCancelled(invoice);")
) {
  content = content.replace(
    `  const statut =
    formatPaymentStatus(
      value(invoice, "statutPaiement", "en_attente")
    );

  const url =
    buildInvoicePublicUrl(invoice);`,
    `  const statut =
    formatPaymentStatus(
      value(invoice, "statutPaiement", "en_attente")
    );

  const cancelled =
    isInvoiceCancelled(invoice);

  const url =
    buildInvoicePublicUrl(invoice);`
  );
}

/**
 * Variante possible si le format a été légèrement modifié.
 */
if (
  content.includes("cancelled\n      ?") &&
  !content.includes("const cancelled =\n      isInvoiceCancelled(invoice);")
) {
  content = content.replace(
    `  const statut =
      formatPaymentStatus(
        value(invoice, "statutPaiement", "en_attente")
      );

  const url =
    buildInvoicePublicUrl(invoice);`,
    `  const statut =
      formatPaymentStatus(
        value(invoice, "statutPaiement", "en_attente")
      );

  const cancelled =
    isInvoiceCancelled(invoice);

  const url =
    buildInvoicePublicUrl(invoice);`
  );
}

if (content === before) {
  console.log("NO CHANGE");
  console.log("Inspect around sharing message:");
  console.log(
    'Get-Content ".\\\\src\\\\components\\\\erp\\\\billing\\\\InvoiceDocumentActions.tsx" | Select-Object -Skip 285 -First 60'
  );
  process.exit(1);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED InvoiceDocumentActions cancelled variable");