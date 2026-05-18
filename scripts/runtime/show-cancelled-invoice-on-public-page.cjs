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

/**
 * 1) Ajouter statutFacture + isCancelledInvoice au summary.
 */
content = content.replace(
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
 * 2) WhatsApp : ne pas inciter au paiement si annulée.
 */
content = content.replace(
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
 * 3) Titre / description page.
 */
content = content.replace(
  `                  Votre facture AMARKHYS
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                  Consultez le détail de votre facture, les montants réglés et le solde restant.
                </p>`,
  `                  {summary.isCancelledInvoice
                    ? "Facture AMARKHYS annulée"
                    : "Votre facture AMARKHYS"}
                </h1>
                <p className="mt-3 max-w-2xl text-sm text-slate-300 md:text-base">
                  {summary.isCancelledInvoice
                    ? "Cette facture a été annulée. Elle reste consultable pour historique, mais aucune nouvelle opération de paiement n’est autorisée."
                    : "Consultez le détail de votre facture, les montants réglés et le solde restant."}
                </p>`
);

/**
 * 4) Badge statut paiement devient badge facture annulée si nécessaire.
 */
content = content.replace(
  `              <div className="rounded-3xl border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-left md:text-right">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-amber-200">
                  Statut paiement
                </p>
                <p className="mt-2 text-2xl font-black text-amber-100">
                  {summary.statutPaiement}
                </p>
              </div>`,
  `              <div
                className={
                  summary.isCancelledInvoice
                    ? "rounded-3xl border border-red-300/30 bg-red-300/10 px-5 py-4 text-left md:text-right"
                    : "rounded-3xl border border-amber-300/30 bg-amber-300/10 px-5 py-4 text-left md:text-right"
                }
              >
                <p
                  className={
                    summary.isCancelledInvoice
                      ? "text-xs font-bold uppercase tracking-[0.2em] text-red-200"
                      : "text-xs font-bold uppercase tracking-[0.2em] text-amber-200"
                  }
                >
                  {summary.isCancelledInvoice
                    ? "Statut facture"
                    : "Statut paiement"}
                </p>
                <p
                  className={
                    summary.isCancelledInvoice
                      ? "mt-2 text-2xl font-black text-red-100"
                      : "mt-2 text-2xl font-black text-amber-100"
                  }
                >
                  {summary.isCancelledInvoice
                    ? "Annulée"
                    : summary.statutPaiement}
                </p>
              </div>`
);

/**
 * 5) Ajouter alerte facture annulée avant le bloc facture.
 */
if (!content.includes("data-public-cancelled-invoice-warning")) {
  content = content.replace(
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
                    Cette facture est conservée pour historique. Les paiements et échéanciers
                    associés restent consultables par le garage, mais aucun nouveau règlement
                    ne doit être initié depuis ce lien.
                  </p>
                </div>
              ) : null}

              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">`
  );
}

/**
 * 6) Bloc paiement : si annulée, ne pas afficher "reste à payer" comme incitation.
 */
content = content.replace(
  `<MoneyCard label="Reste à payer" value={summary.resteAPayer} highlight />`,
  `{summary.isCancelledInvoice ? (
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
 * 7) Bloc contact : texte adapté.
 */
content = content.replace(
  `                  Pour toute question sur cette facture, contactez {AMARKHYS_BUSINESS_IDENTITY.displayName} avec le numéro de facture.`,
  `                  {summary.isCancelledInvoice
                    ? "Cette facture est annulée. Pour toute question, contactez " + AMARKHYS_BUSINESS_IDENTITY.displayName + " avec le numéro de facture."
                    : "Pour toute question sur cette facture, contactez " + AMARKHYS_BUSINESS_IDENTITY.displayName + " avec le numéro de facture."}`
);

/**
 * 8) Nettoyage mojibake résiduel.
 */
content = content
  .replaceAll("PayÃ©e", "Payée")
  .replaceAll("PayÃ©", "Payé")
  .replaceAll("AnnulÃ©e", "Annulée")
  .replaceAll("AnnulÃ©", "Annulé")
  .replaceAll("Client non renseignÃ©", "Client non renseigné")
  .replaceAll("VÃ©hicule non renseignÃ©", "Véhicule non renseigné")
  .replaceAll("Intervention non renseignÃ©e", "Intervention non renseignée")
  .replaceAll("VÃ©hicule", "Véhicule")
  .replaceAll("NumÃ©ro", "Numéro")
  .replaceAll("dÃ©tail", "détail")
  .replaceAll("rÃ©glÃ©s", "réglés")
  .replaceAll("Reste Ã payer", "Reste à payer")
  .replaceAll("Reste Ã  payer", "Reste à payer")
  .replaceAll("numÃ©ro", "numéro")
  .replaceAll("nâ€™est", "n’est")
  .replaceAll("Ãªtre", "être")
  .replaceAll("expirÃ©", "expiré")
  .replaceAll("Ã©tÃ©", "été")
  .replaceAll("supprimÃ©e", "supprimée")
  .replaceAll("â€¢", "•")
  .replaceAll("â€™", "’")
  .replaceAll("Ã©", "é")
  .replaceAll("Ã¨", "è")
  .replaceAll("Ãª", "ê")
  .replaceAll("Ã ", "à")
  .replaceAll("Ã´", "ô")
  .replaceAll("Ã‰", "É")
  .replaceAll("Ã€", "À")
  .replaceAll("Â", "");

if (content === before) {
  console.log("NO CHANGE");
  process.exit(0);
}

fs.writeFileSync(file, content, { encoding: "utf8" });

console.log("UPDATED public invoice cancelled state");S