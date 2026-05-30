const fs = require("fs");
const path = require("path");

const root = process.cwd();

function full(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function walk(relativeDir, results = []) {
  const absoluteDir = full(relativeDir);

  if (!fs.existsSync(absoluteDir)) {
    return results;
  }

  for (const entry of fs.readdirSync(absoluteDir, { withFileTypes: true })) {
    const absolute = path.join(absoluteDir, entry.name);
    const relative = path.relative(root, absolute).replace(/\\/g, "/");

    if (entry.isDirectory()) {
      if (["node_modules", ".next", "dist", "coverage"].includes(entry.name)) {
        continue;
      }

      walk(relative, results);
      continue;
    }

    if (entry.name.endsWith(".module.ts") || entry.name.endsWith(".actions.ts")) {
      results.push(relative);
    }
  }

  return results;
}

function has(content, terms) {
  return terms.some((term) => content.toLowerCase().includes(term.toLowerCase()));
}

function addRule(rules, category, moduleKey, title, description, source, severity = "HIGH") {
  rules.push({
    category,
    moduleKey,
    title,
    description,
    source,
    severity,
  });
}

const files = [
  ...walk("src/runtime/modules/generated"),
  "src/runtime/business-rules/runtimeBusinessRules.ts",
  "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  "src/runtime/actions/RuntimeActionEngine.ts",
  "src/runtime/workflows/RuntimeWorkflowEngine.ts",
  "src/runtime/navigation/RuntimeChildCreateHrefBuilder.ts",
  "src/components/erp/runtime/ERPRuntimePage.tsx",
  "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  "src/components/erp/runtime/ERPRelatedRecordsPanel.tsx",
  "src/components/erp/billing/InvoicePaymentsHistory.tsx",
].filter((file, index, arr) => file && arr.indexOf(file) === index);

const corpusByFile = new Map();

for (const file of files) {
  corpusByFile.set(file, read(file));
}

const fullCorpus = Array.from(corpusByFile.values()).join("\n");

const rules = [];

/**
 * A. Statuts
 */
addRule(
  rules,
  "A. Statuts",
  "global",
  "Les statuts ne sont pas des commandes libres",
  "Un statut ne doit pas être modifié directement pour déclencher un effet métier. Le changement d’état doit passer par une action runtime contrôlée.",
  "Doctrine ERP / RuntimeActionEngine / RuntimeWorkflowEngine"
);

addRule(
  rules,
  "A. Statuts",
  "rendezvous",
  "Le rendez-vous porte un statut de planification",
  "Le statut du rendez-vous décrit l’état de la planification : demandé, confirmé, annulé, réalisé ou équivalent selon le module. La confirmation peut déclencher une intervention.",
  "rendezvous.module.ts / runtimeBusinessRules.ts"
);

addRule(
  rules,
  "A. Statuts",
  "interventionsauto",
  "L’intervention porte un statut d’exécution",
  "Le statut d’intervention décrit l’avancement atelier. Une intervention terminée peut déclencher une facture.",
  "interventionsauto.module.ts / runtimeBusinessRules.ts"
);

addRule(
  rules,
  "A. Statuts",
  "lignesinterventionauto",
  "La ligne d’intervention doit rester simple",
  "Les états utilisateur attendus sont brouillon et validée. Une ligne brouillon ne compte pas ; une ligne validée compte dans les totaux.",
  "lignesinterventionauto.module.ts / ERPRelatedRecordsPanel.tsx"
);

addRule(
  rules,
  "A. Statuts",
  "facturesauto",
  "La facture distingue statut facture et statut paiement",
  "Le statut facture concerne le cycle commercial. Le statut paiement dépend des encaissements : en attente, partiel, payé ou équivalent.",
  "facturesauto.module.ts"
);

addRule(
  rules,
  "A. Statuts",
  "encaissementsauto",
  "L’encaissement porte un statut de paiement",
  "Un encaissement validé doit être comptabilisé dans le montant payé de la facture.",
  "encaissementsauto.module.ts / InvoicePaymentsHistory.tsx"
);

/**
 * B. Workflows
 */
addRule(
  rules,
  "B. Workflows / transitions",
  "global",
  "Les transitions passent par le runtime",
  "Les boutons de transition doivent être rendus par la barre d’actions runtime, jamais directement par le formulaire.",
  "ERPRuntimePage.tsx / ERPEnterpriseForm.tsx"
);

addRule(
  rules,
  "B. Workflows / transitions",
  "rendezvous",
  "RDV confirmé → intervention",
  "Quand un rendez-vous passe à confirmé, le runtime peut créer automatiquement une intervention liée, si elle n’existe pas déjà.",
  "runtimeBusinessRules.ts"
);

addRule(
  rules,
  "B. Workflows / transitions",
  "interventionsauto",
  "Intervention terminée → facture",
  "Quand une intervention est terminée, le runtime peut créer automatiquement une facture liée.",
  "runtimeBusinessRules.ts"
);

addRule(
  rules,
  "B. Workflows / transitions",
  "facturesauto",
  "Encaissement → statut paiement facture",
  "Quand un encaissement est créé ou validé, la facture doit recalculer montant payé, reste à payer et statut paiement.",
  "InvoicePaymentsHistory.tsx / runtimeBusinessRules.ts"
);

addRule(
  rules,
  "B. Workflows / transitions",
  "lignesinterventionauto",
  "Ligne validée → comptabilisation",
  "Une ligne validée entre dans les totaux de l’intervention et peut impacter le stock si elle concerne une pièce.",
  "ERPRelatedRecordsPanel.tsx / line-items runtime"
);

/**
 * C. Parent / enfant
 */
addRule(
  rules,
  "C. Parent → enfant",
  "global",
  "Un enfant ERP ne se crée pas seul",
  "Tout module enfant avec contexte parent obligatoire doit être créé avec parentModuleKey, parentRecordId et parentForeignKey.",
  "processRuntimeBeforeMutationGuards.ts / RuntimeChildCreateHrefBuilder.ts"
);

addRule(
  rules,
  "C. Parent → enfant",
  "encaissementsauto",
  "Facture → encaissement",
  "Un encaissement doit être créé depuis sa facture parent avec factureId, parentModuleKey=facturesauto, parentRecordId et parentForeignKey=factureId.",
  "RuntimeChildCreateHrefBuilder.ts / facturesauto.module.ts"
);

addRule(
  rules,
  "C. Parent → enfant",
  "lignesinterventionauto",
  "Intervention → ligne d’intervention",
  "Une ligne d’intervention doit être créée depuis une intervention parent avec interventionId comme clé étrangère.",
  "lignesinterventionauto.module.ts / processRuntimeBeforeMutationGuards.ts"
);

addRule(
  rules,
  "C. Parent → enfant",
  "receptionsstockauto",
  "Commande / ligne commande → réception",
  "Une réception doit être liée à une commande et à une ligne de commande pour éviter les réceptions incohérentes.",
  "receptionsstockauto.module.ts"
);

addRule(
  rules,
  "C. Parent → enfant",
  "vehicules",
  "Client → véhicule",
  "Un véhicule doit être rattaché à son client/propriétaire. Depuis la fiche client, le formulaire véhicule doit recevoir le client prérempli.",
  "clientsauto hub / vehicules.module.ts"
);

/**
 * D. Créations automatiques
 */
addRule(
  rules,
  "D. Créations automatiques",
  "rendezvous",
  "Créer une intervention depuis un RDV confirmé",
  "Le runtime doit empêcher la double création : un RDV déjà consommé ne doit pas créer une deuxième intervention.",
  "runtimeBusinessRules.ts"
);

addRule(
  rules,
  "D. Créations automatiques",
  "interventionsauto",
  "Créer une facture depuis une intervention terminée",
  "La facture générée doit reprendre le client, le véhicule, l’intervention et les montants calculés.",
  "runtimeBusinessRules.ts"
);

addRule(
  rules,
  "D. Créations automatiques",
  "receptionsstockauto",
  "Créer un mouvement stock depuis une réception validée",
  "Une réception validée doit créer un mouvement de stock entrant et mettre à jour le stock.",
  "RuntimeStockMovementService / FirestoreRuntimeMutation"
);

/**
 * E. Verrouillage
 */
addRule(
  rules,
  "E. Verrouillage / héritage",
  "global",
  "Les champs hérités du parent sont verrouillés",
  "Un enfant ne doit pas modifier les champs de son parent ou grand-parent. Les champs hérités sont affichés comme contexte mais verrouillés.",
  "composition.lockFields / processRuntimeBeforeMutationGuards.ts"
);

addRule(
  rules,
  "E. Verrouillage / héritage",
  "encaissementsauto",
  "factureId, clientId, vehiculeId verrouillés",
  "Lors de la création d’un paiement depuis une facture, factureId, clientId et vehiculeId doivent être préremplis et verrouillés.",
  "RuntimeChildCreateHrefBuilder.ts"
);

addRule(
  rules,
  "E. Verrouillage / héritage",
  "facturesauto",
  "Montants facture verrouillés",
  "Les montants facture doivent être calculés depuis les lignes/interventions et les encaissements, pas édités librement.",
  "facturesauto.module.ts / runtimeBusinessRules.ts"
);

/**
 * F. Finance
 */
addRule(
  rules,
  "F. Finance",
  "facturesauto",
  "Montant payé et reste à payer calculés",
  "Le montant payé est la somme des encaissements valides. Le reste à payer est Total TTC - montant payé.",
  "InvoicePaymentsHistory.tsx"
);

addRule(
  rules,
  "F. Finance",
  "encaissementsauto",
  "Un paiement doit recalculer la facture",
  "Créer ou valider un encaissement doit mettre à jour la facture liée.",
  "runtimeBusinessRules.ts / InvoicePaymentsHistory.tsx"
);

addRule(
  rules,
  "F. Finance",
  "facturesauto",
  "Un seul bouton principal de paiement",
  "L’action de création de paiement ne doit pas être dupliquée. Le point officiel est l’historique des encaissements ou une action runtime unique.",
  "ERPRuntimeDetails.tsx / InvoicePaymentsHistory.tsx"
);

/**
 * G. Stock
 */
addRule(
  rules,
  "G. Stock",
  "stocksauto",
  "Le stock est un état résultant",
  "Le stock ne doit pas être modifié directement sans mouvement de stock.",
  "RuntimeStockMovementService"
);

addRule(
  rules,
  "G. Stock",
  "mouvementsstockauto",
  "Le mouvement stock est la preuve",
  "Chaque entrée, sortie, correction ou réintégration doit créer un mouvement stock avec source métier et quantités avant/après.",
  "RuntimeStockMovementService"
);

addRule(
  rules,
  "G. Stock",
  "lignesinterventionauto",
  "Une pièce validée peut sortir du stock",
  "Une ligne validée de type pièce peut déclencher une sortie stock selon produit/stock/quantité.",
  "line-items runtime / stock movement runtime"
);

addRule(
  rules,
  "G. Stock",
  "receptionsstockauto",
  "Réception validée → entrée stock",
  "La validation d’une réception doit créer une entrée stock et empêcher le double traitement.",
  "RuntimeStockMovementService"
);

/**
 * H. Planning
 */
addRule(
  rules,
  "H. Planning",
  "rendezvous",
  "Un créneau occupé ne doit pas rester disponible",
  "Le moteur planning doit exclure ou désactiver les créneaux déjà occupés.",
  "RuntimeSchedulingEngine"
);

addRule(
  rules,
  "H. Planning",
  "rendezvous",
  "Les créneaux viennent du moteur runtime",
  "Les horaires, buffers, pauses et types de service doivent être paramétrés par le moteur planning, pas localement dans l’UI.",
  "RuntimeSchedulingSettingsEngine / RuntimeSchedulingEngine"
);

addRule(
  rules,
  "H. Planning",
  "rendezvous",
  "Durée service conservée",
  "Un RDV public ou interne doit conserver typeService et durationMinutes.",
  "createPublicAppointment / rendezvous module"
);

/**
 * I. Boutons
 */
addRule(
  rules,
  "I. Boutons / actions UI",
  "global",
  "Les boutons workflow ne doivent pas être dans les formulaires",
  "Les formulaires ne doivent pas rendre workflowActions. Les actions doivent apparaître dans une barre runtime dédiée.",
  "ERPEnterpriseForm.tsx / ERPRuntimePage.tsx"
);

addRule(
  rules,
  "I. Boutons / actions UI",
  "global",
  "Une action métier = un bouton principal",
  "Il ne doit pas y avoir deux boutons concurrents pour la même action métier, par exemple deux boutons pour enregistrer un paiement.",
  "ERPRuntimeDetails.tsx / InvoicePaymentsHistory.tsx"
);

addRule(
  rules,
  "I. Boutons / actions UI",
  "global",
  "Les boutons enfant utilisent le builder runtime",
  "Tout bouton qui crée un enfant doit utiliser RuntimeChildCreateHrefBuilder ou la composition runtime.",
  "RuntimeChildCreateHrefBuilder.ts"
);

/**
 * J. Audit
 */
addRule(
  rules,
  "J. Audit / traçabilité",
  "global",
  "Les effets métier doivent être auditables",
  "Création automatique, transition, retrait de ligne, mouvement stock et paiement doivent laisser une trace exploitable.",
  "runtime events / audit / business rules"
);

addRule(
  rules,
  "J. Audit / traçabilité",
  "lignesinterventionauto",
  "Retirer une ligne n’est pas supprimer",
  "Une ligne retirée doit conserver removedAt, removedBy, removedReason et ne plus compter dans les totaux.",
  "RuntimeLineRemovalService"
);

addRule(
  rules,
  "J. Audit / traçabilité",
  "mouvementsstockauto",
  "Le mouvement stock prouve la variation",
  "Les quantités avant/après et la source métier doivent être conservées.",
  "RuntimeStockMovementService"
);

/**
 * Détection complémentaire depuis le code.
 */
for (const [file, content] of corpusByFile.entries()) {
  if (!content) continue;

  if (file.includes("ERPEnterpriseForm") && has(content, ["workflowActions"])) {
    addRule(
      rules,
      "I. Boutons / actions UI",
      "global",
      "Risque actuel : formulaire porte encore workflowActions",
      "Le code contient encore workflowActions dans ERPEnterpriseForm. À traiter dans une passe suivante : sortir les boutons de workflow du formulaire.",
      file,
      "HIGH"
    );
  }

  if (file.includes("RuntimeChildCreateHrefBuilder") && has(content, ["parentModuleKey", "parentRecordId", "parentForeignKey"])) {
    addRule(
      rules,
      "C. Parent → enfant",
      "global",
      "Builder parent/enfant disponible",
      "Le builder central est disponible pour construire des liens enfant avec contexte parent complet.",
      file,
      "HIGH"
    );
  }
}

const categories = Array.from(new Set(rules.map((rule) => rule.category)));

const report = [];

report.push("# Q2-OP-I3 — Règles métier classées et énumérées");
report.push("");
report.push("Objectif : classer les règles ERP par famille, module concerné, déclencheur et effet attendu.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- Règles recensées : ${rules.length}`);
report.push(`- Catégories : ${categories.length}`);
report.push("");

let globalIndex = 1;

for (const category of categories) {
  const categoryRules = rules.filter((rule) => rule.category === category);

  report.push(`## ${category}`);
  report.push("");

  let localIndex = 1;

  for (const rule of categoryRules) {
    const ruleId = `${category.split(".")[0]}-${String(localIndex).padStart(2, "0")}`;

    report.push(`### ${ruleId} — ${rule.title}`);
    report.push("");
    report.push(`- Module : \`${rule.moduleKey}\``);
    report.push(`- Sévérité : ${rule.severity}`);
    report.push(`- Source : ${rule.source}`);
    report.push(`- Règle : ${rule.description}`);
    report.push("");

    localIndex++;
    globalIndex++;
  }
}

report.push("## Tableau de synthèse");
report.push("");
report.push("| ID | Catégorie | Module | Règle | Sévérité | Source |");
report.push("|---|---|---|---|---|---|");

for (const category of categories) {
  const categoryRules = rules.filter((rule) => rule.category === category);
  let localIndex = 1;

  for (const rule of categoryRules) {
    const ruleId = `${category.split(".")[0]}-${String(localIndex).padStart(2, "0")}`;
    report.push(
      `| ${ruleId} | ${category.replace(/\|/g, "/")} | ${rule.moduleKey} | ${rule.title.replace(/\|/g, "/")} | ${rule.severity} | ${rule.source.replace(/\|/g, "/")} |`
    );
    localIndex++;
  }
}

report.push("");
report.push("## Prochaine passe recommandée");
report.push("");
report.push("1. Transformer ce rapport en règles runtime vérifiables.");
report.push("2. Ajouter des audits bloquants :");
report.push("   - aucun bouton workflow dans ERPEnterpriseForm ;");
report.push("   - aucun lien enfant manuel sans parent context ;");
report.push("   - aucune modification stock sans mouvement ;");
report.push("   - aucune ligne brouillon comptée dans les totaux ;");
report.push("   - aucun RDV confirmé ne crée deux interventions.");
report.push("3. Centraliser l’affichage des actions dans une `ERPRuntimeActionBar`.");

const reportPath = full("docs/audits/Q2-OP-I3-business-rules-classified.md");
fs.mkdirSync(path.dirname(reportPath), { recursive: true });
fs.writeFileSync(reportPath, report.join("\n"), "utf8");

console.log("[Q2-OP-I3] Business rules classified");
console.log("[ROOT]", root);
console.log("[RULES]", rules.length);
console.log("[CATEGORIES]", categories.length);
console.log("[REPORT]", path.relative(root, reportPath));

for (const category of categories) {
  const count = rules.filter((rule) => rule.category === category).length;
  console.log(`- ${category}: ${count}`);
}