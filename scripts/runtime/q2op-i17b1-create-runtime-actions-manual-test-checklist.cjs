const fs = require("fs");
const path = require("path");

const root = process.cwd();

const modules = [
  {
    key: "rendezvous",
    label: "Rendez-vous",
    expectedActions: ["reporter-rdv"],
    routes: ["/rendezvous", "/rendezvous/[id]", "/rendezvous/[id]/edit"],
    manualChecks: [
      "Ouvrir une fiche rendez-vous existante.",
      "Vérifier que la barre Actions métier est visible.",
      "Vérifier que l'action Reporter RDV est visible si disponible.",
      "Vérifier qu'il n'existe pas un deuxième bloc workflow dans le formulaire.",
      "Ne pas exécuter l'action si aucun scénario de report n'est prêt.",
    ],
  },
  {
    key: "interventionsauto",
    label: "Interventions",
    expectedActions: ["demarrer-intervention"],
    routes: ["/interventionsauto", "/interventionsauto/[id]", "/interventionsauto/[id]/edit"],
    manualChecks: [
      "Ouvrir une fiche intervention existante.",
      "Vérifier que la barre Actions métier est visible.",
      "Vérifier que l'action Demarrer intervention est visible si disponible.",
      "Vérifier qu'il n'y a pas de doublon d'action dans le formulaire.",
      "Vérifier que les boutons Enregistrer/Annuler/Supprimer restent dans le formulaire uniquement.",
    ],
  },
  {
    key: "facturesauto",
    label: "Factures",
    expectedActions: ["envoyer-facture", "annuler-facture"],
    routes: ["/facturesauto", "/facturesauto/[id]", "/facturesauto/[id]/edit"],
    manualChecks: [
      "Ouvrir une fiche facture existante.",
      "Vérifier que les actions Envoyer facture et Annuler facture sont disponibles selon l'état.",
      "Vérifier que l'historique des paiements reste affiché dans la zone facture, pas dans la barre d'actions.",
      "Vérifier qu'il n'y a pas de doublon de bouton paiement/action métier.",
    ],
  },
  {
    key: "commandesstockauto",
    label: "Commandes stock",
    expectedActions: ["envoyer-commande", "annuler-commande"],
    routes: ["/commandesstockauto", "/commandesstockauto/[id]", "/commandesstockauto/[id]/edit"],
    manualChecks: [
      "Ouvrir une fiche commande stock existante.",
      "Vérifier que Envoyer commande et Annuler commande apparaissent dans Actions métier si disponibles.",
      "Vérifier qu'il n'y a pas d'action stock locale dans le formulaire.",
      "Ne pas confondre commande avec réception : la commande ne doit pas modifier le stock directement.",
    ],
  },
  {
    key: "receptionsstockauto",
    label: "Réceptions stock",
    expectedActions: ["valider-reception"],
    routes: ["/receptionsstockauto", "/receptionsstockauto/[id]", "/receptionsstockauto/[id]/edit"],
    manualChecks: [
      "Ouvrir une fiche réception stock existante.",
      "Vérifier que Valider reception apparaît dans Actions métier si la réception est en état compatible.",
      "Vérifier qu'il n'y a pas de bouton local de validation dans le formulaire.",
      "Ne déclencher l'action que sur une réception de test, car elle peut créer un mouvement stock.",
    ],
  },
];

const report = [];

report.push("# Q2-OP-I17-B1 — Checklist test manuel actions runtime UI");
report.push("");
report.push("Base stable : `d499fc41 test(runtime): audit runtime actions UI readiness`.");
report.push("");
report.push("Objectif : vérifier manuellement les actions métier rendues par `ERPRuntimeActionBar` sur des fiches réelles.");
report.push("");
report.push("## Règles de test");
report.push("");
report.push("- Ne pas modifier le code pendant cette passe.");
report.push("- Tester d'abord l'affichage, puis seulement ensuite l'exécution.");
report.push("- Ne pas déclencher une action métier destructive sur des données importantes.");
report.push("- Utiliser de préférence des fiches de test/démo.");
report.push("- Vérifier l'absence de doublons : les workflows ne doivent plus apparaître dans `ERPEnterpriseForm`.");
report.push("");
report.push("## Modules à tester");
report.push("");

for (const module of modules) {
  report.push(`### ${module.label} — \`${module.key}\``);
  report.push("");
  report.push("Routes :");
  report.push("");
  for (const route of module.routes) {
    report.push(`- \`${route}\``);
  }
  report.push("");
  report.push("Actions attendues :");
  report.push("");
  for (const action of module.expectedActions) {
    report.push(`- \`${action}\``);
  }
  report.push("");
  report.push("Checklist :");
  report.push("");
  for (const check of module.manualChecks) {
    report.push(`- [ ] ${check}`);
  }
  report.push("");
}

report.push("## Résultat attendu global");
report.push("");
report.push("- [ ] `ERPRuntimeActionBar` visible sur les fiches détail/edit quand des actions sont disponibles.");
report.push("- [ ] Aucun rendu legacy `runtimeActions.map` visible.");
report.push("- [ ] Aucun bloc workflow dans le formulaire.");
report.push("- [ ] Les boutons formulaire restent limités aux actions de formulaire : Enregistrer, Annuler, Supprimer si applicable.");
report.push("- [ ] Les actions métier sont centralisées dans la barre Actions métier.");
report.push("- [ ] Aucun crash console navigateur lors de l'affichage.");
report.push("- [ ] Aucun refresh incohérent après action exécutée.");
report.push("");
report.push("## Routes localhost rapides");
report.push("");
for (const module of modules) {
  report.push(`- http://localhost:3000/${module.key}`);
}
report.push("");

const outPath = path.join(root, "docs/audits/Q2-OP-I17-B1-runtime-actions-manual-test-checklist.md");
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, report.join("\n"), "utf8");

console.log("[WRITTEN] docs/audits/Q2-OP-I17-B1-runtime-actions-manual-test-checklist.md");
console.log("[Q2-OP-I17-B1] Runtime actions manual UI checklist");
console.log("[IMPORTANT]");
for (const module of modules) {
  console.log(`[TEST] ${module.key} actions=${module.expectedActions.join(", ")} routes=${module.routes.join(", ")}`);
}