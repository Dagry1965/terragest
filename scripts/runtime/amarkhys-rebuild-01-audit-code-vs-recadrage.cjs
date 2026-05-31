const fs = require("fs");
const path = require("path");

const root = process.cwd();

const modules = [
  {
    key: "clientsauto",
    label: "Clients",
    expectedStatuses: ["prospect", "actif", "inactif", "archive"],
    expectedActions: ["Activer client", "Desactiver client", "Reactiver client", "Archiver client", "Ajouter vehicule", "Ouvrir fiche operationnelle"],
    expectedFields: ["nom", "telephone", "email", "typeClient", "statut"],
    forbiddenFields: ["statutPaiement", "statutFacture", "statutIntervention"],
    priority: 1,
  },
  {
    key: "vehicules",
    label: "Vehicules",
    expectedStatuses: ["actif", "entretien", "immobilise", "archive"],
    expectedActions: ["Creer rendez-vous", "Voir fiche vehicule", "Marquer entretien requis", "Immobiliser vehicule", "Remettre en service", "Archiver vehicule"],
    expectedFields: ["clientId", "immatriculation", "marque", "modele", "carburant", "dateMiseEnCirculation", "dateFinGarantie", "statut"],
    forbiddenFields: ["statutPaiement", "statutFacture", "statutIntervention"],
    priority: 2,
  },
  {
    key: "rendezvous",
    label: "RDV",
    expectedStatuses: ["planifie", "confirme", "en_cours", "termine", "annule"],
    expectedActions: ["Confirmer RDV", "Demarrer RDV", "Terminer RDV", "Annuler RDV", "Reporter RDV"],
    expectedFields: ["clientId", "vehiculeId", "typeService", "durationMinutes", "statut", "cancelledAt", "cancelledBy", "cancellationReason"],
    forbiddenFields: ["statutPaiement", "statutFacture", "lignesIntervention"],
    priority: 3,
  },
  {
    key: "interventionsauto",
    label: "Interventions",
    expectedStatuses: ["ouverte", "diagnostic", "en_cours", "terminee", "annulee"],
    forbiddenStatuses: ["facturee"],
    expectedActions: ["Passer en diagnostic", "Demarrer intervention", "Terminer intervention", "Generer facture", "Annuler intervention", "Intervention exceptionnelle sans RDV"],
    expectedFields: ["clientId", "vehiculeId", "dateIntervention", "statut", "typeIntervention", "mecanicienId", "origineIntervention"],
    forbiddenFields: ["statutPaiement", "stockId", "mouvementStockId"],
    priority: 4,
  },
  {
    key: "lignesinterventionauto",
    label: "Lignes intervention",
    expectedStatuses: ["brouillon", "validee", "retiree"],
    expectedActions: ["Valider la ligne", "Retirer la ligne"],
    expectedFields: ["interventionId", "produitId", "quantite", "prixUnitaire", "montantHT", "montantTTC", "statut"],
    forbiddenFields: ["statutPaiement"],
    priority: 5,
  },
  {
    key: "facturesauto",
    label: "Factures",
    expectedStatuses: ["brouillon", "emise", "annulee"],
    expectedActions: ["Valider facture", "Annuler facture", "Voir encaissements", "Ajouter encaissement", "Relancer client"],
    expectedFields: ["clientId", "origineFacture", "montantHT", "montantTTC", "montantPaye", "resteAPayer", "statutFacture"],
    forbiddenFields: ["modePaiement", "referenceTransaction", "statutEnvoiRecu", "datePaiement"],
    expectedMarkers: ["atelier", "boutique", "client_garage", "client_comptoir"],
    priority: 6,
  },
  {
    key: "encaissementsauto",
    label: "Encaissements",
    expectedStatuses: ["en_attente", "valide", "rejete", "annule"],
    expectedActions: ["Valider encaissement", "Rejeter encaissement", "Annuler encaissement", "Envoyer recu"],
    expectedFields: ["factureId", "montantEncaisse", "datePaiement", "modePaiement", "referenceTransaction", "raisonRejetPaiement", "statutEnvoiRecu"],
    forbiddenFields: ["diagnostic", "travaux", "stockId"],
    priority: 7,
  },
  {
    key: "echeancespaiementauto",
    label: "Echeances paiement",
    expectedStatuses: ["a_venir", "en_retard", "partiellement_payee", "payee", "annulee"],
    expectedActions: ["Marquer payee", "Relancer client", "Annuler echeance"],
    expectedFields: ["factureId", "montantPrevu", "montantPaye", "dateEcheance", "statut"],
    forbiddenFields: ["modePaiement"],
    priority: 7,
  },
  {
    key: "commandesstockauto",
    label: "Commandes stock",
    expectedStatuses: ["brouillon", "envoyee", "partiellement_recue", "recue", "annulee"],
    expectedActions: ["Envoyer commande", "Creer reception", "Annuler commande", "Voir receptions"],
    expectedFields: ["fournisseurId", "dateCommande", "montantHT", "montantTVA", "montantTTC", "statut"],
    expectedMarkers: ["partiellement_recue", "recue"],
    priority: 8,
  },
  {
    key: "lignescommandestockauto",
    label: "Lignes commande stock",
    expectedStatuses: ["brouillon", "validee"],
    expectedActions: ["Valider ligne commande", "Annuler ligne commande"],
    expectedFields: ["commandeId", "produitId", "quantite", "prixUnitaireHT", "montantHT", "montantTTC"],
    expectedMarkers: ["prixUnitaireHT", "montantHT", "montantTTC"],
    priority: 8,
  },
  {
    key: "receptionsstockauto",
    label: "Receptions stock",
    expectedStatuses: ["brouillon", "validee"],
    expectedActions: ["Valider reception", "Annuler reception", "Voir mouvement stock lie"],
    expectedFields: ["commandeId", "ligneCommandeId", "produitId", "stockDestinationId", "quantiteRecue", "mouvementStockId"],
    priority: 8,
  },
];

