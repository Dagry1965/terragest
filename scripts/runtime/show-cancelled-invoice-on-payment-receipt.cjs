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
 * 1) Helper facture annulée.
 */
if (!content.includes("function isInvoiceCancelled")) {
  const marker = `function buildInvoiceNumber(
  invoice: RecordData | null,
  fallback: string
): string {`;

  const helper = `function isInvoiceCancelled(
  invoice: RecordData | null
): boolean {
  return String(invoice?.statutFacture ?? "") === "annulee";
}

`;

  if (!content.includes(marker)) {
    console.error("buildInvoiceNumber marker not found");
    process.exit(1);
  }

  content = content.replace(marker, helper + marker);
}

/**
 * 2) Texte WhatsApp/SMS : mention historique si facture annulée.
 */
if (!content.includes("Facture liée annulée")) {
  content = content.replace(
    `    return [
      "Bonjour,",
      "",
      "Votre reçu de paiement " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible.",`,
    `    const cancelledInvoice =
      isInvoiceCancelled(context?.invoice ?? null);

    return [
      "Bonjour,",
      "",
      cancelledInvoice
        ? "Votre reçu de paiement " + AMARKHYS_BUSINESS_IDENTITY.displayName + " reste disponible pour historique. La facture liée est annulée."
        : "Votre reçu de paiement " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible.",`
  );

  content = content.replace(
    `    "Facture : " + invoiceNumber,`,
    `    "Facture : " + invoiceNumber,
      cancelledInvoice ? "Facture liée annulée : oui" : "",`
  );
}

/**
 * 3) PDF : mention claire si facture liée annulée.
 */
if (!content.includes("FACTURE LIÉE ANNULÉE")) {
  content = content.replace(
    `    const montant =
      amount(payment, "montant");`,
    `    const montant =
      amount(payment, "montant");

    const cancelledInvoice =
      isInvoiceCancelled(context?.invoice ?? null);`
  );

  content = content.replace(
    `    doc.text("REÇU DE PAIEMENT", 14, 52);`,
    `    doc.text(
      cancelledInvoice
        ? "REÇU DE PAIEMENT - FACTURE LIÉE ANNULÉE"
        : "REÇU DE PAIEMENT",
      14,
      52
    );`
  );

  content = content.replace(
    `    doc.text("Statut : " + formatStatus(value(payment, "statut")), 14, 122);`,
    `    doc.text("Statut : " + formatStatus(value(payment, "statut")), 14, 122);

    if (cancelledInvoice) {
      doc.setFontSize(9);
      doc.text(
        "La facture liée à ce reçu est annulée. Ce document est conservé pour historique.",
        14,
        130
      );
    }`
  );

  content = content.replace(
    `    doc.line(14, 134, 196, 134);`,
    `    doc.line(14, cancelledInvoice ? 142 : 134, 196, cancelledInvoice ? 142 : 134);`
  );

  content = content.replace(
    `    doc.text("Montant encaissé", 14, 150);`,
    `    doc.text("Montant encaissé", 14, cancelledInvoice ? 158 : 150);`
  );

  content = content.replace(
    `    doc.text(formatMoney(montant), 14, 164);`,
    `    doc.text(formatMoney(montant), 14, cancelledInvoice ? 172 : 164);`
  );

  content = content.replace(
    `      14,
      184`,
    `      14,
      cancelledInvoice ? 192 : 184`
  );
}

/**
 * 4) UI : badge dans les actions reçu.
 */
if (!content.includes("data-receipt-cancelled-invoice-warning")) {
  content = content.replace(
    `    return (
      <div className="flex flex-wrap gap-2">`,
    `    const cancelledInvoice =
      isInvoiceCancelled(context?.invoice ?? null);

    return (
      <div className="flex flex-wrap gap-2">
        {cancelledInvoice ? (
          <span
            data-receipt-cancelled-invoice-warning
            className="rounded-full border border-red-200 bg-red-50 px-3 py-1 text-xs font-black text-red-700"
          >
            Facture liée annulée
          </span>
        ) : null}`
  );
}

/**
 * 5) Nettoyage encodage.
 */
const replacements = [
  ["ValidÃ©", "Validé"],
  ["RejetÃ©", "Rejeté"],
  ["AnnulÃ©", "Annulé"],
  ["ReÃ§u", "Reçu"],
  ["reÃ§u", "reçu"],
  ["VÃ©hicule", "Véhicule"],
  ["Client non renseignÃ©", "Client non renseigné"],
  ["Véhicule non renseignÃ©", "Véhicule non renseigné"],
  ["Montant encaissÃ©", "Montant encaissé"],
  ["RÃ©fÃ©rence", "Référence"],
  ["EspÃ¨ces", "Espèces"],
  ["ChÃ¨que", "Chèque"],
  ["enregistrement du paiement indiquÃ©", "enregistrement du paiement indiqué"],
  ["lâ€™", "l’"],
  ["gÃ©nÃ©rÃ©", "généré"],
  ["â€¢", "•"],
  ["â€™", "’"],
  ["Ã©", "é"],
  ["Ã¨", "è"],
  ["Ãª", "ê"],
  ["Ã ", "à"],
  ["Ã´", "ô"],
  ["Ã‰", "É"],
  ["Ã€", "À"],
  ["Â", ""],
];

for (const [bad, good] of replacements) {
  content = content.split(bad).join(good);
}

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED PaymentReceiptActions cancelled invoice receipt state");