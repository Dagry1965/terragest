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
 * 1) Helper statut facture annulée.
 */
if (!content.includes("function isInvoiceCancelled")) {
  const marker = `function computeResteAPayer(
  invoice: RecordData
): number {`;

  const helper = `function isInvoiceCancelled(
  invoice: RecordData
): boolean {
  return String(invoice.statutFacture ?? "") === "annulee";
}

`;

  if (!content.includes(marker)) {
    console.error("computeResteAPayer marker not found");
    process.exit(1);
  }

  content = content.replace(marker, helper + marker);
}

/**
 * 2) WhatsApp / partage : ne pas inciter au paiement si annulée.
 */
content = content.replace(
  `    const statut =
      formatPaymentStatus(
        value(invoice, "statutPaiement", "en_attente")
      );

    const url =
      buildInvoicePublicUrl(invoice);`,
  `    const statut =
      formatPaymentStatus(
        value(invoice, "statutPaiement", "en_attente")
      );

    const cancelled =
      isInvoiceCancelled(invoice);

    const url =
      buildInvoicePublicUrl(invoice);`
);

content = content.replace(
  `    "Votre facture " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible.",`,
  `    cancelled
      ? "Votre facture " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est annulée et reste consultable pour historique."
      : "Votre facture " + AMARKHYS_BUSINESS_IDENTITY.displayName + " est disponible.",`
);

content = content.replace(
  `    "Reste à payer : " + formatMoney(reste),
    "Statut paiement : " + statut,`,
  `    cancelled
      ? "Statut facture : Annulée"
      : "Reste à payer : " + formatMoney(reste),
    "Statut paiement : " + statut,`
);

content = content.replace(
  `    url ? "Lien facture : " + url : "",`,
  `    url
      ? cancelled
        ? "Lien consultation facture : " + url
        : "Lien facture / paiement : " + url
      : "",`
);

/**
 * 3) Dans le PDF : détecter la facture annulée.
 */
content = content.replace(
  `  const publicUrl =
    buildInvoicePublicUrl(invoice);`,
  `  const publicUrl =
    buildInvoicePublicUrl(invoice);

  const cancelled =
    isInvoiceCancelled(invoice);`
);

/**
 * 4) Titre PDF : FACTURE ou FACTURE ANNULÉE.
 */
content = content.replace(
  `  doc.setFontSize(16);
  doc.text("FACTURE", 150, 18);`,
  `  doc.setFontSize(16);
  doc.text(
    cancelled ? "FACTURE ANNULÉE" : "FACTURE",
    150,
    18
  );`
);

/**
 * 5) Ajouter bandeau d’annulation après la ligne de séparation.
 */
if (!content.includes("Document conservé pour historique")) {
  content = content.replace(
    `  doc.setDrawColor(0);
  doc.line(14, 40, 196, 40);

  doc.setFontSize(11);
  doc.text("Client / véhicule", 14, 50);`,
    `  doc.setDrawColor(0);
  doc.line(14, 40, 196, 40);

  if (cancelled) {
    doc.setFontSize(11);
    doc.text("FACTURE ANNULÉE", 14, 48);
    doc.setFontSize(9);
    doc.text(
      "Document conservé pour historique. Aucune nouvelle opération de paiement n’est autorisée.",
      14,
      54
    );
  }

  doc.setFontSize(11);
  doc.text("Client / véhicule", 14, cancelled ? 66 : 50);`
  );

  content = content.replace(
    `  doc.setFontSize(10);
  doc.text("Client : " + buildClientLabel(client), 14, 58);
  doc.text("Véhicule : " + buildVehicleLabel(vehicule), 14, 64);
  doc.text("Intervention : " + buildInterventionLabel(intervention), 14, 70);

  doc.setFontSize(11);
  doc.text("Détails facture", 14, 84);

  autoTable(doc, {
    startY: 90,`,
    `  doc.setFontSize(10);
  doc.text("Client : " + buildClientLabel(client), 14, cancelled ? 74 : 58);
  doc.text("Véhicule : " + buildVehicleLabel(vehicule), 14, cancelled ? 80 : 64);
  doc.text("Intervention : " + buildInterventionLabel(intervention), 14, cancelled ? 86 : 70);

  doc.setFontSize(11);
  doc.text("Détails facture", 14, cancelled ? 100 : 84);

  autoTable(doc, {
    startY: cancelled ? 106 : 90,`
  );
}

/**
 * 6) Résumé PDF : remplacer reste à payer par paiement désactivé si annulée.
 */
content = content.replace(
  `      ["Reste à payer", formatMoney(resteAPayer)],
        [
          "Statut paiement",
          formatPaymentStatus(
            value(invoice, "statutPaiement", "en_attente")
          ),
        ],`,
  `      [
          cancelled ? "Paiement" : "Reste à payer",
          cancelled ? "Désactivé - facture annulée" : formatMoney(resteAPayer),
        ],
        [
          "Statut paiement",
          formatPaymentStatus(
            value(invoice, "statutPaiement", "en_attente")
          ),
        ],
        [
          "Statut facture",
          cancelled ? "Annulée" : "Émise",
        ],`
);

/**
 * 7) Lien public dans le PDF : wording différent si annulée.
 */
content = content.replace(
  `      doc.text(
        "Lien facture / paiement : " + publicUrl,
        14,
        summaryY + 34
      );`,
  `      doc.text(
        (cancelled
          ? "Lien consultation facture : "
          : "Lien facture / paiement : ") + publicUrl,
        14,
        summaryY + 34
      );`
);

/**
 * 8) UI du composant : mention près du titre documents.
 */
if (!content.includes("data-invoice-document-cancelled-warning")) {
  content = content.replace(
    `            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              Visualise la facture, télécharge le PDF ou prépare un message WhatsApp / SMS pour le client.
            </p>`,
    `            <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600">
              {isInvoiceCancelled(invoice)
                ? "Facture annulée : le PDF et le lien public restent disponibles pour consultation historique uniquement."
                : "Visualise la facture, télécharge le PDF ou prépare un message WhatsApp / SMS pour le client."}
            </p>

            {isInvoiceCancelled(invoice) ? (
              <div
                data-invoice-document-cancelled-warning
                className="mt-4 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-bold text-red-700"
              >
                Facture annulée — aucune nouvelle opération de paiement ne doit être initiée.
              </div>
            ) : null}`
  );
}

/**
 * 9) Nettoyage encodage.
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
  ["vÃ©hicule", "véhicule"],
  ["Montant payÃ©", "Montant payé"],
  ["Reste Ã payer", "Reste à payer"],
  ["Reste Ã  payer", "Reste à payer"],
  ["Facture gÃ©nÃ©rÃ©e", "Facture générée"],
  ["gÃ©nÃ©rÃ©e", "générée"],
  ["DÃ©tails", "Détails"],
  ["DÃ©signation", "Désignation"],
  ["TÃ©lÃ©charger", "Télécharger"],
  ["tÃ©lÃ©charge", "télécharge"],
  ["prÃ©pare", "prépare"],
  ["NÂ°", "N°"],
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

console.log("UPDATED InvoiceDocumentActions cancelled invoice PDF state");