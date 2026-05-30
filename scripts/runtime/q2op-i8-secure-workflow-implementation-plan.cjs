const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

const plan = [
  {
    phase: "Phase 1 — Socle runtime UI",
    priority: "P0",
    modules: ["global"],
    goal: "Sortir définitivement les boutons workflow des formulaires et créer un point d’affichage unique.",
    actions: [
      "Créer ERPRuntimeActionBar.",
      "Afficher les actions runtime autour du formulaire/détail.",
      "Retirer workflowActions de ERPEnterpriseForm.",
      "Ajouter audit bloquant : aucun bouton workflow dans ERPEnterpriseForm.",
    ],
    risk: "Faible si on ne change pas encore les règles métier.",
  },
  {
    phase: "Phase 2 — Workflows atelier prioritaires",
    priority: "P1",
    modules: ["rendezvous", "interventionsauto", "lignesinterventionauto"],
    goal: "Formaliser les transitions métier qui pilotent le cycle atelier.",
    actions: [
      "rendezvous : planifie → confirme → en_cours → termine / annule.",
      "rendezvous : confirmation RDV déclenche intervention unique si applicable.",
      "interventionsauto : ouverte → diagnostic → en_cours → terminee → facturee / annulee.",
      "interventionsauto : terminee/facturee déclenche ou sécurise la facture.",
      "lignesinterventionauto : brouillon → validee ; retirer ligne via action runtimeOnly.",
    ],
    calculatedStates: [
      "rendezvous.termine peut être système/consommation.",
      "interventionsauto.facturee doit venir de la génération facture.",
      "lignesinterventionauto.retiree est technique/audit, pas un simple statut utilisateur libre.",
    ],
    risk: "Moyen : impact direct sur RDV → intervention → facture.",
  },
  {
    phase: "Phase 3 — Finance",
    priority: "P1",
    modules: ["facturesauto", "encaissementsauto", "echeancespaiementauto"],
    goal: "Sécuriser les paiements, les statuts financiers et les actions de facture.",
    actions: [
      "facturesauto : statutFacture peut avoir workflow commercial : brouillon → emise → annulee.",
      "facturesauto : statutPaiement ne doit pas être actionné manuellement.",
      "encaissementsauto : en_attente → valide / rejete / annule.",
      "encaissementsauto : validation met à jour facture parent.",
      "echeancespaiementauto : a_venir/en_retard/payee/annulee avec relance auditée.",
    ],
    calculatedStates: [
      "facturesauto.statutPaiement = calculé depuis encaissements.",
      "facturesauto.montantPaye = somme des encaissements valides.",
      "facturesauto.resteAPayer = montantTTC - montantPaye.",
      "echeancespaiementauto.en_retard peut être calculé par job runtime.",
    ],
    risk: "Moyen/élevé : impact financier et cohérence encaissements.",
  },
  {
    phase: "Phase 4 — Stock / achats",
    priority: "P2",
    modules: [
      "produitsauto",
      "stocksauto",
      "mouvementsstockauto",
      "fournisseursauto",
      "commandesstockauto",
      "lignescommandestockauto",
      "receptionsstockauto"
    ],
    goal: "Formaliser les workflows achats et stock sans casser le principe mouvement = preuve.",
    actions: [
      "produitsauto : actif / rupture / inactif / archive.",
      "stocksauto : statuts calculés depuis quantité et seuils.",
      "mouvementsstockauto : brouillon → valide ; annulation par mouvement inverse.",
      "commandesstockauto : brouillon → envoyee / annulee.",
      "lignescommandestockauto : brouillon → validee.",
      "receptionsstockauto : brouillon → validee déclenche mouvement stock entrée.",
    ],
    calculatedStates: [
      "stocksauto.stock_faible, rupture, disponible doivent être calculés.",
      "commandesstockauto.partiellement_recue et recue doivent être calculés depuis réceptions.",
      "receptionsstockauto.validee ne doit pas être rejouable si mouvementStockId existe.",
    ],
    risk: "Élevé si on touche au stock sans audit : toujours passer par mouvements.",
  },
  {
    phase: "Phase 5 — Référentiels secondaires",
    priority: "P3",
    modules: ["clientsauto", "vehicules", "fournisseursauto", "produitsauto"],
    goal: "Mettre des workflows légers uniquement si utile.",
    actions: [
      "clientsauto : prospect → actif → inactif / archive.",
      "vehicules : actif → entretien → immobilise → actif / archive.",
      "fournisseursauto : actif → suspendu → archive.",
      "produitsauto : actif → rupture/inactif/archive.",
    ],
    calculatedStates: [
      "vehicules.entretien peut être manuel ou calculé selon rappels futurs.",
      "produitsauto.rupture peut être calculé depuis stock.",
    ],
    risk: "Faible à moyen : référentiels, mais attention aux effets de filtre dans l’UI.",
  },
];

