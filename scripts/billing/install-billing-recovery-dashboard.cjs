const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();

function read(relativePath) {
  return fs.readFileSync(path.join(ROOT, relativePath), "utf8");
}

function write(relativePath, content) {
  fs.writeFileSync(path.join(ROOT, relativePath), content, "utf8");
  console.log("UPDATED", relativePath);
}

function fixEncoding(content) {
  return content
    .split("vÃ©hicules").join("véhicules")
    .split("VÃ©hicules").join("Véhicules")
    .split("activitÃ©").join("activité")
    .split("financiÃ¨re").join("financière")
    .split("AccÃ¨s").join("Accès")
    .split("opÃ©rations").join("opérations")
    .split("CrÃ©er").join("Créer")
    .split("lâ€™").join("l’")
    .split("confirmÃ©s").join("confirmés")
    .split("planifiÃ©s").join("planifiés")
    .split("payÃ©es").join("payées")
    .split("encaissÃ©").join("encaissé")
    .split("rÃ©glÃ©es").join("réglées")
    .split("crÃ©Ã©s").join("créés")
    .split("terminÃ©es").join("terminées")
    .split("finalisÃ©s").join("finalisés")
    .split("DerniÃ¨res").join("Dernières")
    .split("rÃ©centes").join("récentes")
    .split("donnÃ©e").join("donnée")
    .split("Ã‰lÃ©ment").join("Élément")
    .split("dÃ©fini").join("défini")
    .split("Ãªtre").join("être")
    .split("Ã ").join("à")
    .split("dÃ©jÃ ").join("déjà")
    .split("dÃ©passÃ©es").join("dépassées")
    .split("impayÃ©es").join("impayées")
    .split("opÃ©rationnel").join("opérationnel")
    .split("PayÃ©es").join("Payées")
    .split("exÃ©cuter").join("exécuter");
}

function patchDashboardConfig() {
  const relativePath =
    "src/runtime/dashboard/generic/ERPBusinessAmarkhysDashboardConfig.ts";

  let content =
    fixEncoding(read(relativePath));

  const recoveryWidgets = `    {
      key: "recouvrement-echeances-retard",
      type: "kpi",
      moduleKey: "echeancespaiementauto",
      title: "Échéances en retard",
      description: "Nombre d’échéances de paiement dépassées ou à relancer.",
      href: "/echeancespaiementauto",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_retard",
        },
      ],
    },
    {
      key: "recouvrement-montant-retard",
      type: "kpi",
      moduleKey: "echeancespaiementauto",
      title: "Montant en retard",
      description: "Somme des montants prévus sur les échéances en retard.",
      href: "/echeancespaiementauto",
      aggregation: "sum",
      sumFields: ["montantPrevu"],
      valueSuffix: "FCFA",
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_retard",
        },
      ],
    },
    {
      key: "recouvrement-reste-a-encaisser",
      type: "kpi",
      moduleKey: "facturesauto",
      title: "Reste à encaisser",
      description: "Somme des restes à payer sur les factures non soldées.",
      href: "/facturesauto",
      aggregation: "sum",
      sumFields: ["resteAPayer"],
      valueSuffix: "FCFA",
      filters: [
        {
          field: "statutPaiement",
          operator: "notEquals",
          value: "paye",
        },
      ],
    },
    {
      key: "recouvrement-relances-factures",
      type: "kpi",
      moduleKey: "rappelsauto",
      title: "Relances factures",
      description: "Relances de factures impayées à traiter.",
      href: "/rappelsauto",
      filters: [
        {
          field: "typeRappel",
          operator: "equals",
          value: "facture_impayee",
        },
        {
          field: "statut",
          operator: "notEquals",
          value: "envoye",
        },
      ],
    },
    {
      key: "alertes-echeances-retard",
      type: "alert",
      moduleKey: "echeancespaiementauto",
      title: "Échéances à recouvrer",
      description: "Échéances en retard nécessitant une action de recouvrement.",
      labelField: "factureId",
      dateField: "dateEcheance",
      href: "/echeancespaiementauto",
      level: "critical",
      limit: 6,
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "en_retard",
        },
      ],
    },
    {
      key: "prochaines-echeances",
      type: "timeline",
      moduleKey: "echeancespaiementauto",
      title: "Prochaines échéances",
      description: "Échéances à venir pour les paiements fractionnés.",
      labelField: "factureId",
      dateField: "dateEcheance",
      href: "/echeancespaiementauto",
      limit: 8,
      filters: [
        {
          field: "statut",
          operator: "equals",
          value: "a_venir",
        },
      ],
    },
`;

  if (!content.includes('key: "recouvrement-echeances-retard"')) {
    content = content.replace(
      `    {
      key: "conversion-funnel",`,
      recoveryWidgets + `
    {
      key: "conversion-funnel",`
    );
  }

  write(relativePath, content);
}

function patchDashboardEngineEncoding() {
  const files = [
    "src/runtime/dashboard/generic/ERPDashboardWidgetEngine.ts",
    "src/components/erp/dashboard/generic/widgets/ERPListWidget.tsx",
  ];

  for (const relativePath of files) {
    if (fs.existsSync(path.join(ROOT, relativePath))) {
      write(relativePath, fixEncoding(read(relativePath)));
    }
  }
}

patchDashboardConfig();
patchDashboardEngineEncoding();

console.log("");
console.log("Billing recovery dashboard installed.");
console.log("Done.");