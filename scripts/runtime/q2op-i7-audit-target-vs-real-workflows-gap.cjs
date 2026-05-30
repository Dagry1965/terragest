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

function write(relativePath, content) {
  const file = full(relativePath);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, content, "utf8");
  console.log("[WRITTEN]", relativePath);
}

function extractArrayBlock(content, key) {
  const index = content.indexOf(key);
  if (index === -1) return "";

  const start = content.indexOf("[", index);
  if (start === -1) return "";

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let i = start; i < content.length; i++) {
    const c = content[i];

    if (escaped) {
      escaped = false;
      continue;
    }

    if (c === "\\") {
      escaped = true;
      continue;
    }

    if (inString) {
      if (c === quote) {
        inString = false;
        quote = "";
      }
      continue;
    }

    if (c === '"' || c === "'" || c === "`") {
      inString = true;
      quote = c;
      continue;
    }

    if (c === "[") depth++;
    if (c === "]") depth--;

    if (depth === 0) {
      return content.slice(start, i + 1);
    }
  }

  return "";
}

function extractString(content, regex, fallback = "") {
  const match = content.match(regex);
  return match ? match[1] : fallback;
}

function extractRealWorkflows(moduleContent) {
  const workflowsBlock = extractArrayBlock(moduleContent, "workflows");

  const states = new Set();
  const transitions = [];

  if (!workflowsBlock) {
    return { states, transitions, workflowBlock: "" };
  }

  const stateRegex = /key:\s*["']([^"']+)["']/g;
  let stateMatch;

  const statesBlock = extractArrayBlock(workflowsBlock, "states");
  while ((stateMatch = stateRegex.exec(statesBlock))) {
    states.add(stateMatch[1]);
  }

  const transitionRegex =
    /from:\s*["']([^"']+)["'][\s\S]*?to:\s*["']([^"']+)["'][\s\S]*?action:\s*["']([^"']+)["']/g;

  let transitionMatch;

  while ((transitionMatch = transitionRegex.exec(workflowsBlock))) {
    transitions.push({
      from: transitionMatch[1],
      to: transitionMatch[2],
      action: transitionMatch[3],
    });
  }

  return { states, transitions, workflowBlock: workflowsBlock };
}

function extractRealStatusOptions(moduleContent, statusField) {
  const values = new Set();

  const fields = String(statusField)
    .split("/")
    .map((item) => item.trim())
    .filter(Boolean);

  for (const field of fields) {
    const indexA = moduleContent.indexOf(`key: "${field}"`);
    const indexB = moduleContent.indexOf(`key: '${field}'`);
    const index = indexA !== -1 ? indexA : indexB;

    if (index === -1) {
      continue;
    }

    const chunk = moduleContent.slice(index, index + 2500);
    const optionsBlock = extractArrayBlock(chunk, "options");
    const optionRegex = /value:\s*["']([^"']+)["']/g;
    let match;

    while ((match = optionRegex.exec(optionsBlock))) {
      values.add(match[1]);
    }
  }

  return values;
}

function extractRealActions(moduleFile) {
  const dir = path.dirname(moduleFile);
  const actionsFile = path
    .join(dir, path.basename(moduleFile).replace(".module.ts", ".actions.ts"))
    .replace(/\\/g, "/");

  const content = read(actionsFile);
  const actions = new Set();

  if (!content) {
    return { actions, actionsFile: "" };
  }

  const actionRegex = /label:\s*["']([^"']+)["']/g;
  let match;

  while ((match = actionRegex.exec(content))) {
    const label = match[1];

    if (
      /confirmer|démarrer|demarrer|terminer|annuler|facturer|valider|rejeter|relancer|retirer|envoyer|marquer|payer|paiement|générer|generer|archiver|activer|désactiver|desactiver|réactiver|reactiver|suspendre|immobiliser|réapprovisionner|reapprovisionner|corriger/i.test(
        label
      )
    ) {
      actions.add(label);
    }
  }

  return {
    actions,
    actionsFile: fs.existsSync(full(actionsFile)) ? actionsFile : "",
  };
}

