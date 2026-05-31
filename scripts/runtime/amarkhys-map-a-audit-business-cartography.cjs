const fs = require("fs");
const path = require("path");

const root = process.cwd();

const doctrine = [
  "Aucun bouton workflow dans ERPEnterpriseForm.",
  "Aucune transition statut libre dans le formulaire.",
  "Aucune creation enfant sans contexte parent.",
  "Aucune modification stock sans mouvement.",
  "Aucun paiement sans facture parent.",
  "Les boutons metier doivent etre rendus par ERPRuntimePage / ERPRuntimeActionBar.",
  "L'execution doit passer par RuntimeActionEngine, RuntimeWorkflowEngine, Business Rules, guards et services runtime.",
];

const reference = [
  {
    moduleKey: "clientsauto",
    label: "Clients",
    role: "Dossier client automobile et point d'entree de la relation client.",
    statuses: ["prospect", "actif", "inactif", "archive"],
    buttons: ["Activer client", "Desactiver client", "Reactiver client", "Archiver client", "Ajouter vehicule", "Ouvrir fiche operationnelle"],
    workflows: [
      ["prospect", "Activer client", "actif"],
      ["actif", "Desactiver client", "inactif"],
      ["inactif", "Reactiver client", "actif"],
      ["prospect/actif/inactif", "Archiver client", "archive"],
    ],
    rules: [
      "R-CLI-01 client actif peut avoir vehicules RDV interventions factures encaissements",
      "R-CLI-02 client archive reste consultable pour historique",
      "R-CLI-03 type client pilote affichage vehicules cartes/tableau compact",
      "R-CLI-04 recherche client par vehicule ou immatriculation",
      "R-CLI-05 creation vehicule depuis client pre-remplit clientId",
      "R-CLI-06 boutons activation/desactivation/archivage via runtime",
    ],
  },
  {
    moduleKey: "vehicules",
    label: "Vehicules",
    role: "Fiche vehicule rattachee a un client, pivot operationnel entre client et atelier.",
    statuses: ["actif", "entretien", "immobilise", "archive"],
    buttons: ["Creer rendez-vous", "Voir fiche vehicule", "Marquer entretien requis", "Immobiliser vehicule", "Remettre en service", "Archiver vehicule"],
    workflows: [
      ["actif", "Marquer entretien requis", "entretien"],
      ["entretien", "Immobiliser vehicule", "immobilise"],
      ["entretien/immobilise", "Remettre en service", "actif"],
      ["actif/entretien/immobilise", "Archiver vehicule", "archive"],
    ],
    rules: [
      "R-VEH-01 vehicule appartient a un client",
      "R-VEH-02 vehicule selectionne filtre les RDV",
      "R-VEH-03 RDV selectionne filtre les interventions",
      "R-VEH-04 creation RDV depuis vehicule pre-remplit clientId vehiculeId",
      "R-VEH-05 archivage vehicule conserve historique",
    ],
  },
  {
    moduleKey: "rendezvous",
    label: "Rendez-vous",
    role: "Planification atelier avant intervention.",
    statuses: ["planifie", "confirme", "en_cours", "termine", "annule"],
    buttons: ["Confirmer RDV", "Demarrer RDV", "Terminer RDV", "Annuler RDV", "Reporter RDV"],
    workflows: [
      ["planifie", "Confirmer RDV", "confirme"],
      ["confirme", "Demarrer RDV", "en_cours"],
      ["en_cours", "Terminer RDV", "termine"],
      ["planifie/confirme/en_cours", "Annuler RDV", "annule"],
      ["planifie/confirme", "Reporter RDV", "planifie"],
    ],
    rules: [
      "R-RDV-01 RDV confirme peut creer intervention",
      "R-RDV-02 RDV consomme ne cree jamais deuxieme intervention",
      "R-RDV-03 RDV conserve typeService durationMinutes",
      "R-RDV-04 creneau occupe non disponible",
      "R-RDV-05 creation RDV depuis vehicule pre-remplit clientId vehiculeId",
      "R-RDV-06 statut RDV via runtime pas formulaire",
      "R-RDV-07 hub client vehicule RDV intervention",
    ],
  },
  {
    moduleKey: "interventionsauto",
    label: "Interventions",
    role: "Execution atelier et cycle central travaux.",
    statuses: ["ouverte", "diagnostic", "en_cours", "terminee", "facturee", "annulee"],
    buttons: ["Passer en diagnostic", "Demarrer intervention", "Terminer intervention", "Generer facture", "Annuler intervention"],
    workflows: [
      ["ouverte", "Passer en diagnostic", "diagnostic"],
      ["ouverte/diagnostic", "Demarrer intervention", "en_cours"],
      ["diagnostic/en_cours", "Terminer intervention", "terminee"],
      ["terminee", "Generer facture", "facturee"],
      ["ouverte/diagnostic/en_cours", "Annuler intervention", "annulee"],
    ],
    rules: [
      "R-INT-01 intervention creee depuis RDV confirme",
      "R-INT-02 intervention terminee peut generer facture",
      "R-INT-03 intervention ne genere pas deux factures",
      "R-INT-04 champs herites RDV client vehicule verrouilles",
      "R-INT-05 lignes brouillon exclues des totaux",
      "R-INT-06 lignes retirees exclues des totaux",
      "R-INT-07 intervention facturee protegee",
    ],
  },
  {
    moduleKey: "lignesinterventionauto",
    label: "Lignes intervention",
    role: "Detail d'une intervention, totaux et impact stock eventuel.",
    statuses: ["brouillon", "validee", "retiree"],
    buttons: ["Valider la ligne", "Retirer la ligne"],
    workflows: [
      ["brouillon", "Valider la ligne", "validee"],
      ["brouillon/validee", "Retirer la ligne", "retiree"],
    ],
    rules: [
      "R-LIG-01 ligne creee depuis intervention parent",
      "R-LIG-02 ligne brouillon ne compte pas",
      "R-LIG-03 ligne validee compte",
      "R-LIG-04 ligne retiree ne compte plus mais reste auditee",
      "R-LIG-05 ligne piece validee peut declencher sortie stock",
      "R-LIG-06 type article vient du produit",
      "R-LIG-07 stock auto si un seul stock disponible",
      "R-LIG-08 stock insuffisant bloque ou alerte",
    ],
  },
  {
    moduleKey: "facturesauto",
    label: "Factures",
    role: "Preuve commerciale et suivi financier.",
    statuses: ["brouillon", "emise", "annulee", "en_attente", "partiel", "paye", "non_envoyee", "envoyee", "echec"],
    buttons: ["Valider facture", "Annuler facture", "Marquer comme envoyee", "Voir historique encaissements", "Ajouter paiement"],
    workflows: [
      ["brouillon", "Valider facture", "emise"],
      ["emise", "Annuler facture", "annulee"],
      ["non_envoyee/echec", "Marquer comme envoyee", "envoyee"],
      ["en_attente/partiel", "Ajouter paiement", "partiel/paye"],
    ],
    rules: [
      "R-FAC-01 facture creee depuis intervention terminee",
      "R-FAC-02 montants facture viennent des lignes validees",
      "R-FAC-03 montant paye somme encaissements valides",
      "R-FAC-04 reste a payer = montantTTC - montantPaye",
      "R-FAC-05 reste a payer zero donne statut paye",
      "R-FAC-06 paiement partiel donne statut partiel",
      "R-FAC-07 aucun paiement donne en_attente",
      "R-FAC-08 encaissement cree avec contexte facture",
      "R-FAC-09 pas deux boutons concurrents ajouter paiement",
    ],
  },
  {
    moduleKey: "encaissementsauto",
    label: "Encaissements",
    role: "Paiement recu, preuve et comptabilisation.",
    statuses: ["en_attente", "valide", "rejete", "annule", "non_envoye", "envoye", "echec"],
    buttons: ["Valider encaissement", "Rejeter encaissement", "Annuler encaissement", "Envoyer recu"],
    workflows: [
      ["en_attente", "Valider encaissement", "valide"],
      ["en_attente", "Rejeter encaissement", "rejete"],
      ["en_attente/valide", "Annuler encaissement", "annule"],
      ["non_envoye/echec", "Envoyer recu", "envoye"],
    ],
    rules: [
      "R-ENC-01 encaissement cree depuis facture parent",
      "R-ENC-02 lien transporte parentModuleKey parentRecordId parentForeignKey",
      "R-ENC-03 factureId clientId vehiculeId pre-remplis et verrouilles",
      "R-ENC-04 encaissement valide met a jour facture",
      "R-ENC-05 encaissement annule recalcule facture",
      "R-ENC-06 encaissement ne modifie pas facture hors contexte",
    ],
  },
  {
    moduleKey: "echeancespaiementauto",
    label: "Echeances paiement",
    role: "Paiements prevus ou fractionnes.",
    statuses: ["a_venir", "en_retard", "partiellement_payee", "payee", "annulee"],
    buttons: ["Marquer payee", "Relancer client", "Annuler echeance"],
    workflows: [
      ["a_venir", "Marquer en retard", "en_retard"],
      ["a_venir/en_retard/partiellement_payee", "Marquer payee", "payee"],
      ["a_venir/en_retard/partiellement_payee", "Annuler echeance", "annulee"],
      ["en_retard", "Relancer client", "en_retard"],
    ],
    rules: [
      "R-ECH-01 echeance liee a facture",
      "R-ECH-02 echeance payee contribue suivi financier",
      "R-ECH-03 relance auditee",
      "R-ECH-04 statut en_retard calcule par job runtime",
      "R-ECH-05 echeance ne modifie pas facture sans regle claire",
    ],
  },
  {
    moduleKey: "produitsauto",
    label: "Produits",
    role: "Catalogue pieces/services.",
    statuses: ["actif", "rupture", "inactif", "archive"],
    buttons: ["Creer stock associe", "Voir hub produit/stock", "Marquer rupture", "Reactiver produit", "Archiver produit"],
    workflows: [
      ["actif", "Marquer rupture", "rupture"],
      ["rupture/inactif", "Reactiver produit", "actif"],
      ["actif/rupture/inactif", "Archiver produit", "archive"],
    ],
    rules: [
      "R-PROD-01 produit porte type article",
      "R-PROD-02 ligne intervention ne choisit pas librement typeLigne si produit impose typeArticle",
      "R-PROD-03 produit stockable rattache a stock",
      "R-PROD-04 produit non stockable pas mouvement obligatoire",
      "R-PROD-05 choix produit auto-remplit designation type article prix snapshot",
      "R-PROD-06 archiver produit ne casse pas historique",
    ],
  },
  {
    moduleKey: "stocksauto",
    label: "Stocks",
    role: "Etat courant du stock.",
    statuses: ["disponible", "stock_faible", "rupture", "archive"],
    buttons: ["Voir mouvements", "Creer correction stock controlee"],
    workflows: [
      ["disponible", "Detecter stock faible", "stock_faible"],
      ["stock_faible", "Detecter rupture", "rupture"],
      ["stock_faible/rupture", "Reapprovisionner", "disponible"],
    ],
    rules: [
      "R-STK-01 stock est etat resultant",
      "R-STK-02 aucune modification quantite sans mouvement",
      "R-STK-03 entree augmente quantite",
      "R-STK-04 sortie diminue quantite",
      "R-STK-05 stock_faible rupture calcules quantite seuil",
      "R-STK-06 formulaire ne modifie pas quantite librement",
    ],
  },
  {
    moduleKey: "mouvementsstockauto",
    label: "Mouvements stock",
    role: "Preuve de variation stock.",
    statuses: ["brouillon", "valide", "annule"],
    buttons: ["Valider mouvement", "Annuler mouvement"],
    workflows: [
      ["brouillon", "Valider mouvement", "valide"],
      ["valide", "Annuler mouvement", "annule"],
    ],
    rules: [
      "R-MVT-01 mouvement porte sourceModule sourceId",
      "R-MVT-02 mouvement conserve quantiteAvant quantiteApres",
      "R-MVT-03 mouvement est seule preuve modification stock",
      "R-MVT-04 mouvement valide non modifiable pour maquiller historique",
      "R-MVT-05 annulation via mouvement inverse idealement",
    ],
  },
  {
    moduleKey: "fournisseursauto",
    label: "Fournisseurs",
    role: "Referentiel fournisseur.",
    statuses: ["actif", "suspendu", "archive"],
    buttons: ["Creer commande fournisseur", "Voir commandes fournisseur", "Suspendre fournisseur", "Reactiver fournisseur", "Archiver fournisseur"],
    workflows: [
      ["actif", "Suspendre fournisseur", "suspendu"],
      ["suspendu", "Reactiver fournisseur", "actif"],
      ["actif/suspendu", "Archiver fournisseur", "archive"],
    ],
    rules: [
      "R-FOU-01 commande stock rattachee a fournisseur",
      "R-FOU-02 fournisseur archive non propose dans nouvelles commandes",
      "R-FOU-03 archiver fournisseur conserve historique",
      "R-FOU-04 creer commande depuis fournisseur pre-remplit fournisseurId",
    ],
  },
  {
    moduleKey: "commandesstockauto",
    label: "Commandes stock",
    role: "Intention d'achat fournisseur.",
    statuses: ["brouillon", "envoyee", "partiellement_recue", "recue", "annulee"],
    buttons: ["Envoyer commande", "Creer reception", "Annuler commande"],
    workflows: [
      ["brouillon", "Envoyer commande", "envoyee"],
      ["envoyee", "Reception partielle detectee", "partiellement_recue"],
      ["envoyee/partiellement_recue", "Reception complete detectee", "recue"],
      ["brouillon/envoyee", "Annuler commande", "annulee"],
    ],
    rules: [
      "R-CMD-01 envoyer commande ne modifie pas stock",
      "R-CMD-02 montants commande viennent des lignes",
      "R-CMD-03 reception modifie stock pas commande",
      "R-CMD-04 statuts reception calcules depuis receptions",
      "R-CMD-05 annuler commande receptionnee bloque ou compense",
    ],
  },
  {
    moduleKey: "lignescommandestockauto",
    label: "Lignes commande stock",
    role: "Produits commandes.",
    statuses: ["brouillon", "validee"],
    buttons: ["Valider ligne commande", "Annuler ligne commande"],
    workflows: [
      ["brouillon", "Valider ligne commande", "validee"],
    ],
    rules: [
      "R-LCMD-01 ligne commande appartient a commande parent",
      "R-LCMD-02 produit auto-remplit designation prix achat snapshot",
      "R-LCMD-03 ligne commande ne choisit pas stock destination",
      "R-LCMD-04 stock destination se choisit a reception",
      "R-LCMD-05 ligne deja receptionnee non reproposee sauf partiel",
    ],
  },
  {
    moduleKey: "receptionsstockauto",
    label: "Receptions stock",
    role: "Entree reelle de stock.",
    statuses: ["brouillon", "validee"],
    buttons: ["Valider reception", "Annuler reception"],
    workflows: [
      ["brouillon", "Valider reception", "validee"],
    ],
    rules: [
      "R-REC-01 reception liee a commande",
      "R-REC-02 reception liee a ligne commande",
      "R-REC-03 reception validee cree mouvement entree",
      "R-REC-04 mouvement augmente stock",
      "R-REC-05 mouvementStockId empeche double traitement",
      "R-REC-06 ligne deja receptionnee non reproposee sauf partiel",
      "R-REC-07 stock destination depend produit",
    ],
  },
];

