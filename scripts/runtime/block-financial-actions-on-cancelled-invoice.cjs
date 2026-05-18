const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "components",
  "erp",
  "forms",
  "enterprise",
  "ERPEnterpriseForm.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

/**
 * 1) Ajouter isCancelledInvoice après isInvoiceEditForm.
 */
if (!content.includes("const isCancelledInvoice")) {
  content = content.replace(
    `  const invoicePaymentHref =
    isInvoiceEditForm
      ? buildInvoicePaymentHref(initialData)
      : "#";`,
    `  const isCancelledInvoice =
    isInvoiceEditForm &&
    String(
      formValues.statutFacture ??
        initialData.statutFacture ??
        ""
    ) === "annulee";

  const invoicePaymentHref =
    isInvoiceEditForm
      ? buildInvoicePaymentHref(initialData)
      : "#";`
  );
}

/**
 * 2) Ajouter l’alerte facture annulée avant le bloc paiement.
 */
if (!content.includes("data-cancelled-invoice-warning")) {
  content = content.replace(
    `      {isInvoiceEditForm ? (
          <section
            data-invoice-edit-payment-action`,
    `      {isCancelledInvoice ? (
        <section
          data-cancelled-invoice-warning
          className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm"
        >
          <p className="text-xs font-black uppercase tracking-wide text-red-700">
            Facture annulée
          </p>

          <h2 className="mt-2 text-2xl font-black text-slate-950">
            Opérations financières bloquées
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
            Cette facture est annulée. Aucun nouveau paiement ni échéancier ne peut être créé.
            L’historique existant reste disponible en lecture.
          </p>
        </section>
      ) : null}

      {isInvoiceEditForm && !isCancelledInvoice ? (
          <section
            data-invoice-edit-payment-action`
  );
}

/**
 * 3) Masquer le bloc paiement si facture annulée.
 */
content = content.replace(
  `{isInvoiceEditForm ? (
          <section
            data-invoice-edit-payment-action`,
  `{isInvoiceEditForm && !isCancelledInvoice ? (
          <section
            data-invoice-edit-payment-action`
);

/**
 * 4) Garder l’historique visible.
 * Rien à changer sur data-invoice-payments-history.
 */

/**
 * 5) Masquer l’échéancier si facture annulée.
 */
content = content.replace(
  `{isInvoiceEditForm ? (
          <div data-invoice-payment-schedule>`,
  `{isInvoiceEditForm && !isCancelledInvoice ? (
          <div data-invoice-payment-schedule>`
);

/**
 * 6) Nettoyage visible de quelques textes.
 */
content = content
  .replaceAll("CrÃ©e", "Crée")
  .replaceAll("liÃ©", "lié")
  .replaceAll("payÃ©", "payé")
  .replaceAll("Ã payer", "à payer")
  .replaceAll("Reste Ã payer", "Reste à payer")
  .replaceAll("DÃ©jÃ", "Déjà")
  .replaceAll("mÃ©tier", "métier")
  .replaceAll("exÃ©cutent", "exécutent");

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED ERPEnterpriseForm cancelled invoice financial guard");