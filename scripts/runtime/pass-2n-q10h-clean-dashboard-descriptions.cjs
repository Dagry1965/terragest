const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts"
);

if (!fs.existsSync(target)) {
  console.error("Missing:", target);
  process.exit(1);
}

let content = fs.readFileSync(target, "utf8");

/**
 * PASS 2N-Q10H
 * Descriptions métier propres pour widgets / notifications AMARKHYS.
 *
 * Scope strict :
 * - moteur dashboard uniquement
 * - pas de cockpit
 * - pas de sidebar
 * - pas de graphique revenus
 */

/**
 * 1. Nettoyer mojibake visible dans ce moteur.
 */
content = content
  .replaceAll("Ã‰lÃ©ment", "Élément")
  .replaceAll("VÃ©hicule", "Véhicule")
  .replaceAll("Â·", "·");

/**
 * 2. Ajouter un helper de libellé statut si absent.
 */
if (!content.includes("function formatBusinessStatus(")) {
  content = content.replace(
    `function getRecordHref(`,
    `function formatBusinessStatus(value: unknown): string | undefined {
  const raw = normalizeText(value);

  if (!raw) {
    return undefined;
  }

  const labels: Record<string, string> = {
    en_attente: "En attente",
    planifie: "Planifié",
    confirme: "Confirmé",
    annule: "Annulé",
    annulee: "Annulée",
    valide: "Validé",
    rejete: "Rejeté",
    emise: "Émise",
    brouillon: "Brouillon",
    partiel: "Paiement partiel",
    paye: "Payé",
    disponible: "Disponible",
    stock_faible: "Stock faible",
    rupture: "Rupture",
    archive: "Archivé",
    ouverte: "Ouverte",
    en_cours: "En cours",
    terminee: "Terminée",
    traite: "Traité",
    a_traiter: "À traiter",
    en_retard: "En retard",
  };

  return labels[raw] ?? raw.replaceAll("_", " ");
}

function getRecordHref(`
  );
}

/**
 * 3. Remplacer les fragments de statut techniques par formatBusinessStatus().
 */
content = content
  .replaceAll(
    `record.statutFacture ? "Statut facture : " + String(record.statutFacture) : undefined,`,
    `formatBusinessStatus(record.statutFacture)
      ? "Statut facture : " + formatBusinessStatus(record.statutFacture)
      : undefined,`
  )
  .replaceAll(
    `record.statutPaiement ? "Paiement : " + String(record.statutPaiement) : undefined,`,
    `formatBusinessStatus(record.statutPaiement)
      ? "Paiement : " + formatBusinessStatus(record.statutPaiement)
      : undefined,`
  )
  .replaceAll(
    `record.statut ? "Statut : " + String(record.statut) : undefined,`,
    `formatBusinessStatus(record.statut)
      ? "Statut : " + formatBusinessStatus(record.statut)
      : undefined,`
  );

/**
 * 4. Ajouter quantité stock si disponible.
 */
if (!content.includes(`record.quantite !== undefined ? "Quantité : " + String(record.quantite) : undefined,`)) {
  content = content.replace(
    `amount ? "Montant : " + amount : undefined,`,
    `amount ? "Montant : " + amount : undefined,
    record.quantite !== undefined ? "Quantité : " + String(record.quantite) : undefined,
    record.seuilAlerte !== undefined ? "Seuil : " + String(record.seuilAlerte) : undefined,`
  );
}

/**
 * 5. Ajouter mode de paiement / type stock si disponible.
 */
if (!content.includes(`record.modePaiement ? "Mode : " + formatBusinessStatus(record.modePaiement) : undefined,`)) {
  content = content.replace(
    `record.source ? "Source : " + String(record.source) : undefined,`,
    `record.modePaiement ? "Mode : " + formatBusinessStatus(record.modePaiement) : undefined,
    record.typeStock ? "Type stock : " + formatBusinessStatus(record.typeStock) : undefined,
    record.source ? "Source : " + String(record.source) : undefined,`
  );
}

/**
 * 6. Corriger aussi les statuts de paiement / modes paiement.
 */
content = content.replace(
  `const labels: Record<string, string> = {`,
  `const labels: Record<string, string> = {`
);

content = content.replace(
  `en_retard: "En retard",
  };`,
  `en_retard: "En retard",
    especes: "Espèces",
    mobile_money: "Mobile Money",
    carte: "Carte",
    virement: "Virement",
    cheque: "Chèque",
    autre: "Autre",
    atelier: "Atelier",
    magasin: "Magasin",
    depot: "Dépôt",
    reserve: "Réserve",
  };`
);

/**
 * 7. Nettoyage doublons éventuels.
 */
content = content
  .replaceAll("  ", " ")
  .replaceAll("function formatBusinessStatus", "\nfunction formatBusinessStatus")
  .replaceAll("\n\n\n", "\n\n");

fs.writeFileSync(target, content, "utf8");

console.log("PASS 2N-Q10H OK: dashboard descriptions cleaned.");