const report = [];

report.push("# Q2-OP-I8 — Plan d’implémentation sécurisé des workflows runtime");
report.push("");
report.push("Objectif : transformer les workflows cibles Q2-OP-I6 et les écarts Q2-OP-I7 en plan d’implémentation progressif, sans injecter brutalement des workflows dans tous les modules.");
report.push("");
report.push("## Diagnostic issu de Q2-OP-I7");
report.push("");
report.push("- Les transitions réelles déclarées sont à `0` sur les modules prioritaires.");
report.push("- Les statuts existent déjà pour la plupart des modules métier.");
report.push("- Certaines actions existent déjà dans les fichiers `.actions.ts`, mais ne sont pas encore structurées comme transitions runtime complètes.");
report.push("- Plusieurs états doivent rester calculés et ne pas devenir des boutons utilisateur.");
report.push("");
report.push("## Doctrine de décision");
report.push("");
report.push("- Un statut visible n’est pas forcément une action utilisateur.");
report.push("- Un état calculé ne doit pas devenir un bouton manuel.");
report.push("- Une transition utilisateur doit passer par RuntimeActionEngine / RuntimeWorkflowEngine.");
report.push("- Les effets métier passent par Business Rules / guards / services runtime.");
report.push("- Les boutons workflow doivent apparaître dans ERPRuntimeActionBar, jamais dans ERPEnterpriseForm.");
report.push("");

for (const item of plan) {
  report.push(`## ${item.phase}`);
  report.push("");
  report.push(`- Priorité : ${item.priority}`);
  report.push(`- Modules : ${item.modules.map((m) => "`" + m + "`").join(", ")}`);
  report.push(`- Objectif : ${item.goal}`);
  report.push(`- Risque : ${item.risk}`);
  report.push("");
  report.push("### Actions à faire");
  report.push("");
  for (const action of item.actions) {
    report.push(`- ${action}`);
  }
  if (item.calculatedStates && item.calculatedStates.length > 0) {
    report.push("");
    report.push("### États calculés à ne pas transformer en bouton manuel");
    report.push("");
    for (const state of item.calculatedStates) {
      report.push(`- ${state}`);
    }
  }
  report.push("");
}

report.push("## Ordre d’exécution recommandé");
report.push("");
report.push("1. Q2-OP-I9 — Audit formulaire : confirmer tous les points où ERPEnterpriseForm reçoit/rend workflowActions.");
report.push("2. Q2-OP-I10 — Créer ERPRuntimeActionBar générique sans changer les workflows.");
report.push("3. Q2-OP-I11 — Déplacer l’affichage des boutons workflow/action hors formulaire.");
report.push("4. Q2-OP-I12 — Ajouter un audit bloquant : aucun bouton workflow dans ERPEnterpriseForm.");
report.push("5. Q2-OP-I13 — Déclarer les workflows runtime seulement pour rendezvous/interventions/lignesintervention.");
report.push("6. Q2-OP-I14 — Brancher les effets RDV → intervention et intervention → facture via règles déjà existantes.");
report.push("7. Q2-OP-I15 — Finance : sécuriser facture/encaissement/statutPaiement calculé.");
report.push("8. Q2-OP-I16 — Stock : sécuriser réception/mouvement/stock calculé.");
report.push("");
report.push("## Décisions à valider avant codage workflow");
report.push("");
report.push("- `facturesauto.statutPaiement` doit rester calculé depuis encaissements.");
report.push("- `stocksauto.statut` doit être calculé depuis quantités/seuils.");
report.push("- `commandesstockauto.partiellement_recue` et `recue` doivent être calculés depuis réceptions.");
report.push("- `lignesinterventionauto.retiree` doit rester une trace audit/retrait, pas un bouton statut libre.");
report.push("- Le bouton paiement doit être unique et passer par RuntimeChildCreateHrefBuilder.");
report.push("- Les formulaires ne doivent plus porter workflowActions.");
report.push("");
report.push("## Résultat cible");
report.push("");
report.push("ERPRuntimePage");
report.push("→ ERPRuntimeActionBar");
report.push("→ RuntimeActionEngine");
report.push("→ RuntimeWorkflowEngine");
report.push("→ Business Rules / guards / services runtime");
report.push("");
report.push("ERPEnterpriseForm");
report.push("→ champs uniquement");
report.push("→ aucun bouton workflow");
report.push("→ aucun effet métier direct");

write("docs/audits/Q2-OP-I8-secure-workflow-implementation-plan.md", report.join("\n"));

console.log("[Q2-OP-I8] Secure workflow implementation plan generated");
console.log("[ROOT]", root);
console.log("[PHASES]", plan.length);
console.log("[REPORT] docs/audits/Q2-OP-I8-secure-workflow-implementation-plan.md");
console.log("[NEXT] Q2-OP-I9 — audit workflow buttons in forms");