function full(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[’']/g, "")
    .replace(/[^a-z0-9_]+/g, " ")
    .trim();
}

function hasAny(source, expected) {
  const n = normalize(source);
  return expected.some((item) => n.includes(normalize(item)));
}

function hasMarker(source, marker) {
  return normalize(source).includes(normalize(marker));
}

function extractStatusHits(source, statuses) {
  return statuses.map((status) => ({
    status,
    found: hasMarker(source, status),
  }));
}

function extractButtonHits(source, buttons) {
  return buttons.map((button) => ({
    button,
    found: hasMarker(source, button),
  }));
}

function coverage(items) {
  if (items.length === 0) return 100;
  const found = items.filter((x) => x.found).length;
  return Math.round((found / items.length) * 100);
}

const globalFiles = {
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  workflowEngine: "src/runtime/workflows/RuntimeWorkflowEngine.ts",
  businessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  guards: "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
};

const globalSource = Object.values(globalFiles).map(read).join("\n");

const moduleAudits = [];

for (const ref of reference) {
  const moduleFile = `src/runtime/modules/generated/${ref.moduleKey}/${ref.moduleKey}.module.ts`;
  const actionsFile = `src/runtime/modules/generated/${ref.moduleKey}/${ref.moduleKey}.actions.ts`;
  const routeList = `src/app/(private)/${ref.moduleKey}/page.tsx`;
  const routeDetail = `src/app/(private)/${ref.moduleKey}/[id]/page.tsx`;
  const routeEdit = `src/app/(private)/${ref.moduleKey}/[id]/edit/page.tsx`;

  const moduleSource = read(moduleFile);
  const actionsSource = read(actionsFile);
  const combined = [moduleSource, actionsSource].join("\n");

  const statusHits = extractStatusHits(combined, ref.statuses);
  const buttonHits = extractButtonHits(combined, ref.buttons);

  const workflowHits = ref.workflows.map(([from, button, to]) => ({
    from,
    button,
    to,
    found:
      hasMarker(combined, from.split("/")[0]) &&
      hasMarker(combined, to.split("/")[0]) &&
      hasMarker(combined, button),
  }));

  const ruleHints = ref.rules.map((rule) => {
    const key = rule.split(" ")[0];
    return {
      rule,
      found:
        hasMarker(combined, key) ||
        hasMarker(globalSource, key) ||
        hasAny(combined + "\n" + globalSource, rule.split(" ").slice(1, 5)),
    };
  });

  const statusCoverage = coverage(statusHits);
  const buttonCoverage = coverage(buttonHits);
  const workflowCoverage = coverage(workflowHits);
  const ruleCoverage = coverage(ruleHints);

  const averageCoverage = Math.round(
    (statusCoverage + buttonCoverage + workflowCoverage + ruleCoverage) / 4
  );

  const priority =
    averageCoverage < 40 ? "HIGH" :
    averageCoverage < 70 ? "MEDIUM" :
    "LOW";

  moduleAudits.push({
    ...ref,
    moduleFile,
    actionsFile,
    routes: [
      { path: routeList, exists: fs.existsSync(full(routeList)) },
      { path: routeDetail, exists: fs.existsSync(full(routeDetail)) },
      { path: routeEdit, exists: fs.existsSync(full(routeEdit)) },
    ],
    moduleExists: fs.existsSync(full(moduleFile)),
    actionsExists: fs.existsSync(full(actionsFile)),
    statusHits,
    buttonHits,
    workflowHits,
    ruleHints,
    statusCoverage,
    buttonCoverage,
    workflowCoverage,
    ruleCoverage,
    averageCoverage,
    priority,
  });
}

const doctrineChecks = [
  {
    label: "ERPEnterpriseForm ne doit pas importer RuntimeActionEngine",
    ok: !read(globalFiles.enterpriseForm).includes("RuntimeActionEngine"),
  },
  {
    label: "ERPEnterpriseForm ne doit pas contenir workflowActions.map",
    ok: !read(globalFiles.enterpriseForm).includes("workflowActions.map"),
  },
  {
    label: "ERPRuntimePage utilise ERPRuntimeActionBar",
    ok: read(globalFiles.runtimePage).includes("ERPRuntimeActionBar"),
  },
  {
    label: "ERPRuntimePage utilise RuntimeActionEngine.execute",
    ok: read(globalFiles.runtimePage).includes("RuntimeActionEngine.execute"),
  },
  {
    label: "RuntimeActionEngine existe",
    ok: fs.existsSync(full(globalFiles.actionEngine)),
  },
  {
    label: "RuntimeWorkflowEngine existe",
    ok: fs.existsSync(full(globalFiles.workflowEngine)),
  },
  {
    label: "Business Rules existent",
    ok: fs.existsSync(full(globalFiles.businessRules)),
  },
  {
    label: "Guards runtime existent",
    ok: fs.existsSync(full(globalFiles.guards)),
  },
];

const okDoctrine = doctrineChecks.filter((x) => x.ok).length;
const totalDoctrine = doctrineChecks.length;

const report = [];

report.push("# Audit conformité runtime — Cartographie métier AMARKHYS");
report.push("");
report.push("Document généré par audit automatique du code Terragest_V2 contre la cartographie métier AMARKHYS.");
report.push("");
report.push("## Principe directeur audité");
report.push("");
for (const line of doctrine) {
  report.push(`- ${line}`);
}
report.push("");
report.push("## Synthèse transversale");
report.push("");
report.push(`- Doctrine runtime conforme : ${okDoctrine}/${totalDoctrine}`);
report.push(`- Modules audités : ${moduleAudits.length}`);
report.push("");
report.push("| Check | Résultat |");
report.push("|---|---:|");
for (const check of doctrineChecks) {
  report.push(`| ${check.label} | ${check.ok ? "OK" : "KO"} |`);
}
report.push("");

report.push("## Synthèse par module");
report.push("");
report.push("| Module | Fichier module | Actions | Statuts | Boutons | Workflows | Règles | Couverture | Priorité |");
report.push("|---|---:|---:|---:|---:|---:|---:|---:|---:|");

for (const audit of moduleAudits) {
  report.push(
    `| ${audit.label} \`${audit.moduleKey}\` | ${audit.moduleExists ? "OK" : "KO"} | ${audit.actionsExists ? "OK" : "KO"} | ${audit.statusCoverage}% | ${audit.buttonCoverage}% | ${audit.workflowCoverage}% | ${audit.ruleCoverage}% | ${audit.averageCoverage}% | ${audit.priority} |`
  );
}

report.push("");

for (const audit of moduleAudits) {
  report.push(`## ${audit.label} — \`${audit.moduleKey}\``);
  report.push("");
  report.push("### 1. Ce que le module gère");
  report.push("");
  report.push(audit.role);
  report.push("");
  report.push("### 2. Statuts attendus vs détectés");
  report.push("");
  report.push("| Statut attendu | Détecté dans code |");
  report.push("|---|---:|");
  for (const item of audit.statusHits) {
    report.push(`| ${item.status} | ${item.found ? "OK" : "KO"} |`);
  }
  report.push("");
  report.push(`Couverture statuts : ${audit.statusCoverage}%`);
  report.push("");

  report.push("### 3. Workflows attendus vs détectés");
  report.push("");
  report.push("| Départ | Bouton attendu | Arrivée | Détecté |");
  report.push("|---|---|---|---:|");
  for (const item of audit.workflowHits) {
    report.push(`| ${item.from} | ${item.button} | ${item.to} | ${item.found ? "OK" : "KO"} |`);
  }
  report.push("");
  report.push(`Couverture workflows : ${audit.workflowCoverage}%`);
  report.push("");

  report.push("### 4. Boutons attendus vs détectés");
  report.push("");
  report.push("| Bouton attendu | Détecté dans actions/workflows |");
  report.push("|---|---:|");
  for (const item of audit.buttonHits) {
    report.push(`| ${item.button} | ${item.found ? "OK" : "KO"} |`);
  }
  report.push("");
  report.push(`Couverture boutons : ${audit.buttonCoverage}%`);
  report.push("");

  report.push("### 5. Règles métier attendues vs indices détectés");
  report.push("");
  report.push("| Règle attendue | Indice détecté |");
  report.push("|---|---:|");
  for (const item of audit.ruleHints) {
    report.push(`| ${item.rule.replace(/\|/g, "/")} | ${item.found ? "OK" : "KO"} |`);
  }
  report.push("");
  report.push(`Couverture règles : ${audit.ruleCoverage}%`);
  report.push("");

  report.push("### 6. Routes et fichiers");
  report.push("");
  report.push(`- Module : \`${audit.moduleFile}\` → ${audit.moduleExists ? "OK" : "KO"}`);
  report.push(`- Actions : \`${audit.actionsFile}\` → ${audit.actionsExists ? "OK" : "KO"}`);
  for (const route of audit.routes) {
    report.push(`- Route : \`${route.path}\` → ${route.exists ? "OK" : "KO"}`);
  }
  report.push("");

  report.push("### 7. Diagnostic");
  report.push("");
  if (audit.priority === "HIGH") {
    report.push("Écart important avec la cartographie métier. Audit manuel recommandé avant implémentation.");
  } else if (audit.priority === "MEDIUM") {
    report.push("Couverture partielle. Des actions, workflows ou règles doivent être complétés.");
  } else {
    report.push("Couverture globalement correcte. À consolider par tests fonctionnels.");
  }
  report.push("");
  report.push("### 8. Emplacement cible des boutons");
  report.push("");
  report.push("ERPRuntimePage → ERPRuntimeActionBar → hors ERPEnterpriseForm.");
  report.push("");
}

report.push("## Priorités recommandées");
report.push("");
for (const audit of moduleAudits.filter((a) => a.priority !== "LOW")) {
  report.push(`- ${audit.priority} — ${audit.label} \`${audit.moduleKey}\` : couverture ${audit.averageCoverage}%`);
}
report.push("");
report.push("## Conclusion");
report.push("");
report.push("Ce rapport ne remplace pas la cartographie métier source. Il mesure la conformité du code actuel avec cette cartographie et sert de base aux prochaines passes runtime.");

write("docs/audits/AMARKHYS-MAP-A-audit-conformite-cartographie-metier.md", report.join("\n"));

const important = [];
important.push("[AMARKHYS-MAP-A] Audit conformité cartographie métier");
important.push(`[ROOT] ${root}`);
important.push(`[DOCTRINE] ${okDoctrine}/${totalDoctrine}`);
important.push(`[MODULES] ${moduleAudits.length}`);
for (const audit of moduleAudits) {
  important.push(
    `[MODULE] ${audit.moduleKey} coverage=${audit.averageCoverage}% statuses=${audit.statusCoverage}% buttons=${audit.buttonCoverage}% workflows=${audit.workflowCoverage}% rules=${audit.ruleCoverage}% priority=${audit.priority}`
  );
}
important.push("[REPORT] docs/audits/AMARKHYS-MAP-A-audit-conformite-cartographie-metier.md");

console.log(important.join("\n"));