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
  ["véhicules", "véhicules"],
  ["activité", "activité"],
  ["financière", "financière"],
  ["prévus", "prévus"],
  ["aujourd'hui", "aujourd’hui"],
  ["Rendez-vous à traiter", "Rendez-vous à traiter"],
  ["archivés", "archivés"],
  ["Véhicules", "Véhicules"],
  ["récents", "récents"],
  ["règlements", "règlements"],
  ["Accès", "Accès"],
  ["opérations", "opérations"],
  ["Créer", "Créer"],
  ["l'activité", "l’activité"],
  ["confirmés", "confirmés"],
  ["être", "être"],
  ["Relances client à traiter", "Relances client à traiter"],
  ["déjà", "déjà"],
  ["dépassées", "dépassées"],
  ["impayées", "impayées"],
  ["réglées", "réglées"],
  ["Interventions à diagnostiquer", "Interventions à diagnostiquer"],
  ["Échéances", "Échéances"],
  ["échéances", "échéances"],
  ["d'échéances", "d’échéances"],
  ["à relancer", "à relancer"],
  ["prévus", "prévus"],
  ["Reste à encaisser", "Reste à encaisser"],
  ["Relances de factures impayées à traiter", "Relances de factures impayées à traiter"],
  ["nécessitant", "nécessitant"],
  ["à recouvrer", "à recouvrer"],
  ["à venir", "à venir"],
  ["opérationnel", "opérationnel"],
  ["Payées", "Payées"],
  ["encaissé", "encaissé"],
  ["payées", "payées"],
  ["créés", "créés"],
  ["RDV planifiés", "RDV planifiés"],
  ["Rendez-vous à traiter", "Rendez-vous à traiter"],
  ["Travaux actuellement ouverts à l'atelier", "Travaux actuellement ouverts à l’atelier"],
  ["terminées", "terminées"],
  ["finalisés", "finalisés"],
  ["Rappels à traiter", "Rappels à traiter"],
  ["exécuter", "exécuter"],
  ["Dernières", "Dernières"],
  ["récentes", "récentes"],
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