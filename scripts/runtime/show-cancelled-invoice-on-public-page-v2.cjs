const fs = require("fs");
const path = require("path");

const root = process.cwd();

const file = path.join(
  root,
  "src",
  "app",
  "facture",
  "[token]",
  "page.tsx"
);

if (!fs.existsSync(file)) {
  console.error(`MISSING ${file}`);
  process.exit(1);
}

let content = fs.readFileSync(file, "utf8");
const before = content;

function replaceOnce(search, replacement) {
  if (!content.includes(search)) {
    return false;
  }

  content = content.replace(search, replacement);
  return true;
}

/**
 * 1. Ajouter statutFacture + isCancelledInvoice dans le summary.
 */
replaceOnce(
`      const statutPaiement =
        formatPaymentStatus(
          value(invoice, "statutPaiement", "en_attente")
        );

      return {
        numero: buildInvoiceNumber(invoice),
        date: value(invoice, "dateFacture"),
        montantTTC,
        montantPaye,
        resteAPayer,
        statutPaiement,
      };`,
`      const statutPaiement =
        formatPaymentStatus(
          value(invoice, "statutPaiement", "en_attente")
        );

      const statutFacture =
        value(invoice, "statutFacture", "emise");

      const isCancelledInvoice =
        statutFacture === "annulee";

      return {
        numero: buildInvoiceNumber(invoice),
        date: value(invoice, "dateFacture"),
        montantTTC,
        montantPaye,
        resteAPayer,
        statutPaiement,
        statutFacture,
        isCancelledInvoice,
      };`
);

/**
 * 2. WhatsApp : ne pas inciter au paiement si facture annulée.
 */
replaceOnce(
`          "Je consulte ma facture AMARKHYS : " + summary.numero,
          "Reste à payer : " + formatMoney(summary.resteAPayer),
          "Statut : " + summary.statutPaiement,`,
`          "Je consulte ma facture AMARKHYS : " + summary.numero,
          summary.isCancelledInvoice
            ? "Statut facture : Annulée"
            : "Reste à payer : " + formatMoney(summary.resteAPayer),
          "Statut paiement : " + summary.statutPaiement,`
);

/**
 * 3. Titre public.
 */
replaceOnce(
`                  Votre facture AMARKHYS`,
`                  {summary.isCancelledInvoice
                    ? "Facture AMARKHYS annulée"
                    : "Votre facture AMARKHYS"}`
);

/**
 * 4. Description publique.
 */
replaceOnce(
`                  Consultez le détail de votre facture, les montants réglés et le solde restant.`,
`                  {summary.isCancelledInvoice
                    ? "Cette facture a été annulée. Elle reste consultable pour historique, mais aucune nouvelle opération de paiement n’est autorisée."
                    : "Consultez le détail de votre facture, les montants réglés et le solde restant."}`
);

/**
 * 5. Badge statut.
 */
replaceOnce(
`                  Statut paiement`,
`                  {summary.isCancelledInvoice
                    ? "Statut facture"
                    : "Statut paiement"}`
);

replaceOnce(
`                  {summary.statutPaiement}`,
`                  {summary.isCancelledInvoice
                    ? "Annulée"
                    : summary.statutPaiement}`
);

/**
 * 6. Alerte facture annulée avant le bloc Facture.
 */
if (!content.includes("data-public-cancelled-invoice-warning")) {
  replaceOnce(
`            <div className="space-y-6 p-6 md:p-10">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">`,
`            <div className="space-y-6 p-6 md:p-10">
              {summary.isCancelledInvoice ? (
                <div
                  data-public-cancelled-invoice-warning
                  className="rounded-3xl border border-red-200 bg-red-50 p-6 shadow-sm"
                >
                  <p className="text-xs font-black uppercase tracking-[0.25em] text-red-700">
                    Facture annulée
                  </p>
                  <h2 className="mt-3 text-2xl font-black text-slate-950">
                    Aucune nouvelle opération de paiement
                  </h2>
                  <p className="mt-2 text-sm leading-6 text-slate-600">
                    Cette facture est conservée pour historique. Aucun nouveau règlement
                    ne doit être initié depuis ce lien.
                  </p>
                </div>
              ) : null}

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">`
  );
}

/**
 * 7. Remplacer la carte "Reste à payer" par un état annulé si nécessaire.
 */
replaceOnce(
`                  <MoneyCard label="Reste à payer" value={summary.resteAPayer} highlight />`,
`                  {summary.isCancelledInvoice ? (
                    <div className="rounded-2xl border border-red-200 bg-red-50 p-4">
                      <p className="text-xs font-bold uppercase tracking-wide text-red-700">
                        Facture annulée
                      </p>
                      <p className="mt-2 text-lg font-black text-red-700">
                        Paiement désactivé
                      </p>
                    </div>
                  ) : (
                    <MoneyCard label="Reste à payer" value={summary.resteAPayer} highlight />
                  )}`
);

/**
 * 8. Nettoyage encodage.
 */
const replacements = [
  ["PayÃ©e", "Payée"],
  ["PayÃ©", "Payé"],
  ["AnnulÃ©e", "Annulée"],
  ["AnnulÃ©", "Annulé"],
  ["Client non renseignÃ©", "Client non renseigné"],
  ["VÃ©hicule non renseignÃ©", "Véhicule non renseigné"],
  ["Intervention non renseignÃ©e", "Intervention non renseignée"],
  ["VÃ©hicule", "Véhicule"],
  ["NumÃ©ro", "Numéro"],
  ["dÃ©tail", "détail"],
  ["rÃ©glÃ©s", "réglés"],
  ["Reste Ã payer", "Reste à payer"],
  ["Reste Ã  payer", "Reste à payer"],
  ["numÃ©ro", "numéro"],
  ["nâ€™est", "n’est"],
  ["Ãªtre", "être"],
  ["expirÃ©", "expiré"],
  ["Ã©tÃ©", "été"],
  ["supprimÃ©e", "supprimée"],
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

console.log("UPDATED public invoice cancelled state");