const runtimeFiles = {
  enterpriseForm: "src/components/erp/forms/enterprise/ERPEnterpriseForm.tsx",
  runtimePage: "src/components/erp/runtime/ERPRuntimePage.tsx",
  actionBar: "src/components/erp/runtime/ERPRuntimeActionBar.tsx",
  actionEngine: "src/runtime/actions/RuntimeActionEngine.ts",
  workflowEngine: "src/runtime/workflows/RuntimeWorkflowEngine.ts",
  businessRules: "src/runtime/business-rules/runtimeBusinessRules.ts",
  guards: "src/runtime/guards/processRuntimeBeforeMutationGuards.ts",
  recadrage: "docs/audits/AMARKHYS-RECADRAGE-CONSOLIDE-metier-runtime.md",
};

function full(relativePath) {
  return path.join(root, relativePath);
}

function read(relativePath) {
  const file = full(relativePath);
  return fs.existsSync(file) ? fs.readFileSync(file, "utf8") : "";
}

function exists(relativePath) {
  return fs.existsSync(full(relativePath));
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

function contains(source, marker) {
  return normalize(source).includes(normalize(marker));
}

function scoreList(source, expected) {
  const items = expected || [];
  return items.map((item) => ({ item, found: contains(source, item) }));
}

function scorePercent(results) {
  if (!results.length) return 100;
  return Math.round((results.filter((x) => x.found).length / results.length) * 100);
}

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

const globalSource = Object.values(runtimeFiles).map(read).join("\n");

const doctrineChecks = [
  {
    label: "Document consolidé présent",
    ok: exists(runtimeFiles.recadrage),
  },
  {
    label: "ERPEnterpriseForm ne contient pas RuntimeActionEngine",
    ok: !read(runtimeFiles.enterpriseForm).includes("RuntimeActionEngine"),
  },
  {
    label: "ERPRuntimePage rend ERPRuntimeActionBar",
    ok: read(runtimeFiles.runtimePage).includes("ERPRuntimeActionBar"),
  },
  {
    label: "RuntimeActionEngine existe",
    ok: exists(runtimeFiles.actionEngine),
  },
  {
    label: "RuntimeWorkflowEngine existe",
    ok: exists(runtimeFiles.workflowEngine),
  },
  {
    label: "Business Rules existent",
    ok: exists(runtimeFiles.businessRules),
  },
  {
    label: "Guards runtime existent",
    ok: exists(runtimeFiles.guards),
  },
  {
    label: "statutParcoursAtelier présent dans recadrage",
    ok: read(runtimeFiles.recadrage).includes("statutParcoursAtelier"),
  },
];

const audits = [];

for (const mod of modules) {
  const moduleFile = `src/runtime/modules/generated/${mod.key}/${mod.key}.module.ts`;
  const actionsFile = `src/runtime/modules/generated/${mod.key}/${mod.key}.actions.ts`;
  const source = `${read(moduleFile)}\n${read(actionsFile)}\n${globalSource}`;

  const statusHits = scoreList(source, mod.expectedStatuses);
  const actionHits = scoreList(source, mod.expectedActions);
  const fieldHits = scoreList(source, mod.expectedFields);
  const markerHits = scoreList(source, mod.expectedMarkers || []);
  const forbiddenFieldHits = scoreList(source, mod.forbiddenFields || []);
  const forbiddenStatusHits = scoreList(source, mod.forbiddenStatuses || []);

  const statuses = scorePercent(statusHits);
  const actions = scorePercent(actionHits);
  const fields = scorePercent(fieldHits);
  const markers = scorePercent(markerHits);

  const forbiddenFound = [...forbiddenFieldHits, ...forbiddenStatusHits].filter((x) => x.found);
  const penalty = Math.min(30, forbiddenFound.length * 10);

  const coverage = Math.max(0, Math.round((statuses + actions + fields + markers) / 4) - penalty);

  const priority =
    coverage < 45 || forbiddenFound.length > 0 ? "HIGH" :
    coverage < 75 ? "MEDIUM" :
    "LOW";

  audits.push({
    ...mod,
    moduleFile,
    actionsFile,
    moduleExists: exists(moduleFile),
    actionsExists: exists(actionsFile),
    statusHits,
    actionHits,
    fieldHits,
    markerHits,
    forbiddenFieldHits,
    forbiddenStatusHits,
    forbiddenFound,
    statuses,
    actions,
    fields,
    markers,
    coverage,
    priority,
  });
}

const report = [];

report.push("# AMARKHYS-REBUILD-01 — Audit code vs recadrage consolidé");
report.push("");
report.push("Objectif : mesurer les écarts entre le code actuel et le recadrage métier consolidé AMARKHYS.");
report.push("");
report.push("## Doctrine runtime");
report.push("");
report.push("| Check | Résultat |");
report.push("|---|---:|");
for (const check of doctrineChecks) {
  report.push(`| ${check.label} | ${check.ok ? "OK" : "KO"} |`);
}
report.push("");

report.push("## Synthèse modules");
report.push("");
report.push("| Priorité métier | Module | Fichier | Actions | Statuts | Champs | Marqueurs | Interdits | Couverture | Priorité correction |");
report.push("|---:|---|---:|---:|---:|---:|---:|---:|---:|---:|");

for (const audit of audits) {
  report.push(
    `| ${audit.priority} | ${audit.label} \`${audit.key}\` | ${audit.moduleExists ? "OK" : "KO"} | ${audit.actions}% | ${audit.statuses}% | ${audit.fields}% | ${audit.markers}% | ${audit.forbiddenFound.length} | ${audit.coverage}% | ${audit.priority} |`
  );
}

report.push("");

for (const audit of audits) {
  report.push(`## ${audit.label} — \`${audit.key}\``);
  report.push("");
  report.push(`- Module file : \`${audit.moduleFile}\` → ${audit.moduleExists ? "OK" : "KO"}`);
  report.push(`- Actions file : \`${audit.actionsFile}\` → ${audit.actionsExists ? "OK" : "KO"}`);
  report.push(`- Couverture globale : ${audit.coverage}%`);
  report.push(`- Priorité correction : ${audit.priority}`);
  report.push("");

  report.push("### Statuts attendus");
  report.push("");
  report.push("| Statut | Détecté |");
  report.push("|---|---:|");
  for (const item of audit.statusHits) {
    report.push(`| ${item.item} | ${item.found ? "OK" : "KO"} |`);
  }
  report.push("");

  report.push("### Actions attendues");
  report.push("");
  report.push("| Action | Détectée |");
  report.push("|---|---:|");
  for (const item of audit.actionHits) {
    report.push(`| ${item.item} | ${item.found ? "OK" : "KO"} |`);
  }
  report.push("");

  report.push("### Champs attendus");
  report.push("");
  report.push("| Champ | Détecté |");
  report.push("|---|---:|");
  for (const item of audit.fieldHits) {
    report.push(`| ${item.item} | ${item.found ? "OK" : "KO"} |`);
  }
  report.push("");

  if (audit.markerHits.length) {
    report.push("### Marqueurs spécifiques");
    report.push("");
    report.push("| Marqueur | Détecté |");
    report.push("|---|---:|");
    for (const item of audit.markerHits) {
      report.push(`| ${item.item} | ${item.found ? "OK" : "KO"} |`);
    }
    report.push("");
  }

  if (audit.forbiddenFieldHits.length || audit.forbiddenStatusHits.length) {
    report.push("### Éléments interdits / à retirer");
    report.push("");
    report.push("| Élément | Présent |");
    report.push("|---|---:|");
    for (const item of [...audit.forbiddenFieldHits, ...audit.forbiddenStatusHits]) {
      report.push(`| ${item.item} | ${item.found ? "KO - présent" : "OK - absent"} |`);
    }
    report.push("");
  }

  report.push("### Diagnostic");
  report.push("");
  if (audit.priority === "HIGH") {
    report.push("Correction prioritaire. Le module contient des écarts majeurs ou des éléments interdits.");
  } else if (audit.priority === "MEDIUM") {
    report.push("Correction nécessaire. Le module est partiellement conforme mais incomplet.");
  } else {
    report.push("Conformité correcte. À stabiliser par tests et gouvernance runtime.");
  }
  report.push("");
}

report.push("## Ordre recommandé de correction");
report.push("");
for (const audit of audits.slice().sort((a, b) => {
  const rank = { HIGH: 0, MEDIUM: 1, LOW: 2 };
  if (rank[a.priority] !== rank[b.priority]) return rank[a.priority] - rank[b.priority];
  return a.priority - b.priority;
})) {
  report.push(`- ${audit.priority} — ${audit.label} \`${audit.key}\` — couverture ${audit.coverage}%`);
}
report.push("");

write("docs/audits/AMARKHYS-REBUILD-01-code-vs-recadrage-audit.md", report.join("\n"));

console.log("[AMARKHYS-REBUILD-01] Audit code vs recadrage consolidé");
console.log("[ROOT]", root);
console.log("[DOCTRINE]", `${doctrineChecks.filter((x) => x.ok).length}/${doctrineChecks.length}`);
console.log("[MODULES]", audits.length);
for (const audit of audits) {
  console.log(
    `[MODULE] ${audit.key} coverage=${audit.coverage}% actions=${audit.actions}% statuses=${audit.statuses}% fields=${audit.fields}% forbidden=${audit.forbiddenFound.length} priority=${audit.priority}`
  );
}
console.log("[REPORT] docs/audits/AMARKHYS-REBUILD-01-code-vs-recadrage-audit.md");