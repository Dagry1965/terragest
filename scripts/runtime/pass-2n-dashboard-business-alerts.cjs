const fs = require("fs");
const path = require("path");

const root = process.cwd();
const target = path.join(
  root,
  "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts"
);

function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, "utf8");
  console.log("WRITTEN", path.relative(root, filePath));
}

let content = fs.readFileSync(target, "utf8");

/**
 * Fix visible mojibake still present in AMARKHYS dashboard config.
 */
const replacements = new Map([
  ["vÃ©hicules", "véhicules"],
  ["activitÃ©", "activité"],
  ["financiÃ¨re", "financière"],
  ["prÃ©vus", "prévus"],
  ["aujourdâ€™hui", "aujourd’hui"],
  ["Rendez-vous Ã  traiter", "Rendez-vous à traiter"],
  ["archivÃ©s", "archivés"],
  ["VÃ©hicules", "Véhicules"],
  ["rÃ©cents", "récents"],
  ["rÃ¨glements", "règlements"],
  ["AccÃ¨s", "Accès"],
  ["opÃ©rations", "opérations"],
  ["CrÃ©er", "Créer"],
  ["lâ€™activitÃ©", "l’activité"],
  ["confirmÃ©s", "confirmés"],
  ["Ãªtre", "être"],
  ["Relances client Ã  traiter", "Relances client à traiter"],
  ["dÃ©jÃ ", "déjà"],
  ["dÃ©passÃ©es", "dépassées"],
  ["impayÃ©es", "impayées"],
  ["rÃ©glÃ©es", "réglées"],
  ["Interventions Ã  diagnostiquer", "Interventions à diagnostiquer"],
  ["Ã‰chÃ©ances", "Échéances"],
  ["Ã©chÃ©ances", "échéances"],
  ["dâ€™Ã©chÃ©ances", "d’échéances"],
  ["Ã  relancer", "à relancer"],
  ["prÃ©vus", "prévus"],
  ["Reste Ã  encaisser", "Reste à encaisser"],
  ["Relances de factures impayÃ©es Ã  traiter", "Relances de factures impayées à traiter"],
  ["nÃ©cessitant", "nécessitant"],
  ["Ã  recouvrer", "à recouvrer"],
  ["Ã  venir", "à venir"],
  ["opÃ©rationnel", "opérationnel"],
  ["PayÃ©es", "Payées"],
  ["encaissÃ©", "encaissé"],
  ["payÃ©es", "payées"],
  ["crÃ©Ã©s", "créés"],
  ["RDV planifiÃ©s", "RDV planifiés"],
  ["Rendez-vous Ã  traiter", "Rendez-vous à traiter"],
  ["Travaux actuellement ouverts Ã  lâ€™atelier", "Travaux actuellement ouverts à l’atelier"],
  ["terminÃ©es", "terminées"],
  ["finalisÃ©s", "finalisés"],
  ["Rappels Ã  traiter", "Rappels à traiter"],
  ["exÃ©cuter", "exécuter"],
  ["DerniÃ¨res", "Dernières"],
  ["rÃ©centes", "récentes"],
]);

for (const [bad, good] of replacements) {
  content = content.replaceAll(bad, good);
}

/**
 * Rappels AMARKHYS real statuses:
 * planifie | envoye | echoue | annule
 *
 * "traite" does not exist. Replace active reminder filters with real statuses.
 */
content = content.replaceAll(
`{
          field: "statut",
          operator: "notEquals",
          value: "traite",
        },`,
`{
          field: "statut",
          operator: "in",
          value: ["planifie", "echoue"],
        },`
);

content = content.replaceAll(
`{
          field: "statut",
          operator: "notEquals",
          value: "envoye",
        },`,
`{
          field: "statut",
          operator: "in",
          value: ["planifie", "echoue"],
        },`
);

/**
 * Factures: make active finance filters explicit.
 * Active receivable statuses are en_attente + partiel.
 */
content = content.replaceAll(
`{
          field: "statutPaiement",
          operator: "notEquals",
          value: "paye",
        },
        {
          field: "statutFacture",
          operator: "notEquals",
          value: "annulee",
        },`,
`{
          field: "statutPaiement",
          operator: "in",
          value: ["en_attente", "partiel"],
        },
        {
          field: "statutFacture",
          operator: "notEquals",
          value: "annulee",
        },`
);

/**
 * Interventions ouvertes: use real operational states explicitly.
 */
content = content.replace(
`filters: [
        {
          field: "statut",
          operator: "notEquals",
          value: "facturee",
        },
        {
          field: "statut",
          operator: "notEquals",
          value: "annulee",
        },
      ],`,
`filters: [
        {
          field: "statut",
          operator: "in",
          value: ["ouverte", "diagnostic", "en_cours", "terminee"],
        },
      ],`
);

/**
 * Echeances: upcoming schedule should not include cancelled or paid.
 * Existing a_venir filter is correct; add partiellement_payee to recovery views where needed.
 */
if (!content.includes('key: "echeances-partielles"')) {
  content = content.replace(
`    {
      key: "alertes-echeances-retard",`,
`    {
      key: "echeances-partielles",
      type: "kpi",
      moduleKey: "echeancespaiementauto",
      title: "Échéances partielles",
      description: "Échéances partiellement payées à suivre.",
      href: "/echeancespaiementauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "partiellement_payee",
        },
      ],
    },
    {
      key: "alertes-echeances-retard",`
  );
}

/**
 * Funnel paid invoices: exclude cancelled invoices explicitly.
 */
content = content.replace(
`{
              field: "statutPaiement",
              operator: "equals",
              value: "paye",
            },
          ],
        },`,
`{
              field: "statutPaiement",
              operator: "equals",
              value: "paye",
            },
            {
              field: "statutFacture",
              operator: "notEquals",
              value: "annulee",
            },
          ],
        },`
);

/**
 * CA total should not include cancelled invoices.
 */
content = content.replace(
`{
      key: "ca-total-ttc",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA total TTC",
      description: "Montant TTC total des factures atelier.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
    },`,
`{
      key: "ca-total-ttc",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "CA total TTC",
      description: "Montant TTC total des factures atelier non annulées.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["montantTTC", "totalTTC", "montantTotal", "total"],
      valueSuffix: "FCFA",
      filters: [
        {
          field: "statutFacture",
          operator: "notEquals",
          value: "annulee",
        },
      ],
    },`
);

writeFile(target, content);

console.log("PASS 2N-D OK: AMARKHYS dashboard alerts aligned with real business statuses.");