function normalize(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

function actionMatches(expected, realActions) {
  const expectedNorm = normalize(expected);

  for (const real of realActions) {
    const realNorm = normalize(real);

    if (realNorm === expectedNorm) {
      return true;
    }

    if (realNorm.includes(expectedNorm) || expectedNorm.includes(realNorm)) {
      return true;
    }

    const expectedWords = expectedNorm.split(" ").filter((x) => x.length >= 4);
    const realWords = realNorm.split(" ");

    if (expectedWords.length > 0 && expectedWords.every((word) => realWords.includes(word))) {
      return true;
    }
  }

  return false;
}

const targetWorkflows = [
  {
    moduleKey: "clientsauto",
    statusField: "statut",
    states: ["prospect", "actif", "inactif", "archive"],
    transitions: [
      ["prospect", "actif", "Activer client"],
      ["actif", "inactif", "Désactiver client"],
      ["inactif", "actif", "Réactiver client"],
      ["actif|inactif|prospect", "archive", "Archiver client"],
    ],
    calculatedStates: [],
  },
  {
    moduleKey: "vehicules",
    statusField: "statut",
    states: ["actif", "entretien", "immobilise", "archive"],
    transitions: [
      ["actif", "entretien", "Marquer entretien requis"],
      ["entretien", "immobilise", "Immobiliser véhicule"],
      ["immobilise|entretien", "actif", "Remettre en service"],
      ["actif|entretien|immobilise", "archive", "Archiver véhicule"],
    ],
    calculatedStates: [],
  },
  {
    moduleKey: "rendezvous",
    statusField: "statut",
    states: ["planifie", "confirme", "en_cours", "termine", "annule"],
    transitions: [
      ["planifie", "confirme", "Confirmer RDV"],
      ["confirme", "en_cours", "Démarrer RDV"],
      ["en_cours", "termine", "Terminer RDV"],
      ["planifie|confirme|en_cours", "annule", "Annuler RDV"],
      ["planifie|confirme", "planifie", "Reporter RDV"],
    ],
    calculatedStates: ["termine"],
  },
  {
    moduleKey: "interventionsauto",
    statusField: "statut",
    states: ["ouverte", "diagnostic", "en_cours", "terminee", "facturee", "annulee"],
    transitions: [
      ["ouverte", "diagnostic", "Passer en diagnostic"],
      ["diagnostic|ouverte", "en_cours", "Démarrer intervention"],
      ["en_cours|diagnostic", "terminee", "Terminer intervention"],
      ["terminee", "facturee", "Générer facture"],
      ["ouverte|diagnostic|en_cours", "annulee", "Annuler intervention"],
    ],
    calculatedStates: ["facturee"],
  },
  {
    moduleKey: "lignesinterventionauto",
    statusField: "statut",
    states: ["brouillon", "validee", "retiree"],
    transitions: [
      ["brouillon", "validee", "Valider la ligne"],
      ["brouillon|validee", "retiree", "Retirer la ligne"],
    ],
    calculatedStates: ["retiree"],
  },
  {
    moduleKey: "facturesauto",
    statusField: "statutFacture / statutPaiement / statutEnvoiFacture",
    states: ["brouillon", "emise", "annulee", "en_attente", "partiel", "paye", "non_envoyee", "envoyee", "echec"],
    transitions: [
      ["brouillon", "emise", "Valider facture"],
      ["emise", "annulee", "Annuler facture"],
      ["non_envoyee|echec", "envoyee", "Marquer comme envoyée"],
      ["en_attente|partiel", "partiel|paye", "Ajouter paiement"],
    ],
    calculatedStates: ["en_attente", "partiel", "paye"],
  },
  {
    moduleKey: "encaissementsauto",
    statusField: "statut / statutEnvoiRecu",
    states: ["en_attente", "valide", "rejete", "annule", "non_envoye", "envoye", "echec"],
    transitions: [
      ["en_attente", "valide", "Valider encaissement"],
      ["en_attente", "rejete", "Rejeter encaissement"],
      ["valide|en_attente", "annule", "Annuler encaissement"],
      ["non_envoye|echec", "envoye", "Envoyer reçu"],
    ],
    calculatedStates: [],
  },
  {
    moduleKey: "echeancespaiementauto",
    statusField: "statut",
    states: ["a_venir", "en_retard", "partiellement_payee", "payee", "annulee"],
    transitions: [
      ["a_venir", "en_retard", "Marquer en retard"],
      ["a_venir|en_retard|partiellement_payee", "payee", "Marquer payée"],
      ["a_venir|en_retard|partiellement_payee", "annulee", "Annuler échéance"],
      ["en_retard", "en_retard", "Relancer client"],
    ],
    calculatedStates: ["en_retard"],
  },
  {
    moduleKey: "produitsauto",
    statusField: "statut",
    states: ["actif", "rupture", "inactif", "archive"],
    transitions: [
      ["actif", "rupture", "Marquer rupture"],
      ["rupture|inactif", "actif", "Réactiver produit"],
      ["actif|rupture|inactif", "archive", "Archiver produit"],
    ],
    calculatedStates: ["rupture"],
  },
  {
    moduleKey: "stocksauto",
    statusField: "statut",
    states: ["disponible", "stock_faible", "rupture", "archive"],
    transitions: [
      ["disponible", "stock_faible", "Détecter stock faible"],
      ["stock_faible", "rupture", "Détecter rupture"],
      ["stock_faible|rupture", "disponible", "Réapprovisionner"],
    ],
    calculatedStates: ["stock_faible", "rupture", "disponible"],
  },
  {
    moduleKey: "mouvementsstockauto",
    statusField: "statut",
    states: ["brouillon", "valide", "annule"],
    transitions: [
      ["brouillon", "valide", "Valider mouvement"],
      ["valide", "annule", "Annuler mouvement"],
    ],
    calculatedStates: [],
  },
  {
    moduleKey: "fournisseursauto",
    statusField: "statut",
    states: ["actif", "suspendu", "archive"],
    transitions: [
      ["actif", "suspendu", "Suspendre fournisseur"],
      ["suspendu", "actif", "Réactiver fournisseur"],
      ["actif|suspendu", "archive", "Archiver fournisseur"],
    ],
    calculatedStates: [],
  },
  {
    moduleKey: "commandesstockauto",
    statusField: "statut",
    states: ["brouillon", "envoyee", "partiellement_recue", "recue", "annulee"],
    transitions: [
      ["brouillon", "envoyee", "Envoyer commande"],
      ["envoyee", "partiellement_recue", "Réception partielle détectée"],
      ["envoyee|partiellement_recue", "recue", "Réception complète détectée"],
      ["brouillon|envoyee", "annulee", "Annuler commande"],
    ],
    calculatedStates: ["partiellement_recue", "recue"],
  },
  {
    moduleKey: "lignescommandestockauto",
    statusField: "statut",
    states: ["brouillon", "validee"],
    transitions: [
      ["brouillon", "validee", "Valider ligne commande"],
    ],
    calculatedStates: [],
  },
  {
    moduleKey: "receptionsstockauto",
    statusField: "statut",
    states: ["brouillon", "validee"],
    transitions: [
      ["brouillon", "validee", "Valider réception"],
    ],
    calculatedStates: [],
  },
];

const checks = [];
const rows = [];

function addCheck(moduleKey, area, status, severity, message) {
  checks.push({ moduleKey, area, status, severity, message });
}

for (const target of targetWorkflows) {
  const moduleFile = `src/runtime/modules/generated/${target.moduleKey}/${target.moduleKey}.module.ts`;
  const moduleContent = read(moduleFile);

  if (!moduleContent) {
    addCheck(target.moduleKey, "module", "FAIL", "HIGH", "Module file missing: " + moduleFile);
    continue;
  }

  const realStatusOptions = extractRealStatusOptions(moduleContent, target.statusField);
  const realWorkflows = extractRealWorkflows(moduleContent);
  const realActionsData = extractRealActions(moduleFile);
  const realActions = realActionsData.actions;

  const missingStates = target.states.filter((state) => !realStatusOptions.has(state));
  const extraTargetCalculated = target.calculatedStates || [];

  const missingWorkflowStates = target.states.filter((state) => !realWorkflows.states.has(state));

  const realTransitionKeys = new Set(
    realWorkflows.transitions.map((transition) =>
      `${transition.from}=>${transition.to}::${normalize(transition.action)}`
    )
  );

  const missingTransitions = target.transitions.filter(([from, to, action]) => {
    const key = `${from}=>${to}::${normalize(action)}`;
    return !realTransitionKeys.has(key);
  });

  const missingActions = target.transitions
    .map(([, , action]) => action)
    .filter((action) => !actionMatches(action, realActions));

  const uniqueMissingActions = Array.from(new Set(missingActions));

  if (missingStates.length === 0) {
    addCheck(target.moduleKey, "states", "OK", "HIGH", "All target states exist as status options.");
  } else {
    addCheck(
      target.moduleKey,
      "states",
      "WARN",
      "HIGH",
      "Missing target states in status options: " + missingStates.join(", ")
    );
  }

  if (realWorkflows.transitions.length === 0) {
    addCheck(
      target.moduleKey,
      "workflow",
      "WARN",
      "HIGH",
      "No real workflow transitions declared."
    );
  } else if (missingTransitions.length === 0) {
    addCheck(
      target.moduleKey,
      "workflow",
      "OK",
      "HIGH",
      "All target transitions are declared."
    );
  } else {
    addCheck(
      target.moduleKey,
      "workflow",
      "WARN",
      "HIGH",
      "Missing target transitions: " +
        missingTransitions.map(([from, to, action]) => `${from} -- ${action} --> ${to}`).join("; ")
    );
  }

  if (uniqueMissingActions.length === 0) {
    addCheck(target.moduleKey, "actions", "OK", "MEDIUM", "Target actions appear to exist.");
  } else {
    addCheck(
      target.moduleKey,
      "actions",
      "WARN",
      "MEDIUM",
      "Missing or unmatched target actions: " + uniqueMissingActions.join(", ")
    );
  }

  if (extraTargetCalculated.length > 0) {
    addCheck(
      target.moduleKey,
      "calculated-states",
      "INFO",
      "MEDIUM",
      "Calculated/system states that should not necessarily be manual buttons: " +
        extraTargetCalculated.join(", ")
    );
  }

  rows.push({
    moduleKey: target.moduleKey,
    moduleFile,
    statusOptions: Array.from(realStatusOptions),
    targetStates: target.states,
    missingStates,
    realTransitionCount: realWorkflows.transitions.length,
    targetTransitionCount: target.transitions.length,
    missingTransitions,
    realActions: Array.from(realActions),
    missingActions: uniqueMissingActions,
    calculatedStates: extraTargetCalculated,
  });
}

const ok = checks.filter((check) => check.status === "OK").length;
const info = checks.filter((check) => check.status === "INFO").length;
const warn = checks.filter((check) => check.status === "WARN").length;
const fail = checks.filter((check) => check.status === "FAIL").length;
const warnHigh = checks.filter((check) => check.status === "WARN" && check.severity === "HIGH").length;
const failHigh = checks.filter((check) => check.status === "FAIL" && check.severity === "HIGH").length;

const report = [];

report.push("# Q2-OP-I7 — Audit d’écart workflows cibles vs workflows réels");
report.push("");
report.push("Objectif : comparer les workflows runtime cibles Q2-OP-I6 avec les modules réellement déclarés.");
report.push("");
report.push("## Résumé");
report.push("");
report.push(`- OK : ${ok}`);
report.push(`- INFO : ${info}`);
report.push(`- WARN : ${warn}`);
report.push(`- WARN HIGH : ${warnHigh}`);
report.push(`- FAIL : ${fail}`);
report.push(`- FAIL HIGH : ${failHigh}`);
report.push("");
report.push("## Lecture rapide");
report.push("");
report.push("- Les statuts existants sont comparés aux états cibles.");
report.push("- Les transitions cibles sont comparées aux workflows réellement déclarés.");
report.push("- Les actions cibles sont comparées aux fichiers `.actions.ts`.");
report.push("- Certains états sont marqués calculés : ils doivent parfois être produits par moteur/règles plutôt qu’actionnés manuellement.");
report.push("");
report.push("## Tableau d’écart par module");
report.push("");
report.push("| Module | États cible | États réels | États manquants | Transitions cible | Transitions réelles | Transitions manquantes | Actions manquantes | États calculés |");
report.push("|---|---:|---:|---|---:|---:|---|---|---|");

for (const row of rows) {
  report.push(
    `| ${row.moduleKey} | ${row.targetStates.length} | ${row.statusOptions.length} | ${row.missingStates.join(", ") || "-"} | ${row.targetTransitionCount} | ${row.realTransitionCount} | ${row.missingTransitions.length ? row.missingTransitions.map(([from, to, action]) => `${from} -- ${action} --> ${to}`).join("<br/>") : "-"} | ${row.missingActions.join(", ") || "-"} | ${row.calculatedStates.join(", ") || "-"} |`
  );
}

report.push("");
report.push("## Détail des alertes");
report.push("");
report.push("| Module | Area | Status | Severity | Message |");
report.push("|---|---|---:|---:|---|");

for (const check of checks) {
  report.push(
    `| ${check.moduleKey} | ${check.area} | ${check.status} | ${check.severity} | ${check.message.replace(/\|/g, "/")} |`
  );
}

report.push("");
report.push("## Décisions importantes avant implémentation");
report.push("");
report.push("### 1. États calculés");
report.push("");
report.push("Certains états ne doivent probablement pas devenir des boutons utilisateur :");
report.push("");
report.push("- `facturesauto.statutPaiement` : `en_attente`, `partiel`, `paye` doivent venir des encaissements.");
report.push("- `stocksauto.statut` : `stock_faible`, `rupture`, `disponible` doivent venir des quantités et seuils.");
report.push("- `commandesstockauto.statut` : `partiellement_recue`, `recue` doivent venir des réceptions.");
report.push("- `receptionsstockauto.validee` déclenche un mouvement stock, mais ne doit pas être rejouable.");
report.push("- `rendezvous.termine` peut être un état de consommation, mais ne doit pas recréer l’intervention.");
report.push("");
report.push("### 2. Boutons runtime hors formulaire");
report.push("");
report.push("Toutes les transitions utilisateur doivent être rendues dans une future `ERPRuntimeActionBar`, pas dans `ERPEnterpriseForm`.");
report.push("");
report.push("### 3. Prochaine passe recommandée");
report.push("");
report.push("Q2-OP-I8 doit produire un plan d’implémentation sécurisé :");
report.push("");
report.push("- ajouter / normaliser les workflows metadata ;");
report.push("- distinguer transitions utilisateur vs états calculés ;");
report.push("- créer `ERPRuntimeActionBar` ;");
report.push("- retirer `workflowActions` de `ERPEnterpriseForm` ;");
report.push("- brancher les effets sur Business Rules / guards / services runtime ;");
report.push("- ajouter audits bloquants.");

write("docs/audits/Q2-OP-I7-target-vs-real-workflows-gap-audit.md", report.join("\n"));

console.log("[Q2-OP-I7] Target vs real workflows gap audit");
console.log("[ROOT]", root);
console.log("[OK]", ok);
console.log("[INFO]", info);
console.log("[WARN]", warn);
console.log("[WARN_HIGH]", warnHigh);
console.log("[FAIL]", fail);
console.log("[FAIL_HIGH]", failHigh);
console.log("[REPORT] docs/audits/Q2-OP-I7-target-vs-real-workflows-gap-audit.md");
console.log("[SUMMARY]");
for (const row of rows) {
  console.log(
    `- ${row.moduleKey}: missingStates=${row.missingStates.length}, realTransitions=${row.realTransitionCount}/${row.targetTransitionCount}, missingActions=${row.missingActions.length}, calculatedStates=${row.calculatedStates.length}`
  );
}